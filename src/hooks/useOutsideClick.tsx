import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void, ids: string[]) => {
   const ref = useRef<any>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         let canProceed = true;

         const target = event.target as HTMLElement;

         for (let i = 0; i < ids.length; i++) {
            const id = ids[i];

            if (target.closest(id)) {
               canProceed = false;
            }
         }

         if (target.closest("#popup")) {
            canProceed = false;
         }

         if (
            ref.current &&
            !ref.current.contains(event.target as Node) &&
            canProceed
         ) {
            callback();
         }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, [callback, ids]);

   return ref;
};
