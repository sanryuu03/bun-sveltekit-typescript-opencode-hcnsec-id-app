<script lang="ts">
	import { Card, CardContent } from '#lib/components/ui/card';

	interface Props {
		n: number;
		title: string;
		children: import('svelte').Snippet;
		class?: string;
	}

	let { n, title, children, class: className = '' }: Props = $props();
</script>

<Card class="border-border/70 py-4 transition-shadow hover:shadow-sm">
	<CardContent class="flex gap-4 px-4 sm:px-5">
		<div
			class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
		>
			{n}
		</div>
		<div class="min-w-0 flex-1">
			<p class="font-semibold text-[15px]">{title}</p>
			<div class="prose-sm mt-1.5 text-sm leading-relaxed text-muted-foreground">
				{@render children()}
			</div>
		</div>
	</CardContent>
</Card>