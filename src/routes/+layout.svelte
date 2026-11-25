<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import AppHeader from '#lib/components/app-header.svelte';
	import AppFooter from '#lib/components/app-footer.svelte';
	import { ORIGINAL_URL } from '#lib/constants';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { children }: LayoutProps = $props();

	let activePage = $derived<'/' | '/desktop' | '/bergambar'>(
		page.url.pathname === '/desktop'
			? '/desktop'
			: page.url.pathname === '/bergambar'
				? '/bergambar'
				: '/'
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<AppHeader originalUrl={ORIGINAL_URL} activePage={activePage} />
	<main class="flex-1">
		{@render children()}
	</main>
	<AppFooter originalUrl={ORIGINAL_URL} />
</div>