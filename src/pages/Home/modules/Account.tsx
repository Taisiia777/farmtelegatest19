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
         <img src={imgSrc} alt="foto" />
         <strong className="textShadow">{nickname}</strong>
      </div>
   );
};

export default Account;
