import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./StudentPortal/Navbar/Navbar";
import CalendarScheduler from "./StudentPortal/calendar/CalendarScheduler";
import Profile from "./StudentPortal/StudentProfile/Profile";
import Resources from "./StudentPortal/Resources/Resources";
import AddJob from "./collegePortal/AddJob";
import RefCom from "./Company/AddCompanyCred";
import Authentication from "./user/Authentication";
import CompanyLogin from "./Company/CompanyLogin";
import CompanyHomePage from "./Company/Home/companyhome";
import CompanyPage from "./Company/CompanyDetail";
import Query from "./StudentPortal/Query/Query";
import ContactList from "./StudentPortal/Query/Alumni";
import PieChart from "./Company/Home/stats";
import Lobby from "./videoCalling/screens/Lobby";
import Room from "./videoCalling/screens/Room";
import { SocketProvider } from "./videoCalling/context/Socketprovider";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Define an array of routes where navbar should be hidden
  const hideNavbarRoutes = [
    "/company-portal/login",
    "/company",
    "/company-detail/:id/:name",
    "/auth" // Exclude /auth route
  ];

  // Function to check if current route should hide navbar
  const shouldHideNavbar = () => {
    return hideNavbarRoutes.some(route => location.pathname.includes(route));
  };

  return (
    <SocketProvider>
      {!shouldHideNavbar() && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/" element={<CalendarScheduler />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<CalendarScheduler />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/college-portal/add-company" element={<AddJob />} />
        <Route path="/college-portal/register-company" element={<RefCom />} />
        <Route path="/company-portal/login" element={<CompanyLogin />} />
        <Route path="/company" element={<CompanyHomePage />} />
        <Route path="/company-detail/:id/:name" element={<CompanyPage />} />
        <Route path="/query" element={<Query />} />
        <Route path="/alumni" element={<ContactList />} />
        <Route path="/stats" element={<PieChart />} />

        <Route path="/company-call" element={<Lobby />} />
        <Route path="/company-call/:email" element={<Lobby />} />
        <Route path="/company-call/room/:roomId" element={<Room />} />
      </Routes>
    </SocketProvider>
  );
}

export default App;
