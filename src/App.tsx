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

const router = createBrowserRouter(
   createRoutesFromElements(
      <>
         <Route path={Routes.HOME} element={<Home />} />
         <Route path={Routes.STATS} element={<Stats />} />
         <Route path={Routes.PEOPLE} element={<People />} />
         <Route path={Routes.INVITE} element={<Invite />} />
      </>
   )
);

tg.expand();
tg.ready();
tg.enableClosingConfirmation();

const App = () => {
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

      let ts: number | undefined;
      const onTouchStart = (e: TouchEvent) => {
         ts = e.touches[0].clientY;
      };

      const scrollableEl = document.getElementById("app");
      if (scrollableEl) {
         scrollableEl.style.overflowY = "auto";
         scrollableEl.style.height = "100vh";
      }

      const onTouchMove = (e: TouchEvent) => {
         if (scrollableEl) {
            const scroll = scrollableEl.scrollTop;
            const te = e.changedTouches[0].clientY;
            if (scroll <= 0 && ts! < te) {
               e.preventDefault();
            }
         } else {
            e.preventDefault();
         }
      };
      document.documentElement.addEventListener("touchstart", onTouchStart, {
         passive: false,
      });
      document.documentElement.addEventListener("touchmove", onTouchMove, {
         passive: false,
      });
   }, []);

   return <RouterProvider router={router} />;
};

export default App;
