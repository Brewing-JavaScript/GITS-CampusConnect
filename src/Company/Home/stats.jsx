import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import api from "../../Api/Api";
import toast from "react-hot-toast";

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = () => {
  const [count, setCount] = useState({});
  const [placed, setPlaced] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const loading = toast.loading("Loading...");
    api.get("/get-count")
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });

    getCompanywisePlacement();
  };

  const getCompanywisePlacement = () => {
    const loading = toast.loading("Loading...");
    api.get("/place")
      .then((res) => {
        setPlaced(res.data);
      })
      .catch((err) => {
        console.error("Error fetching company-wise placement: ", err);
      });
  };

  const companyLabels = placed.map((item) => item.cname);
  const companyData = placed.map((item) => item.totalHiredStudents);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Statistics of Student Placement</h1>
      <div className="w-1/2 p-4">
        <Pie
          data={{
            labels: ["Hired", "Not Hired"],
            datasets: [
              {
                label: "# of Students",
                data: [count.hiredTrueCount, count.hiredFalseCount],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  fontSize: 25,
                },
              },
            },
          }}
        />
      </div>

      <h1 className="text-3xl font-bold mt-16 mb-4">Company-wise Placement Data</h1>
      <div className="w-1/2 p-4">
        <Pie
          data={{
            labels: companyLabels,
            datasets: [
              {
                label: "# of Students",
                data: companyData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  fontSize: 25,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
