import FortuneBox from "../../components/FortuneBox/FortuneBox";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import CloseModalSvg from "../../assets/svg/CloseModalSvg/CloseModalSvg";
import style from "./Wheel.module.scss";
import { useEffect, useState } from "react";

function Wheel() {
  const navigate = useNavigate();
  const hanldeClose = () => {
    navigate(-1);
  };
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ModalRoute classNameContent={`${style.contentBg} ${isLoaded ? style.fade : ""}`}>
      <Button
        kind="secondary"
        onClick={hanldeClose}
        className={style.closeCross}
      >
        <CloseModalSvg />
      </Button>
      <FortuneBox />
    </ModalRoute>
  );
}

export default Wheel;
