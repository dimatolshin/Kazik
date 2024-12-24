import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function inventoryUser(tg_id: string) {
  return axios
    .get(`${api_url}/api/my_profile/${tg_id}/`)
    .then((response) => {
      const data = response.data.prizes;
      return data;
    })
    .catch((err) => console.log(err));
}

export function addIcon(tg_id: string) {
  return axios
    .post(`${api_url}/api/set_sign/`, {
      tg_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {throw new Error(err.info)});
};
