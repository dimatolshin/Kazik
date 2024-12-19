import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Case.module.scss";
import CloseModalSvg from "../../assets/svg/CloseModalSvg/CloseModalSvg";
import FreeCase from "../../components/FreeCase/FreeCase";
import { useSelector } from "react-redux";
import { getCase } from "../../providers/StoreProvider/selectors/getCase";

function Case() {
  const arrCase = useSelector(getCase);
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
      {arrCase && (
        <FreeCase arrCase={arrCase} />
      )}
    </ModalRoute>
  );
}

export default Case;
