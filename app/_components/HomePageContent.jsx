/**
 * @param {Object} props
 * @param {{contentContainer: string, heading: string, subheading: string, appDescription: string}} props.classNames - CSS classes used by component
 */
export default function HomePageContent({ classNames }) {
	return (
		<div className={`section-container ${classNames.contentContainer}`}>
			<h1 className={classNames.heading}>Real Time Video Commentary</h1>
			<h2 className={classNames.subheading}>
				Make movie binging a little more interesting
			</h2>
			<p className={classNames.appDescription}>
				Share your immediate thoughts on your favorite scenes while
				watching with your friends!
			</p>
		</div>
	);
}
