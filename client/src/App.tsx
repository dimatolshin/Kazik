import { lazy, Suspense } from "react";
import "./styles/global/App.scss";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "./providers/telegram/telegram";

const Layout = lazy(() => import("./pages/Layout/Layout"));
const Casino = lazy(() => import("./pages/Casino/Casino"));
const Betting = lazy(() => import("./pages/Betting/Betting"));
const Poker = lazy(() => import("./pages/Poker/Poker"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  useTelegram().tg.expand();
  useTelegram().tg.disableVerticalSwipes();
  useTelegram().tg.setHeaderColor("#000", "#fff");
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/"} element={<Layout />}>
            <Route index element={<Casino />} />
            <Route path={'betting'} element={<Betting />} />
            <Route path={'poker'} element={<Poker />} />
            <Route path={'provile'} element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
