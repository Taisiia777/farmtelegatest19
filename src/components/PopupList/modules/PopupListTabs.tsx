import classNames from "classnames/bind";
import styles from "../PopupList.module.scss";
const cn = classNames.bind(styles);

interface ITabsProps {
   labels: string[];
   activeTab: string;
   onTabChange: (label: string) => void;
   labelClassName?: string;
}

const PopupListTabs = ({
   labels,
   activeTab,
   onTabChange,
   labelClassName,
}: ITabsProps) => {
   console.log(labelClassName)
   return (
      <div className={cn("tabs")} id="tabs">
         <ul className={cn("tabs__list")}>
            {labels.map((label) => (
               <li
                  className={cn("tabs__item", activeTab === label && "_active")}
                  onClick={() => onTabChange(label)}
                  key={label}>
<span style={{ height: labels.length === 3 ? '20%' : '73%', top: labels.length === 3 ? '40%' : '0', fontSize: labels.length === 3 ? '15px' : '20px' }}>{label}</span>
<img src="img/global/border-block/label.svg" alt={label} />
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PopupListTabs;
