function RequestStats({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span className="stat-label">Total</span>
        <strong>{stats.total}</strong>
      </div>

      <div className="stat-card allowed">
        <span className="stat-label">Allowed</span>
        <strong>{stats.allowed}</strong>
      </div>

      <div className="stat-card rejected">
        <span className="stat-label">Rate Limited</span>
        <strong>{stats.rejected}</strong>
      </div>

      <div className="stat-card error">
        <span className="stat-label">Errors</span>
        <strong>{stats.errors}</strong>
      </div>
    </div>
  );
}

export default RequestStats;