import axios from "axios";

const api_url =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL;

export function freeCase(tg_id: string) {
  return axios
    .get(`${api_url}/api/get_info_free_case/${tg_id}/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => console.log(err));
}

export function addFreeCase(tg_id: string, prize_id: number) {
  return axios
    .post(`${api_url}/api/add_free_case_bonus/`, {
      tg_id,
      prize_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {throw new Error(err.info)});
};

export function wheelFortyne(tg_id: string) {
  return axios
    .get(`${api_url}/api/get_info_wheel_of_fortune/${tg_id}/`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => console.log(err));
}

export function addWheelBonus(tg_id: string, prize_id: number) {
  return axios
    .post(`${api_url}/api/add_free_case_bonus/`, {
      tg_id,
      prize_id,
    })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {throw new Error(err.info)});
};
