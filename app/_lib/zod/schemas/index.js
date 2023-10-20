import { z } from "zod";

export const partyDataSchema = z.object({
	created_at: z.string(),
	creator_id: z.string(),
	id: z.string(),
	movie_runtime: z.number(),
	start_time: z.string(),
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

export const availablePartyTimeSchema = z.tuple([
	z.number().int().nonnegative().lte(23),
	z.number().int().nonnegative().lte(59),
]);
