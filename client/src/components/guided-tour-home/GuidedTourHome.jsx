import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Paper,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./GTHome.css";

function GuidedTourHome() {
  const [openCategories, setOpenCategories] = useState([]);
  const navigate = useNavigate();

  const diseaseCategories = [
    "Cardiovascular Diseases",
    "Respiratory Diseases",
    "Gastrointestinal Diseases",
    "Reproductive Diseases",
    "Musculoskeletal Diseases",
    "Endocrine Diseases",
    "Dermatological Diseases",
    "Neurological Diseases",
  ];

  const diseaseOptions = {
    "Cardiovascular Diseases": ["Coronary Artery Disease (CAD)", "Heart Attack", "Heart Stroke"],
    "Dermatological Diseases": ["Hyperpigmentation", "Acne", "Skin Cancer"],
    "Endocrine Diseases": [
      "Diabetes",
      "Hormonal Imbalances",
      "Metabolic Syndrome",
    ],
    "Musculoskeletal Diseases": [
      "Bone Tumors",
      "Chronic Pain",
      "Osteoarthritis",
    ],
    "Reproductive Diseases": [
      "Infertility",
      "Polycystic Ovary Syndrome (PCOS)",
      "Endometriosis",
    ],
    "Gastrointestinal Diseases": [
      "Gastroesophageal reflux disease (acid reflux)",
      "Irritable bowel syndrome (IBS)",
      "Small intestinal bacterial overgrowth (SIBO)",
    ],
    "Respiratory Diseases": ["Asthma", "Chronic Obstructive Pulmonary Disease (COPD)", "Sleep Apnea"],
    "Neurological Diseases": ["Parkinson's Disease", "Neuropathy", "Migraine"],
  };

  const handleCategoryClick = (category) => {
    setOpenCategories((prevOpenCategories) =>
      prevOpenCategories.includes(category)
        ? prevOpenCategories.filter((cat) => cat !== category)
        : [...prevOpenCategories, category]
    );
  };

  const handleDiseaseClick = (disease) => {
    navigate('/loading');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto", overflow: 'hidden' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Explore Diseases & Remedies
      </Typography>
      <Box
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: '#eaf2e8',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          lineHeight: 1.5,
          color: '#333',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Typography variant="body2" sx={{ color: '#333' }}>
          Discover diseases and their remedies in our virtual tour. Click on a category to explore related diseases and learn about medicinal plants used for treatment. You can bookmark your favorite entries and navigate through detailed annotations for more insights.
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {diseaseCategories.map((category) => (
            <div key={category}>
              <ListItem
                button
                onClick={() => handleCategoryClick(category)}
                sx={{ borderBottom: '1px solid #ddd', borderRadius: 1, mb: 0.5 }}
              >
                <ListItemText
                  primary={category}
                  sx={{ fontWeight: 'bold', color: '#333' }}
                />
                {openCategories.includes(category) ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              <Collapse
                in={openCategories.includes(category)}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {diseaseOptions[category]?.map((disease) => (
                    <ListItem
                      button
                      key={disease}
                      sx={{ pl: 3, borderBottom: '1px solid #eee', '&:hover': { backgroundColor: '#f0f0f0' } }}
                      onClick={() => handleDiseaseClick(disease)}
                    >
                      <ListItemText primary={disease} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default GuidedTourHome;
