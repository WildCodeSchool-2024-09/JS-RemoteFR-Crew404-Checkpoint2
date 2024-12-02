// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  type LoaderFunction,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

/* ************************************************************************* */

import App from "./App";

import CupcakeDetails from "./pages/CupcakeDetails";
import CupcakeList from "./pages/CupcakeList";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";

const cupcakesLoader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:3310/api/cupcakes");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des cupcakes");
  }
  const cupcakes = await response.json();
  console.info("Cupcakes :", cupcakes);
  return cupcakes;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructions",
        element: <Instructions />,
      },
      {
        path: "/cupcakes",
        element: <CupcakeList />,
        // Step 1: load data here
        loader: cupcakesLoader,
      },
      {
        path: "/cupcakes/:id",
        element: <CupcakeDetails />,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:3310/api/cupcakes/${params.id}`,
          );
          if (!response.ok) {
            throw new Error("Cupcake non trouvé");
          }
          return response.json();
        },
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
