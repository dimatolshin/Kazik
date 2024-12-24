import { Link } from "react-router-dom";
import ProfileSvg from "../../assets/svg/ProfileSvg/ProfileSvg";
import SearchSvg from "../../assets/svg/SearchSvg/SearchSvg";
import { useTelegram } from "../../providers/telegram/telegram";
import { Button } from "../../ui/Button";
import style from "./HeaderSearch.module.scss";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import InputModal from "./InputModal";
import CloseSearchSvg from "../../assets/svg/CloseSearchSvg/CloseSearchSvg";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { filterCasino } from "../../api/allCasino";
import { filterCasinoType } from "../../types/filterCasino";
import FilterList from "./FilterList";
import toast from "react-hot-toast";
import AddHomeSvg from "../../assets/svg/AddHomeSvg/AddHomeSvg";
import Modal from "../../ui/Modal/Modal";
import imgPrizeHome from '../../assets/png/prizeHomeScreen.png'

function HeaderSearch() {
  const { photo } = useTelegram();
  const { tg, tg_id } = useTelegram();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<filterCasinoType[]>();
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isBtnHomeScreen, setIsBtnHomeScreen] = useState(false);
  const [isModalHomeScreen, setIsModalHomeScreen] = useState(false);
  const [loadinPage, setLoadinPage] = useState(false);

  useEffect(() => {
    setLoadinPage(true)
  }, [])

  //для мобильки методы только
  const handleAddScreenHome = () => {
    tg.HapticFeedback.impactOccurred("medium");
    tg.checkHomeScreenStatus((status: string) => {
      if (status === "miss" || status === "unknown") {
        toast.success("Успешно добавлено");
        tg.addToHomeScreen();
        setIsBtnHomeScreen(true);
      } else {
        setIsBtnHomeScreen(true);
        toast.error("Устройство не поддерживает добавление на главный экран");
      }
    });
  };
  //
  useEffect(() => {
    tg.checkHomeScreenStatus((status: string) => {
      if (status === "added" || status === "unsupported") {
        setIsBtnHomeScreen(true);
      } else if (status === "miss" || status === "unknown") {
        setIsBtnHomeScreen(false);
      }
    });
  }, [loadinPage]);

  useEffect(() => {
    tg.checkHomeScreenStatus((status: string) => {
      if(status === "miss" || status === "unknown") {
    const timer = setTimeout(() => {
      setIsModalHomeScreen(true);
    }, 3000);
    return () => clearTimeout(timer);
      }
    })
  }, [loadinPage]);

  const handleCloseHome = () => {
    setIsModalHomeScreen(false);
  };

  const handleActive = () => {
    setIsActive(true);
    tg.HapticFeedback.impactOccurred("medium");
  };

  const handleClose = () => {
    setIsActive(false);
    tg.HapticFeedback.impactOccurred("medium");
  };

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const queryCasinoFilter = useQuery(
    {
      queryKey: ["filterCasino"],
      queryFn: () => filterCasino(tg_id),
      enabled: !!tg_id,
    },
    queryClient
  );

  useEffect(() => {
    if (queryCasinoFilter.data) {
      setData(queryCasinoFilter.data);
    }
  }, [queryCasinoFilter.data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue && data) {
      const lowerCaseInput = inputValue.toLowerCase();
      const result = data
        .map((item) => {
          if (item.title.toLowerCase().includes(lowerCaseInput)) {
            return item; // Возвращаем весь объект, если совпадает title
          }
          return {
            ...item,
            items: item.items.filter((subItem) =>
              subItem.name.toLowerCase().includes(lowerCaseInput)
            ),
          };
        })
        .filter(
          (item) =>
            item.title.toLowerCase().includes(lowerCaseInput) ||
            item.items.length > 0
        );

      setFilteredData(result);
    } else {
      setFilteredData(data);
    }
  }, [inputValue, data]);

  return (
    <>
      <div className={style.box}>
        <div onClick={handleActive} className={style.boxSearch}>
          <div className={style.boxSvg}>
            <SearchSvg className={style.svgSearch} />
          </div>
          <p className={style.infoInput}>Казино, игры, бонусы</p>
        </div>
        <div className={style.boxSetting}>
          <Link
            onClick={() => tg.HapticFeedback.impactOccurred("medium")}
            to={"/provile"}
            className={style.boxAvatar}
          >
            {photo ? (
              <img className={style.imgAvatar} src={photo} alt="" />
            ) : (
              <ProfileSvg className={style.svg} />
            )}
          </Link>
          <Button
            isDisabled={isBtnHomeScreen}
            onClick={handleAddScreenHome}
            kind="secondary"
            className={style.btnSetting}
          >
            {/* <SettingSvg className={style.svgSetting} /> */}
            <AddHomeSvg className={style.svgSetting} />
          </Button>
        </div>
      </div>
      <InputModal isOpen={isActive} lazy onClose={handleClose}>
        <div className={style.searchBlock}>
          <div className={style.boxSearch}>
            <div className={style.boxSvg}>
              <SearchSvg className={style.svgSearch} />
            </div>
            <input
              ref={inputRef}
              placeholder="Казино, игры, бонусы"
              className={style.infoInput}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <Button className={style.btn} kind="secondary" onClick={handleClose}>
            <CloseSearchSvg />
          </Button>
        </div>
        {filteredData && <FilterList filteredData={filteredData} />}
      </InputModal>
      <Modal
        closeBtn
        isOpen={isModalHomeScreen}
        onClose={handleCloseHome}
        isSpecial
      >
        <div className={style.boxHome}>
          <h2 className={style.titleHome}>Привет!</h2>
          <p className={style.descrHome}>
            Добавь приложение на «домашний экран» своего смартфона и мы подарим
            тебе фриспины в «Колесо фортуны» !
          </p>
          <img
            className={style.imgHome}
            src={imgPrizeHome}
            alt=""
          />
          <p className={style.descrHome}>В котором разыгрываются <br/> Apple Vision, IPhone 16 и автомобиль!</p>
          <Button onClick={handleAddScreenHome} className={style.btnHome}>
            Добавить приложение
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default HeaderSearch;
