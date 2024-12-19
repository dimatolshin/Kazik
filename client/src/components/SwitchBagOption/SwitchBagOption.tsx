import { MouseEventHandler, ReactNode } from 'react';
import style from './SwitchBagOption.module.scss'
import { classNames } from '../../utils/classNames';

interface SwitchBagOptionProps {
    isActive: boolean;
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    isDisabled?: boolean;
    img?: ReactNode;
}

function SwitchBagOption({isActive, title, onClick, className = '', isDisabled, img}:SwitchBagOptionProps) {
    return (
        <button
            data-active={isActive}
            className={classNames(style.switch_option, {}, [className])}
            onClick={onClick}
            disabled={isDisabled}
        >
            {title}
            {img}
        </button>
    )
}

export default SwitchBagOption