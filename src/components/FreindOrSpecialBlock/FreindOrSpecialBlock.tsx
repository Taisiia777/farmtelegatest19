// import classNames from "classnames/bind";
// import styles from "./FriendOrSpecialBlock.module.scss";
// import Button from "../Button/Button";
// import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
// const cn = classNames.bind(styles);

// interface IFreindOrSpecialBlockProps {
//    imgSrc: string;
//    earning: string;
//    link: string;
//    title: string;
// }

// const FreindOrSpecialBlock = ({
//    imgSrc,
//    earning,
//    link,
//    title,
// }: IFreindOrSpecialBlockProps) => {
//    return (
//       <div className={cn("block")}>
//          <div className={cn("block__inner")}>
//             <div className={cn("block__left")}>
//                <img
//                   src={imgSrc}
//                   className={cn("block__icon")}
//                   alt="Telegramm"
//                />
//                <div className={cn("block__info")}>
//                   <strong
//                      className={`${cn("block__title")}` + " textShadow_center"}>
//                      {title}
//                   </strong>
//                   <div className={cn("block__earning")}>
//                      <span className="textShadow_center">+{earning}</span>
//                      <CoinWhiteBg size="small" />
//                      {/* <img src="img/coins/BTC.svg" /> */}
//                   </div>
//                </div>
//             </div>
//             <div className={cn("block__link")}>
//                <Button
//                   className="textShadow_center"
//                   onClick={() => window.open(link)}>
//                   GO TO
//                </Button>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default FreindOrSpecialBlock;




import classNames from "classnames/bind";
import styles from "./FriendOrSpecialBlock.module.scss";
import Button from "../Button/Button";
import CoinWhiteBg from "../CoinWhiteBg/CoinWhiteBg";
import axios from "axios";
const cn = classNames.bind(styles);

interface IFreindOrSpecialBlockProps {
   imgSrc: string;
   earning: string;
   link: string;
   title: string;
}

const FreindOrSpecialBlock = ({
   imgSrc,
   earning,
   link,
   title,
}: IFreindOrSpecialBlockProps) => {
   const handleButtonClick = async () => {
      const userId = 114; // замените на актуальный ID пользователя
      let url = "https://coinfarm.club/reward/";

      switch (title) {
         case "JOIN GROUP":
            url = `https://coinfarm.club/reward/group/${userId}`;
            break;
         case "JOIN CHAT":
            url = `https://coinfarm.club/reward/chat/${userId}`;
            break;
         case "JOIN X":
            url = `https://coinfarm.club/reward/x/${userId}`;
            break;
         default:
            console.error("Unknown title:", title);
            return;
      }

      try {
         const response = await axios.post(url);
         console.log("Response:", response.data);
         window.open(link);
      } catch (error) {
         console.error("Error:", error);
      }
   };

   return (
      <div className={cn("block")}>
         <div className={cn("block__inner")}>
            <div className={cn("block__left")}>
               <img
                  src={imgSrc}
                  className={cn("block__icon")}
                  alt={title}
               />
               <div className={cn("block__info")}>
                  <strong
                     className={`${cn("block__title")}` + " textShadow_center"}>
                     {title}
                  </strong>
                  <div className={cn("block__earning")}>
                     <span className="textShadow_center">+{earning}</span>
                     <CoinWhiteBg size="small" />
                  </div>
               </div>
            </div>
            <div className={cn("block__link")}>
               <Button
                  className="textShadow_center"
                  onClick={handleButtonClick}>
                  GO TO
               </Button>
            </div>
         </div>
      </div>
   );
};

export default FreindOrSpecialBlock;
