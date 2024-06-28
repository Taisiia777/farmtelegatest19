import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store";
import { loadingToggle } from "../../store/reducers/preloader";

import styles from "./Preloader.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);

const Preloader = () => {
   const dispatch = useAppDispatch();
   const isLodaing = useAppSelector((state) => state.preloader.isLodaing);

   useEffect(() => {
      setTimeout(() => {
         dispatch(loadingToggle(false));
      }, 2000);
   });

   return (
      <>
         {isLodaing && (
            <div className={cn("wrap")}>
               <div className={cn("preloader")}></div>
            </div>
         )}
         <Outlet />
      </>
   );
};

export default Preloader;
