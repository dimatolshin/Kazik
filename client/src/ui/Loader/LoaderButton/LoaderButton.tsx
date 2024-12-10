import style from "./LoaderButton.module.scss";

export const LoaderButton = () => (
  <div className={style.loader}>
    {/* <LoaderBtnSvg /> */}
    <p>Loading...</p>
  </div>
);
