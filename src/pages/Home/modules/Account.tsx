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
            {/* Аватар */}
            {/* <div className={cn("account__avatar")}>
               <img
                  src="img/pages/home/avatar-btn.svg"
                  className={cn("account__border")}
               />
               <img src={imgSrc} className={cn("account__avatar-person")} alt="foto" />
            </div> */}
            <strong className="textShadow">{nickname}</strong>
         </div>
      </div>
   );
};

export default Account;
