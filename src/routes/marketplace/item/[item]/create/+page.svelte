<script lang="ts">
	import { page } from '$app/stores';
	import { Alert, Button, FloatingLabelInput, Label, Textarea } from 'flowbite-svelte';
	import { get } from 'svelte/store';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	const set = get(page).params.item;
</script>

{#if form?.success}
	<Alert color="green" class="mb-4" border>Your listing was successfully created!</Alert>
{/if}

<div class="md:mx-32">
	<form method="POST">
		<FloatingLabelInput style="filled" value={set} id="set" name="set" disabled classDiv="mb-4">
			Set
		</FloatingLabelInput>
		<FloatingLabelInput style="filled" id="title" classDiv="mb-4" name="title"
			>Title</FloatingLabelInput
		>
		<Label for="description">Description</Label>
		<Textarea
			id="description"
			placeholder="Item is in a good condition, ..."
			name="description"
			required
		/>
		<Button class="mt-8" type="submit">Submit</Button>
	</form>
</div>
