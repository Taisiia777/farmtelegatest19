import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";

import { tg } from "./constants/app";
import Invite from "./pages/Invite/Invite";

import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";
import People from "./pages/People/People";
import { Routes } from "./routes/routes";

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
   return <RouterProvider router={router} />;
};

export default App;
