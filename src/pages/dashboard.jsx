// import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Head from "next/head";
import { useRouter } from "next/router";
// import { useEffect } from "react";

import styles from "@styles/Dashboard.module.css";

export default function () {
	const router = useRouter();
	const supabaseClient = useSupabaseClient();
	// const user = useUser();

	// useEffect(() => {
	// 	async function getSavedMovieIds() {
	// 		const { data, error } = await supabaseClient
	// 			.from("profile_scheduled_party")
	// 			.select("party_id");
	// 		return error ?? data;
	// 	}

	// 	if (user) {
	// 		(async () => {
	// 			const movieIds = await getSavedMovieIds();
	// 			console.log(movieIds);
	// 		})();
	// 	}
	// }, []);

	supabaseClient.auth.onAuthStateChange((e) => {
		switch (e) {
			case "SIGNED_OUT":
				{
					router.push("/");
				}
				break;
			default:
				break;
		}
	});

	return (
		<>
			<Head>
				<title>Dashboard | Real Time Video Commentary</title>
			</Head>
			<div className="section-container">
				<div className={styles.buttonLogOutWrapper}>
					<button
						className={styles.buttonLogOut}
						onClick={(e) => {
							e.currentTarget.disabled = true;
							supabaseClient.auth.signOut();
						}}
						type="button"
					>
						Sign out
					</button>
				</div>
				<main className={styles.contentContainer}>
					<h1>Your dashboard</h1>
					<h2>Saved watch parties</h2>
					<h2>Available movies</h2>
				</main>
			</div>
		</>
	);
}
