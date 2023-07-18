import styles from "@styles/DashboardPage.module.css";
import PopularMoviesList from "@components/PopularMoviesList";

export const metadata = {
	title: "Dashboard | Real Time Video Commentary",
};

export default async function DashboardPage() {
	return (
		<div className="section-container">
			<main className={styles.contentContainer}>
				<h1>Your dashboard</h1>
				<h2>Saved watch parties</h2>
				<section>
					<h2>Available movies</h2>
					<PopularMoviesList />
				</section>
			</main>
		</div>
	);
}
