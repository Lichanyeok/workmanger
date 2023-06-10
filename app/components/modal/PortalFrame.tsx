import Portal from "./WorkPortal";
import { ReactElement } from "react";
type Props = {
  children: any;
  setOnModal: (state: boolean) => void;
};

const ModalFrame = ({ children, setOnModal }: Props) => {
  return (
    <Portal>
      <div className="absolute z-10 bg-white w-1/2 h-3/6 top-96 start-1/4 rounded-lg ring-2 flex flex-col">
        <div className="m-5 ml-auto">
          <button className="close" onClick={() => setOnModal(false)}>
            X
          </button>
        </div>
        {children}
      </div>
    </Portal>
  );
};

export default ModalFrame;
