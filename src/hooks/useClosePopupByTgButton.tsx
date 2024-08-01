import { useEffect } from "react";

import { tg } from "../constants/app";

interface IClosePopupByTgButtonProps {
   isOpen: boolean;
   closePopup: () => void;
}

const useClosePopupByTgButton = ({
   isOpen,
   closePopup,
}: IClosePopupByTgButtonProps) => {
   useEffect(() => {
      if (isOpen) {
         tg.BackButton.show();
         tg.BackButton.onClick(() => {
            tg.BackButton.hide();
            closePopup();
         });
      }

      return () => tg.BackButton.hide();
   }, [isOpen, closePopup]);
};

export default useClosePopupByTgButton;
