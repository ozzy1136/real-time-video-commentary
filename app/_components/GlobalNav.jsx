"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function GlobalNav({ classNames }) {
	const segment = useSelectedLayoutSegment();

	return (
		<nav className={classNames.container}>
			<Link
				href={"/dashboard"}
				aria-current={segment === "dashboard" ? "page" : false}
				className={classNames.link}
			>
				Dashboard
			</Link>
		</nav>
	);
}
