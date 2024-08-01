import classNames from "classnames/bind";
import styles from "./GreenBg.module.scss";
const cn = classNames.bind(styles);

const GreenBg = () => {
   return <div className={cn("greenBg")}></div>;
};

export default GreenBg;
