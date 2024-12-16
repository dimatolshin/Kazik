declare global {
  interface Window {
    Telegram: any;
  }
}

export const useTelegram = () => {
  const tg = window.Telegram.WebApp;

  const userName = tg?.initDataUnsafe?.user?.username;
  const tg_id = tg?.initDataUnsafe?.user?.id;
  const firstName = tg?.initDataUnsafe?.user?.first_name;
  const photo = tg?.initDataUnsafe?.user?.photo_url;
  // const tg_id = "12323123";
  // const userName = "byngra";
  // const firstName = 'Сергей';
 
  return { tg, userName, tg_id, photo, firstName };
};
