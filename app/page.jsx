import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import styles from "@styles/HomePage.module.css";
import { supabaseServerComponentClient } from "@lib/supabaseClient";
import AuthSignIn from "@components/AuthSignIn";
import HomePageContent from "@components/HomePageContent";

export const metadata = {
	title: "Home | Real Time Video Commentary",
};

export default async function HomePage() {
	const supabaseClient = supabaseServerComponentClient(cookies);
	const {
		data: { session },
	} = await supabaseClient.auth.getSession();

	if (!session) {
		return (
			<main>
				<HomePageContent styles={styles} />
				<AuthSignIn styles={styles} />
			</main>
		);
	}

	redirect("/dashboard");
}
