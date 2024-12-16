import InfoUser from '../../components/InfoUser/InfoUser'
import SwitchBag from '../../components/SwitchBag/SwitchBag'
import style from './Profile.module.scss'

function Profile() {

   
    
    return (
        <div className={style.profile}>
            <InfoUser />
            <SwitchBag />
        </div>
    )
}

export default Profile