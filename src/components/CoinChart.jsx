import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
const API_URL = import.meta.env.VITE_COIN_API_URL;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
);

function CoinChart({ coinId }) {
  const [coinChartData, setCoinChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoinChartData() {
      try {
        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
        );
        if (!res.ok) throw new Error("Error with data fetching");
        const data = await res.json();
        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));
        setCoinChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoinChartData();
  }, [coinId]);

  if (loading) return <p>Loading Chart...</p>;

  return (
    !loading && (
      <div style={{ marginTop: "30px" }}>
        <Line
          data={coinChartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { mode: "index", intersect: false },
            },
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 7,
                },
              },
              y: {
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                },
              },
            },
          }}
        />
      </div>
    )
  );
}

export default CoinChart;
