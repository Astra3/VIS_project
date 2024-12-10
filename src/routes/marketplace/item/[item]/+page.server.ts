import { db } from '$lib/server/db';
import { marketplace_listings, sets } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const rows = await db.select().from(sets).where(eq(sets.set_num, params.item));
	if (rows.length == 0) {
		error(404, 'item does not exist');
	}
	const listings = await db
		.select()
		.from(marketplace_listings)
		.where(eq(marketplace_listings.set_id, params.item));
	return {
		item: rows[0],
		listings: listings
	};
};
