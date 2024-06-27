import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";

import { tg } from "./constants/app";
import { Routes } from "./routes/routes";

import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";
import People from "./pages/People/People";
import Invite from "./pages/Invite/Invite";
import Preloader from "./components/Preloader/Preloader";

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route element={<Preloader />}>
         <Route path={Routes.HOME} element={<Home />} />
         <Route path={Routes.STATS} element={<Stats />} />
         <Route path={Routes.PEOPLE} element={<People />} />
         <Route path={Routes.INVITE} element={<Invite />} />
      </Route>
   )
);

tg.expand();
tg.ready();
tg.enableClosingConfirmation();

const App = () => {
   // Чтобы tg не закрывался когда делаем touchmove вниз
   useEffect(() => {
      const overflow = 100;
      document.body.style.overflowY = "hidden";
      document.body.style.marginTop = `${overflow}px`;
      document.body.style.height = window.innerHeight + overflow + "px";
      document.body.style.paddingBottom = `${overflow}px`;
      document.body.style.minHeight = "100vh";

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "auto";

      window.scrollTo(0, overflow);
   }, []);

   return <RouterProvider router={router} />;
};

export default App;
