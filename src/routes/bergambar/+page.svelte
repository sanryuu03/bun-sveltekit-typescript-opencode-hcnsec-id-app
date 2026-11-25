<script lang="ts">
	import {
		ArrowLeft,
		ArrowUpRight,
		BookOpen,
		Images,
		Languages,
		Monitor,
		Wrench,
		KeyRound,
		Cable,
		PlayCircle
	} from 'lucide-svelte';
	import { Button } from '#lib/components/ui/button';
	import { Badge } from '#lib/components/ui/badge';
	import { Separator } from '#lib/components/ui/separator';
	import { Alert, AlertDescription, AlertTitle } from '#lib/components/ui/alert';
	import Step from '#lib/components/step.svelte';
	import Screenshot from '#lib/components/screenshot.svelte';
	import { ORIGINAL_URL } from '#lib/constants';

	// Peta gambar asli (diunduh dari artikel sumber) -> file lokal
	const dir = '/images/opencode';
	const shots = {
		1: { f: 'ilustrasi-01.png', c: 'Unduh lalu instal Node.js dari nodejs.org.' },
		2: { f: 'ilustrasi-02.png', c: 'Buka jendela PowerShell.' },
		3: { f: 'ilustrasi-03.png', c: 'Opsi 1: jalankan perintah wsl.exe --install.' },
		4: { f: 'ilustrasi-04.png', c: 'Opsi 2: pasang langsung dengan npm install -g opencode-ai.' },
		5: { f: 'ilustrasi-05.jpeg', c: 'Halaman relay API — klik tombol Daftar di pojok kanan atas.' },
		6: { f: 'ilustrasi-06.png', c: 'Daftar menggunakan alamat email.' },
		7: { f: 'ilustrasi-07.jpeg', c: 'Di konsol, buka bagian Manajemen Token.' },
		8: { f: 'ilustrasi-08.jpeg', c: 'Klik Tambah Token.' },
		9: { f: 'ilustrasi-09.jpeg', c: 'Isi nama, pilih grup default, dan centang kuota tanpa batas.' },
		10: { f: 'ilustrasi-10.jpeg', c: 'Salin API key yang baru dibuat.' },
		11: { f: 'ilustrasi-11.png', c: 'Buka situs resmi CC Switch.' },
		12: { f: 'ilustrasi-12.png', c: 'Di halaman unduh, pilih versi Windows.' },
		13: { f: 'ilustrasi-13.png', c: 'Setelah terbuka, pilih ikon OpenCode (ikon kelima, ditandai).' },
		14: { f: 'ilustrasi-14.png', c: 'Klik Tambah di kanan atas, lalu pilih Konfigurasi Kustom.' },
		15: { f: 'ilustrasi-15.png', c: 'Isi Supplier ID & Nama dengan nilai sama; tautan resmi api.hcnsec.cn/.' },
		16: { f: 'ilustrasi-16.png', c: 'Tempel API key, dan isi URL https://api.hcnsec.cn/v1.' },
		17: { f: 'ilustrasi-17.png', c: 'Bagian Model → Tambah Model; nama model harus sama, lalu simpan.' },
		18: { f: 'ilustrasi-18.png', c: 'Klik Tambah di bagian tengah agar provider aktif.' },
		19: { f: 'ilustrasi-19.png', c: 'Buka PowerShell baru, jalankan perintah opencode.' },
		20: { f: 'ilustrasi-20.png', c: 'Ketik /model — model hasil konfigurasi muncul di daftar.' },
		21: { f: 'ilustrasi-21.png', c: 'Pilih model lalu tekan Enter. Selesai!' },
		22: { f: 'ilustrasi-22.png', c: 'Unduh installer versi desktop dari situs resmi OpenCode.' },
		23: { f: 'ilustrasi-23.png', c: 'Instal (klik dua kali), tunggu, lalu buka aplikasinya.' },
		24: { f: 'ilustrasi-24.png', c: 'Konfigurasi CC Switch sebelumnya membuat desktop bisa ganti model langsung.' },
		25: { f: 'ilustrasi-25.png', c: 'Pilih model yang sudah dihubungkan. Selesai!' }
	} as const;

	type ShotKey = keyof typeof shots;

	const stages = [
		{
			id: 'persiapan',
			icon: Wrench,
			title: 'Tahap 1 — Persiapan & Pasang OpenCode (CLI)',
			desc: 'Instal Node.js, lalu pasang OpenCode lewat PowerShell.',
			steps: [1, 2, 3, 4] as ShotKey[]
		},
		{
			id: 'relay',
			icon: Cable,
			title: 'Tahap 2 — Daftar Relay & Buat Token API',
			desc: 'Buat akun di relay gratis dan simpan API key-mu.',
			steps: [5, 6, 7, 8, 9, 10] as ShotKey[]
		},
		{
			id: 'ccswitch',
			icon: KeyRound,
			title: 'Tahap 3 — Hubungkan Model lewat CC Switch',
			desc: 'Pasang CC Switch dan isi konfigurasi provider + model.',
			steps: [11, 12, 13, 14, 15, 16, 17, 18] as ShotKey[]
		},
		{
			id: 'pakai',
			icon: PlayCircle,
			title: 'Tahap 4 — Pakai Model Baru',
			desc: 'Pilih model yang sudah dikonfigurasi lewat perintah /model.',
			steps: [19, 20, 21] as ShotKey[]
		},
		{
			id: 'desktop',
			icon: Monitor,
			title: 'Tahap 5 — Versi Desktop Windows',
			desc: 'Sama seperti di atas, tapi lewat aplikasi desktop.',
			steps: [22, 23, 24, 25] as ShotKey[]
		}
	];

	function srcFor(n: ShotKey) {
		return `${dir}/${shots[n].f}`;
	}
	function capFor(n: ShotKey) {
		return shots[n].c;
	}

	function scrollToId(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<svelte:head>
	<title>Panduan Bergambar untuk Pemula — OpenCode Model Pihak Ketiga (Terjemahan ID)</title>
	<meta
		name="description"
		content="Panduan bergambar langkah-demi-langkah (terjemahan Bahasa Indonesia) untuk menghubungkan OpenCode ke model pihak ketiga via CC Switch + relay API gratis. Cocok untuk pemula."
	/>
</svelte:head>

<section id="top" class="mx-auto w-full max-w-4xl px-4 pt-10 sm:px-6 sm:pt-14">
	<div class="mx-auto max-w-3xl">
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeft class="size-4" />
			Kembali ke panduan utama
		</a>

		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="gap-1">
				<Images class="size-3" /> Panduan Bergambar
			</Badge>
			<Badge variant="outline" class="gap-1">
				<BookOpen class="size-3" /> Untuk Pemula
			</Badge>
		</div>

		<h1 class="mt-5 scroll-m-20 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
			Panduan Bergambar: Pasang OpenCode &amp; Ganti ke Model Pilihanmu
		</h1>

		<p class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
			Versi ini dilengkapi <strong>tangkapan layar asli</strong> dari artikel sumber, jadi kamu bisa
			mengikuti sambil mencocokkan tampilan layar. Setiap gambar bisa <strong>diklik untuk diperbesar</strong>.
			Cocok untuk yang baru pertama kali mencoba.
		</p>

		<Alert class="mt-7 py-4">
			<Languages class="text-primary" />
			<AlertTitle class="flex items-center gap-2">
				Terjemahan &amp; kredit gambar
				<Badge variant="secondary" class="text-[10px]">Non-resmi</Badge>
			</AlertTitle>
			<AlertDescription>
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p class="max-w-[36rem] text-sm leading-relaxed">
						Teks diterjemahkan bebas dari artikel
						<span class="text-foreground">&ldquo;Opencode 还能这么玩？&rdquo;</span>
						oleh <span class="font-medium text-foreground">Viero</span> ·
						<span class="font-medium text-foreground">幻城云笔记 (Hcnote)</span>.
						<strong>Semua tangkapan layar adalah milik penulis/situs aslinya</strong> dan disertakan
						dengan kredit untuk tujuan edukasi.
					</p>
					<Button href={ORIGINAL_URL} target="_blank" rel="noopener noreferrer" size="sm">
						Artikel Asli
						<ArrowUpRight class="size-4" />
					</Button>
				</div>
			</AlertDescription>
		</Alert>

		<!-- Navigasi tahap -->
		<nav class="mt-6 flex flex-wrap gap-2">
			{#each stages as st (st.id)}
				<button
					onclick={() => scrollToId(st.id)}
					class="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
				>
					{st.title.split(' — ')[0]}
				</button>
			{/each}
		</nav>
	</div>
</section>

<div class="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
	<article class="mx-auto max-w-3xl">
		{#each stages as st, si (st.id)}
			<section id={st.id} class="scroll-mt-24">
				<div class="flex items-start gap-3">
					<div
						class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
					>
						<st.icon class="size-5" />
					</div>
					<div>
						<h2 class="scroll-m-20 text-xl font-bold tracking-tight sm:text-2xl">{st.title}</h2>
						<p class="mt-1 text-sm text-muted-foreground">{st.desc}</p>
					</div>
				</div>

				<div class="mt-5 space-y-4 border-l-2 border-dashed pl-4 sm:pl-6">
					{#each st.steps as n}
						<div>
							<Step n={n} title={capFor(n)}>
								<Screenshot src={srcFor(n)} alt={capFor(n)} caption={capFor(n)} {n} />
							</Step>
						</div>
					{/each}
				</div>

				{#if si < stages.length - 1}
					<Separator class="my-10" />
				{/if}
			</section>
		{/each}

		<!-- Penutup -->
		<div class="mt-10 rounded-xl border bg-muted/40 p-5">
			<h2 class="flex items-center gap-2 text-lg font-bold tracking-tight">
				🎉 Selesai!
			</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted-foreground">
				Itu tadi seluruh langkah menghubungkan OpenCode ke model pihak ketiga — dari instalasi sampai
				memilih model, baik versi CLI maupun desktop. Kalau ada langkah yang berbeda di tampilanmu,
				kemungkinan versi aplikasinya sudah diperbarui; selalu cek dokumentasi resmi dan
				<a href={ORIGINAL_URL} target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">artikel aslinya</a>.
			</p>
			<div class="mt-4 flex flex-col gap-2 sm:flex-row">
				<Button href="/" variant="secondary">
					<ArrowLeft class="size-4" />
					Panduan utama (teks)
				</Button>
				<Button href="/desktop" variant="outline">
					<Monitor class="size-4" />
					Detail versi desktop
				</Button>
			</div>
		</div>

		<Alert variant="destructive" class="mt-6">
			<KeyRound />
			<AlertTitle>Ingat keamanan</AlertTitle>
			<AlertDescription>
				Jangan pernah membagikan API key-mu. Gambar pada panduan ini berasal dari artikel asli dan
				mungkin menampilkan akun/URL contoh — jangan meniru untuk membagikan data sensitif.
			</AlertDescription>
		</Alert>
	</article>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>