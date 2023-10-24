import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { fromZodError } from "zod-validation-error";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { timeStringSchema } from "@lib/zod/schemas/index";
import { createDateElDateString } from "@utils/createDateElementDate";

/**
 * @param {NextRequest} req
 * @returns {Promise<Object>}
 */
export async function POST(req) {
	// const cookieStore = cookies();
	// const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
	const formData = await req.json();
	// await supabase
	// 	.from("scheduled_parties")
	// 	.insert(formData.entries())
	// 	.select();
	try {
		const timeValues = timeStringSchema.parse(formData["party-time"]);
		const data = { success: true, data: timeValues };
		return NextResponse.json(data);
	} catch (error) {
		const validationErrorMessage = fromZodError(error);
		return NextResponse.json({
			success: false,
			message: validationErrorMessage.message,
		});
	}
}
