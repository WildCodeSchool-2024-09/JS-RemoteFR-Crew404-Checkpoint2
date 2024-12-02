import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "./components/Cupcake";

// Type pour les accessoires
type AccessoryArray = { id: number; name: string; slug: string }[];

interface CupcakeData {
  id: number;
  name: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
}

const CupcakeList = () => {
  const cupcakes = useLoaderData() as CupcakeData[];
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
  }, []); //

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectedAccessory)
    : cupcakes;

  return (
    <div>
      <h1>Liste des Cupcakes</h1>

      <div>
        <label htmlFor="accessory-select">Sélectionner un accessoire :</label>
        <select
          id="accessory-select"
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
      </div>

      <ul>
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CupcakeList;
