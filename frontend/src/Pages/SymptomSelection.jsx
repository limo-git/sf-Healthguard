import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import doctor_image_url from "../assets/images/doctor-img.jpg";
import { DiseaseService } from "../services/DiseaseService";
import DescriptionController from "../services/DescriptionService";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";

function MarkdownModal({ open, onClose, markdown }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full border-2 border-blue-400 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-blue-600 text-2xl font-bold hover:text-blue-800"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-blue-700 mb-4" {...props} />, 
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-blue-600 mb-2" {...props} />, 
              h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-blue-500 mb-2" {...props} />, 
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-2 text-slate-700" {...props} />, 
              li: ({node, ...props}) => <li className="mb-1" {...props} />, 
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-300 pl-4 italic text-slate-600 bg-blue-50 py-2 my-2" {...props} />, 
              p: ({node, ...props}) => <p className="mb-2 text-lg" {...props} />, 
              strong: ({node, ...props}) => <strong className="text-blue-700" {...props} />,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

const SymptomSelection = () => {
  const question = 'Choose the symptom you are affected with:';
  const [selectedOption, setSelectedOption] = useState('');
  const [severity, setSeverity] = useState(1);
  const diseaseService = useRef(null);
  const descriptionService = new DescriptionController();
  const [symptoms, setSymptoms] = useState([]);
  const [symptomNames, setSymptomNames] = useState([]);
  const descriptions = useRef(null);
  const [location, setLocation] = useState(null);
  const [markdownResponse, setMarkdownResponse] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get location data
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                timestamp: new Date().toISOString()
              });
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        }

        await Promise.all([
          diseaseService.current = new DiseaseService(),
          diseaseService.current.loadDiseasesData(),
          descriptionService.loadDescription(),
        ]);
        const descriptionsOfDiseases = descriptionService.diseases;
        descriptions.current = descriptionsOfDiseases;
        getCurrentSymptoms(descriptions.current);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const getCurrentSymptoms = (descriptionsOfDiseases) => {
    const symptomsHere = diseaseService.current.getSymptoms();
    if (symptomsHere.length === 0) {
      terminate();
      return;
    }
    var symptomsWithDescriptions = [];
    symptomsHere.forEach((symptom) => {
      symptomsWithDescriptions.push({
        name: symptom,
        description: descriptionsOfDiseases.get(symptom).description
      });
    });
    symptomsWithDescriptions.push({
      name: 'None of these',
      description: 'I am not suffering from any of these given symptoms here.'
    });
    symptomsWithDescriptions.push({
      name: 'I have no other symptoms',
      description: 'I am not suffering from any rest symptoms.'
    });
    setSymptomNames(symptomsHere);
    setSymptoms(symptomsWithDescriptions);
  };

  const selectSymptom = async (symptom) => {
    if (symptom === 'I have no other symptoms') {
      await terminate();
      return;
    }
    diseaseService.current.setCritical(symptom, severity);
    diseaseService.current.selectSymptom(symptom);
  };

  const deleteSymptoms = () => {
    diseaseService.current.deleteSymptoms(symptomNames);
  };

  const terminate = async () => {
    const selected = diseaseService.current.mySelectedSymptoms();
    const potentialDiseases = diseaseService.current.getPotentialDiseases();
    const hasCovid = potentialDiseases.some(diseaseObj =>
      diseaseObj.disease.toLowerCase().includes('covid')
    );
    if (hasCovid) {
      // const storedAge = localStorage.getItem('age');
      // const storedGender = localStorage.getItem('gender');
      // const symptomData = {
      //   age: parseInt(storedAge || '0'),
      //   timestamp: new Date().toISOString(),
      //   latitude: location?.latitude || null,
      //   longitude: location?.longitude || null,
      //   gender: storedGender === "Male" ? "M" : storedGender === "Female" ? "F" : "U",
      //   date: new Date().toISOString().split('T')[0]
      // };
      // try {
      //   const response = await fetch('http://localhost:5000/api/register', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(symptomData)
      //   });
      //   if (!response.ok) {
      //     throw new Error('Failed to submit symptom data');
      //   }
      //   const result = await response.json();
      //   setMarkdownResponse(result.markdown);
      //   setModalOpen(true);
      // } catch (error) {
      //   console.error('Error submitting symptom data:', error);
      // }
      // Simulate markdown response for now
      const dummyMarkdown = `
# 🦠 HealthGuard Prediction Result

---

## **Diagnosis**
You may be experiencing symptoms consistent with:

### **🦠 COVID-19**

---

## **Recommended Actions**
- 🛌 **Rest:** Get plenty of rest to help your body recover.
- 💧 **Hydrate:** Drink lots of fluids (water, soup, juice).
- 🍲 **Eat Nutritious Foods:** Maintain a healthy diet.
- 💊 **Medication:** Use over-the-counter medicines for fever and pain if needed.
- 👨‍⚕️ **Consult a Doctor:** If symptoms worsen or persist for more than a few days.

---

> _This is a simulated result for demonstration purposes. For personalized medical advice, please consult a healthcare professional._

---

**Stay safe and take care!**
`;
      setMarkdownResponse(dummyMarkdown);
      setModalOpen(true);
    } else {
      setMarkdownResponse("");
      setModalOpen(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === 'I have no other symptoms') {
      await terminate();
    } else if (selectedOption === 'None of these') {
      deleteSymptoms();
      getCurrentSymptoms(descriptions.current);
    } else {
      await selectSymptom(selectedOption);
      getCurrentSymptoms(descriptions.current);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSliderChange = (event) => {
    setSeverity(Number(event.target.value));
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans relative">
      <MarkdownModal open={modalOpen} onClose={() => setModalOpen(false)} markdown={markdownResponse} />
      {/* Fixed Right: Doctor Image */}
      <div className="hidden md:flex md:w-2/5 fixed right-0 top-1/2 -translate-y-1/2 justify-center items-center h-auto ">
        <img
          src={doctor_image_url}
          alt="Doctor"
          className="max-h-[650px] w-auto h-auto rounded-2xl shadow-xl object-cover"
        />
      </div>

      {/* Scrollable Left: Form */}
      <div className="w-full md:w-3/5 p-6 overflow-y-auto md:ml-0 md:mr-[40%]">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
          <div className="w-full bg-white rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center border border-blue-100">
            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-2 tracking-tight text-center font-palanquin">
              Symptom Selection
            </h1>
            <p className="text-base text-slate-600 mb-6 text-center max-w-md">
              Please select the symptoms you are experiencing. This helps us provide accurate predictions and early warnings.
            </p>
            <div className="w-full mt-2">
              <p className="font-semibold text-lg text-slate-700 mb-4 text-center">{question}</p>
              <div className="flex flex-col gap-4">
                {symptoms.map((option, index) => (
                  <label
                    key={index}
                    htmlFor={`option-${index}`}
                    className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-2xl border-2 transition cursor-pointer shadow-sm hover:shadow-lg ${selectedOption === option.name ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
                    onClick={() => handleOptionChange(option.name)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${selectedOption === option.name ? 'border-blue-500 bg-blue-500' : 'border-slate-300 bg-white'} transition`}
                      >
                        {selectedOption === option.name && (
                          <span className="w-3 h-3 bg-white rounded-full block" />
                        )}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className={`block font-bold text-lg ${selectedOption === option.name ? 'text-blue-700' : 'text-slate-700'}`}>{option.name}</span>
                      <span className="block text-slate-500 text-sm mt-1">{option.description}</span>
                    </div>
                    {selectedOption === option.name && index < (symptoms.length - 2) && (
                      <div className="w-full md:w-1/3 mt-4 md:mt-0">
                        <label className="block text-slate-700 font-medium mb-2">Severity Level</label>
                        <input
                          type="range"
                          min="1"
                          max="3"
                          value={severity}
                          onChange={handleSliderChange}
                          className="w-full accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition text-lg tracking-wide focus:outline-none"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chatbot floating bottom right, wider and collapsible */}
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

export default SymptomSelection;
