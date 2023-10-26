import { z } from "zod";

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

export const dateStringSchema = z
	.string()
	.pipe(
		z.coerce
			.date()
			.min(
				new Date(new Date().setUTCHours(0, 0, 0, 0)),
				"You must choose a date from today"
			)
	);

export const timeStringSchema = z
	.string()
	.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/);
