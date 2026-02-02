import { useState } from "react";
import { predictCareer } from "../api";

export default function Predict() {
  const token = localStorage.getItem("token");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const f = e.target;
    const data = {
      Education: f.education.value,
      Interest: f.interest.value,
      Python: f.python.value,
      SQL: f.sql.value,
      Java: f.java.value,
      Azure: f.azure.value,
      ML: f.ml.value,
    };

    try {
      const res = await predictCareer(data, token);
      setResult(res);
    } catch {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  }

  const ToggleSelect = ({ label, name, options, defaultValue }) => {
    const [value, setValue] = useState(defaultValue || options[0]);

    return (
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
        <div className="flex flex-wrap justify-center gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setValue(opt)}
              className={`px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300
                ${
                  value === opt
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-105"
                    : "bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300"
                }`}
            >
              {opt}
            </button>
          ))}
          <input type="hidden" name={name} value={value} />
        </div>
      </div>
    );
  };

  const SkillsSelect = () => {
    const skills = ["Python", "SQL", "Java", "Azure", "ML"];
    const [values, setValues] = useState(
      skills.reduce((acc, skill) => ({ ...acc, [skill]: "No" }), {})
    );

    const handleClick = (skill, val) => {
      setValues((prev) => ({ ...prev, [skill]: val }));
    };

    return (
      <div className="p-4 rounded-2xl bg-gray-100 border border-gray-300">
        <h4 className="text-gray-800 font-semibold mb-4 text-center text-sm sm:text-base">
          💻 Technical Skills
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {skills.map((skill) => (
            <div key={skill} className="flex flex-col items-center gap-1">
              <span className="text-sm font-semibold text-gray-700">{skill}</span>
              <div className="flex w-full gap-2">
                {["Yes", "No"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleClick(skill, opt)}
                    className={`flex-1 px-1 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300
                      ${
                        values[skill] === opt
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-105"
                          : "bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <input type="hidden" name={skill.toLowerCase()} value={values[skill]} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: "#ffffff", // ✅ changed background to white
      }}
    >
      <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">

        {!result && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-indigo-800">
              🚀 AI Career Predictor
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
              <ToggleSelect
                label="Education"
                name="education"
                options={["Intermediate","Diploma","Degree","BTech","MCA","MSc"]}
              />
              <ToggleSelect
                label="Interest"
                name="interest"
                options={[
                  "Artificial Intelligence",
                  "Data Analyst",
                  "Cyber Security",
                  "Web Development",
                  "Cloud Computing",
                  "Software Development",
                ]}
              />
              <SkillsSelect />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-lg
                  bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                  shadow-xl active:scale-95 hover:scale-105 transition-all duration-300 text-white"
              >
                {loading ? "🔮 Predicting..." : "✨ Predict Career"}
              </button>
            </form>
          </div>
        )}

        {result && (
          <div className="bg-gray-100 border border-gray-300 rounded-2xl p-6 sm:p-8 shadow text-gray-900">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-indigo-800">
              {result.predicted_career}
            </h3>

            <p className="text-sm sm:text-base mb-4">{result.job_description}</p>

            <h4 className="font-semibold text-base mb-2">🎓 Learning Resources</h4>
            <ul className="space-y-1 text-sm sm:text-base">
              {result.related_links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    🔗 {link}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setResult(null)}
              className="mt-4 w-full px-5 py-3 rounded-xl font-bold
                bg-gradient-to-r from-indigo-600 to-purple-700
                hover:scale-105 transition-all duration-300 text-white"
            >
              🔁 Predict Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
