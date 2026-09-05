// import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
// import Home from '../pages/Home';
// import Game from '../pages/SignupPage';
// import NotFound from '../pages/LoginPage';
// import { useState } from 'react';
// import { CheckIcon } from '../icons/CheckIcon';
// import { ShieldIcon } from '../icons/ShieldIcon';
// import LoginPage from '../pages/LoginPage';
// import SignupPage from '../pages/SignupPage';
// import RateLimiterDashboard from '../components/RateLimiterDashboard';

// export default function AuthLayout() {
//   const [view, setView] = useState("login");

//   return (
//     <div className="auth-layout">
//       <div className="auth-panel-left">
//         <div className="left-content">
//           <div className="left-logo"><ShieldIcon /></div>
//           <h2 className="left-title">Secure auth,<br />done right.</h2>
//           <p className="left-subtitle">
//             JWT-powered authentication with Spring Boot backend.
//             Your tokens, your data, fully in your control.
//           </p>
//           <ul className="features-list">
//             {["BCrypt password hashing", "JWT access tokens", "Role-based access control", "Protected API routes"].map(f => (
//               <li className="feature-item" key={f}>
//                 <span className="feature-dot"><CheckIcon /></span>
//                 {f}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <div className="auth-panel-right">
//         {/* {view === "login"
//           ? <LoginPage onSwitch={() => setView("signup")} />
//           : <SignupPage onSwitch={() => setView("login")} />
//         } */}
//         <RateLimiterDashboard/>
//       </div>
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import Dashboard from "../pages/Dashboard";
import RateLimiter from "../pages/RateLimiter";
import ConsistentHashing from "../pages/ConsistentHashing";
import Authentication from "../pages/Authentication";
// import ParkingLot from "./pages/ParkingLot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/rate-limiter"
            element={<RateLimiter />}
          />
          <Route
            path="/consistent-hashing"
            element={<ConsistentHashing />}
          />
          <Route
            path="/authentication"
            element={<Authentication />}
          />
          {/* <Route
            path="/parking-lot"
            element={<ParkingLot />}
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;