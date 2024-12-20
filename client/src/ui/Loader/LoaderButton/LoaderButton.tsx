import style from "./LoaderButton.module.scss";

export const LoaderButton = () => (
  <div className={style.loader}>
    <div className={style.loader__item}></div>
    <div className={style.loader__item}></div>
    <div className={style.loader__item}></div>
  </div>
);
