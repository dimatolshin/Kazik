import LoaderContentSvg from "../../../assets/svg/LoaderContentSvg/LoaderContentSvg"
import { classNames } from "../../../utils/classNames"
import style from './LoaderContent.module.scss'

function LoaderContent({className = ''}: {className?: string}) {
    return (
        <div className={classNames(style.boxLoader, {}, [className])}>
            <LoaderContentSvg className={style.svg} />
            <p className={style.descr}>Загрузка...</p>
        </div>
    )
}

export default LoaderContent