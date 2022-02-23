import {useState, useEffect} from "react";
import {supabase} from "./services/supabaseClient";
import Auth from "./components/Auth";
import {Session} from "@supabase/supabase-js";
import UserHome from "./UserHome";
import Account from "./components/Account";

function Home() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		setSession(supabase.auth.session());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return <div>{!session ? <Auth /> : <UserHome key={session.user?.id} session={session} />}</div>;
}

export default Home;
