<script lang="ts">
	import { Maximize2 } from 'lucide-svelte';

	interface Props {
		src: string;
		alt: string;
		caption?: string;
		n?: number;
	}

	let { src, alt, caption, n }: Props = $props();
</script>

<figure class="my-4">
	<a
		href={src}
		target="_blank"
		rel="noopener noreferrer"
		class="group relative block overflow-hidden rounded-lg border bg-muted/30 shadow-sm transition-shadow hover:shadow-md"
		aria-label={`Buka gambar: ${alt}`}
	>
		<img
			{src}
			{alt}
			loading="lazy"
			decoding="async"
			class="mx-auto block h-auto w-full object-contain"
		/>
		<span
			class="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-[11px] font-medium text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
		>
			<Maximize2 class="size-3" /> Perbesar
		</span>
	</a>
	{#if caption || n}
		<figcaption class="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
			{#if n}
				<span
					class="mt-px flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary"
				>
					{n}
				</span>
			{/if}
			<span>{caption ?? alt}</span>
		</figcaption>
	{/if}
</figure>