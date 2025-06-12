import { useState, useEffect, useRef } from "react";
import headerLogo from "../assets/icons/home-image.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Chatbot from "react-chatbot-kit";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";

const DataCollectionForm = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [areaStatus, setAreaStatus] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString()
          };
          setLocation(loc);
          setLocationPermission(true);
          setLocationError("");
          setLocationLoading(false);
          // Simulate API call for area status
          const dummyParagraph = `
Your area is currently experiencing a moderate risk of infectious disease outbreaks. Please stay alert for updates and follow health guidelines to stay safe.`;
          setAreaStatus(dummyParagraph);
        },
        (error) => {
          setLocationPermission(false);
          setLocationLoading(false);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError("Location access denied. Please enable it in your browser and reload.");
          } else {
            setLocationError("Unable to retrieve location. Please try again.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // Increased timeout
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocation not supported by your browser.");
      setLocationLoading(false);
    }
  }, []);
  

  function updateGender(event) {
    setGender(event.target.value);
  }

  function updateAge(event) {
    setAge(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locationLoading) {
      setLocationError("Please wait, trying to get your location...");
      return;
    }
    // Store user data in localStorage
    localStorage.setItem('age', age.toString());
    localStorage.setItem('gender', gender);

    // Format the data according to the specified structure
    const userData = {
      age: parseInt(age),
      timestamp: new Date().toISOString(),
      latitude: location?.latitude || null,
      longitude: location?.longitude || null,
      gender: gender === "Male" ? "M" : gender === "Female" ? "F" : "U",
      date: new Date().toISOString().split('T')[0]
    };

    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to register user data');
      }
      
      console.log('User data registered successfully');
      navigate("/symptomSelection");
    } catch (error) {
      console.error('Error registering user data:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 p-6">
        {/* Left: Data Collection Form */}
        <div className="w-full md:w-3/5 flex flex-col items-center">
          <div className="bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center border border-blue-100 w-full">
            <img
              src={headerLogo}
              alt="Logo"
              className="mb-4 w-40 h-28 object-contain drop-shadow-lg"
            />
            <h1 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight text-center font-palanquin">Welcome to HealthGuard</h1>
            <p className="text-base text-slate-600 mb-6 text-center max-w-md">
              Predicting Tomorrow's Outbreaks with Today's Insight.
              <br className="mb-2" />
              <span className="block mt-2">
                Please enter your details to help us provide accurate health insights and early warnings.
              </span>
            </p>
            {locationLoading && (
              <p className="text-blue-500 text-sm mt-2">
                Getting your location...
              </p>
            )}
            {locationError && !locationLoading && (
              <>
                <p className="text-red-500 text-sm mt-2">
                  {locationError}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-blue-500 underline mt-2"
                  type="button"
                >
                  Retry Location Access
                </button>
              </>
            )}
            <form onSubmit={handleSubmit} className="w-full mt-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="dropdown" className="text-slate-700 font-semibold mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={updateGender}
                  className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="registration" className="text-slate-700 font-semibold mb-1">Age</label>
                <input
                  id="registration"
                  type="number"
                  className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  onChange={updateAge}
                  required
                  min="0"
                  max="120"
                  placeholder="Enter your age"
                />
              </div>
              <div className="flex justify-center mt-2">
                <Button label="Continue" type="submit" disabled={locationLoading} />
              </div>
            </form>
          </div>
        </div>
        {/* Right: Area Status Card */}
        <div className="w-full md:w-3/5 flex flex-col items-center justify-center">
          {areaStatus && (
            <div className="w-full bg-blue-50 border-l-4 border-blue-400 rounded-2xl shadow-lg p-10 animate-fade-in min-h-[260px] flex flex-col justify-center">
              <p className="text-blue-800 text-2xl font-bold mb-3">Area Health Status</p>
              <p className="text-slate-700 text-lg">{areaStatus}</p>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <div className="relative w-[380px] max-w-full">
            <button
              onClick={() => setChatOpen(false)}
              className="absolute -top-4 right-0 bg-blue-600 text-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center border-2 border-white hover:bg-blue-700 transition"
              aria-label="Close Chat"
              style={{ zIndex: 60 }}
            >
              &times;
            </button>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl border-4 border-white hover:bg-blue-700 transition"
            aria-label="Open Chat"
          >
            🩺
          </button>
        )}
      </div>
    </div>
  );
};

export default DataCollectionForm;
