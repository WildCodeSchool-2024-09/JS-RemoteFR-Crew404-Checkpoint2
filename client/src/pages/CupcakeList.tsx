import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

interface CupcakeListData {
  id: number;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}
interface AccessoryArray {
  id: number;
  name: string;
  slug: string;
}

function CupcakeList() {
  const cupcakes = useLoaderData() as CupcakeListData[];

  const [accessoryList, setAccessoryList] = useState<AccessoryArray[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setAccessoryList(data))
      .then(console.info);
  }, []);

  // Step 5: create filter state
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(
    null,
  );

  // Filtrage des cupcakes en fonction de l'accessoire sélectionné
  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectedAccessory)
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory || ""}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {accessoryList.map((accessory) => (
              <option key={accessory.id} value={accessory.slug}>
                {accessory.name}
              </option>
            ))}
          </select>
          {/* Step 4: add an option for each accessory */}
        </label>
      </form>
      <ul className="cupcake-list">
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
