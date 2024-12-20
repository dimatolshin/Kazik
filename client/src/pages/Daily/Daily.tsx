import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Daily.module.scss";
import CloseModalSvg from "../../assets/svg/CloseModalSvg/CloseModalSvg";
import DailyBonus from "../../components/DailyBonus/DailyBonus";

function Daily() {

  const navigate = useNavigate();
  const hanldeClose = () => {
    navigate(-1);
  };

  return (
    <ModalRoute>
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
