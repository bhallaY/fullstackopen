import axios from "axios";

export function getAllCountries() {
  const req = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
  return req.then((res) => res.data).catch((err) => console.error(err));
}
