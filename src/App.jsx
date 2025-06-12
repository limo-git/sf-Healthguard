import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import DataCollectionForm from "./Pages/DataCollectionForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SymptomSelection from "./Pages/SymptomSelection";
import Analytics from "./Pages/Analytics";
import CollaborationLayout from "./Pages/CollaborationLayout";
import CommunicationHub from "./Pages/collaboration_subpages/CommunicationHub.jsx";
import SocialMediaIntelligence from "./Pages/collaboration_subpages/SocialMediaIntelligence.jsx";
import AlertManagement from "./Pages/collaboration_subpages/AlertManagement.jsx";
import ResourceSharing from "./Pages/collaboration_subpages/ResourceSharing.jsx";
import ResponseCoordination from "./Pages/collaboration_subpages/ResponseCoordination.jsx";

const App = () => (
  <main className="relative">
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />}></Route> */}
        <Route path="/" element={<DataCollectionForm />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/symptomSelection" element={<SymptomSelection />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/collaboration" element={<CollaborationLayout />}>
          <Route index element={<CommunicationHub />} />
          <Route path="communication" element={<CommunicationHub />} />
          <Route path="social-feed" element={<SocialMediaIntelligence />} />
          <Route path="alerts" element={<AlertManagement />} />
          <Route path="resources" element="ResourceSharing" />
          <Route path="coordination" element="ResponseCoordination" />
          {/* Analytics tab inside collaboration will link back to main Analytics page */}
          <Route path="analytics" element={<Analytics />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </main>
);

export default App;