<script lang="ts">
	import { Alert, Button, Card, Heading, Li, List, P } from 'flowbite-svelte';
	import { CirclePlusSolid, TrashBinSolid } from 'flowbite-svelte-icons';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';

	let { data }: { data: PageServerData } = $props();
	const item = data.item;
	const listings = data.listings;
</script>

{#if $page.url.searchParams.has('deleted')}
	<Alert color="green" class="mb-4" border>Listing succesfully deleted!</Alert>
{/if}

<Heading tag="h1" class="mb-5">{item.set_num} &mdash; {item.name}</Heading>
{#if item.img_url}
	<img src={item.img_url} alt="Set" class="mb-5" />
{/if}
<List class="mb-5 text-gray-500 dark:text-gray-400">
	<Li><strong class="text-gray-800 dark:text-gray-200">Set Number:</strong>&nbsp;{item.set_num}</Li>
	<Li><strong class="text-gray-800 dark:text-gray-200">Release Year:</strong>&nbsp;{item.year}</Li>
	<Li><strong class="text-gray-800 dark:text-gray-200">Parts:</strong>&nbsp;{item.num_parts}</Li>
</List>
<Button href="{item.set_num}/create" class="mb-4">
	<CirclePlusSolid class="me-2 h-5 w-5" />Create Listing
</Button>

<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
	{#each listings as listing}
		<Card horizontal size="none" img={listing.image ?? undefined}>
			<Heading tag="h5">{listing.title}</Heading>
			<P>{listing.description}</P>
			<Button color="red" href="{item.set_num}/delete/{listing.id}" class="ms-2"
				><TrashBinSolid /></Button
			>
		</Card>
	{:else}
		<P>There are no listings for this set!</P>
	{/each}
</div>
