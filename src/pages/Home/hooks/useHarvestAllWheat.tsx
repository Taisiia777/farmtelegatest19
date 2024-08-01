import { useCallback } from "react";
import { useAppDispatch } from "../../../store";
import { pickWheat } from "../../../store/reducers/growthStages";
import classNames from "classnames/bind";
import styles from "../modules/FarmBlocks/FarmBlocks.module.scss";

const cn = classNames.bind(styles);

export function useHarvestAllWheat() {
  const dispatch = useAppDispatch();

  

  const harvestAllWheat = useCallback(async () => {
    const farmBlocks = document.querySelectorAll("#growthStageImg");
    const newHarvestedBlocks = [];

    farmBlocks.forEach((block) => {
      const farmBlockStage = block.getAttribute("data-stage");

      if (farmBlockStage !== "first") {
        const growthStageImgID = block.getAttribute("data-id");
        const moneyAnimation = block.nextElementSibling;

        if (moneyAnimation) {
          moneyAnimation.classList.add(cn("_anim"));
          setTimeout(() => {
            moneyAnimation.classList.remove(cn("_anim"));
          }, 500);
        }

        if (growthStageImgID) {
          newHarvestedBlocks.push({ id: +growthStageImgID, stage: farmBlockStage });
          dispatch(pickWheat({ id: +growthStageImgID }));
        }
      }
    });

    if (newHarvestedBlocks.length > 0) {
      const harvestedCount = newHarvestedBlocks.length;
    
      // Генерация события "harvest" для пересчета earnings
      const event = new CustomEvent("harvest", { detail: harvestedCount });
      document.dispatchEvent(event);
    } else {
      console.log("No blocks harvested or user not available"); // Лог для отладки
    }
    
  }, [dispatch]);

  return harvestAllWheat;
}
