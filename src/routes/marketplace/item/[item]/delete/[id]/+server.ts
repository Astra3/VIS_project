import { db } from '$lib/server/db';
import { marketplace_listings } from '$lib/server/db/schema';
import { redirect, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	if (params.id) {
		await db.delete(marketplace_listings).where(eq(marketplace_listings.id, parseInt(params.id)));
	}

	const item = params.item;
	return redirect(301, `/marketplace/item/${item}?deleted`);
};
