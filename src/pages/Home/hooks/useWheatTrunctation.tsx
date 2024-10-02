// import { useEffect, useState } from "react";
// import { useAppDispatch } from "../../../store";
// import { pickWheat } from "../../../store/reducers/growthStages";

// import classNames from "classnames/bind";
// import styles from "../modules/FarmBlocks/FarmBlocks.module.scss";
// import { TGrowthStage } from "../../../types/globalTypes";
// const cn = classNames.bind(styles);

// export default function useWheatTrunctaion() {
//   const dispatch = useAppDispatch();
//   const [harvestedBlocks, setHarvestedBlocks] = useState<{
//     id: number;
//     stage: TGrowthStage;
//   }[]>([]);

//   function detectTrunctation(e: TouchEvent) {
//     const xPos = e.touches[0].pageX;
//     const yPos = e.touches[0].pageY - 100;
//     const target = document.elementFromPoint(xPos, yPos);

//     if (target && target.closest("#growthStageImg")) {
//       const farmBlockStage = target.getAttribute("data-stage") as TGrowthStage;

//       if (farmBlockStage !== "first") {
//         const growthStageImgID = target.getAttribute("data-id");
//         const moneyAnimation = target.nextElementSibling;

//         if (moneyAnimation) {
//           moneyAnimation.classList.add(cn("_anim"));
//           setTimeout(() => {
//             moneyAnimation.classList.remove(cn("_anim"));
//           }, 500);
//         }

//         if (
//           growthStageImgID &&
//           !harvestedBlocks.some((block) => block.id === +growthStageImgID)
//         ) {
//           setHarvestedBlocks((prev) => [
//             ...prev,
//             { id: +growthStageImgID, stage: farmBlockStage },
//           ]);
//           dispatch(pickWheat({ id: +growthStageImgID }));
//         }
//       }
//     }
//   }

 
//   useEffect(() => {
//     const handleTouchEnd = () => {
//       console.log("Touch end detected"); // Лог для проверки события конца тача
//       const harvestedCount = harvestedBlocks.length;
  
//       if (harvestedCount > 0) {
//         // Генерация события "harvest" для пересчета earnings
//         const event = new CustomEvent("harvest", { detail: harvestedCount });
//         document.dispatchEvent(event);
  
//         // Очистка harvestedBlocks после срезания
//         setHarvestedBlocks([]);
//       }
//     };
  
//     document.addEventListener("touchmove", detectTrunctation);
//     document.addEventListener("touchend", handleTouchEnd);
  
//     return () => {
//       document.removeEventListener("touchmove", detectTrunctation);
//       document.removeEventListener("touchend", handleTouchEnd);
//     };
//   }, [harvestedBlocks]); // Добавляем зависимости
  
//   return null; // Хук не рендерит ничего, поэтому возвращаем null
// }




import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store";
import { pickWheat } from "../../../store/reducers/growthStages";

import classNames from "classnames/bind";
import styles from "../modules/FarmBlocks/FarmBlocks.module.scss";
import { TGrowthStage } from "../../../types/globalTypes";
const cn = classNames.bind(styles);

export default function useWheatTrunctaion() {
  const dispatch = useAppDispatch();
  const [harvestedBlocks, setHarvestedBlocks] = useState<{
    id: number;
    stage: TGrowthStage;
  }[]>([]);

  function detectTrunctation(e: TouchEvent) {
    const xPos = e.touches[0].pageX;
    const yPos = e.touches[0].pageY - 100;
    const target = document.elementFromPoint(xPos, yPos);

    if (target && target.closest("#growthStageImg")) {
      const farmBlockStage = target.getAttribute("data-stage") as TGrowthStage;

      if (farmBlockStage !== "first") {
        const growthStageImgID = target.getAttribute("data-id");
        const moneyAnimation = target.nextElementSibling;

        // if (moneyAnimation) {
        //   moneyAnimation.classList.add(cn("_anim"));
        //   setTimeout(() => {
        //     moneyAnimation.classList.remove(cn("_anim"));
        //   }, 500);
        // }
        if (moneyAnimation) {
          // Добавляем анимацию
          moneyAnimation.classList.add(cn("_anim"));
        
          // Воспроизводим звук
          const sound = new Audio('sounds/harvest.mp3');
          sound.play();
        
          // Удаляем анимацию через 500 мс
          setTimeout(() => {
            moneyAnimation.classList.remove(cn("_anim"));
          }, 500);
        
          // Останавливаем звук через 1 секунду
          setTimeout(() => {
            sound.pause();
            sound.currentTime = 0; // Возвращаем воспроизведение на начало
          }, 1000);
        }
        
        if (
          growthStageImgID &&
          !harvestedBlocks.some((block) => block.id === +growthStageImgID)
        ) {
          setHarvestedBlocks((prev) => [
            ...prev,
            { id: +growthStageImgID, stage: farmBlockStage },
          ]);
          dispatch(pickWheat({ id: +growthStageImgID }));
          window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }
      }
    }
  }

 
  useEffect(() => {
    const handleTouchEnd = () => {
      console.log("Touch end detected"); // Лог для проверки события конца тача
      const harvestedCount = harvestedBlocks.length;
  
      if (harvestedCount > 0) {
        // Генерация события "harvest" для пересчета earnings
        const event = new CustomEvent("harvest", { detail: harvestedCount });
        document.dispatchEvent(event);
  
        // Очистка harvestedBlocks после срезания
        setHarvestedBlocks([]);
      }
    };
  
    document.addEventListener("touchmove", detectTrunctation);
    document.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      document.removeEventListener("touchmove", detectTrunctation);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [harvestedBlocks]); // Добавляем зависимости
  
  return null; // Хук не рендерит ничего, поэтому возвращаем null
}
