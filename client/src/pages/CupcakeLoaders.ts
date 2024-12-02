import { json } from "react-router-dom";

export const cupcakeLoader = async () => {
  try {
    const response = await fetch("http://localhost:3310/api/cupcakes");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des cupcakes");
    }
    const cupcakes = await response.json();
    return json(cupcakes);
  } catch (error) {
    console.error(error);
    throw new Response("Impossible de charger les données.", { status: 500 });
  }
};
