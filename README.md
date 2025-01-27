# HerboSphere
 🌿 The Virtual Herbal Garden is an innovative platform that combines traditional knowledge of medicinal plants with modern technology. It offers an interactive, educational, and immersive experience for users to explore the diverse range of plants used in AYUSH (Ayurveda, Yoga &amp; Naturopathy, Unani, Siddha, and Homeopathy).
🚀 Features
FloraVerse: Explore realistic 3D models of medicinal plants, learn their uses, and make bookmarks or notes.
Guided Virtual Tours: Curated experiences based on health goals, such as immunity, skin care, or digestion.
Unveil Your Dosha: Personalized Dosha assessments with tailored herbal recommendations based on Ayurvedic principles.
Multilingual Audio Translations: Learn about plants in your preferred language, making the platform globally accessible.
PetCorner: Explore safe herbal remedies for common pet ailments.
Herbal Remedies TV: Discover natural solutions and insights into healthier lifestyles.
Community Forum: Engage in discussions, share healing experiences, and exchange remedies with like-minded enthusiasts.
E-Commerce Integration: Order medicinal plants directly from the platform for easy access.
Chatbot Assistance: Get personalized plant and remedy recommendations for specific health concerns.

🛠️ Tech Stack
Frontend: ReactJS, ThreeJS, JavaScript, CSS, Material-UI
Backend: Node.js, Express.js, MongoDB
Frameworks: TensorFlow for Dosha assessment
APIs: Google Cloud Translate API

🎯 Objective
The project aims to make the rich knowledge of traditional herbal practices accessible to everyone through a virtual platform. It bridges the gap between physical herbal gardens and modern digital experiences, promoting awareness and understanding of AYUSH practices in an engaging way.

📖 Learn More
This project is developed with the vision of blending technology and tradition, ensuring the preservation and propagation of ancient herbal knowledge. Users can interact with 3D plants, take guided tours, and access detailed plant information, making it a comprehensive tool for students, practitioners, and enthusiasts of AYUSH.

🚀 How to Execute This Project
Follow the steps below to set up and execute the Virtual Herbal Garden project on your local machine.

Prerequisites
Ensure the following tools are installed on your system:

Node.js (v14.0.0 or above)
MongoDB (local or cloud instance)
Git
Browser (latest version of Chrome, Firefox, or Edge)
Steps to Run
Clone the Repository

bash
Copy
Edit
git clone https://github.com/<your-username>/virtual-herbal-garden.git
cd virtual-herbal-garden
Install Dependencies
Navigate to both the frontend and backend folders and install dependencies:

For the frontend:
bash
Copy
Edit
cd frontend
npm install
For the backend:
bash
Copy
Edit
cd backend
npm install
Configure Environment Variables
Create a .env file in the backend directory and provide the following details:

env
Copy
Edit
PORT=5000
MONGO_URI=<Your MongoDB Connection String>
GOOGLE_TRANSLATE_API_KEY=<Your Google Cloud Translate API Key>
Start MongoDB

If using a local MongoDB instance, ensure it is running by executing:
bash
Copy
Edit
mongod
Run the Backend
Start the backend server:

bash
Copy
Edit
cd backend
npm start
Run the Frontend
Open a new terminal and start the frontend server:

bash
Copy
Edit
cd frontend
npm start
Access the Application

Open your browser and navigate to:
plaintext
Copy
Edit
http://localhost:3000

Feel free to fork, star, and contribute to this project! 😊
