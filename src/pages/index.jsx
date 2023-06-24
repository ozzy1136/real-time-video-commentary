import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import Head from "next/head";

import styles from "@styles/Home.module.css";
import HomeAuth from "@components/HomeAuth";

export async function getServerSideProps(ctx) {
	const supabaseClient = createServerSupabaseClient(ctx);
	const {
		data: { session },
	} = await supabaseClient.auth.getSession();

	if (session?.user.role === "authenticated") {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	} else {
		return {
			props: {},
		};
	}
}

export default function () {
	return (
		<>
			<Head>
				<title>Home | Real Time Video Commentary</title>
			</Head>
			<main>
				<div className={`section-container ${styles.headingContainer}`}>
					<h1 className={styles.heading}>
						Real Time Video Commentary
					</h1>
					<h2 className={styles.subheading}>
						Make movie binging a little more interesting
					</h2>
					<p className={styles.appDescription}>
						Share your immediate thoughts on your favorite scenes
						while watching with your friends!
					</p>
				</div>
				<HomeAuth styles={styles} />
			</main>
		</>
	);
}
