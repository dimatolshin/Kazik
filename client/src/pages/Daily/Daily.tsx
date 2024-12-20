import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Daily.module.scss";
import CloseModalSvg from "../../assets/svg/CloseModalSvg/CloseModalSvg";
import DailyBonus from "../../components/DailyBonus/DailyBonus";
import { useEffect, useState } from "react";

function Daily() {
  const navigate = useNavigate();
  const hanldeClose = () => {
    navigate('/');
  };
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <ModalRoute
      classNameContent={`${style.contentBg} ${isLoaded ? style.fade : ""}`}
    >
      <Button
        kind="secondary"
        onClick={hanldeClose}
        className={style.closeCross}
      >
        <CloseModalSvg />
      </Button>
      <DailyBonus />
    </ModalRoute>
  );
}

export default Daily;
