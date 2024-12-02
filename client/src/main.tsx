import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { type LoaderFunction, json } from "react-router-dom";

import App from "./App";
import CupcakeList from "./pages/CupcakeList";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";

const cupcakesLoader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:3310/api/cupcakes");
  if (!response.ok) {
    throw new Error("Échec de la récupération des cupcakes");
  }
  const data = await response.json();
  return json(data);
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
        loader: cupcakesLoader,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Votre document HTML doit contenir un <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
