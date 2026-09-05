import { useState } from "react";

function ConfigForm({ onStart, isRunning }) {
  const [limit, setLimit] = useState(5);
  const [windowSeconds, setWindowSeconds] = useState(10);
  const [totalRequests, setTotalRequests] = useState(20);
  const [delay, setDelay] = useState(100);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (limit <= 0 || windowSeconds <= 0) {
      return;
    }

    onStart(
      {
        maxRequest:limit,
        windowSizeMills:windowSeconds,
      },
      totalRequests,
      delay
    );
  };

  return (
    <form className="config-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Request Limit</label>

        <input
          type="number"
          min="1"
          value={limit}
          onChange={(event) =>
            setLimit(Number(event.target.value))
          }
          disabled={isRunning}
        />

        <span>requests</span>
      </div>

      <div className="form-group">
        <label>Window</label>

        <input
          type="number"
          min="1"
          value={windowSeconds}
          onChange={(event) =>
            setWindowSeconds(Number(event.target.value))
          }
          disabled={isRunning}
        />

        <span>seconds</span>
      </div>

      <div className="form-group">
        <label>Requests to Send</label>

        <input
          type="number"
          min="1"
          value={totalRequests}
          onChange={(event) =>
            setTotalRequests(Number(event.target.value))
          }
          disabled={isRunning}
        />
      </div>

      <div className="form-group">
        <label>Delay Between Requests</label>

        <input
          type="number"
          min="0"
          value={delay}
          onChange={(event) =>
            setDelay(Number(event.target.value))
          }
          disabled={isRunning}
        />

        <span>ms</span>
      </div>

      <button
        className="start-button"
        type="submit"
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Start Test"}
      </button>
    </form>
  );
}

export default ConfigForm;