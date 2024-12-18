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
import { freeCase, wheelFortyne } from "../../api/RouletBonus";
import { freeCaseActions } from "../../providers/StoreProvider/slice/freeCaseSlice";
import { Toaster } from 'react-hot-toast';
import { wheelFortyneActions } from "../../providers/StoreProvider/slice/wheelFortyneSlice";

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
      dispatch(freeCaseActions.addData(freeCaseQuery.data.prizes))
      dispatch(freeCaseActions.addSpins(freeCaseQuery.data.user))
    }
  }, [freeCaseQuery.data]);

  const whellFortyneQuery = useQuery(
    {
      queryKey: ["wheelFortyne"],
      queryFn: () => wheelFortyne(tg_id),
      enabled: !!tg_id
    },
    queryClient
  );
  useEffect(() => {
    if (whellFortyneQuery.data) {
      dispatch(wheelFortyneActions.addData(whellFortyneQuery.data.prizes))
      dispatch(wheelFortyneActions.addSpins(whellFortyneQuery.data.user))
    }
  }, [whellFortyneQuery.data]);

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
