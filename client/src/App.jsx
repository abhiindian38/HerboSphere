import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Learn from "./components/learn/Learn";
import GuidedTourHome from "./components/guided-tour-home/GuidedTourHome";
import GuidedTourGarden from "./components/guided-tour-garden/GuidedTourGarden";
import LoadingScreen from "./components/loading-screen/LoadingScreen";
import HerbalKnowledgeHub from "./components/community-forum/HerbalKnowledgeHub";
import RemedySharing from "./components/community-forum/RemedySharing";
import OrderPlant from "./components/plant-detail/OrderPlant";
import HealingCommunities from "./components/community-forum/HealingCommunities";
import CommunityForum from "./components/community-forum/CommunityForum";
import HealingJourneys from "./components/community-forum/HealingJourneys";
import "./App.css";
import DoshaQuiz from "./components/doshaQuiz/DoshaQuiz";
import YouTubeVideoGallery from "./components/remedies/Remedies";
import PetCorner from "./components/pet-corner/PetCorner";
function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "learn",
          element: <Learn />,
        },
        {
          path: "guided-tours",
          element: <GuidedTourHome />,
        },
        {
          path: "guided-tour-garden",
          element: <GuidedTourGarden />,
        },
        {
          path: "loading",
          element: <LoadingScreen />,
        },
          {
            path:"quiz",
            element :<DoshaQuiz />,
          },
          {
            path:"remedies-tv",
            element : <YouTubeVideoGallery />,
          },
          {
            path: "pet-corner",
            element: <PetCorner />,
          },
        {
          path: "order-plant/:name",
          element: <OrderPlant />,
        },
        {
          path: "community-forum",
          element: <CommunityForum />,
          children : [
            { path: "knowledge-hub", 
              element: <HerbalKnowledgeHub /> },
            {
              path: "remedy-sharing",
              element: <RemedySharing />,
            },
            {
              path: "healing-communities",
              element: <HealingCommunities />,
            },
            {
              path: "healing-journeys",
              element: <HealingJourneys />,
            },
          ]
          
        },
        { path: "knowledge-hub", 
          element: <HerbalKnowledgeHub /> },
        {
          path: "remedy-sharing",
          element: <RemedySharing />,
        },
        {
          path: "healing-communities",
          element: <HealingCommunities />,
        },
        {
          path: "healing-journeys",
          element: <HealingJourneys />,
        },
      ],
    },
  ]);

  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
