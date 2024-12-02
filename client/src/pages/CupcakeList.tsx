import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

type CupcakeData = {
  id: number;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};
type CupcakeArray = CupcakeData[];

function CupcakeList() {
  // Step 1: get all cupcakes

  const [cupcakes, setCupcakes] = useState<CupcakeArray>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/cupcakes");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des cupcakes");
        }
        const cupcakesData = await response.json();
        setCupcakes(cupcakesData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchCupcakes();
  }, []);

  // Step 3: get all accessories
  const accessories = Array.from(
    new Set(cupcakes.map((cupcake) => cupcake.accessory)),
  );

  // Step 5: create filter state
  const filteredCupcakes = filter
    ? cupcakes.filter((cupcake) => cupcake.accessory === filter)
    : cupcakes;

  if (loading) {
    return <p>Chargement des cupcakes...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }
  return (
    <>
      <h1>My Cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory} value={accessory}>
                {accessory}
              </option>
            ))}
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* Step 5: filter cupcakes before repeating */}
      </ul>
    </>
  );
}

export default CupcakeList;
