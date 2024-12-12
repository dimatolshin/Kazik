import { useSelector } from "react-redux"
import { getCasino } from "../../providers/StoreProvider/selectors/getCasino"
import { useTelegram } from "../../providers/telegram/telegram"

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

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
            <p>{api_url}</p>
        </div>
    )
}

export default Profile