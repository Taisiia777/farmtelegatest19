import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface IAccountProps {
   nickname: string;
   imgSrc: string;
}

const Account = ({ nickname, imgSrc }: IAccountProps) => {
   return (
      <div className={cn("account")}>
         <div className={cn("account__info")}>
            <img src={imgSrc} className={cn("account__avatar")} alt="foto" />
            <strong className="textShadow">{nickname}</strong>
         </div>

         {/* Border */}
         <img
            src="img/pages/home/account/board.svg"
            className={cn("account__border")}
            alt=""
         />
      </div>
   );
};

export default Account;
