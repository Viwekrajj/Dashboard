import { useRef, useState } from "react";

import {
  configureRateLimiter,
  checkRateLimit,
} from "../store/api/rateLimiter";

import ConfigForm from "./ConfigForm";
import RequestStats from "./RequestStats";
import RequestLog from "./RequestLog";

function RateLimiterDashboard() {
  const [isRunning, setIsRunning] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    allowed: 0,
    rejected: 0,
    errors: 0,
  });

  const [requests, setRequests] = useState([]);

  const stopRef = useRef(false);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  const resetStats = () => {
    setStats({
      total: 0,
      allowed: 0,
      rejected: 0,
      errors: 0,
    });

    setRequests([]);
  };

  const startTest = async (
    config,
    totalRequests,
    delay
  ) => {
    resetStats();

    setIsRunning(true);

    stopRef.current = false;

    try {
      // First configure the backend rate limiter
      await configureRateLimiter(config);

      for (
        let i = 1;
        i <= totalRequests;
        i++
      ) {
        if (stopRef.current) {
          break;
        }

        const startTime = performance.now();

        try {
          const response =
            await checkRateLimit();

          const responseTime = Math.round(
            performance.now() - startTime
          );

          const result = {
            id: i,
            timestamp:
              new Date().toISOString(),
            status: "ALLOWED",
            statusCode: response.status,
            responseTime,
          };

          setRequests((previous) => [
            result,
            ...previous,
          ]);

          setStats((previous) => ({
            ...previous,

            total:
              previous.total + 1,

            allowed:
              previous.allowed + 1,
          }));
        } catch (error) {
          const responseTime = Math.round(
            performance.now() - startTime
          );

          const statusCode =
            error.response?.status;

          const isRateLimited =
            statusCode === 429;

          const result = {
            id: i,

            timestamp:
              new Date().toISOString(),

            status: isRateLimited
              ? "RATE_LIMITED"
              : "ERROR",

            statusCode,

            responseTime,

            message:
              error.response?.data?.message,
          };

          setRequests((previous) => [
            result,
            ...previous,
          ]);

          setStats((previous) => ({
            ...previous,

            total:
              previous.total + 1,

            rejected:
              previous.rejected +
              (isRateLimited ? 1 : 0),

            errors:
              previous.errors +
              (isRateLimited ? 0 : 1),
          }));
        }

        if (
          delay > 0 &&
          i < totalRequests
        ) {
          await sleep(delay);
        }
      }
    } catch (error) {
      console.error(
        "Unable to configure rate limiter",
        error
      );
    } finally {
      setIsRunning(false);
    }
  };

  const stopTest = () => {
    stopRef.current = true;
  };

  return (
    <main className="dashboard">

      <section className="hero">
        <h1>Rate Limiter</h1>

        <p>
          Test your rate limiting algorithm
          visually.
        </p>
      </section>

      <section className="panel">
        <h2>Configuration</h2>

        <ConfigForm
          onStart={startTest}
          isRunning={isRunning}
        />

        {isRunning && (
          <button
            className="stop-button"
            onClick={stopTest}
          >
            Stop Test
          </button>
        )}
      </section>

      <section className="panel">

        <div className="section-header">
          <h2>Statistics</h2>

          {isRunning && (
            <span className="running">
              ● Running
            </span>
          )}
        </div>

        <RequestStats stats={stats} />

      </section>

      <section className="panel">

        <div className="section-header">
          <h2>Request Log</h2>

          <span>
            {requests.length} requests
          </span>
        </div>

        <RequestLog requests={requests} />

      </section>

    </main>
  );
}

export default RateLimiterDashboard;