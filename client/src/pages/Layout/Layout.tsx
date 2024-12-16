import { Outlet } from "react-router-dom";
import style from './Layout.module.scss'
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import FooterNav from "../../components/FooterNav/FooterNav";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { allCasino } from "../../api/allCasino";
import { useTelegram } from "../../providers/telegram/telegram";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { casinoActions } from "../../providers/StoreProvider/slice/casinoSlice";
import { freeCase } from "../../api/RouletBonus";
import { freeCaseActions } from "../../providers/StoreProvider/slice/freeCaseSlice";
import { Toaster } from 'react-hot-toast';

function Layout() {
  const {tg_id, userName} = useTelegram()
  const dispatch = useDispatch()

  const casinoQuery = useQuery({
    queryKey: ['casino'],
    queryFn: () => allCasino(tg_id, userName),
    enabled: !!tg_id
  }, queryClient)

  useEffect(() => {
    if(casinoQuery.data) {
      dispatch(casinoActions.addData(casinoQuery.data))
    }
  }, [casinoQuery.data])

  const freeCaseQuery = useQuery(
    {
      queryKey: ["freeCase"],
      queryFn: () => freeCase(tg_id),
      enabled: !!tg_id
    },
    queryClient
  );
  useEffect(() => {
    if (freeCaseQuery.data) {
      dispatch(freeCaseActions.addData(freeCaseQuery.data))
    }
  }, [freeCaseQuery.data]);

  return (
    <div className={style.app}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <header className={`${style.header} container`}>
        <HeaderSearch />
      </header>
      <main className={`${style.main} container`}>
        <Outlet />
      </main>
      <footer className={`${style.footer} container`}>
        <FooterNav />
      </footer>
    </div>
  );
}

export default Layout;
