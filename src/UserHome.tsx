import {Session} from "@supabase/supabase-js";
import {useEffect, useState} from "react";
import {ICountry} from "./interfaces";
import {getCountries} from "./services/countryService";
import {supabase} from "./services/supabaseClient";

export default function UserHome({session}: {session: Session}) {
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState<string | null>(null);
	const [website, setWebsite] = useState<string | null>(null);
	const [avatar_url, setAvatarUrl] = useState<string | null>(null);

	useEffect(() => {
		getCountries()
			.then((countries) => {
				console.log(countries);
				setCountries(countries);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		getProfile();
	}, [session]);

	async function getProfile() {
		try {
			setLoading(true);
			const user = supabase.auth.user();

			let {data, error, status} = await supabase.from("Profile").select(`username, website, avatar_url`).eq("id", user?.id).single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error: any) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	}

	return <div>{countries.length}</div>;
}
