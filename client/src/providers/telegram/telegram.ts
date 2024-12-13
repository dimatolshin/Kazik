declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  const userName = tg?.initDataUnsafe?.user?.username;
  const tg_id = tg?.initDataUnsafe?.user?.id;
  const photo = tg?.initDataUnsafe?.user?.photo_url;
  // const tg_id = "12323123";
  // const userName = "byngra";
 
  return { tg, userName, tg_id, photo };
};
