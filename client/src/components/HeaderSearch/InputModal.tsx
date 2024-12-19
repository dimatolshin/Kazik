import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import style from "./InputModal.module.scss";
import { classNames } from "../../utils/classNames";
import Portal from "../../ui/Portal/Portal";

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

function InputModal(props: ModalProps) {
  const {
    children,
    isOpen,
    onClose,
    lazy,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMouned, setIsMouned] = useState(false);

  //для первого монтирования если передал lazy
  useEffect(() => {
    if (isOpen) {
      setIsMouned(true);
      history.pushState({ modalOpen: true }, "");
    }
  }, [isOpen]);

  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        setIsClosing(false);
        onClose();
        if (window.history.state && window.history.state.modalOpen) {
          window.history.back();
        }
      }, 300);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const onPopState = useCallback(() => {
    closeHandler();
  }, [closeHandler]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("popstate", onPopState);
      document.body.classList.add(style.bodyOpen);
    }

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
      document.body.classList.remove(style.bodyOpen);
    };
  }, [isOpen, onKeyDown, onPopState]);

  //для первого монтирования

  if (lazy && !isMouned) {
    return null;
  }
  const mods: Record<string, boolean | undefined> = {
    [style.open]: isOpen,
    [style.close]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(style.modal, mods, ["app_modal"])}>
        <div className={style.overlay} onClick={closeHandler}>
          <div
            className={style.content}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default InputModal;
