import { NavLink } from "react-router-dom";

const projects = [
  {
    name: "Rate Limiter",
    path: "/rate-limiter",
    icon: "🚦",
  },
  {
    name: "Consistent Hashing",
    path: "/consistent-hashing",
    icon: "#️⃣",
  },
  {
    name: "Authentication",
    path: "/authentication",
    icon: "🔐",
  },
//   {
//     name: "Parking Lot",
//     path: "/parking-lot",
//     icon: "🅿️",
//   },
];

function Drawer() {
  return (
    <aside className="drawer">

      <div className="drawer-logo">
        <div className="logo-icon">⚙️</div>

        <div>
          <h2>Backend</h2>
          <span>Playground</span>
        </div>
      </div>

      <div className="drawer-section">
        <span className="drawer-title">
          PROJECTS
        </span>

        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span>🏠</span>
            Dashboard
          </NavLink>

          {projects.map((project) => (
            <NavLink
              key={project.path}
              to={project.path}
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span>{project.icon}</span>
              {project.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="drawer-footer">
        <span>Backend Concepts</span>
        <small>v1.0</small>
      </div>

    </aside>
  );
}

export default Drawer;