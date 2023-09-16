import "@styles/global.css";

/**
 * @param {Object} props
 * @param {JSX.Element} props.children
 */
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
