import {useState} from "react";
import {supabase} from "../services/supabaseClient";
import {motion} from "framer-motion";

export default function Auth() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");

	const handleLogin = async (email: string) => {
		try {
			setLoading(true);
			const {error} = await supabase.auth.signIn({email});
			if (error) throw error;
			alert("Check your email for the login link!");
		} catch (error: any) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center h-screen items-center bg-gradient-to-b from-pink-300 to-purple-500 w-full">
			<div className="col-6 form-widget text-center w-full">
				<motion.h1
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{delay: 0.5}}
					className="font-extrabold text-white text-5xl mb-5">
					Voyage
				</motion.h1>
				<motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.6}} className="font-light mb-2">
					Sign in via magic link with your email below
				</motion.p>
				<motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.8}}>
					<input
						className="mt-8 border-none rounded-lg p-3 w-1/4 text-center text-slate-800 bg-white placeholder:text-slate-500 placeholder:opacity-70"
						type="email"
						placeholder="Your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</motion.div>
				<motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 1}}>
					<button
						onClick={(e) => {
							e.preventDefault();
							handleLogin(email);
						}}
						className={`mt-6 text-center w-1/4 bg-transparent rounded-lg border-2 border-white border-opacity-75 p-2 text-white font-bold hover:text-slate-800 hover:bg-white`}
						disabled={loading}>
						{loading ? <span className="animate-pulse">Loading...</span> : <span>Send magic link</span>}
					</button>
				</motion.div>
			</div>
		</div>
	);
}
