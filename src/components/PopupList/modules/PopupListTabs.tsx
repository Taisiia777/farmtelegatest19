import classNames from "classnames/bind";
import styles from "../PopupList.module.scss";
const cn = classNames.bind(styles);

interface ITabsProps {
   labels: string[];
   activeTab: string;
   onTabChange: (label: string) => void;
}

const PopupListTabs = ({ labels, activeTab, onTabChange }: ITabsProps) => {
   return (
      <div className={cn("tabs")}>
         <ul className={cn("tabs__list")}>
            {labels.map((label) => (
               <li
                  className={cn("tabs__item", activeTab === label && "_active")}
                  onClick={() => onTabChange(label)}>
                  <span>{label}</span>
                  <img src="img/global/border-block/label.svg" alt={label} />
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PopupListTabs;
