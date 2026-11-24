<script lang="ts">
	import { onMount } from 'svelte';
	import {
		ArrowUpRight,
		BookOpen,
		Cat,
		ExternalLink,
		FileCode2,
		KeyRound,
		Languages,
		Moon,
		Package,
		Shield,
		Sun,
		Terminal,
		Monitor,
		Link as LinkIcon
	} from 'lucide-svelte';
	import { cn } from '#lib/utils';
	import { Button } from '#lib/components/ui/button';
	import { Badge } from '#lib/components/ui/badge';
	import { Card, CardContent } from '#lib/components/ui/card';
	import { Separator } from '#lib/components/ui/separator';
	import { Alert, AlertDescription, AlertTitle } from '#lib/components/ui/alert';
	import Step from '#lib/components/step.svelte';
	import CodeBlock from '#lib/components/code-block.svelte';

	const originalUrl = 'https://hcnote.cn/2026/07/22/13230.html';

	let theme = $state<'light' | 'dark'>('light');
	let activeSection = $state('');

	onMount(() => {
		theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}

	function scrollToId(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// --- salin kode ---
	let copied = $state('');

	function copy(text: string, id: string) {
		navigator.clipboard?.writeText(text);
		copied = id;
		setTimeout(() => {
			if (copied === id) copied = '';
		}, 1600);
	}

	const toc = [
		{ id: 'pengantar', label: 'Pengantar' },
		{ id: 'instalasi-cli', label: 'Instalasi Versi CLI' },
		{ id: 'relay-api', label: 'Relay API Model Gratis' },
		{ id: 'token-api', label: 'Membuat Token API' },
		{ id: 'cc-switch', label: 'Menghubungkan Model via CC Switch' },
		{ id: 'pakai-model', label: 'Memakai Model di OpenCode' },
		{ id: 'versi-desktop', label: 'Versi Desktop Windows' },
		{ id: 'note', label: 'Catatan Terjemahan' }
	];

	function isActive(id: string) {
		return activeSection === id;
	}

	function cnLink(id: string) {
		return cn(
			'relative block py-1 pr-3 -ml-px border-l text-muted-foreground transition-colors hover:text-foreground',
			isActive(id) && 'border-primary font-medium text-foreground'
		);
	}
</script>

<svelte:head>
	<title>OpenCode Tanpa Model Default — Panduan Menghubungkan Model Pihak Ketiga (Terjemahan Indonesia)</title>
	<meta
		name="description"
		content="Terjemahan Bahasa Indonesia dari artikel hcnote.cn: cara menghubungkan OpenCode ke model pihak ketiga melalui API relay gratis + CC Switch, tanpa pakai model default."
	/>
</svelte:head>

<!-- ======================= HEADER ======================= -->
<header class="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:px-6">
		<div class="flex items-center gap-2.5">
			<div
				class="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground"
			>
				<Cat class="size-4.5" />
			</div>
			<a
				href="#top"
				class="flex items-center gap-2 text-sm font-semibold tracking-tight"
			>
				<span class="hidden sm:inline">Catatan</span>
				<span class="rounded-sm bg-accent px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
					OpenCode
				</span>
			</a>
		</div>

		<div class="flex items-center gap-2">
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

<!-- ======================= HERO ======================= -->
<section id="top" class="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
	<div class="mx-auto max-w-3xl">
		<div class="flex flex-wrap items-center gap-2">
			<Badge variant="secondary" class="gap-1">
				<BookOpen class="size-3" /> Tutorial Sulap Halaman
			</Badge>
			<Badge variant="outline" class="gap-1">
				<Terminal class="size-3" /> OpenCode
			</Badge>
		</div>

		<h1
			class="mt-5 scroll-m-20 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl md:text-[2.65rem]"
		>
			OpenCode Bisa Dipakai Kayak Gini?<br class="hidden sm:block" />
			<span class="text-muted-foreground">Jangan Pakai Model Default OpenCode Lagi — Ini Cara yang Benar!</span>
		</h1>

		<p class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
			Panduan lengkap terjemahan Bahasa Indonesia dari artikel asli: cara memasang OpenCode
			di CLI maupun desktop, lalu menghubungkannya ke model pihak ketiga melalui
			<strong>relay API model besar gratis</strong> dan <strong>CC Switch</strong>, supaya kamu
			&ldquo;bebas&rdquo; dari model default dan bisa memilih model yang stabil dengan biaya
			gratis.
		</p>

		<!-- Meta bar -->
		<div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
			<span class="flex items-center gap-1.5">
				<span
					class="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground"
				>V</span>
				Penulis asli: <span class="font-medium text-foreground">Viero</span>
			</span>
			<span>Diterbitkan: 22 Jul 2026</span>
			<span class="flex items-center gap-1.5">≈ 10 menit baca</span>
		</div>

		<!-- Credit -->
		<Alert class="mt-7 py-4">
			<Languages class="text-primary" />
			<AlertTitle class="flex items-center gap-2">
				Terjemahan Bahasa Indonesia
				<Badge variant="secondary" class="text-[10px]">Non-resmi</Badge>
			</AlertTitle>
			<AlertDescription>
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p class="max-w-[36rem] text-sm leading-relaxed">
						Halaman ini adalah terjemahan bebas atas artikel
						<span class="text-foreground">&ldquo;Opencode 还能这么玩？别再用 Opencode 的默认模型了，这才是正确的打开方式喵！&rdquo;</span>
						oleh <span class="font-medium text-foreground">Viero</span> dari
						<span class="font-medium text-foreground">幻城云笔记 (Hcnote)</span>. Semua hak
						atas materi asli tetap milik penulis dan situs aslinya.
					</p>
					<Button href={originalUrl} target="_blank" rel="noopener noreferrer" size="sm">
						Kunjungi Artikel Asli
						<ArrowUpRight class="size-4" />
					</Button>
				</div>
			</AlertDescription>
		</Alert>
	</div>
</section>

<!-- ======================= BODY (TOC + CONTENT) ======================= -->
<div class="mx-auto w-full max-w-5xl px-4 sm:px-6">
	<div class="mx-auto grid max-w-5xl gap-10 py-10 lg:grid-cols-[220px_1fr] lg:gap-12">
		<!-- Sidebar TOC -->
		<aside class="hidden lg:block">
			<nav class="sticky top-24">
				<p class="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
					<LinkIcon class="size-3.5" /> Daftar Isi
				</p>
				<ul class="space-y-1 border-l pl-4 text-sm">
					{#each toc as item}
						<li>
							<button
								onclick={() => scrollToId(item.id)}
								class={cnLink(item.id)}
							>
								{item.label}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>

		<!-- Article -->
		<article class="min-w-0">
			<!-- PENGANTAR -->
			<section id="pengantar" class="scroll-mt-24 space-y-4">
				<p class="leading-relaxed text-muted-foreground">
					Hari ini kita membahas tutorial menghubungkan <strong class="text-foreground">OpenCode</strong>
					(situs resmi: <code class="rounded bg-muted px-1.5 py-0.5 text-[13px]">open-code.ai/zh</code>)
					ke model pihak ketiga. Tutorial ini dibagi menjadi dua jalur:
					<span class="font-medium text-foreground">versi CLI (baris perintah)</span> dan
					<span class="font-medium text-foreground">versi desktop (Windows)</span>. Ikuti langkah demi
					langkahnya ya!
				</p>

				<div class="grid gap-3 sm:grid-cols-2">
					<Card class="border-none bg-muted/40 py-5">
						<CardContent class="flex items-start gap-3 px-4">
							<Terminal class="mt-0.5 size-5 shrink-0 text-primary" />
							<div>
								<p class="font-semibold">CLI Version</p>
								<p class="mt-1 text-sm text-muted-foreground">
									Memakai Node.js + PowerShell, cocok untuk yang nyaman di terminal.
								</p>
							</div>
						</CardContent>
					</Card>
					<Card class="border-none bg-muted/40 py-5">
						<CardContent class="flex items-start gap-3 px-4">
							<Monitor class="mt-0.5 size-5 shrink-0 text-primary" />
							<div>
								<p class="font-semibold">Windows Desktop</p>
								<p class="mt-1 text-sm text-muted-foreground">
									Memakai aplikasi desktop CC Switch, lebih visual dan point-and-click.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<Separator class="my-10" />

			<!-- INSTALASI CLI -->
			<section id="instalasi-cli" class="scroll-mt-24 space-y-4">
				<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
					<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
						<Terminal class="size-4.5" />
					</span>
					Instalasi Versi CLI
				</h2>

				<div class="space-y-3">
					<Step n={1} title="Pasang dependensi Node.js">
						Kamu <strong>wajib</strong> menginstal <code class="rounded bg-muted px-1.5 py-0.5 text-[13px]">Node.js</code>.
						Buka browser, cari
						<a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">
							nodejs.org
						</a>,
						lalu unduh dan instal sesuai sistem operasimu.
					</Step>

					<Step n={2} title="Buka PowerShell">
						Setelah Node.js terpasang, buka jendela <strong>PowerShell</strong> di komputermu.
						Semua perintah instalasi dijalankan dari sini.
					</Step>

					<Step n={3} title="Pilih cara instalasi">
						Ada dua cara yang bisa dipakai, pilih salah satu:
						<ul class="mt-3 space-y-3">
							{#each [
								{ t: 'Lewat WSL', d: 'Instal online langsung dari PowerShell menggunakan perintah:',
								  c: 'wsl.exe --install', note: 'Cara ini menginstal lingkungan WSL agar OpenCode berjalan di Linux subsystem.' },
								{ t: 'Lewat npm', d: 'Atau pasang langsung secara global dengan perintah:',
								  c: 'npm install -g opencode-ai', note: 'Ini cara paling sederhana dan langsung menyediakan perintah `opencode`.' }
							] as opt}
								<li class="rounded-lg border p-3.5">
									<p class="text-sm font-medium">{opt.t}</p>
									<p class="mt-1 text-sm text-muted-foreground">{opt.d}</p>
									<CodeBlock id={opt.c} code={opt.c} />
									<p class="mt-2 text-xs text-muted-foreground">{opt.note}</p>
								</li>
							{/each}
						</ul>
					</Step>

					<Step n={4} title="Siapkan model yang tepat">
						Mempakai perangkat sebagus OpenCode, tentu harus ditemani
						<strong>model besar yang mendukung uji coba gratis dan stabil</strong>. Di sini
						penulis merekomendasikan relay API model besar gratis yang akan dijelaskan
						di bagian berikutnya.
					</Step>
				</div>
			</section>

			<Separator class="my-10" />

			<!-- RELAY API -->
			<section id="relay-api" class="scroll-mt-24 space-y-4">
				<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
					<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
						<Shield class="size-4.5" />
					</span>
					Relay API Model Besar Gratis
				</h2>

				<Card class="py-5">
					<CardContent class="space-y-3 px-4 sm:px-6">
						<div class="flex flex-wrap items-center justify-between gap-2">
							<p class="font-semibold">新疆幻城网安科技 · API 中转站 (Relay API)</p>
							<Badge variant="secondary" class="gap-1">
								<Shield class="size-3" /> Gratis / 公益
							</Badge>
						</div>
						<p class="text-sm leading-relaxed text-muted-foreground">
							Relay open-source (berbasis NewAPI) yang menyediakan layanan panggilan API model besar
							secara gratis dan terpadu. Penulis menyebutkan banyak model bagus yang sudah teruji
							di sini dan cukup memenuhi mayoritas kebutuhan.
						</p>
						<div class="flex flex-wrap gap-2 pt-1">
							<Button href="https://api.hcnsec.cn/" target="_blank" rel="noopener noreferrer" size="sm">
								Buka Konsol API
								<ArrowUpRight class="size-4" />
							</Button>
							<Button href={originalUrl} target="_blank" rel="noopener noreferrer" size="sm" variant="outline">
								Doc versi asli
							</Button>
						</div>
					</CardContent>
				</Card>

				<div class="space-y-3">
					<Step n={1} title="Daftar akun">
						Buka situs relay, lalu klik tombol <strong>Daftar (注册)</strong> di pojok
						kanan atas halaman.
					</Step>
					<Step n={2} title="Daftar pakai email">
						Gunakan alamat <strong>email</strong> kamu untuk membuat akun. Isi data dan
						verifikasi seperti biasanya, lalu masuk ke akunmu.
					</Step>
				</div>
			</section>

			<Separator class="my-10" />

			<!-- TOKEN API -->
			<section id="token-api" class="scroll-mt-24 space-y-4">
				<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
					<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
						<KeyRound class="size-4.5" />
					</span>
					Membuat Token API
				</h2>

				<div class="space-y-3">
					<Step n={1} title="Buka manajemen token">
						Di dalam konsol, masuk ke bagian <strong>Manajemen Token (令牌管理)</strong>.
					</Step>
					<Step n={2} title="Tambahkan token baru">
						Klik tombol <strong>Tambah Token (添加令牌)</strong>.
					</Step>
					<Step n={3} title="Isi pengaturan token">
						Isi <strong>nama token</strong>, pilih <strong>grup default</strong>, lalu
						<strong>centang opsi &ldquo;kuota tanpa batas&rdquo; (无限额度)</strong>. Penulis
						menekankan bahwa <span class="font-medium text-foreground">langkah ini sangat penting</span>.
					</Step>
					<Step n={4} title="Salin API key">
						Setelah token dibuat, <strong>salin</strong> nilai <strong>API key</strong>-nya.
						Kita akan gunakan di langkah konfigurasi CC Switch berikutnya.
					</Step>
				</div>

				<Alert variant="destructive" class="mt-2">
					<KeyRound />
					<AlertTitle>Jaga kerahasiaan API key</AlertTitle>
					<AlertDescription>
						API key bersifat sensitif. Jangan pernah membagikannya, meng-commit ke repositori
						publik, atau menampilkannya di tangkapan layar yang bisa dilihat orang lain.
					</AlertDescription>
				</Alert>
			</section>

			<Separator class="my-10" />

			<!-- CC SWITCH -->
			<section id="cc-switch" class="scroll-mt-24 space-y-4">
				<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
					<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
						<FileCode2 class="size-4.5" />
					</span>
					Menghubungkan Model via CC Switch
				</h2>

				<div class="space-y-3">
					<Step n={1} title="Buka situs resmi CC Switch">
						Buka
						<a href="https://ccswitch.io/zh/" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">ccswitch.io/zh/</a>
						dan masuk ke halaman unduh.
					</Step>
					<Step n={2} title="Pilih versi yang sesuai">
						Pilih paket instalasi sesuai sistem operasimu. Kalau bingung, kamu bisa bergabung
						dengan grup resmi relay untuk bertanya. Versi yang dipakai penulis adalah
						<strong>desktop (Windows)</strong>.
					</Step>
					<Step n={3} title="Instal aplikasi">
						Setelah selesai diunduh, instal dengan <strong>mengklik dua kali</strong> lalu
						ikuti proses instalasi sampai selesai.
					</Step>
					<Step n={4} title="Pilih target OpenCode">
						Setelah terbuka, pilih menu untuk <strong>OpenCode</strong> (ikon kelima yang
						ditandai pada gambar asli).
					</Step>
					<Step n={5} title="Buat konfigurasi kustom">
						Klik tombol <strong>Tambah (添加)</strong> di pojok kanan atas, lalu pilih
						<strong>Konfigurasi Kustom (自定义配置)</strong>. Gulir ke bawah menuju isian konfigurasi.
					</Step>

					<!-- Form table -->
					<li class="mt-3 list-none rounded-lg border p-4">
						<p class="flex items-center gap-1.5 text-sm font-medium">
							<Package class="size-4 text-primary" /> Isian konfigurasi
						</p>
						<div class="mt-3 overflow-x-auto">
							<table class="w-full text-sm">
								<tbody class="divide-y">
									{#each [
										{ f: 'Provider ID', v: 'Sama dengan nama provider', tip: 'Isi ID & nama harus sama' },
										{ f: 'Nama Provider', v: 'api.hcnsec.cn', tip: 'Isian harus konsisten dengan ID' },
										{ f: 'URL / Endpoint', v: 'https://api.hcnsec.cn/v1', tip: 'Tambah akhiran /v1' },
										{ f: 'Interface / API', v: 'Biarkan default', tip: 'Tidak perlu diubah' },
										{ f: 'API Key', v: '[API key yang tadi disalin]', tip: 'Tempel key dari relay' }
									] as row}
										<tr>
											<td class="whitespace-nowrap py-2 pr-4 align-top font-medium">
												<p>{row.f}</p>
												<p class="text-xs font-normal text-muted-foreground">{row.tip}</p>
											</td>
											<td class="py-2 align-top">
												<code class="break-all rounded bg-muted px-1.5 py-0.5 text-[13px]">{row.v}</code>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
						<p class="mt-3 text-xs text-muted-foreground">
							Catatan penulis: untuk <strong>supplier identifier (ID)</strong> dan
							<strong>nama</strong>, isi dengan nilai yang sama. Tautan resmi diisi
							<code class="rounded bg-muted px-1 py-0.5">api.hcnsec.cn/</code>, dan pengaturan
							interface tidak perlu diubah.
						</p>
					</li>

					<Step n={6} title="Tambahkan model">
						Di bagian <strong>Model</strong>, pilih <strong>Tambah Model</strong>. Isi nama model
						dan pastikan <strong>nama model sama persis</strong> dengan identitas model yang tersedia
						di relay, lalu <strong>simpan</strong>.
					</Step>
					<Step n={7} title="Tambahkan ke daftar aktif">
						Klik tombol <strong>tambah di bagian tengah</strong> (posisi yang ditandai pada gambar
						asli) agar konfigurasi ini masuk ke daftar provider yang aktif/terpakai.
					</Step>
				</div>
			</section>

			<Separator class="my-10" />

			<!-- PAKAI MODEL -->
			<section id="pakai-model" class="scroll-mt-24 space-y-4">
				<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
					<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
						<Cat class="size-4.5" />
					</span>
					Memakai Model Baru di OpenCode
				</h2>

				<div class="space-y-3">
					<Step n={1} title="Buka kembali terminal">
						Buka <strong>jendela PowerShell baru</strong>, lalu jalankan perintah
						<code class="rounded bg-muted px-1.5 py-0.5 text-[13px]">opencode</code>
						untuk memulai OpenCode (cek situs resmi
						<a href="https://open-code.ai/zh" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">open-code.ai/zh</a>).
					</Step>
					<Step n={2} title="Panggil daftar model">
						Di dalam antarmuka OpenCode, ketik:
						<CodeBlock id="slash-model" code="/model" />
						Lalu tekan <strong>Enter</strong>.
					</Step>
					<Step n={3} title="Pilih model & selesai">
						Di bawah, kamu sudah bisa melihat <strong>model yang barusan dikonfigurasi</strong>.
						Pilih model tersebut (gunakan tombol Enter) dan&hellip; selesai! Sekarang OpenCode
						akan berjalan dengan model pihak ketiga pilihanmu, bukan lagi model default. 🎉
					</Step>
				</div>
			</section>

			<Separator class="my-10" />

			<!-- VERSI DESKTOP -->
			<section id="versi-desktop" class="scroll-mt-24 space-y-4">
				<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
					<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
						<Monitor class="size-4.5" />
					</span>
					Versi Desktop Windows
				</h2>
				<p class="leading-relaxed text-muted-foreground">
					Artikel asli menampilkan jalur <strong>versi desktop</strong> sebagai pelengkap selain CLI.
					Intinya sama: pasang komponen desktop, konfigurasikan provider yang sama di CC Switch,
					isi API key dan endpoint relay, aktifkan konfigurasi, lalu pilih model di dalam OpenCode.
					Bagian ini diilustrasikan lewat tangkapan layar di sumber aslinya.
				</p>
				<div class="grid gap-3 sm:grid-cols-3">
					{#each [
						{ t: 'Tambah Provider', s: 'Tambah → Konfigurasi Kustom → isi ID, nama & endpoint' },
						{ t: 'Aktifkan Router', s: 'Pastikan routing / konfigurasi dalam keadaan aktif (slide on)' },
						{ t: 'Pilih Model', s: 'Di menu model OpenCode, pilih model yang sudah dihubungkan' }
					] as st}
						<Card class="border-none bg-muted/40 py-4">
							<CardContent class="px-4">
								<p class="font-semibold">{st.t}</p>
								<p class="mt-1 text-sm leading-relaxed text-muted-foreground">{st.s}</p>
							</CardContent>
						</Card>
					{/each}
				</div>
				<p class="text-sm text-muted-foreground">
					💡 Untuk detail visual tiap langkah (letak tombol, urutan klik), silakan buka
					<a href={originalUrl} target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">artikel aslinya</a>
					yang memuat seluruh tangkapan layar (gambar 1–21).
				</p>
			</section>

			<Separator class="my-10" />

			<!-- CATATAN -->
			<section id="note" class="scroll-mt-24 space-y-4">
				<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
					<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
						<Languages class="size-4.5" />
					</span>
					Catatan Terjemahan
				</h2>
				<div class="space-y-3">
					<Alert>
						<Shield class="text-primary" />
						<AlertTitle>Punya model pilihan sendiri? Tidak masalah</AlertTitle>
						<AlertDescription>
							Tutorial ini memakai relay <strong>api.hcnsec.cn</strong> sebagai contoh. Prinsip yang
							sama (buat API key → konfigurasi provider di CC Switch → pilih model) bisa dipakai
							untuk provider lain yang kompatibel dengan format OpenAI.
						</AlertDescription>
					</Alert>
					<Alert>
						<Languages class="text-primary" />
						<AlertTitle>Tentang halaman ini</AlertTitle>
						<AlertDescription>
							Terjemahan ini dibuat untuk tujuan <strong>berbagi dan edukasi</strong>. Data teknis
							(endpoint, nama tombol, nama model) bisa berubah; selalu verifikasi ke dokumentasi
							resmi dan artikel asli. Bila kamu adalah pemilik hak artikel dan ingin terjemahan
							ini dihapus, silakan hubungi kami.
						</AlertDescription>
					</Alert>
				</div>

				<div class="mt-6 flex flex-col gap-2 rounded-lg border p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
					<p class="flex items-center gap-2 text-muted-foreground">
						<LinkIcon class="size-4 text-primary" />
						<span>Artikel asli (untuk kredit &amp; sumber):</span>
					</p>
					<a
						href={originalUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="break-all font-medium text-primary hover:underline"
					>
						{originalUrl}
					</a>
				</div>
			</section>
		</article>
	</div>
</div>

<!-- ======================= FOOTER ======================= -->
<footer class="border-t">
	<div class="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
		<div class="flex items-center gap-2.5">
			<div class="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
				<Cat class="size-4.5" />
			</div>
			<div class="text-sm">
				<p class="font-semibold">Catatan OpenCode</p>
				<p class="text-muted-foreground">
					Dibuat dengan SvelteKit + shadcn-svelte
				</p>
			</div>
		</div>
		<Button href={originalUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
			<ExternalLink class="size-4" />
			Sumber: hcnote.cn
		</Button>
	</div>
	<p class="border-t px-4 py-4 text-center text-xs text-muted-foreground">
		© {new Date().getFullYear()} Terjemahan bebas oleh pengguna · Materi asli © Viero · 幻城云笔记 (Hcnote) ·
		Dibagikan untuk edukasi dengan kredit ke situs asli.
	</p>
</footer>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(body) {
		-webkit-font-smoothing: antialiased;
	}
</style>