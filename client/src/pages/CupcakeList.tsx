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

function CupcakeList() {
  const cupcakes = useLoaderData() as CupcakeListData[];

  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select">
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* Step 5: filter cupcakes before repeating */}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
