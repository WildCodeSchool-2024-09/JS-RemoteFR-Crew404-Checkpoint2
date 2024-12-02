import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

type AccessoryArray = { id: number; name: string; slug: string }[];

/* ************************************************************************* */
const sampleCupcakes = [
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  },
];

type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData() as CupcakeArray;
  console.info(cupcakes);

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const res = await fetch("http://localhost:3310/api/accessories");
        const data = (await res.json()) as AccessoryArray;
        console.info(data);
        setAccessories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccessories();
  }, []);

  // Step 5: create filter state

  // const [filter, setFilter] = useState("");
  // const handleChange = (event) => {
  //   setFilter(event.target.value);
  // };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select">
            <option value="">---</option>
            {accessories.map((accessories) => (
              <option key={accessories.id}>{accessories.name}</option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {cupcakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))}

        {/* tentative pour filter, ça a misérablement échoué */}
        {/* {cupcakes
          .filter((cupcake) => {
            return cupcake.name === filter;
          })
          .map((cupcake) => (
            <li className="cupcake-item" key={cupcake.id}>
              <Cupcake data={cupcake} />
            </li>
          ))} */}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
