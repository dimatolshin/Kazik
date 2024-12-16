import { MouseEventHandler } from 'react';
import style from './SwitchBagOption.module.scss'
import { classNames } from '../../utils/classNames';

interface SwitchBagOptionProps {
    isActive: boolean;
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

function SwitchBagOption({isActive, title, onClick, className = ''}:SwitchBagOptionProps) {
    return (
        <button
            data-active={isActive}
            className={classNames(style.switch_option, {}, [className])}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default SwitchBagOption