import {ICountry} from "../interfaces";
import axios from "axios";

const COUNTRY_API = "https://restcountries.com/v3.1/all";

export function getCountries(): Promise<ICountry[]> {
	return axios.get(COUNTRY_API).then((result) => {
		return result.data as ICountry[];
	});
}
