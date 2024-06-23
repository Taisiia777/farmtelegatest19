import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void, ids: string[]) => {
   const ref = useRef<any>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         let canProceed = true;

         for (let i = 0; i < ids.length; i++) {
            const id = ids[i];

            //@ts-expect-error
            if (event.target!.closest(id)) {
               canProceed = false;
            }
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
