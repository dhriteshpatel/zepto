"use client";
import { useEffect, useState } from "react";
import ChipsInput, { Chip } from "./components/ChipsInput/ChipsInput";
import Loader from "./components/Loader/loader";
import ErrorComponent from "./components/Error/Error";

export default function Home() {
  const [initialItems, setInitialItems] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getRandomChipData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/dhriteshpatel/data/main/zepto/data.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for the error boundary to catch
    }
  };

  useEffect(() => {
    getRandomChipData()
      .then((data) => {
        setInitialItems(data);
        setFilteredItems([...data]);
        setLoading(false); // Set loading to false when data is fetched successfully
      })
      .catch((error) => {
        setError("Error fetching data. Please try again."); // Set error message
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <div className="bg-light">
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorComponent message={error} />
      ) : (
        <div className="flex flex-col items-center justify-center m-2">
          <h6 className="font-bold mb-4 text-blue-500">
            User selecting Mechanism
          </h6>
          <ChipsInput
            initialItemsprop={initialItems}
            filteredItemsprop={filteredItems}
          />
        </div>
      )}
    </div>
  );
}
