import classNames from "classnames/bind";
import styles from "./FriendOrSpecialBlock.module.scss";
import Button from "../Button/Button";
const cn = classNames.bind(styles);

interface IFreindOrSpecialBlockProps {
   imgSrc: string;
   earning: string;
   link: string;
   title: string;
}

const FreindOrSpecialBlock = ({
   imgSrc,
   earning,
   link,
   title,
}: IFreindOrSpecialBlockProps) => {
   return (
      <div className={cn("block")}>
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
                  <div className={cn("block__earning")}>
                     <span className="textShadow_center">+{earning}</span>
                     <img src="img/coins/BTC.svg" />
                  </div>
               </div>
            </div>
            <div className={cn("block__link")}>
               <Button
                  className="textShadow_center"
                  onClick={() => window.open(link)}>
                  GO TO
               </Button>
            </div>
         </div>
      </div>
   );
};

export default FreindOrSpecialBlock;
