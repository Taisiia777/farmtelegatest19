import classNames from "classnames/bind";
import styles from "../Home.module.scss";
const cn = classNames.bind(styles);

interface RainProps {
  total: number;
  current: number;
  onClick: () => void;
}

const Rain = ({ total, current, onClick }: RainProps) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className={cn("rain")} id="rain" onClick={onClick}>
    {/* Главная доска */}
    <img
       src="img/pages/home/rain/board.svg"
       className={cn("rain__board")}
       alt="rain board"
    />

    {/* Иконка энергии */}
    <img
       src="img/pages/home/rain/cloud.svg"
       className={cn("rain__icon")}
       alt="rain"
    />

    {/* Прогресс бар */}
    <div className={cn("rain__progressBarWrap")}>
       <div
          className={cn("rain__progressBar")}
          style={{ width: `${progressPercentage}%` }}
       ></div>
       <span>
          {current} / {total}
       </span>
    </div>
 </div>
  );
};

export default Rain;
