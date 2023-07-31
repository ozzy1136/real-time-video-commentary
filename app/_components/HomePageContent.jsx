export default function HomePageContent({ styles }) {
	return (
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
	);
}
