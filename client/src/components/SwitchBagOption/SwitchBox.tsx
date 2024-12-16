import { ReactNode } from 'react';
import style from './SwitchBox.module.scss'

interface SwitchBoxProps {
    children: ReactNode;
}

function SwitchBox({children}:SwitchBoxProps) {
    return (
        <div className={style.switch}>{children}</div>
    )
}

export default SwitchBox