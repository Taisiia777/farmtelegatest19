import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { tg } from "./constants/app";

const router = createBrowserRouter(
   createRoutesFromElements(<Route path="/" element={<Home />}></Route>)
);

tg.expand();
tg.ready();
tg.enableClosingConfirmation();

const App = () => {
   return <RouterProvider router={router} />;
};

export default App;
