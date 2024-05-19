import { Suspense } from "react";
import styles from "./index.module.css";
import UserSignIn from "@features/UserSignIn";

export const metadata = {
	title: "Home | Real Time Video Commentary",
};

export default async function HomePage() {
	return (
		<main>
			<div className={`section-container ${styles.contentContainer}`}>
				<h1 className={styles.heading}>Real Time Video Commentary</h1>
				<h2 className={styles.subheading}>
					Make movie binging a little more interesting
				</h2>
				<p className={styles.appDescription}>
					Share your immediate thoughts on your favorite scenes while
					watching with your friends!
				</p>
			</div>
			<Suspense>
				<UserSignIn />
			</Suspense>
		</main>
	);
}
