import { useEffect, useState } from "react";
import Cupcake from "./components/Cupcake";

interface CupcakeData {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}

const CupcakeList = () => {
  const [cupcakes, setCupcakes] = useState<CupcakeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/cupcakes");

        if (!response.ok) {
          throw new Error("Échec de la récupération des cupcakes");
        }

        const data = await response.json();
        setCupcakes(data);
        setLoading(false);
      } catch (error) {
        setError("Erreur de récupération des cupcakes");
        setLoading(false);
      }
    };

    fetchCupcakes();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Liste des Cupcakes</h1>
      <ul>
        {cupcakes.map((cupcake) => (
          <li key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CupcakeList;
