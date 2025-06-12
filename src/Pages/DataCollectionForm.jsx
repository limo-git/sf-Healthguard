import { useState } from "react";
import headerLogo from "../assets/icons/headerLogo.svg";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const DataCollectionForm = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);

  function updateGender(event) {
    setGender(event.target.value);
  }
  function updateAge(event) {
    setAge(event.target.value);
  }
  return (
    <div className="-mt-14 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full md:w-3/4 flex justify-center">
        <div className="bg-white rounded-[20px] px-10 py-10 mt-5 shadow-2xl">
          <div className="flex flex-col items-center">
            <img
              src={headerLogo}
              alt="Logo"
              className="m-0 w-[249px] h-[159px]"
            />
            <h3 className="m-1 font-palanquin text-xl leading-normal font-semibold text-center">
              HealthGuard
              <br/>
              Predicting Tomorrow’s Outbreaks with Today’s Intelligence
            </h3> 
          </div>
          <form action="/">
            <div className="flex flex-col mt-4 items-center">
              <div className="w-full mb-3">
                <label htmlFor="dropdown">Gender</label>
                <br />
                <select
                  value={gender}
                  onChange={updateGender}
                  className="w-full rounded-xl border border-slate-600 px-4 py-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="registration">Age</label>
                <input
                  id="registration"
                  type="number"
                  className="w-full rounded-xl border border-slate-600 px-4 py-2"
                  onChange={updateAge}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <Link to="/symptomSelection" className="cursor-pointer">
                <Button label="Continue" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataCollectionForm;
