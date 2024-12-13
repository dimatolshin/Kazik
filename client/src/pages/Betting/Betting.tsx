import Banner from '../../components/Banner/Banner'
import BonusComponent from '../../components/BonusComponent/BonusComponent'
import style from './Betting.module.scss'

function Betting() {
    return (
        <div className={style.betting}>
            <Banner />
            <BonusComponent />
        </div>
    )
}

export default Betting