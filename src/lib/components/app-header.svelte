<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { Cat, ExternalLink, Languages, Moon, Sun } from 'lucide-svelte';
	import { Badge } from '#lib/components/ui/badge';
	import { Button } from '#lib/components/ui/button';

	interface Props {
		originalUrl: string;
		activePage?: '/' | '/desktop' | '/bergambar';
		children?: Snippet;
	}

	let { originalUrl, activePage = '/', children }: Props = $props();

	let theme = $state<'light' | 'dark'>('light');

	onMount(() => {
		theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}

	function isPage(p: string) {
		return activePage === p;
	}
</script>

<header
	class="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
		<div class="flex items-center gap-3">
			<a href="/" class="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
				<div class="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
					<Cat class="size-4.5" />
				</div>
				<span class="hidden sm:inline">Catatan</span>
				<span class="rounded-sm bg-accent px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
					OpenCode
				</span>
			</a>
			<nav class="ml-1 hidden items-center gap-1 sm:flex">
				<a
					href="/"
					class="rounded-md px-2.5 py-1.5 text-sm transition-colors {isPage('/') ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}"
				>
					Gambaran
				</a>
				<a
					href="/desktop"
					class="rounded-md px-2.5 py-1.5 text-sm transition-colors {isPage('/desktop') ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}"
				>
					Versi Desktop
				</a>
				<a
					href="/bergambar"
					class="rounded-md px-2.5 py-1.5 text-sm transition-colors {isPage('/bergambar') ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}"
				>
					Bergambar
				</a>
			</nav>
		</div>

		<div class="flex items-center gap-2">
			{#if children}
				{@render children()}
			{/if}
			<Badge variant="outline" class="hidden md:inline-flex gap-1 text-[11px]">
				<Languages class="size-3" /> Terjemahan ID
			</Badge>
			<Button
				variant="outline"
				size="sm"
				href={originalUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="gap-1.5 text-xs"
			>
				Link Asli
				<ExternalLink class="size-3.5" />
			</Button>
			<Button variant="ghost" size="icon-sm" onclick={toggleTheme} aria-label="Ganti tema">
				{#if theme === 'dark'}
					<Moon class="size-4" />
				{:else}
					<Sun class="size-4" />
				{/if}
			</Button>
		</div>
	</div>
</header>