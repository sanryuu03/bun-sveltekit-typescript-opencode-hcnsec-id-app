<script lang="ts">
	import { Cat, ExternalLink } from 'lucide-svelte';
	import { Button } from '#lib/components/ui/button';

	interface Props {
		originalUrl: string;
	}

	let { originalUrl }: Props = $props();
</script>

<footer class="border-t">
	<div
		class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6"
	>
		<div class="flex items-center gap-2.5">
			<div class="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<Cat class="size-4.5" />
			</div>
			<div class="text-sm">
				<p class="font-semibold">Catatan OpenCode</p>
				<p class="text-muted-foreground">Dibuat dengan SvelteKit + shadcn-svelte</p>
			</div>
		</div>
		<Button href={originalUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
			<ExternalLink class="size-4" />
			Sumber: hcnote.cn
		</Button>
	</div>
	<p
		class="border-t px-4 py-4 text-center text-xs text-muted-foreground"
	>
		© {new Date().getFullYear()} Terjemahan bebas oleh pengguna · Materi asli © Viero · 幻城云笔记 (Hcnote) ·
		Dibagikan untuk edukasi dengan kredit ke situs asli.
	</p>
</footer>