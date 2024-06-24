import classNames from "classnames/bind";
import styles from "../Stats.module.scss";
const cn = classNames.bind(styles);

interface BorderBlockProps {
   label: string;
   number: string;
   imgSrc: string;
}

const BorderBlock = ({ label, number, imgSrc }: BorderBlockProps) => {
   return (
      <div className={cn("borderBlock")}>
         {/* Label в бордере */}
         <img
            src="img/global/popup-body.svg"
            className={cn("borderBlock__border")}
            alt={label}
         />

         {/* Надпись на popup-border */}
         <strong className={cn("borderBlock__label")}>{label}</strong>

         <div className={cn("borderBlock__body")}>
            <strong className={`${cn("borderBlock__number")}` + " textShadow"}>
               {number}
            </strong>
            <img src={imgSrc} alt={label} />
         </div>
      </div>
   );
};

export default BorderBlock;
