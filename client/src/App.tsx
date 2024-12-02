import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import CupcakeList from "./pages/CupcakeList";
import { cupcakeLoader } from "./pages/CupcakeLoaders";
import Home from "./pages/Home";

function AppLayout() {
  return (
    <>
      <NavBar /> {/* Navigation toujours visible */}
      <main className="main-container">
        <Outlet /> {/* Les pages enfants s'affichent ici */}
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />, // Page d'accueil
      },
      {
        path: "/cupcakes",
        element: <CupcakeList />, // Liste des cupcakes
        loader: cupcakeLoader, // Chargement des données pour la liste
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
