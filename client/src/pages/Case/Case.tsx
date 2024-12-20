import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Case.module.scss";
import CloseModalSvg from "../../assets/svg/CloseModalSvg/CloseModalSvg";
import FreeCase from "../../components/FreeCase/FreeCase";
import { useSelector } from "react-redux";
import { getCase } from "../../providers/StoreProvider/selectors/getCase";
import { useEffect, useState } from "react";

function Case() {
  const arrCase = useSelector(getCase);
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
      {arrCase && <FreeCase arrCase={arrCase} />}
    </ModalRoute>
  );
}

export default Case;
