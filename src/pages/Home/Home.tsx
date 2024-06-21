import classNames from "classnames/bind";
import styles from "./Home.module.scss";
const cn = classNames.bind(styles);

const Home = () => {
   return <div className={cn("wrap")}>Hello world!</div>;
};

export default Home;
