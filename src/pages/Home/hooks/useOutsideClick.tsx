import { useEffect } from "react";

function useOutsideClick(callback: () => void, refs: Array<string | HTMLElement>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refs.every(ref => {
          const element = typeof ref === 'string' ? document.querySelector(ref) : ref;
          return element && !element.contains(event.target as Node);
        })
      ) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, refs]);
}

export default useOutsideClick;
