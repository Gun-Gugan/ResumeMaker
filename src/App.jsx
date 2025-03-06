import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const Resume = React.forwardRef(({ formData }, ref) => {
  return (
    <div ref={ref} className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{formData.name}</h1>
        <p className="text-gray-600">{formData.role}</p>
        <p>{formData.email} | {formData.phone} | {formData.linkedin}</p>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/2 p-2">
          <h2 className="text-xl font-semibold border-b-2 border-black pb-1">Summary</h2>
          <p className="text-sm break-words">{formData.summary}</p>

          <h2 className="text-xl font-semibold mt-4 border-b-2 border-black pb-1">Education</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.education.split(",").map((edu, index) => (
              <li key={index}>{edu.trim()}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-4 border-b-2 border-black pb-1">Languages</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.languages.split(",").map((lang, index) => (
              <li key={index}>{lang.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 p-2">
          <h2 className="text-xl font-semibold border-b-2 border-black pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {formData.skills.split(",").map((skill, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded-md">{skill.trim()}</span>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-4 border-b-2 border-black pb-1">Key Achievements</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.keyAchievements.split(",").map((ach, index) => (
              <li key={index}>{ach.trim()}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-4 border-b-2 border-black pb-1">Passion</h2>
          <p className="text-sm break-words">{formData.passion}</p>
        </div>
      </div>
    </div>
  );
});

const ResumeGenerator = () => {
  const [formData, setFormData] = useState({
    name: "", role: "", email: "", phone: "", linkedin: "", 
    summary: "", keyAchievements: "", education: "", 
    languages: "", skills: "", passion: "",
  });

  const [lastKey, setLastKey] = useState(""); // Track last key press

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    const { name, value } = e.target;

    if (["education", "languages", "skills", "keyAchievements"].includes(name) && e.key === "Enter") {
      e.preventDefault(); // Prevents new line in the input

      // If last key press was also "Enter", clear the input for new entry
      if (lastKey === "Enter") {
        e.target.value = ""; // Clear input field
      } else {
        if (value.trim() !== "") {
          setFormData((prev) => ({
            ...prev,
            [name]: prev[name] ? `${prev[name]}, ${value.trim()}` : value.trim(),
          }));
        }
      }

      setLastKey("Enter"); // Update last key press
    } else {
      setLastKey(""); // Reset key tracking if any other key is pressed
    }
  };

  const resumeRef = useRef();
  const handlePrint = useReactToPrint({ content: () => resumeRef.current });

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
              value={formData[key]} // Ensure controlled input
              onChange={handleChange}
              onKeyDown={handleKeyDown} // Handle Enter key for bullet points
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button onClick={handlePrint} className="w-full bg-blue-500 text-white p-2 rounded mt-4">Download PDF</button>
        </div>
        <Resume ref={resumeRef} formData={formData} />
      </div>
    </div>
  );
};

export default ResumeGenerator;
