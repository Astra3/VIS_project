import { db } from '$lib/server/db';
import { marketplace_listings } from '$lib/server/db/schema';
import { error, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();

		const title = data.get('title')?.toString();
		const description = data.get('description')?.toString();
		if (params.item && title && description) {
			await db
				.insert(marketplace_listings)
				.values({ title, description, set_id: params.item, author_id: 1 });
		} else {
			error(400, 'incorrect form data');
		}

		return { success: true };
	}
} satisfies Actions;
