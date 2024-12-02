import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type CupcakeData = {
  id: number;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData() as CupcakeData[]; // Récupère les données depuis le loader.
  console.info(cupcakes);

  // Step 3: get all accessories
  const accessories = Array.from(
    new Set(cupcakes.map((cupcake) => cupcake.accessory)),
  );

  // Step 5: create filter state
  const [filter, setFilter] = useState<string>("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value); // Step 5: use a controlled component for select
  };

  const filteredCupcakes = filter
    ? cupcakes.filter((cupcake) => cupcake.accessory === filter) // Step 5: filter cupcakes before repeating
    : cupcakes;

  return (
    <>
      <h1>My Cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select" onChange={handleFilterChange}>
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
