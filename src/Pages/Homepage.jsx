import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Homepage({ darkMode }) {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-LgRgcg7QWqmKm27EY2Y7S7xD",
        },
      };

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
          options
        );
        const data = await response.json();
        setCryptos(data);
      } catch (err) {
        setError("Failed to fetch cryptocurrencies.");
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchCryptos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>{error}</div>
      </div>
    );
  }

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="container flex flex-col items-center justify-center mx-auto p-4 max-w-5xl min-h-[calc(100vh-72px)] px-10">
      <input
        type="text"
        placeholder="Search Coins"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="mt-8 md:w-1/2 lg:w-1/3 p-3 mb-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300"
      />
      {filteredCryptos.length === 0 ? (
        <p className="text-xl font-semibold text-purple-500">Nothing found</p>
      ) : (
        <ul
          className={`grid gap-12 ${
            filteredCryptos.length === 1
              ? "grid-cols-1 place-items-center"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredCryptos.map((crypto) => (
            <li
              key={crypto.id}
              className={
                !darkMode
                  ? "hover-effect border border-black p-4 rounded-lg shadow-lg"
                  : "hover-effect border-2 border-white p-4 rounded-lg"
              }
            >
              <Link to={`/coin/${crypto.id}`}>
                <div className="flex items-center">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-20 h-20 mr-4"
                  />
                  <div>
                    <h2
                      className={`${
                        darkMode && "text-white"
                      } text-xl font-semibold`}
                    >
                      {crypto.name}
                    </h2>
                    <p className={`${darkMode && "text-white"} text-gray-600`}>
                      ${crypto.current_price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
