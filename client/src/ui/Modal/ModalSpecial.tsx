import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import style from "./Modal.module.scss";
import Portal from "../Portal/Portal";
import { classNames } from "../../utils/classNames";
import { Button } from "../Button";
import CloseModalSvg from "../../assets/svg/CloseModalSvg/CloseModalSvg";
import CloseModalSvgBtn from "../../assets/svg/CloseModalSvgBtn/CloseModalSvgBtn";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
  hiddenClose?: boolean;
  isSpecial?: boolean;
  closeBtn?: boolean;
  classNameContent?: string;
}

const modalStack: Array<{ id: string; closeHandler: () => void }> = [];

function ModalSpecial(props: ModalProps) {
  const {
    children,
    isOpen,
    onClose,
    lazy,
    isSpecial = false,
    hiddenClose = false,
    closeBtn = false,
    classNameContent = "",
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalId = useRef(uuidv4()).current;
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        setIsClosing(false);
        onClose();
        modalStack.pop();
        if (
            modalStack.length === 0 &&
            window.history.state &&
            window.history.state.modalId === modalId
            ) {
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
    if (modalStack.length > 0) {
      const modal = modalStack.pop();
      if (modal && modal.closeHandler) {
        modal.closeHandler();
      }
    }
  }, []);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      modalStack.push({ id: modalId, closeHandler });
      history.pushState({ modalId }, "");

      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("popstate", onPopState);
      document.body.classList.add(style.bodyOpen);
    }

    console.log(history);

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
      document.body.classList.remove(style.bodyOpen);
    };
  }, [isOpen, onKeyDown, onPopState, modalId]);

  if (lazy && !isMounted) {
    return null;
  }

  const mods: Record<string, boolean | undefined> = {
    [style.open]: isOpen,
    [style.close]: isClosing,
    [style.special]: isSpecial,
  };

  return (
    <Portal>
      <div className={classNames(style.modal, mods, ["app_modal"])}>
        <div className={style.overlay} onClick={closeHandler}>
          <div
            className={classNames(style.content, {}, [classNameContent])}
            onClick={onContentClick}
          >
            {hiddenClose && (
              <Button
                kind="secondary"
                onClick={closeHandler}
                className={style.closeCross}
              >
                <CloseModalSvg />
              </Button>
            )}
            {children}
            {isSpecial && closeBtn && (
              <div className={style.boxBtnClose}>
                <Button
                  onClick={closeHandler}
                  kind="secondary"
                  className={style.btnCloseSpecial}
                >
                  <CloseModalSvgBtn className={style.svg} />
                  <p className={style.descr}>Закрыть</p>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default ModalSpecial;
