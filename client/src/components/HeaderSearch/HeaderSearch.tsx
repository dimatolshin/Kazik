import { Link } from "react-router-dom";
import ProfileSvg from "../../assets/svg/ProfileSvg/ProfileSvg";
import SearchSvg from "../../assets/svg/SearchSvg/SearchSvg";
import SettingSvg from "../../assets/svg/SettingSvg/SettingSvg";
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

function HeaderSearch() {
  const { photo } = useTelegram();
  const { tg, tg_id } = useTelegram();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<filterCasinoType[]>();
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

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
        <div
          onClick={() => tg.HapticFeedback.impactOccurred("medium")}
          className={style.boxSetting}
        >
          <Link to={"/provile"} className={style.boxAvatar}>
            {photo ? (
              <img className={style.imgAvatar} src={photo} alt="" />
            ) : (
              <ProfileSvg className={style.svg} />
            )}
          </Link>
          <Button kind="secondary" className={style.btnSetting}>
            <SettingSvg className={style.svgSetting} />
          </Button>
        </div>
      </div>
      <InputModal isOpen={isActive} lazy>
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
        {filteredData && (
          <FilterList filteredData={filteredData}  />
        )}
      </InputModal>
    </>
  );
}

export default HeaderSearch;
