import { ReactElement } from "react";
import ModalFrame from "./PortalFrame";
type Props = {
  setOnModal: (state: boolean) => void;
  children: any;
};
const TestModal: React.FC<Props> = ({ children, setOnModal }) => {
  return (
    <ModalFrame setOnModal={setOnModal}>
      <div>{children}</div>
    </ModalFrame>
  );
};

export default TestModal;
