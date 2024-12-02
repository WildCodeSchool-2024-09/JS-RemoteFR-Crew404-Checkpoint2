interface CupcakeData {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}

interface CupcakeProps {
  data: CupcakeData;
}

const Cupcake = ({ data }: CupcakeProps) => {
  return (
    <div>
      <h3>{data.name}</h3>
      <p>Accessoire : {data.accessory}</p>
      <p>Couleur 1 : {data.color1}</p>
      <p>Couleur 2 : {data.color2}</p>
      <p>Couleur 3 : {data.color3}</p>
    </div>
  );
};

export default Cupcake;
