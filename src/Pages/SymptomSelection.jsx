import { useState, useEffect, useRef } from "react";
import doctor_image_url from "../assets/images/doctor-img.jpg";
import { DiseaseService } from "../services/DiseaseService";
import DescriptionController from "../services/DescriptionService";

const SymptomSelection = () => {

  const question = 'Choose the symptom you are affected with:';
  const [selectedOption, setSelectedOption] = useState('');
  const [severity, setSeverity] = useState(1);
  const diseaseService = useRef(null);
  const descriptionService = new DescriptionController();
  const [symptoms, setSymptoms] = useState([]);
  const [symptomNames, setSymptomNames] = useState([]);
  const descriptions = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
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
      })
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

  const selectSymptom = (symptom) => {
    if (symptom == 'I have no other symptoms') {
      // terminate
    }
    diseaseService.current.setCritical(symptom, severity);
    diseaseService.current.selectSymptom(symptom);
  };

  const deleteSymptoms = () => {
    diseaseService.current.deleteSymptoms(symptomNames);
  };

  const terminate = () => {
    const selected = diseaseService.current.mySelectedSymptoms();
    const potentialDiseases = diseaseService.current.getPotentialDiseases();
    console.log(selected);
    console.log(potentialDiseases);
    console.log('Terminate here');
  };

  const handleSubmit = () => {
    if (selectedOption === 'I have no other symptoms') {
      terminate();
    }
    else if (selectedOption === 'None of these') {
      deleteSymptoms();
      getCurrentSymptoms(descriptions.current);
    }
    else {
      selectSymptom(selectedOption);
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
    <>
      <div className="flex min-h-screen">
        <div className="w-full md:w-3/6 flex flex-col justify-center" style={{ overflow: 'hidden' }}>
          <div
            className="bg-white rounded-[20px] px-10 py-10 mt-5 max-h-screen"
            style={{
              overflowY: 'auto',
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
            }}
          >
            <p className="mt-0 break-words font-montserrat text-large leading-normal text-slate-700 p-4">
              {question}
            </p>
            <div className="answer-section">
              {symptoms.map((option, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={`option-${index}`}
                    className={`flex flex-col p-4 rounded-lg cursor-pointer`}
                    style={{
                      borderColor: selectedOption === option.name ? '#4157FF' : '#D1D5DB',
                      borderWidth: '1px',
                    }}
                    onClick={() => handleOptionChange(option.name)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-2`}
                        style={{
                          borderColor: selectedOption === option.name ? '#4157FF' : '#D1D5DB',
                          backgroundColor: selectedOption === option.name ? '#4157FF' : 'transparent',
                          borderWidth: '1px',
                        }}
                        onClick={() => handleOptionChange(option.name)}
                      >
                        {selectedOption === option.name && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div className='flex flex-col text-slate-700'>
                        <span
                          style={{ color: selectedOption === option.name ? '#4157FF' : '#6B7280' }}
                          className="font-bold"
                        >
                          {option.name}
                        </span>
                        <p>{option.description}</p>
                      </div>
                    </div>
                    {selectedOption === option.name && index < (symptoms.length - 2) && (
                      <div className="mt-4">
                        <p className="text-slate-700 mb-2">Select Severity Level:</p>
                        <input 
                          type="range" 
                          min="1" 
                          max="3" 
                          value={severity} 
                          onChange={handleSliderChange}
                          className="w-full"
                        />
                        <div className="flex justify-between text-slate-700 mt-2">
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleSubmit} 
                className="bg-blue-500 text-white font-bold py-2 px-8 rounded-full focus:outline-none w-64"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:w-3/6 justify-center items-center">
          <img src={doctor_image_url} alt="Doctor" className="max-h-[400px] w-auto h-auto rounded-lg mx-auto" />
        </div>
      </div>
    </>
  );    
};

export default SymptomSelection;
