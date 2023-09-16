import styles from "@styles/ProtectedRoutesLayout.module.css";
import ButtonSignOut from "@components/ButtonSignOut";
import GlobalNav from "@components/GlobalNav";

/**
 * @param {Object} props
 * @param {JSX.Element} props.children
 */
export default async function ProtectedRoutesLayout({ children }) {
	return (
		<>
			<div className={`section-container ${styles.container}`}>
				<GlobalNav
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
