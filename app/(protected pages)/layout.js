import styles from "./index.module.css";
import ButtonSignOut from "@components/ButtonSignOut";
import GlobalNavLinks from "@components/GlobalNavLinks";

/**
 * @param {Object} props
 * @param {JSX.Element} props.children
 */
export default async function ProtectedRoutesLayout({ children }) {
	return (
		<>
			<div className={`section-container ${styles.container}`}>
				<GlobalNavLinks
					classNames={{
						container: styles.navContainer,
						link: styles.navLink,
					}}
				/>
				<div className={styles.buttonSignOutWrapper}>
					<ButtonSignOut
						classNames={{ buttonSignOut: styles.buttonSignOut }}
					/>
				</div>
			</div>
			{children}
		</>
	);
}
