import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type CupcakeType = {
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};
function CupcakeDetails() {
  // J'ai destructuré id de useParams();
  const { id } = useParams();
  const [cupcake, setCupcake] = useState({} as CupcakeType);

  useEffect(() => {
    fetch(`http://localhost:3310/api/cupcakes/${id}`)
      .then((result) => result.json())
      .then((data) => setCupcake(data))
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <section>
      <h1>Je suis le cupcake : `{cupcake.name}`</h1>
      <ul>
        <li>{cupcake.color1}</li>
        <li>{cupcake.color2}</li>
        <li>{cupcake.color3}</li>
        <li>{cupcake.accessory}</li>
      </ul>
      <Cupcake data={cupcake} />
    </section>
  );
}

export default CupcakeDetails;
