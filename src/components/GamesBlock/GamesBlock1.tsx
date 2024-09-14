


// import classNames from 'classnames/bind';
// import styles from './GamesBlock.module.scss';
// import Button from '../Button/Button';
// import { useState, useEffect } from 'react';
// import i18n from '../../i18n';

// const cn = classNames.bind(styles);

// interface IGamesBlockProps {
//   imgSrc: string;
//   title: string;
//   defaultButtonText: string;
// }

// const GamesBlock = ({
//   imgSrc,
//   title,
//   defaultButtonText,
// }: IGamesBlockProps) => {

//   const [buttonText, setButtonText] = useState(defaultButtonText);
//   setButtonText(defaultButtonText)


//   useEffect(() => {
//     const initData = window.Telegram.WebApp.initDataUnsafe;
//     const userLanguage = initData.user?.language_code || 'en'; // Получаем язык пользователя
    
//     if (['en', 'ru', 'uk'].includes(userLanguage)) { // Добавьте другие поддерживаемые языки
//       i18n.changeLanguage(userLanguage);
//     } else {
//       i18n.changeLanguage('en'); // Язык по умолчанию, если язык пользователя не поддерживается
//     }
//     if (userLanguage !== 'en') {

//     document.querySelectorAll('.textMenu').forEach(element => {
//       if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//         element.style.fontSize = '14px';
//         element.style.fontWeight = '700';
//       }
//     });
//     document.querySelectorAll('.textMenu2').forEach(element => {
//       if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//         element.style.fontSize = '18px';
//         element.style.fontWeight = '700';
//       }
//     });
//     document.querySelectorAll('.textMenu1').forEach(element => {
//        if (element instanceof HTMLElement) { // Проверяем, что элемент является HTMLElement
//          element.style.fontSize = '13px';
//          element.style.fontWeight = '700';
//        }
//      });
//     }
//   }, []);


  
//   const handleButtonClick = async () => {
   
//   };



//   return (
//     <div className={cn("block")}>
//       <div className={cn("block__inner")}>
//         <div className={cn("block__left")}>
//           <img
//             src={imgSrc}
//             className={cn("block__icon")}
//             alt={title}
//           />
//           <div className={cn("block__info")}>
//             <strong
//               className={`${cn("block__title")}` + " textShadow_center"}>
//               {title}
//             </strong>

//           </div>
//         </div>
//         <div className={cn("block__link")}>

//             <Button
//               className="textShadow_center"
//               onClick={handleButtonClick}>
//               {buttonText}
//             </Button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default GamesBlock;


import classNames from "classnames/bind";
import styles from "./GamesBlock.module.scss";
import Button from "../Button/Button";
import { useAppDispatch } from "../../store";
import { openWheel } from "../../store/reducers/wheel";
const cn = classNames.bind(styles);

interface IGamesBlockProps {
   imgSrc: string;
   title: string;
   buttonText: string;
}

const GamesBlock = ({
   imgSrc,
   title,
   buttonText
}: IGamesBlockProps) => {
  const dispatch = useAppDispatch();

  const handleWheelClick = () => {
    dispatch(openWheel());
 };
   return (
      <div className={cn("block")} style={{position: "absolute", top: "100%", left: "0", width: "100%"}}>
         <div className={cn("block__inner")}>
            <div className={cn("block__left")}>
               <img
                  src={imgSrc}
                  className={cn("block__icon")}
                  alt="Telegramm"
               />
               <div className={cn("block__info")}>
                  <strong
                     className={`${cn("block__title")}` + " textShadow_center"}>
                     {title}
                  </strong>
               </div>
            </div>
            <div className={cn("block__link")}>
               <Button
                  className="textShadow_center"
                  onClick={handleWheelClick}>
                  {buttonText}
               </Button>
            </div>
         </div>
      </div>
   );
};

export default GamesBlock;