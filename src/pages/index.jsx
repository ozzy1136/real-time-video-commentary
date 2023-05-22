import { Auth } from "@supabase/auth-ui-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "@styles/Home.module.css";
import customTheme from "@data/supabaseAuthUITheme";

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
	const router = useRouter();
	const supabaseClient = useSupabaseClient();
	const [searchParams, setSearchParams] = useState();

	useEffect(() => {
		setSearchParams(new URLSearchParams(document.location.search));
	}, []);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((e) => {
			switch (e) {
				case "SIGNED_IN":
					{
						if (searchParams.has("redirectedFrom")) {
							router.push(
								decodeURIComponent(
									searchParams.get("redirectedFrom")
								)
							);
						} else {
							router.push("/dashboard");
						}
					}
					break;
				default:
					break;
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [searchParams]);

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
				<div className={`section-container ${styles.authUiContainer}`}>
					<div className={styles.authUiWrapper}>
						{searchParams?.has("redirectedFrom") && (
							<p>You must sign in to continue</p>
						)}
						<Auth
							supabaseClient={supabaseClient}
							appearance={{
								theme: customTheme,
							}}
							theme="default"
							providers={[]}
							view={"sign_in"}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
