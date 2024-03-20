import React, { useState, useEffect } from "react";
import Resources from "../Resources/Resources";
import Navbar from "../Navbar/Navbar";
import api from "../../Api/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function CalendarScheduler() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showMonthOptions, setShowMonthOptions] = useState(false);
  const [company, setCompany] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const user = sessionStorage.getItem('access_token')
    const token = JSON.parse(user)
    const branchs = sessionStorage.getItem('branch')
    let branch = ''
    if (branchs !== "undefined") {

      branch = JSON.parse(branchs)
    }

    if (!token) {
      navigate("/auth");
    }

    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    setSelectedMonth(currentMonth);

    // Fetch company data
    const loading = toast.loading('Getting the companies');
    api.post('/get-all-company', {
      branch
    }).then((res) => {
      setCompany(res.data)
      toast.dismiss(loading)
      return toast.success("done 👍")
    })
  }, []);

  const handleMonthSelect = (e) => {
    const selectedMonthValue = e.target.value;
    setSelectedMonth(selectedMonthValue);

    // Close month options dropdown
    setShowMonthOptions(false);
  };

  const renderCalendar = ({ selectedMonth }) => {
    console.log(selectedMonth);

    const currentMonthCompanies = company.find(
      (item) => item.month === selectedMonth
    );

    // If no companies for the selected month, return a message
    if (
      !currentMonthCompanies ||
      currentMonthCompanies.companies.length === 0
    ) {
      return (
        <div className="text-3xl mt-8 text-center w-[70vw] text-orange-600">
          No companies scheduled for this month
        </div>
      );
    }

    // Group companies by date
    const companiesByDate = currentMonthCompanies.companies.reduce(
      (acc, company) => {
        const visitDate = new Date(company.companyVisitDate).getDate();
        const deadlineDate = new Date(company.applicationDeadline).getDate();

        // Add visit date
        if (!acc[visitDate]) {
          acc[visitDate] = [];
        }
        acc[visitDate].push({ type: "visit", company });

        // Add application deadline date
        if (!acc[deadlineDate]) {
          acc[deadlineDate] = [];
        }
        acc[deadlineDate].push({ type: "deadline", company });

        return acc;
      },
      {}
    );

    function getMonthFromDate(dateString) {
      if (!dateString || dateString.trim() === "") {
        return -1; // Return -1 if input string is undefined or empty
      }

      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return -1; // Return -1 if the input is not a valid date
      }

      return date.toLocaleString("default", { month: "long" });
    }

    // Render each day with its scheduled companies
    const daysInMonth = new Date(
      selectedYear,
      months.indexOf(selectedMonth) + 1,
      0
    ).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const scheduledCompanies = companiesByDate[day] || [];

      // Render company details for each day
      //
      return (
        <div
          key={index}
          className=" border-2  border-black-100  rounded-md p-3 text-md shadow-2xl capitalize hover:bg-blue-300 font-mono hover:scale-105 duration-100 "
        >
          <div className="text-2xl">{day}</div>
          {scheduledCompanies.map(({ type, company }, index) => (
            <div key={index}>
              <div className="">
                <div
                  className="font-bold cursor-pointer hover:underline bg-blue-400 rounded-lg p-1 shadow-md text-center"
                  onClick={() =>
                    navigate(
                      `/company-detail/${
                        company._id + "/" + company.companyName
                      }`
                    )
                  }
                >
                  {company.companyName + ""}
                </div>

                {type === "visit" &&
                getMonthFromDate(company.companyVisitDate) == selectedMonth ? (
                  <div>Visit</div>
                ) : type === "deadline" &&
                  getMonthFromDate(company.applicationDeadline) ==
                    selectedMonth ? (
                  <div>Application Deadline</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      );
    });
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate years from 1900 to current year
  const years = [];
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }
  return (
    <>
      <Navbar bgColor="calendar" />
      <div className="p-4" style={{ paddingTop: "2rem", marginLeft: "22rem" }}>
        <h2 className="mb-12 text-4xl font-bold leadiF sm:text-5xl">
          Calendar
        </h2>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowMonthOptions(!showMonthOptions)}
            >
              Select Month
            </button>
            {showMonthOptions && (
              <select
                className="ml-2 p-2"
                onChange={handleMonthSelect}
                value={selectedMonth}
              >
                <option value="">Select a month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* <div>
          <span className="mr-2">Year:</span>
          <select className="p-2" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div> */}
        </div>
        {selectedMonth && (
          <div>
            <h3 className="text-xl font-bold mb-2">
              {selectedMonth} {selectedYear} Schedule
            </h3>
            <div className="grid grid-cols-7 gap-2">
              <div className=" p-2 bg-black border text-white  rounded-md font-bold uppercase shadow-xl text-center">
                Sun
              </div>
              <div className=" p-2 bg-black border text-white  rounded-md font-bold uppercase shadow-xl text-center">
                Mon
              </div>
              <div className=" p-2 bg-black border text-white rounded-md font-bold uppercase shadow-xl text-center">
                Tue
              </div>
              <div className=" p-2 bg-black border text-white  rounded-md font-bold uppercase shadow-xl text-center">
                Wed
              </div>
              <div className=" p-2 bg-black border text-white rounded-md font-bold uppercase shadow-xl text-center">
                Thu
              </div>
              <div className=" p-2 bg-black border text-white rounded-md font-bold uppercase shadow-xl text-center">
                Fri
              </div>
              <div className=" p-2 bg-black border text-white rounded-md font-bold uppercase shadow-xl text-center">
                Sat
              </div>

              {renderCalendar({ selectedMonth })}
            </div>
          </div>
        )}

        {/* <Resources/> */}
      </div>
    </>
  );
}

export default CalendarScheduler;
