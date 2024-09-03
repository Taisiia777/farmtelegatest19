


import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
 } from "react-router-dom";
 import { useEffect } from "react";
 
 import { tg } from "./constants/app";
 import { Routes } from "./routes/routes";
 import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

 import Home from "./pages/Home/Home";
 import Stats from "./pages/Stats/Stats";
 import People from "./pages/People/People";
 import Invite from "./pages/Invite/Invite";
 import Preloader from "./components/Preloader/Preloader";
 
 const RedirectToTelegram = () => {
   useEffect(() => {
     const isTelegramWebApp = () => {
       return window.Telegram.WebApp.initData || false;
     };
 
     const redirectToTelegram = () => {
       const telegramUrl = 'https://t.me/Coin_Farming_bot';
       window.location.href = telegramUrl;
     };
 
     if (!isTelegramWebApp()) {
       redirectToTelegram();
     }
   }, []);
 
   return null; // Компонент не рендерит ничего
 };
 
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
   const queryClient = new QueryClient();

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
          // Регулярное повторение вызова expand для поддержания приложения развернутым
          const intervalId = setInterval(() => {
            tg.expand();
          }, 1000); // Вызываем tg.expand() каждую секунду
     
          return () => {
            clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
          };
   }, []);
 
   return (
     <>
    <QueryClientProvider client={queryClient}>
      <RedirectToTelegram />
      <RouterProvider router={router} />
    </QueryClientProvider>
      
     </>
   );
 };
 
 export default App;
 

