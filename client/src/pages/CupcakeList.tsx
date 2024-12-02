import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";
import type { accessoriesTypeAPI } from "../components/accessoriesTypeAPI";
import type { cupcakeTypeAPI } from "../components/cupcakeTypeAPI";

// Définir le type pour les cupcakes
type CupcakeType = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

function CupcakeList() {
  // États pour stocker les données et le statut de chargement
  const [cupcakes, setCupcakes] = useState<cupcakeTypeAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessories, setAccessories] = useState<accessoriesTypeAPI[]>([]);
  const [selectAccessory, setSelectAccessory] = useState<string>("");

  useEffect(() => {
    const dataCupcakeAPI = async (): Promise<void> => {
      const response = await fetch("http://localhost:3310/api/cupcakes");
      const data: CupcakeType[] = await response.json();
      setCupcakes(data);
      setLoading(false);
    };

    dataCupcakeAPI();
  }, []);

  useEffect(() => {
    const dataAccessoriesAPI = async (): Promise<void> => {
      const response = await fetch("http://localhost:3310/api/accessories");
      const data: accessoriesTypeAPI[] = await response.json();
      setAccessories(data);
      setLoading(false);
    };

    dataAccessoriesAPI();
  }, []);

  if (loading) {
    return <p>Loading cupcakes...</p>;
  }

  // Filtrer les cupcakes par accessoire sélectionné
  const filterCupcakes = selectAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory === selectAccessory)
    : cupcakes;

  // Gestion du changement de sélection des accessoire
  const AccessoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectAccessory(event.target.value);
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectAccessory}
            onChange={AccessoryChange}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.slug}>
                {accessory.name}
              </option>
            ))}
            {/*[...new Set(cupcakes.map((cupcake) => cupcake.accessory))].map(
              (accessory, index) => (
                <option key={index} value={accessory}>
                  {accessory}
                </option>
              )
            )*/}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/*Test Affichage des cupcakes récupérés */}
        {filterCupcakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))}

        {/*cupcakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))*/}
      </ul>
    </>
  );
}

export default CupcakeList;
