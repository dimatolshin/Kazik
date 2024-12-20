import { lazy, Suspense } from "react";
import "./styles/global/App.scss";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "./providers/telegram/telegram";
import { LoaderPage } from "./ui/Loader/LoaderPage";


const Layout = lazy(() => import("./pages/Layout/Layout"));
const Casino = lazy(() => import("./pages/Casino/Casino"));
const Betting = lazy(() => import("./pages/Betting/Betting"));
const Poker = lazy(() => import("./pages/Poker/Poker"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Wheel = lazy(() => import("./pages/Wheel/Wheel"));
const Case = lazy(() => import("./pages/Case/Case"));
const Daily = lazy(() => import("./pages/Daily/Daily"));

function App() {
  useTelegram().tg.expand();
  useTelegram().tg.disableVerticalSwipes();
  useTelegram().tg.setHeaderColor("#000", "#fff");
  return (
    <>
      <Suspense fallback={<LoaderPage />}>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Casino />} />
            <Route path={'betting'} element={<Betting />} />
            <Route path={'poker'} element={<Poker />} />
            <Route path={'provile'} element={<Profile />} />
            <Route path={'wheel'} element={<Wheel />} />
            <Route path={'case'} element={<Case />} />
            <Route path={'daily'} element={<Daily />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
