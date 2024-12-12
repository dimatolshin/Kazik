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

  return (
    <div className={style.app}>
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
