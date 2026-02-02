import React from "react";
import { Line, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // =================== CHART DATA ===================
  const careerDemandData = {
    labels: ["2023", "2024", "2025", "2026", "2027"],
    datasets: [
      {
        label: "AI/ML Engineer",
        data: [50, 70, 100, 140, 180],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Data Scientist",
        data: [40, 60, 85, 120, 150],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Cloud Architect",
        data: [20, 40, 60, 80, 120],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const salaryDistributionData = {
    labels: ["Data Scientist", "AI/ML Engineer", "Cloud Architect", "Full Stack Dev", "Cyber Security Analyst"],
    datasets: [
      {
        label: "Salary (LPA)",
        data: [10, 12, 18, 8, 7],
        backgroundColor: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
      },
    ],
  };

  const skillRadarData = {
    labels: ["Python", "SQL", "ML", "AI", "Cloud", "Web Dev", "Cyber Security"],
    datasets: [
      {
        label: "AI/ML Engineer",
        data: [95, 80, 90, 85, 60, 50, 40],
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "#4f46e5",
        borderWidth: 2,
      },
      {
        label: "Data Scientist",
        data: [85, 90, 80, 70, 55, 45, 30],
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10b981",
        borderWidth: 2,
      },
      {
        label: "Cloud Architect",
        data: [60, 50, 40, 45, 95, 70, 30],
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        borderColor: "#f59e0b",
        borderWidth: 2,
      },
    ],
  };

  // Unique: Career Readiness Score (simulated)
  const readinessData = {
    labels: ["Readiness"],
    datasets: [
      {
        label: "Your Career Readiness",
        data: [75], // 75% ready
        backgroundColor: ["#4f46e5"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen px-6 sm:px-10 py-8 text-gray-900 space-y-12" style={{ fontFamily: "'Poppins', sans-serif", background: "#ffffff" }}>
      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-indigo-800">
          Smart Career AI Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-700 max-w-3xl">
          Explore future-ready career paths in AI, ML, Data Science, Web Development, Cyber Security, and Cloud Computing.
        </p>
      </div>

      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { title: "Machine Learning", desc: "Build intelligent models, analyze data, and automate predictions." },
          { title: "Artificial Intelligence", desc: "Master NLP, Computer Vision, and real-world AI solutions." },
          { title: "Smart Career Prediction", desc: "Get AI-powered career suggestions based on your profile." },
          { title: "Data Science", desc: "Turn raw data into insights with analytics and visualization." },
          { title: "Web Development", desc: "Design and build modern, responsive web applications." },
          { title: "Cloud & DevOps", desc: "Deploy scalable apps using cloud platforms and CI/CD." },
        ].map((item, i) => (
          <div key={i} className="bg-gray-100 border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h2 className="font-bold text-xl mb-2 text-indigo-800">{item.title}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ================= GRAPHS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Career Demand Over Time */}
        <div className="bg-gray-100 border border-gray-200 rounded-3xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">📈 Career Demand Over Time</h2>
          <Line data={careerDemandData} />
        </div>

        {/* Salary Distribution */}
        <div className="bg-gray-100 border border-gray-200 rounded-3xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">💰 Salary Distribution</h2>
          <Doughnut data={salaryDistributionData} />
        </div>

        {/* Skills Radar */}
        <div className="bg-gray-100 border border-gray-200 rounded-3xl p-6 shadow md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-indigo-800">🛠 Skill Requirements Radar</h2>
          <Radar data={skillRadarData} />
        </div>

        {/* Unique: Career Readiness Progress */}
        <div className="bg-gray-100 border border-gray-200 rounded-3xl p-6 shadow md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-green-700">🎯 Your Career Readiness</h2>
          <div className="flex justify-center items-center h-40">
            <Doughnut
              data={{
                labels: ["Completed", "Remaining"],
                datasets: [
                  {
                    data: [75, 25],
                    backgroundColor: ["#4f46e5", "#e5e7eb"],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                cutout: "70%",
                plugins: { legend: { display: false } },
              }}
            />
            <div className="absolute text-center">
              <span className="text-3xl font-bold text-indigo-800">75%</span>
              <p className="text-sm text-gray-700">Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
