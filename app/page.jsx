import styles from "@styles/HomePage.module.css";
import AuthSignIn from "@components/AuthSignIn";
import HomePageContent from "@components/HomePageContent";

export const metadata = {
	title: "Home | Real Time Video Commentary",
};

export default async function HomePage() {
	return (
		<main>
			<HomePageContent
				classNames={{
					contentContainer: styles.contentContainer,
					heading: styles.heading,
					subheading: styles.subheading,
					appDescription: styles.subheading,
				}}
			/>
			<AuthSignIn
				classNames={{
					authUiContainer: styles.authUiContainer,
					authenticationMessage: styles.authenticationMessage,
				}}
			/>
		</main>
	);
}
