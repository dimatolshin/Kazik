import { useDispatch, useSelector } from "react-redux";
import { WheelFortyneType } from "../../types/WheelFortune";
import { getSpinsWheel } from "../../providers/StoreProvider/selectors/getWheel";
import { useEffect, useRef, useState } from "react";
import style from "./WheelFortune.module.scss";
import { Button } from "../../ui/Button";
import SectionWheelSvg from "../../assets/svg/SectionWheelSvg/SectionWheelSvg";
import { getRandomPrize } from "../../helpers/getRandomPrize";
import img from "../../assets/png/centrWheel.png";
import ArrwoWheelPrize from "../../assets/svg/ArrwoWheelPrize/ArrwoWheelPrize";
import { wheelFortyneActions } from "../../providers/StoreProvider/slice/wheelFortyneSlice";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { addWheelBonus } from "../../api/RouletBonus";
import { useTelegram } from "../../providers/telegram/telegram";
import Modal from "../../ui/Modal/Modal";
import toast from "react-hot-toast";
import WheelWinPrize from "../WheelWinPrize/WheelWinPrize";

interface WheelFortuneProps {
  arrWheel: WheelFortyneType[];
}

function WheelFortune({ arrWheel }: WheelFortuneProps) {
  const {tg_id, tg} = useTelegram()
  const spinsWheel = useSelector(getSpinsWheel);
  const wheelRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLUListElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const prizeRefs = useRef<(HTMLLIElement | null)[]>(
    Array(arrWheel.length).fill(null)
  );
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeWin, setPrizeWin] = useState<WheelFortyneType>();
  const dispatch = useDispatch();
  const [spinsValue, setSpinsValue] = useState<number>(0);

  const prizeSlice = 360 / arrWheel.length;
  const prizeOffset = Math.floor(180 / arrWheel.length);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    setPrizeWin(undefined);
  }

  useEffect(() => {
    if (spinsWheel) {
      setSpinsValue(spinsWheel.key_wheel_of_fortune);
    }
  }, [spinsWheel?.key_wheel_of_fortune]);

  // устанавливаем колесо
  const createConicGradient = () => {
    const spinner = spinnerRef.current;
    if (spinner) {
      spinner.style.background = `#09090c`;
    }
  };

  const setupWheel = () => {
    createConicGradient();
  };

  useEffect(() => {
    setupWheel();
  }, []);

  const selectPrize = () => {
    const prizeSlice = 360 / arrWheel.length;
    const selectedPrize = getRandomPrize(arrWheel);
    const selectedIndex = arrWheel.findIndex(
      (prize) => prize.id === selectedPrize.id
    );
    const stopAngle = selectedIndex * prizeSlice + prizeSlice / 2;
    return { selectedPrize, stopAngle };
  };

  const mutateWheelBonus = useMutation(
    {
      mutationFn: (data: { tg_id: string; id: number }) =>
        addWheelBonus(data.tg_id, data.id),
      onSuccess: () => {
        setIsOpen(true);
        toast.success('Ваш приз в сумке')
      },
      onError: () => {
        toast.error('Ошибка, ваши вращения восстановлены')
        dispatch(wheelFortyneActions.plusSpins())
      }
    },
    queryClient
  );

  useEffect(() => {
    if (prizeWin) {
      mutateWheelBonus.mutate({tg_id, id: prizeWin.id})
    }
  }, [prizeWin]);

  const handleClick = () => {
    tg.HapticFeedback.impactOccurred("medium")
    if (!isSpinning) {
      setIsSpinning(true);
      const { selectedPrize, stopAngle } = selectPrize();
      const newRotation = stopAngle + 359 * 5;
      dispatch(wheelFortyneActions.minusSpins());
      setRotation(newRotation);
      setTimeout(() => {
        setPrizeWin(selectedPrize);
      }, 7000);
      const spinner = spinnerRef.current;
      if (wheelRef.current && tickerRef.current && spinner) {
        wheelRef.current.classList.add(style.is_spinning);
        spinner.style.setProperty("--rotate", String(newRotation));
      }
    }
  };

  useEffect(() => {
    const spinner = spinnerRef.current;
    const handleTransitionEnd = () => {
      const finalRotation = ((rotation % 360) + 360) % 360;
      setRotation(finalRotation);

      if (wheelRef.current && spinner) {
        wheelRef.current.classList.remove(style.is_spinning);
        spinner.style.setProperty("--rotate", String(finalRotation));
        setIsSpinning(false);
        // setPrizeWin(undefined);
      }
    };

    if (spinner) {
      spinner.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        spinner.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [rotation]);

  return (
    <>
      <div className={style.boxBtn}>
        <Button
          className={style.btn}
          onClick={handleClick}
          isDisabled={isSpinning || spinsValue === 0}
        >
          Крутить колесо
        </Button>
        <p className={style.descrSpins}>Вращений: {spinsValue}</p>
      </div>
      <div className={style.box}>
        <div className={style.deal_wheel} ref={wheelRef}>
          <ul className={style.spinner} ref={spinnerRef}>
            {arrWheel.map((prize, i) => {
              const rotation = prizeSlice * i * -1 - prizeOffset;
              return (
                <li
                  key={i}
                  ref={(el) => (prizeRefs.current[i] = el)}
                  className={style.prize}
                  style={
                    { "--rotate": `${rotation}deg` } as React.CSSProperties
                  }
                >
                  <SectionWheelSvg className={style.svg} />
                  <div className={style.boxPrize}>
                    <img
                      className={style.img}
                      src={`https://api.zerkalogm.online/${prize.image_without_background_url}`}
                      alt=""
                    />
                    <p className={style.descr}>{prize.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <img className={style.centreImg} src={img} alt="" />
          <div className={style.pointer} ref={tickerRef}>
            <ArrwoWheelPrize className={style.topArrow} />
          </div>
        </div>
      </div>
      <Modal
        closeBtn
        isOpen={isOpen}
        onClose={handleCloseModal}
        isSpecial
        lazy
      >
        {prizeWin && (
          <WheelWinPrize onClose={handleCloseModal} prize={prizeWin} />
        )}
      </Modal>
    </>
  );
}

export default WheelFortune;
