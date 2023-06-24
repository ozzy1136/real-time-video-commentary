import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@styles/Dashboard.module.css";
import PopularMoviesList from "@components/PopularMoviesList";
import LogOutButton from "@components/LogOutButton";

export default function () {
	const router = useRouter();
	const supabaseClient = useSupabaseClient();

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
				<LogOutButton />
				<main className={styles.contentContainer}>
					<h1>Your dashboard</h1>
					<h2>Saved watch parties</h2>
					<section>
						<h2>Available movies</h2>
						<PopularMoviesList />
					</section>
				</main>
			</div>
		</>
	);
}
