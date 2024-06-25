import classNames from "classnames/bind";
import styles from "../../Home.module.scss";
const cn = classNames.bind(styles);

const Boosts = () => {
   return <div className={cn("boosts")}>
      <img src="img/boosts/mill-shadow.svg" className={cn('boosts__mill')} alt="boost" />
      <img src="img/boosts/drone.svg" className={cn('boosts__drone')} alt="boost" />
      <img src="img/boosts/mini-car-shadow.svg" className={cn('boosts__mini-car')} alt="boost" />
      <img src="img/boosts/car-2-shadow.svg" className={cn('boosts__car-2')} alt="boost" />
      <img src="img/boosts/car-3-shadow.svg" className={cn('boosts__car-3')} alt="boost" />
   </div>;
};

export default Boosts;
