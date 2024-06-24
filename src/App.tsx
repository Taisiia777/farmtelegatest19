import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";

import { tg } from "./constants/app";
import { useEffect } from "react";

const router = createBrowserRouter(
   createRoutesFromElements(
      <>
         <Route path="/" element={<Home />} />
         <Route path="/stats" element={<Stats />} />
      </>
   )
);

tg.expand();
tg.ready();
tg.enableClosingConfirmation();

const App = () => {
   useEffect(() => {
      window.addEventListener("resize", () => console.log(window.innerWidth));
   }, []);
   return <RouterProvider router={router} />;
};

export default App;
