import { ReactNode } from "react";
import style from "./ModalRoute.module.scss";

interface ModalProps {
  children: ReactNode;
  classNameModal?: string;
  classNameOverlay?: string;
  classNameContent?: string;
}

function ModalRoute({
  children,
  classNameModal,
  classNameOverlay,
  classNameContent,
}: ModalProps) {
  return (
    <div className={`${style.modal} ${classNameModal}`}>
      <div className={`${style.overlay} ${classNameOverlay}`}>
        <div className={`${style.content} ${classNameContent}`}>{children}</div>
      </div>
    </div>
  );
}

export default ModalRoute;
