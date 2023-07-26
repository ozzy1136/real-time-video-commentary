import styles from "@styles/HomePage.module.css";
import AuthSignIn from "@components/AuthSignIn";
import HomePageContent from "@components/HomePageContent";

export const metadata = {
	title: "Home | Real Time Video Commentary",
};

export default async function HomePage() {
	return (
		<main>
			<HomePageContent styles={styles} />
			<AuthSignIn styles={styles} />
		</main>
	);
}
