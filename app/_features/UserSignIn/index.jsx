"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import styles from "./index.module.css";
import customAuthUiTheme from "@data/customAuthUiTheme";

export default function AuthSignIn() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const supabaseClient = createClientComponentClient();

	useEffect(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange((e) => {
			switch (e) {
				case "SIGNED_IN":
					{
						if (
							searchParams.get("redirectedFrom")?.startsWith("/")
						) {
							router.push(searchParams.get("redirectedFrom"));
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
	}, [searchParams, router, supabaseClient]);

	return (
		<div className="section-container">
			<div className={styles.authUiContainer}>
				{searchParams.has("redirectedFrom") && (
					<p className={styles.authenticationMessage}>
						You must sign in to continue
					</p>
				)}
				<Auth
					supabaseClient={supabaseClient}
					appearance={{
						theme: customAuthUiTheme,
					}}
					theme="default"
					providers={[]}
					view={"sign_in"}
					redirectTo={
						typeof window === "undefined"
							? undefined
							: `${location.origin}/auth/callback`
					}
				/>
			</div>
		</div>
	);
}
