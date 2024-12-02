interface CupcakeProps {
  data: {
    id: number;
    name: string;
    accessory: string;
    color1: string;
    color2: string;
    color3: string;
    imageUrl: string;
  };
}

const Cupcake = ({ data }: CupcakeProps) => {
  return (
    <div>
      <h3>{data.name}</h3>
      <img src={data.imageUrl} alt={data.name} width={200} height={200} />{" "}
      <p>Accessoire : {data.accessory}</p>
      <p>Couleur 1 : {data.color1}</p>
      <p>Couleur 2 : {data.color2}</p>
      <p>Couleur 3 : {data.color3}</p>
    </div>
  );
};

export default Cupcake;
