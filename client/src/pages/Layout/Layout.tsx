import { Outlet } from "react-router-dom";
import style from "./Layout.module.scss";
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import FooterNav from "../../components/FooterNav/FooterNav";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { allCasino } from "../../api/allCasino";
import { useTelegram } from "../../providers/telegram/telegram";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { casinoActions } from "../../providers/StoreProvider/slice/casinoSlice";
import { freeCase, wheelFortyne } from "../../api/RouletBonus";
import { freeCaseActions } from "../../providers/StoreProvider/slice/freeCaseSlice";
import { Toaster } from "react-hot-toast";
import { wheelFortyneActions } from "../../providers/StoreProvider/slice/wheelFortyneSlice";

function Layout() {
  const { tg_id, userName } = useTelegram();
  const dispatch = useDispatch();
  const footerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const casinoQuery = useQuery(
    {
      queryKey: ["casino"],
      queryFn: () => allCasino(tg_id, userName),
      enabled: !!tg_id,
    },
    queryClient
  );

  useEffect(() => {
    if (casinoQuery.data) {
      dispatch(casinoActions.addData(casinoQuery.data));
    }
  }, [casinoQuery.data]);

  const freeCaseQuery = useQuery(
    {
      queryKey: ["freeCase"],
      queryFn: () => freeCase(tg_id),
      enabled: !!tg_id,
    },
    queryClient
  );
  useEffect(() => {
    if (freeCaseQuery.data) {
      dispatch(freeCaseActions.addData(freeCaseQuery.data.prizes));
      dispatch(freeCaseActions.addSpins(freeCaseQuery.data.user));
    }
  }, [freeCaseQuery.data]);

  const whellFortyneQuery = useQuery(
    {
      queryKey: ["wheelFortyne"],
      queryFn: () => wheelFortyne(tg_id),
      enabled: !!tg_id,
    },
    queryClient
  );
  useEffect(() => {
    if (whellFortyneQuery.data) {
      dispatch(wheelFortyneActions.addData(whellFortyneQuery.data.prizes));
      dispatch(wheelFortyneActions.addSpins(whellFortyneQuery.data.user));
    }
  }, [whellFortyneQuery.data]);

  useEffect(() => {
    
    const handleScroll = () => {
      const main = mainRef.current
      if (main) {
        const scrollTop = main.scrollTop;
        const scrollHeight = main.scrollHeight;
        const clientHeight = main.clientHeight;
        if (footerRef.current) {
          if (scrollTop === 0) {
            footerRef.current.classList.remove(style.visible);
          } else if (scrollTop < scrollHeight - clientHeight) {
            footerRef.current.classList.add(style.visible);
          } else if (scrollTop >= scrollHeight - clientHeight) {
            footerRef.current.classList.remove(style.visible);
          }
        }
      }
    };
    const main = mainRef.current;
    if(main) {
      main.addEventListener("scroll", handleScroll);
    }
    return () => {
      if(main) { 
        main.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className={style.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <header className={`${style.header} container`}>
        <HeaderSearch />
      </header>
      <main ref={mainRef} className={`${style.main} container`}>
        <Outlet />
      </main>
      <footer ref={footerRef} className={`${style.footer} container`}>
        <FooterNav />
      </footer>
    </div>
  );
}

export default Layout;
