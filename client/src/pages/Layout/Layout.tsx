import { Outlet } from "react-router-dom";
import style from './Layout.module.scss'
import HeaderSearch from "../../components/HeaderSearch/HeaderSearch";
import FooterNav from "../../components/FooterNav/FooterNav";

function Layout() {
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
