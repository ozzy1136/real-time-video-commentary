import { useSupabaseClient } from "@supabase/auth-helpers-react";

import styles from "@styles/LogOutButton.module.css";

export default function () {
	const supabaseClient = useSupabaseClient();

	return (
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
	);
}
