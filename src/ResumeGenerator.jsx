import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const Resume = ({ formData }) => {
  const linkedinUrl = formData.linkedin
    ? formData.linkedin.startsWith("http")
      ? formData.linkedin
      : `https://linkedin.com/in/${formData.linkedin}`
    : "#";

  return (
    <div
      id="resume"
      className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg text-black"
    >
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase">{formData.name || "Your Name"}</h1>
        <p className="text-gray-600">{formData.role || "Your Role"}</p>
        <p>
          {formData.email || "email@example.com"} |{" "}
          {formData.phone || "Phone Number"} |{" "}
          <a
            href={linkedinUrl}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {formData.linkedin || "LinkedIn Profile"}
          </a>
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {["Summary", "Education", "Languages"].map(
            (section) =>
              formData[section.toLowerCase()] && (
                <section key={section} className="mb-4">
                  <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
                    {section}
                  </h2>
                  <p className="text-sm whitespace-pre-line">
                    {formData[section.toLowerCase()]}
                  </p>
                </section>
              )
          )}
        </div>
        <div>
          {["Skills", "Key Achievements", "Passion"].map(
            (section) =>
              formData[section.toLowerCase()] && (
                <section key={section} className="mb-4">
                  <h2 className="text-xl font-semibold border-b-2 border-black pb-1">
                    {section}
                  </h2>
                  <p className="text-sm whitespace-pre-line">
                    {formData[section.toLowerCase()]}
                  </p>
                </section>
              )
          )}
        </div>
      </div>
    </div>
  );
};

const ResumeGenerator = () => {
  const initialFormData = {
    name: "",
    role: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: "",
    education: "",
    languages: "",
    skills: "",
    keyAchievements: "",
    passion: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("resumeFormData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Invalid local data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData));
  }, [formData]);

  const validateField = (name, value) => {
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email format";
    }
    if (name === "phone" && value && !/^\+?\d{7,15}$/.test(value)) {
      return "Invalid phone number";
    }
    if (name === "linkedin" && value && !value.toLowerCase().includes("linkedin.com")) {
      return "Please enter a valid LinkedIn link (include linkedin.com)";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const resetForm = () => {
    if (window.confirm("Reset all fields?")) {
      setFormData(initialFormData);
      setErrors({});
      localStorage.removeItem("resumeFormData");
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter",
      });

      let y = 0.5;
      doc.setFontSize(16);
      doc.text(formData.name || "Your Name", 0.5, y);
      y += 0.3;
      doc.setFontSize(12);
      doc.text(formData.role || "Your Role", 0.5, y);
      y += 0.3;
      doc.text(
        `${formData.email || "email@example.com"} | ${
          formData.phone || "Phone Number"
        } | ${formData.linkedin || "LinkedIn Profile"}`,
        0.5,
        y
      );
      y += 0.5;

      ["Summary", "Education", "Languages", "Skills", "Key Achievements", "Passion"].forEach(
        (section) => {
          if (formData[section.toLowerCase()]) {
            doc.setFontSize(14);
            doc.text(section, 0.5, y);
            y += 0.2;
            doc.setFontSize(10);
            doc.text(formData[section.toLowerCase()], 0.5, y, { maxWidth: 7.5 });
            y += 0.5;
          }
        }
      );

      doc.save(`${formData.name || "resume"}.pdf`);
      setIsGenerating(false);
    } catch (error) {
      alert(`Failed to generate PDF: ${error.message || "Unknown error"}`);
      setIsGenerating(false);
    }
  };

  const isFormValid = () =>
    formData.name && formData.email && !Object.values(errors).some((e) => e);

  const inputFields = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "role", label: "Professional Role", type: "text" },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "linkedin", label: "LinkedIn (username or URL)", type: "text" },
    { name: "summary", label: "Professional Summary", type: "textarea" },
    { name: "education", label: "Education", type: "textarea" },
    { name: "languages", label: "Languages", type: "textarea" },
    { name: "skills", label: "Skills", type: "textarea" },
    { name: "keyAchievements", label: "Key Achievements", type: "textarea" },
    { name: "passion", label: "Passion", type: "textarea" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-3xl font-bold text-center border-b-2 border-black pb-2">
        Resume Generator
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 border-b-2 border-black pb-1">
            Enter Your Details
          </h2>
          <div>
            {inputFields.map(({ name, label, type, required }) => (
              <div key={name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={name}
                    name={name}
                    rows={4}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={!isFormValid() || isGenerating}
                className={`w-full p-2 rounded mt-4 ${
                  isFormValid() && !isGenerating
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white`}
              >
                {isGenerating ? "Generating..." : "Download PDF"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-red-600 text-white p-2 rounded mt-4 hover:bg-red-700"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>
        <Resume formData={formData} />
      </div>
    </div>
  );
};

export default ResumeGenerator;

