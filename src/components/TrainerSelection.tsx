import React from "react";
import GenderToggle from "./GenderToggle";
import MuscleMap from "./MuscleMap";
const TrainerSelection = () => {
  const [gender, setGender] = React.useState("male");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Choose Your Trainer</h1>
      <GenderToggle gender={gender} setGender={setGender} />
      <MuscleMap gender={gender} />
    </div>
  );
};
export default TrainerSelection;
