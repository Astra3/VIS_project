<script lang="ts">
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="m-2">
	<Navbar rounded color="form">
		<NavBrand href="/">
			<span class="self-center text-center">Bricker</span>
		</NavBrand>
		<div class="flex md:order-2">
			<DarkMode />
			<NavHamburger />
		</div>
		<NavUl>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/marketplace">Marketplace</NavLi>
		</NavUl>
	</Navbar>
</div>

<main class="p-2">
	{@render children()}
</main>
