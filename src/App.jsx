import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    async function fetchCoins() {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, [limit]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            coins={coins}
            loading={loading}
            error={error}
            limit={limit}
            filter={filter}
            sortBy={sortBy}
            setLimit={setLimit}
            setFilter={setFilter}
            setSortBy={setSortBy}
          />
        }
      />
    </Routes>
  );
}

export default App;
