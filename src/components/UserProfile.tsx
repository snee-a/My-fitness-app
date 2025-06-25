import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { differenceInYears } from "date-fns";
const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    photoURL: "",
    currentWeight: "",
    goalWeight: "",
    height: "",
    dob: "",
  });
  const [age, setAge] = useState<number | null>(null);
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setProfile(data);
        if (data.dob) {
          setAge(differenceInYears(new Date(), new Date(data.dob)));
        }
      }
    };
    loadProfile();
  }, [user]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    if (!user) return;
    await setDoc(doc(db, "users", user.uid), profile);
    alert("Profile saved ✅");
    if (profile.dob) {
      setAge(differenceInYears(new Date(), new Date(profile.dob)));
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-bold text-teal-600 text-center">Your Profile</h2>
      <input
        type="text"
        name="photoURL"
        placeholder="Profile Photo URL"
        value={profile.photoURL}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded" />
      {profile.photoURL && (
        <img
          src={profile.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"/>
      )}
      <input
        type="number"
        name="currentWeight"
        placeholder="Current Weight (kg)"
        value={profile.currentWeight}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"/>
      <input
        type="number"
        name="goalWeight"
        placeholder="Goal Weight (kg)"
        value={profile.goalWeight}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"/>
      <input
        type="number"
        name="height"
        placeholder="Height (cm)"
        value={profile.height}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"/>
      <input
        type="date"
        name="dob"
        value={profile.dob}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"/>

      {age !== null && (
        <p className="text-center text-sm text-gray-600">Age: {age} years</p>
      )}

      <button
        onClick={handleSave}
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
        Save Profile
      </button>
    </div>
  );
};
export default UserProfile;
