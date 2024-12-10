<script lang="ts">
	import { Card, Heading, P, Pagination, type LinkType } from 'flowbite-svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
	const sets = data.data;

	const LAST_PAGE = 1208;

	const page_num = data.page;

	let pages: LinkType[] = [];
	const page_range = 2;
	const start = Math.max(page_num - page_range, 1);
	const end = Math.min(page_num + page_range, LAST_PAGE);

	for (let i = start; i <= end; i++) {
		pages.push({ name: i.toString(), href: `/marketplace/${i}`, active: i == page_num });
	}

	function previous() {
		if (page_num != 1) {
			location.href = `/marketplace/${page_num - 1}`;
		}
	}

	function next() {
		if (page_num != LAST_PAGE) {
			location.href = `/marketplace/${page_num + 1}`;
		}
	}
</script>

<div
	class="grid grid-cols-1 justify-between justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-4"
>
	{#each sets as set}
		<Card
			img={set.img_url ?? undefined}
			size="sm"
			imgClass="object-contain"
			horizontal
			href="/marketplace/item/{set.set_num}"
			target="_blank"
			class="h-full w-full transition-all hover:scale-110 hover:shadow-xl"
		>
			<Heading tag="h5">{set.name}</Heading>
			<P>{set.num_parts} {set.num_parts == 1 ? 'part' : 'parts'}</P>
		</Card>
	{/each}
</div>
<div class="my-8 flex justify-center" data-sveltekit-reload>
	<Pagination {pages} on:previous={previous} on:next={next}></Pagination>
</div>
