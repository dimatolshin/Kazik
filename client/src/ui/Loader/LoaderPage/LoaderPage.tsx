import style from "./LoaderPage.module.scss";
import { classNames } from "../../../utils/classNames";

interface LoaderPageProps {
  className?: string
}

export const LoaderPage = ({className = ''}:LoaderPageProps) => (
  <div className={classNames(style.loader, {}, [className])}>
    <p>Loading...</p>
    {/* <img className={style.blinking} src={loaderPage} alt="" /> */}
  </div>
);
