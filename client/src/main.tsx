
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import CupcakeList from "./pages/CupcakeList";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";



async function fetchCupcakes() {
  const response = await fetch("http://localhost:3310/api/cupcakes");
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des cupcakes");
  }
  return response.json();
}


const loader = async () => {
  const cupcakes = await fetchCupcakes();
  console.info(cupcakes);  
  return { cupcakes };
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
        loader: loader,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
