import { useEffect, useState } from "react";

type DebugProps = {
  el: HTMLElement | null;
};
export const Debug = ({ el }: DebugProps) => {
  const [elements, setElements] = useState(
    el ? document.getElementsByTagName("*").length : 0
  );

  useEffect(() => {
    if (!el) return;
    console.log(el);
    const r = new MutationObserver((s) => {
      setElements(document.getElementsByTagName("*").length);
    });

    r.observe(el, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      r.disconnect();
    };
  }, [el]);

  return <div> Elements: {elements}</div>;
};
