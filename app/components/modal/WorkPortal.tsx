import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: ReactElement }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [element, setElement] = useState<any>(null);
  useEffect(() => {
    setMounted(true);
    setElement(document.getElementById("modal-root"));
    return () => setMounted(false);
  }, []);

  if (typeof window === undefined || !element) return <></>;

  return mounted ? (
    element ? (
      createPortal(children, element as HTMLElement)
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

export default Portal;
