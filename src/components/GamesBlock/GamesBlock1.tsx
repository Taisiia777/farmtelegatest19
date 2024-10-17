


import classNames from "classnames/bind";
import styles from "./GamesBlock.module.scss";
import Button from "../Button/Button";
import { useAppDispatch } from "../../store";
import { openCombo } from "../../store/reducers/combo";
const cn = classNames.bind(styles);

interface IGamesBlockProps {
   imgSrc: string;
   title: string;
   buttonText: string;
}

const GamesBlock = ({
   imgSrc,
   title,
   buttonText
}: IGamesBlockProps) => {
  const dispatch = useAppDispatch();

  const handleWheelClick = () => {
    dispatch(openCombo());
 };
   return (
      <div className={cn("block")} style={{position: "absolute", top: "98%", left: "0", width: "100%", height: "126px",
         backgroundImage: `url("img/global/border-block/item.svg")`,
         backgroundSize: "contain",
         backgroundPosition: "center",
         backgroundRepeat: "no-repeat"
      }}>
         <div className={cn("block__inner")}>
            <div className={cn("block__left")}>
               <img
                  src={imgSrc}
                  className={cn("block__icon")}
                  alt="Telegramm"
               />
               <div className={cn("block__info")}>
                  <strong
                     className={`${cn("block__title")}` + " textShadow_center"}>
                     {title}
                  </strong>
               </div>
            </div>
            <div className={cn("block__link")}>
               <Button
                  className="textShadow_center"
                  onClick={handleWheelClick}>
                  {buttonText}
               </Button>
            </div>
         </div>
      </div>
   );
};

export default GamesBlock;