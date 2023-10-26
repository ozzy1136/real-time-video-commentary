import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { dateStringSchema, timeStringSchema } from "@lib/zod/schemas/index";
import { createDateElDateString } from "@utils/createDateElementDate";

/**
 * @param {NextRequest} req
 * @returns {Promise<Object>}
 */
export async function POST(req) {
	// if (req.headers.get("enctype") !== "application/x-www-form-urlencoded")
	// 	return NextResponse.json(
	// 		{ success: false, message: "Body enctype is unsupported" },
	// 		{
	// 			status: 404,
	// 			statusText: "Client error",
	// 		}
	// 	);
	// const cookieStore = cookies();
	// const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
	// await supabase
	// 	.from("scheduled_parties")
	// 	.insert(formData.entries())
	// 	.select();
	try {
		const formData = await req.formData();
		const timeValues = timeStringSchema.parse(formData.get("party-time"));
		const data = { success: true, data: timeValues };
		return NextResponse.json(data);
	} catch (error) {
		if (error instanceof ZodError) {
			const validationError = fromZodError(error);
			return NextResponse.json({
				success: false,
				message: validationError.toString(),
			});
		} else {
			return NextResponse.json({
				success: false,
				message: error.message,
			});
		}
	}
}
