"use client";

import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import customAuthUiTheme from "@data/customAuthUiTheme";

/**
 * @param {Object} props
 * @param {{authUiContainer: string, authenticationMessage: string}} props.classNames - CSS classes used by component
 */
export default function AuthSignIn({ classNames }) {
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
			<div className={`${classNames.authUiContainer}`}>
				{searchParams.has("redirectedFrom") && (
					<p className={classNames.authenticationMessage}>
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
