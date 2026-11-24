<script lang="ts">
	import { Check, Copy } from 'lucide-svelte';
	import { Button } from '#lib/components/ui/button';

	interface Props {
		code: string;
		id?: string;
		label?: string;
	}

	let { code, id = code, label = 'Terminal' }: Props = $props();
	let copiedId = $state('');

	function copy() {
		navigator.clipboard?.writeText(code);
		copiedId = id;
		setTimeout(() => {
			if (copiedId === id) copiedId = '';
		}, 1600);
	}
</script>

<div
	class="group relative my-3 overflow-hidden rounded-lg border bg-muted/60"
	data-code-block
>
	<div class="flex items-center justify-between border-b bg-muted/50 px-3 py-1.5">
		<span class="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
			<span class="flex size-2.5 items-center justify-center rounded-full bg-primary/20 text-primary">
				<span class="size-1.5 rounded-full bg-primary"></span>
			</span>
			{label}
		</span>
		<Button variant="ghost" size="icon-xs" onclick={copy} aria-label="Salin kode">
			{#if copiedId === id}
				<Check class="size-3.5 text-emerald-500" />
			{:else}
				<Copy class="size-3.5" />
			{/if}
		</Button>
	</div>
	<pre class="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed"><code>{code}</code></pre>
</div>