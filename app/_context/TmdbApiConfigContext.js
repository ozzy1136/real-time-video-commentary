"use client";

import { createContext, useContext } from "react";

const TmdbApiConfigContext = createContext();

export function useTmdbApiConfig() {
	return useContext(TmdbApiConfigContext);
}

export function TmdbApiConfigProvider({ value, children }) {
	return (
		<TmdbApiConfigContext.Provider value={value}>
			{children}
		</TmdbApiConfigContext.Provider>
	);
}
