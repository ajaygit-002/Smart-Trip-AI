import React from "react";
import { FiActivity } from "react-icons/fi";

const CrowdIndicator = ({ crowdScore = 50, crowdLevel = "Unknown" }) => {
  // Handle undefined or null values
  const score = crowdScore ?? 50;
  const level = crowdLevel ?? "Unknown";

  const getColor = (lvl) => {
    switch (lvl) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "High":
        return "bg-orange-500";
      case "Very High":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTextColor = (lvl) => {
    switch (lvl) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-orange-600";
      case "Very High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20">
        <svg className="transform -rotate-90 w-20 h-20">
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${(score / 100) * 2 * Math.PI * 35} ${
              2 * Math.PI * 35
            }`}
            className={getTextColor(level)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <FiActivity className={`text-3xl mx-auto ${getTextColor(level)}`} />
          </div>
        </div>
      </div>
      <div>
        <h3 className={`text-2xl font-bold ${getTextColor(level)}`}>{level}</h3>
        <p className="text-gray-600">{score.toFixed(0)}% Crowd</p>
        <div
          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium w-fit ${getColor(
            level
          )} text-white`}
        >
          {level}
        </div>
      </div>
    </div>
  );
};

export default CrowdIndicator;
