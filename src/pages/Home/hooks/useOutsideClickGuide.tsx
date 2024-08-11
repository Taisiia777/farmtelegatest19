import { useEffect } from "react";

function useOutsideClick(callback: () => void, refs: Array<React.RefObject<HTMLElement> | string>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isOutsideClick = refs.every(ref => {
        const element = typeof ref === 'string' ? document.querySelector(ref) : ref.current;
        return element && !element.contains(event.target as Node);
      });

      if (isOutsideClick) {
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
