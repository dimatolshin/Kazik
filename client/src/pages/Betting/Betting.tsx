import { useSelector } from 'react-redux';
import Banner from '../../components/Banner/Banner'
import BonusComponent from '../../components/BonusComponent/BonusComponent'
import style from './Betting.module.scss'
import { getCasino } from '../../providers/StoreProvider/selectors/getCasino';
import TopCasino from '../../components/TopCasino/TopCasino';

function Betting() {
    const casino = useSelector(getCasino);
    return (
        <div className={style.betting}>
            <Banner />
            <TopCasino title={"Букмекер"} arr={casino ? casino.top_10_casino : []} />
            <BonusComponent />
        </div>
    )
}

export default Betting