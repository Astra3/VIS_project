import { db } from '$lib/server/db';
import { sets } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

const PAGE_LIMIT = 20;

export const load: PageServerLoad = async ({ params }) => {
	const page = parseInt(params.page);
	const offset = page * PAGE_LIMIT - PAGE_LIMIT;
	const data = await db.select().from(sets).orderBy(sets.name).limit(PAGE_LIMIT).offset(offset);
	return {
		data: data,
		page: page
	};
};
