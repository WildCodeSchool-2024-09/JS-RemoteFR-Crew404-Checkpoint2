import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import.meta.env.VITE_API_URL

type CupcakeArray = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}[];

type AccessoryArray = { id: number; name: string; slug: string }[];

function CupcakeList() {
  // Étape 1 : obtenir tous les cupcakes
  const { cupcakes } = useLoaderData() as { cupcakes: CupcakeArray };

  // Étape 3 : obtenir tous les accessoires
  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [selectedAccessory, setSelectedAccessory] = useState("");

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then(response => response.json())
      .then(data => {
        setAccessories(data);
        console.info(data); // Pour vérifier les données dans la console
      })
      .catch(error => console.error("Erreur lors du chargement des accessoires", error));
  }, []);

  // Étape 5 : créer l'état de filtre
  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter(cupcake => cupcake.accessory_id === selectedAccessory)
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filtrer par{" "}
          <select
            id="cupcake-select"
            onChange={(e) => setSelectedAccessory(e.target.value)}
            value={selectedAccessory}
          >
            <option value="">---</option>
            {/* Étape 4 : ajouter une option pour chaque accessoire */}
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Étape 2 : répéter ce bloc pour chaque cupcake */}
        {filteredCupcakes.map(cupcake => (
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* fin du bloc */}
      </ul>
    </>
  );
}

export default CupcakeList;
