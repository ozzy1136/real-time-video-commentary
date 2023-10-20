"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";

/**
 * @param {Object} props
 * @param {{buttonSignOut: string}} props.classNames
 */
export default function ButtonSignOut({ classNames }) {
	const router = useRouter();
	const supabaseClient = createClientComponentClient();

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
			<button
				className={classNames.buttonSignOut}
				onClick={async (e) => {
					e.currentTarget.disabled = true;
					await supabaseClient.auth.signOut();
				}}
				type="button"
			>
				Sign out
			</button>
		</>
	);
}
