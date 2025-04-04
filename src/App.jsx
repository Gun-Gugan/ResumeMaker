import React, { useState } from "react";

const Resume = ({ formData }) => (
  <div id="resume" className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold">{formData.name}</h1>
      <p className="text-gray-600">{formData.role}</p>
      <p>{formData.email} | {formData.phone} | {formData.linkedin}</p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        {["Summary", "Education", "Languages"].map((section) => (
          <div key={section} className="mb-4">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">{section}</h2>
            <p className="text-sm break-words">{formData[section.toLowerCase()]}</p>
          </div>
        ))}
      </div>
      <div>
        {["Skills", "Key Achievements", "Passion"].map((section) => (
          <div key={section} className="mb-4">
            <h2 className="text-xl font-semibold border-b-2 border-black pb-1">{section}</h2>
            <p className="text-sm break-words">{formData[section.toLowerCase()]}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ResumeGenerator = () => {
  const [formData, setFormData] = useState({
    name: "", role: "", email: "", phone: "", linkedin: "",
    summary: "", education: "", languages: "", skills: "",
    keyAchievements: "", passion: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center border-b-2 border-black pb-2">Resume Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-black pb-1">Enter Details</h2>
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button onClick={handlePrint} className="w-full bg-blue-500 text-white p-2 rounded mt-4">
            Download PDF
          </button>
        </div>
        <Resume formData={formData} />
      </div>
    </div>
  );
};

export default ResumeGenerator;
