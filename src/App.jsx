import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import DataCollectionForm from "./Pages/DataCollectionForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SymptomSelection from "./Pages/SymptomSelection";

const App = () => (
  <main className="relative">
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />}></Route> */}
        <Route path="/" element={<DataCollectionForm />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/symptomSelection" element={<SymptomSelection />}></Route>
      </Routes>
    </BrowserRouter>
  </main>
);

export default App;