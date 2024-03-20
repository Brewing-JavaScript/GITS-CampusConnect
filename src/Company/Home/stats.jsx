import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import api from "../../Api/Api";
import toast from "react-hot-toast";

// defaults.global.tooltips.enabled = false
// defaults.global.legend.position = 'bottom'

ChartJS.register(Tooltip, Legend, ArcElement);

const PieChart = () => {

    const [count, setCount] = useState({});
    const [placed, setplaced] = useState([]);
    useEffect(() => {
        const loading= toast.loading('loading..')
        api.get('/get-count').then((res=>{
            toast.dismiss(loading)
            setCount(res.data)
        }))
        .catch(err=>{
            toast.dismiss(loading)
            
        })
        getCompamywisePlace()
    }, []);

    const getCompamywisePlace = () =>{
      const loading= toast.loading('loading..')
        api.get('/place').then((res=>{
            toast.dismiss(loading)
            setplaced(res.data)
        }))
        .catch(err=>{
            toast.dismiss(loading)
            
        })

    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Statistics of Student Placement</h1>
        <div className="w-3/4">
          <Pie
            data={{
            //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                 labels: ["Hired", "Not Hired"],
              datasets: [
                {
                  label: "# of votes",
                  data: [count.hiredTrueCount, count.hiredFalseCount],
                  backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    // "rgba(255, 206, 86, 0.2)",
                    // "rgba(75, 192, 192, 0.2)",
                    // "rgba(153, 102, 255, 0.2)",
                    // "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [         
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    // "rgba(255, 206, 86, 1)",
                    // "rgba(75, 192, 192, 1)",
                    // "rgba(153, 102, 255, 1)",
                    // "rgba(255, 159, 64, 1)",
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
                  postion: "bottom",
                  labels: {
                    fontSize: 25,
                  },
                },
              },
            }}
          />
        </div>
        <div class="flex mt-4 md:mt-6">
            <span class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg ">Hired = {count.hiredTrueCount}</span>
            <span class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200">Not Hired = {count.hiredFalseCount}</span>
        </div>
      </div>
    );
};

export default PieChart;




// import React from 'react';
// import { Pie } from 'react-chartjs-2';

// const data = {
//   labels: ['Hired', 'Not Hired'],
//   datasets: [
//     {
//       data: [7, 5],
//       backgroundColor: [
//         'rgba(75, 192, 192, 0.6)',
//         'rgba(255, 99, 132, 0.6)',
//       ],
//     },
//   ],
// };

// const options = {
//   // Add any additional options here
// };

// const PieChart = () => (
//   <div>
//     <h2>Hiring Statistics</h2>
//     <Pie data={data} options={options} />
//   </div>
// );

// export default PieChart;
