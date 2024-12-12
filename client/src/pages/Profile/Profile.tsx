import { useSelector } from "react-redux"
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino"
import { useTelegram } from "../../providers/telegram/telegram"

function Profile() {
    const casino = useSelector(getCasino)
    const {tg_id, userName} = useTelegram()
    return (
        <div>
            <div>
                <h1>С сервака</h1>
                <p>{casino?.user.tg_id}</p>
                <p>{casino?.user.tg_name}</p>
            </div>
            <div>
            <h1>С телеги</h1>
                <p>{tg_id}</p>
                <p>{userName}</p>
            </div>
        </div>
    )
}

export default Profile