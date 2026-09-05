function Dashboard() {
  return (
    <div className="page">

      <div className="page-header">
        <h1>Backend Playground</h1>

        <p>
          Interactive implementations of
          backend and system design concepts.
        </p>
      </div>

      <div className="project-grid">

        <div className="project-card">
          <span className="project-icon">
            🚦
          </span>

          <h2>Rate Limiter</h2>

          <p>
            Experiment with fixed window,
            sliding window, token bucket
            and other algorithms.
          </p>
        </div>

        <div className="project-card">
          <span className="project-icon">
            #️⃣
          </span>

          <h2>Consistent Hashing</h2>

          <p>
            Visualize hash rings, nodes,
            virtual nodes and key
            distribution.
          </p>
        </div>

        <div className="project-card">
          <span className="project-icon">
            🔐
          </span>

          <h2>Authentication</h2>

          <p>
            Explore authentication and
            authorization flows.
          </p>
        </div>

        <div className="project-card">
          <span className="project-icon">
            🅿️
          </span>

          <h2>Parking Lot</h2>

          <p>
            Interactive implementation of
            the parking lot low-level design.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;