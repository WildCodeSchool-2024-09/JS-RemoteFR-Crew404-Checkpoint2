import { useLoaderData } from "react-router-dom";
import Cupcake from "./components/Cupcake";

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
