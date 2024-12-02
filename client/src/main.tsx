// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { json } from "react-router-dom";
/* ************************************************************************* */

import App from "./App";

import CupcakeList from "./pages/CupcakeList";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
async function loadCupcakes() {
  const response = await fetch("https://localhost:3310/api/cupcake");
  if (!response.ok) {
    throw new Response("Erreur lors du chargement des cupcakes", {
      status: response.status,
    });
  }
  const cupcakes = await response.json();
  return json(cupcakes);
}
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
        loader: loadCupcakes,
        // Step 1: load data here
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root not");
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
