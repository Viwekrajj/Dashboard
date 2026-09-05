function RequestLog({ requests }) {
  return (
    <div className="request-log">
      <div className="log-header">
        <span>#</span>
        <span>Time</span>
        <span>Status</span>
        <span>HTTP</span>
        <span>Response Time</span>
      </div>

      {requests.length === 0 ? (
        <div className="empty-state">
          No requests yet.
        </div>
      ) : (
        requests.map((request) => (
          <div
            className="log-row"
            key={request.id}
          >
            <span>#{request.id}</span>

            <span>
              {new Date(
                request.timestamp
              ).toLocaleTimeString()}
            </span>

            <span
              className={`status ${request.status.toLowerCase()}`}
            >
              {request.status === "ALLOWED" && "✓ "}
              {request.status === "RATE_LIMITED" && "✕ "}

              {request.status}
            </span>

            <span>
              {request.statusCode ?? "-"}
            </span>

            <span>
              {request.responseTime
                ? `${request.responseTime} ms`
                : "-"}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default RequestLog;