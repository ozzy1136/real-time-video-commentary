import styles from "@styles/ProtectedRoutesLayout.module.css";
import ButtonSignOut from "@components/ButtonSignOut";

export default function ProtectedRoutesLayout({ children }) {
	return (
		<>
			<div className="section-container">
				<div className={styles.buttonSignOutWrapper}>
					<ButtonSignOut />
				</div>
			</div>
			{children}
		</>
	);
}
