import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Coin({ darkMode }) {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState("30d");

  const addWatchlist = () => {};

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-LgRgcg7QWqmKm27EY2Y7S7xD",
        },
      };

      try {
        const coinResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          options
        );
        const coinData = await coinResponse.json();
        setCoin(coinData);

        const historyResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timeframe}`,
          options
        );
        const historyData = await historyResponse.json();
        const prices = historyData.prices.map(([timestamp, price]) => {
          const date = new Date(timestamp);

          let label;
          if (timeframe === "1d") {
            label = format(date, "HH:mm");
          } else if (timeframe === "7d" || timeframe === "30d") {
            label = format(date, "MMM d");
          }

          return {
            x: label,
            y: price,
          };
        });

        setChartData({
          labels: prices.map((data) => data.x),
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              borderColor: "purple",
              backgroundColor: "rgba(255, 87, 51, 0.2)",
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError("API Failed to fetch coin data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id, timeframe]);

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw.y;
            const time = context.raw.x;
            return `${label}: $${value.toLocaleString()} at ${time}`;
          },
          title: function (context) {
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`;
          },
        },
        grid: {
          borderDash: [5, 5],
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-72px)] items-center justify-center">
        <div className={`${darkMode && "text-white"}`}>{error}</div>
      </div>
    );
  }

  if (!coin) {
    return <div>No data available.</div>;
  }

  return (
    <div
      className={`container flex flex-col mx-auto p-4 max-w-5xl items-center px-10 min-h-[calc(100vh-72px)] ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="mb-2">
        <button
          onClick={() => setTimeframe("1d")}
          className={`p-2 mt-10 w-12 mx-1 border border-white ${
            timeframe === "1d"
              ? "bg-purple-500 text-white"
              : "bg-black text-white"
          }`}
        >
          24h
        </button>
        <button
          onClick={() => setTimeframe("7d")}
          className={`p-2 mx-1 w-12 border border-white ${
            timeframe === "7d"
              ? "bg-purple-500 text-white"
              : "bg-black text-white"
          }`}
        >
          7d
        </button>
        <button
          onClick={() => setTimeframe("30d")}
          className={`p-2 mx-1 w-12 border border-white ${
            timeframe === "30d"
              ? "bg-purple-500 text-white"
              : "bg-black text-white"
          }`}
        >
          30d
        </button>
      </div>
      <div
        className={`flex flex-col items-center container bg-white p-4 rounded-lg shadow-lg border-2  ${
          darkMode ? "  border-purple-700" : "border-black"
        }`}
      >
        <img
          src={coin.image.large}
          alt={coin.name}
          className="w-24 h-24 mb-4"
        />
        <h2 className={`text-2xl font-semibold ${darkMode && "text-black"}`}>
          {coin.name}
        </h2>
        <p className={`text-m ${darkMode && "text-black"}`}>
          Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
        </p>
        <div className="w-full mt-6">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
      <button className="mt-6 px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:text-orange-400  ease-in-out duration-200 border border-white">
        Add to Watchlist
      </button>
    </div>
  );
}
