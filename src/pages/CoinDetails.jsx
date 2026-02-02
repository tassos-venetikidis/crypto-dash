import { useState, useEffect } from "react";
import { useParams } from "react-router";
const API_URL = import.meta.env.VITE_COIN_API_URL;

function CoinDetails() {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchCoinDetails() {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setCoin(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoinDetails();
  }, [id]);
  return (
    <>
      <div>Coin Details</div>
      <p>{loading ? "Loading..." : error ? error : coin.name}</p>
    </>
  );
}

export default CoinDetails;
