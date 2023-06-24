import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import customTheme from "@data/supabaseAuthUITheme";

export default function ({ styles }) {
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
						if (
							searchParams?.get("redirectedFrom").startsWith("/")
						) {
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
	);
}
