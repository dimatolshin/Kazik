import { classNames } from "../../../utils/classNames"
import style from './LoaderContent.module.scss'

function LoaderContent({className = ''}: {className?: string}) {
    return (
        <div className={classNames(style.boxLoader, {}, [className])}>
            <span className={style.loader}></span>
        </div>
    )
}

export default LoaderContent