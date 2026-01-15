import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CrowdChart = ({ predictions }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (predictions && predictions.length > 0) {
      const labels = predictions.map((p) => {
        const hour = new Date(p.time).getHours();
        return `${hour}:00`;
      });

      const data = {
        labels,
        datasets: [
          {
            label: 'Crowd Score',
            data: predictions.map((p) => p.crowdScore || 0),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: predictions.map((p) => {
              const score = p.crowdScore;
              if (score <= 25) return 'rgb(34, 197, 94)';
              if (score <= 50) return 'rgb(234, 179, 8)';
              if (score <= 75) return 'rgb(249, 115, 22)';
              return 'rgb(239, 68, 68)';
            }),
          },
        ],
      };

      setChartData(data);
    }
  }, [predictions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Crowd Prediction - Next 24 Hours',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + '%';
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96">
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500 py-8">Loading chart...</p>
      )}
    </div>
  );
};

export default CrowdChart;
