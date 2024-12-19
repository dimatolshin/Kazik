import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function allCasino(tg_id: string, tg_name: string) {
  return axios
    .get(`${api_url}/api/main_page/${tg_id}/${tg_name}/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch(err => console.log(err));
};

export function filterCasino(tg_id: string) {
  return axios
    .get(`${api_url}/api/filter_category_list/${tg_id}/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch(err => console.log(err));
};