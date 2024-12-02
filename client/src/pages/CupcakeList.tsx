import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type AccessoryArray = {
  id: number;
  name: string;
  slug: string;
}[];

type CupcakeArray = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}[];

function CupcakeList() {
  const cupcakes = useLoaderData() as CupcakeArray;

  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        if (!response.ok) {
          throw new Error("Échec de la récupération des accessoires");
        }
        const data = await response.json();
        console.info("Accessoires récupérés:", data);
        setAccessories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des accessoires:", error);
      }
    };
    fetchAccessories();
  }, []);

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectedAccessory)
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.name}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.length === 0 ? (
          <p>Aucun cupcake trouvé pour cet accessoire</p>
        ) : (
          filteredCupcakes.map((cupcake) => (
            <li key={cupcake.id} className="cupcake-item">
              <Cupcake data={cupcake} />
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default CupcakeList;
