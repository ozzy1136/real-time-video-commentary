import { z } from "zod";

import { getDayjsDate } from "@lib/dayjs";

export const partyDataSchema = z.object({
	created_at: z.string(),
	creator_id: z.string(),
	id: z.string(),
	movie_runtime: z.number(),
	start_time: z.number(),
	tmdb_id: z.number(),
});

export const postgrestErrorSchema = z
	.object({
		message: z.string(),
		details: z.string(),
		hint: z.string(),
		code: z.string(),
	})
	.nullable();

export const dateStringSchema = z.preprocess(
	(arg) =>
		typeof arg === "string"
			? getDayjsDate({
					dateObj: arg,
					customStringFormat: "YYYY-MM-DD",
			  }).toDate()
			: undefined,
	z
		.date()
		.min(getDayjsDate().startOf("day").toDate())
		.max(getDayjsDate().endOf("day").add(1, "month").toDate()),
);

export const timeStringSchema = z
	.string()
	.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);

export const movieIdSchema = z.string().regex(/^(?=(\d{1,10}))\1$/);
