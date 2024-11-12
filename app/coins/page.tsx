"use client"
import React, { useEffect, useState } from "react";
const Page = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  useEffect(() => {
    fetch("/api/coins", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log('data: ', data)
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // setError(err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-400 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
    role="status">
    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
  </div>;
  }
//   if (error: any) {
//     return <p>Error fetching coins: {error.message}</p>;
//   }
  return (
    <div>
      <h1>Coins</h1>
      <ul>
         {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {coins.map((coin: any) => (
          <li key={coin.id}>{coin.name} {" "} {"$" + coin.value}</li>
        ))}
      </ul>
    </div>
  );
};
export default Page;