"use client";

import { useRouter } from "next/navigation";

import styles from "@styles/SignOutButton.module.css";
import { supabaseClientComponentClient } from "@lib/supabaseClient";

export default function ButtonSignOut() {
	const router = useRouter();
	const supabaseClient = supabaseClientComponentClient();

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
				className={styles.buttonSignOut}
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
