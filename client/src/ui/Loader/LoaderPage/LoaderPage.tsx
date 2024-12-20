import style from "./LoaderPage.module.scss";
import { classNames } from "../../../utils/classNames";
import img from "../../../assets/png/LoaderPage.webp";
import { useEffect } from "react";
import { useImage } from "../../../providers/ContextProvider/ImageContextLoader";

interface LoaderPageProps {
  className?: string;
}

export const LoaderPage = ({ className = "" }: LoaderPageProps) => {
  
  const { image, loadImage } = useImage();
  useEffect(() => {
    if (!image) {
      loadImage(img);
    }
  }, [image, loadImage]);

  return (
    <div className={classNames(style.loader, {}, [className])}>
      <img className={style.blinking} src={img} alt="" />
    </div>
  );
};
