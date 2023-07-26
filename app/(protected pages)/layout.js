import styles from "@styles/ProtectedRoutesLayout.module.css";
import ButtonSignOut from "@components/ButtonSignOut";
import { TmdbApiConfigProvider } from "@context/TmdbApiConfigContext";
import { getTmdbApiConfig } from "@services/tmdb";

export default async function ProtectedRoutesLayout({ children }) {
	const tmdbApiConfig = await getTmdbApiConfig();

	return (
		<TmdbApiConfigProvider value={tmdbApiConfig}>
			<div className="section-container">
				<div className={styles.buttonSignOutWrapper}>
					<ButtonSignOut />
				</div>
			</div>
			{children}
		</TmdbApiConfigProvider>
	);
}
