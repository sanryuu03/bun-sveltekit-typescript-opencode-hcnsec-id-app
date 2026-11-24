<script lang="ts">
	import {
		ArrowLeft,
		ArrowUpRight,
		BookOpen,
		FileCode2,
		KeyRound,
		Languages,
		Monitor,
		Package,
		PlugZap,
		Shield,
		Wifi
	} from 'lucide-svelte';
	import { Button } from '#lib/components/ui/button';
	import { Badge } from '#lib/components/ui/badge';
	import { Separator } from '#lib/components/ui/separator';
	import { Alert, AlertDescription, AlertTitle } from '#lib/components/ui/alert';
	import Step from '#lib/components/step.svelte';
	import CodeBlock from '#lib/components/code-block.svelte';
	import { ORIGINAL_URL } from '#lib/constants';
</script>

<svelte:head>
	<title>Versi Desktop Windows — Panduan OpenCode (Terjemahan Indonesia)</title>
	<meta
		name="description"
		content="Terjemahan Bahasa Indonesia, bagian versi desktop Windows dari tutorial OpenCode menghubungkan model pihak ketiga via CC Switch + relay api.hcnsec.cn."
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
				<Monitor class="size-3" /> Versi Desktop
			</Badge>
			<Badge variant="outline" class="gap-1">
				<BookOpen class="size-3" /> Windows
			</Badge>
		</div>

		<h1 class="mt-5 scroll-m-20 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
			Panduan Desktop Windows untuk Model Pihak Ketiga
		</h1>

		<p class="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
			Halaman ini khusus membahas rekan-rekan yang memakai <strong>OpenCode versi desktop di Windows</strong>.
			Alurnya hampir sama dengan versi CLI, tapi semua dilakukan lewat antarmuka visual
			<strong>CC Switch</strong>: pasang aplikasinya, isi konfigurasi provider, lalu pilih model.
		</p>

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
						Bagian ini adalah terjemahan bebas dari sub-bab &ldquo;Versi Desktop Windows&rdquo; pada artikel
						<span class="text-foreground">&ldquo;Opencode 还能这么玩？别再用 Opencode 的默认模型了&rdquo;</span>
						oleh <span class="font-medium text-foreground">Viero</span> dari
						<span class="font-medium text-foreground">幻城云笔记 (Hcnote)</span>. Hak materi asli tetap milik
						penulis &amp; situs aslinya.
					</p>
					<Button href={ORIGINAL_URL} target="_blank" rel="noopener noreferrer" size="sm">
						Artikel Asli
						<ArrowUpRight class="size-4" />
					</Button>
				</div>
			</AlertDescription>
		</Alert>
	</div>
</section>

<div class="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
	<article class="mx-auto max-w-3xl space-y-4">
		<div class="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
			<PlugZap class="mt-0.5 size-5 shrink-0 text-primary" />
			<p class="text-sm leading-relaxed text-muted-foreground">
				Sebelum lanjut, pastikan kamu sudah punya <strong class="text-foreground">API key</strong> dari relay
				(<code class="rounded bg-muted px-1.5 py-0.5 text-[13px]">api.hcnsec.cn</code>) — langkah mendaftar dan
				membuat token dijelaskan lengkap di <a href="/#relay-api" class="font-medium text-primary hover:underline">panduan utama</a>.
			</p>
		</div>

		<Separator class="my-10" />

		<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
			<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
				<Monitor class="size-4.5" />
			</span>
			Instalasi CC Switch di Windows
		</h2>

		<div class="space-y-3">
			<Step n={1} title="Unduh CC Switch">
				Buka situs resmi
				<a href="https://ccswitch.io/zh/" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">ccswitch.io/zh/</a>,
				lalu pilih <strong>paket instalasi Windows</strong> pada halaman unduh. Kalau ragu antara versi
				mana yang cocok, bisa bergabung dengan grup resmi relay untuk bertukar info.
			</Step>
			<Step n={2} title="Instal aplikasi">
				Setelah file selesai diunduh, <strong>klik dua kali</strong> lalu ikuti proses instalasi sampai selesai.
				CC Switch adalah aplikasi desktop lintas platform (berbasis Tauri), ringan ±10 MB.
			</Step>
			<Step n={3} title="Pilih target OpenCode">
				Saat aplikasi terbuka, pilih entri untuk <strong>OpenCode</strong> — pada artikel asli berupa ikon
				kelima yang ditandai kotak merah. Tujuannya agar konfigurasi ditulis ke berkas
				<code class="rounded bg-muted px-1.5 py-0.5 text-[13px]">~/.config/opencode/opencode.json</code>.
			</Step>
		</div>

		<Separator class="my-10" />

		<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
			<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
				<FileCode2 class="size-4.5" />
			</span>
			Buat Konfigurasi Provider
		</h2>

		<div class="space-y-3">
			<Step n={1} title="Buka menu tambah konfigurasi">
				Klik tombol <strong>Tambah (添加)</strong> di pojok kanan atas, lalu pilih
				<strong>Konfigurasi Kustom (自定义配置)</strong>. Gulir ke bawah menuju form.
			</Step>
			<Step n={2} title="Isi identitas & endpoint">
				Isi <strong>Supplier ID</strong> dan <strong>Nama</strong> dengan nilai yang <strong>sama</strong>.
				Tautan resmi diisi <code class="rounded bg-muted px-1.5 py-0.5 text-[13px]">api.hcnsec.cn/</code>,
				sementara pengaturan <strong>interface/API dibiarkan default</strong>.
			</Step>

			<li class="mt-3 list-none rounded-lg border p-4">
				<p class="flex items-center gap-1.5 text-sm font-medium">
					<Package class="size-4 text-primary" /> Ringkasan isian
				</p>
				<div class="mt-3 overflow-x-auto">
					<table class="w-full text-sm">
						<tbody class="divide-y">
							{#each [
								{ f: 'Provider ID', v: 'Nama provider (sama dengan Nama)' },
								{ f: 'Nama Provider', v: 'Nama bebas, konsisten dengan ID' },
								{ f: 'URL / Endpoint', v: 'https://api.hcnsec.cn/v1' },
								{ f: 'Interface / API', v: 'Default (tidak diubah)' },
								{ f: 'API Key', v: '[API key yang disalin]' }
							] as row}
								<tr>
									<td class="whitespace-nowrap py-2 pr-4 align-top font-medium">{row.f}</td>
									<td class="py-2 align-top">
										<code class="break-all rounded bg-muted px-1.5 py-0.5 text-[13px]">{row.v}</code>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</li>

			<Step n={3} title="Tempel API key">
				Pada kolom <strong>API Key</strong>, tempel nilai <strong>API key</strong> yang tadi disalin dari
				konsol relay. Untuk URL, isi <code class="rounded bg-muted px-1.5 py-0.5 text-[13px]">api.hcnsec.cn/v1</code>.
			</Step>
			<Step n={4} title="Tambah model & simpan">
				Pada bagian <strong>Model</strong>, pilih <strong>Tambah Model</strong>. Pastikan
				<strong>nama model sama persis</strong> dengan identitas model yang tersedia di relay, lalu
				<strong>simpan</strong>. Terakhir, klik <strong>tambah di bagian tengah</strong> agar konfigurasi
				ini masuk ke daftar provider yang aktif/terpakai.
			</Step>
		</div>

		<Separator class="my-10" />

		<h2 class="flex scroll-m-20 items-center gap-2.5 text-2xl font-bold tracking-tight">
			<span class="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
				<Wifi class="size-4.5" />
			</span>
			Aktifkan & Pakai
		</h2>

		<div class="space-y-3">
			<Step n={1} title="Nyalakan routing">
				Buka <strong>Pengaturan</strong> di aplikasi, lalu <strong>aktifkan router</strong> (geser sakelar
				routing ke posisi on) agar CC Switch menyuntikkan konfigurasi ke OpenCode.
			</Step>
			<Step n={2} title="Mulai OpenCode">
				Buka/tutup kembali OpenCode — kalau perlu, biasakan memakai <strong>jendela baru</strong> agar
				perubahan konfigurasi terbaca. Konfigurasi via CC Switch umumnya menuntut terminal
				dibuka ulang agar aktif.
			</Step>
			<Step n={3} title="Pilih model">
				Di dalam antarmuka OpenCode, ketik perintah lalu tekan Enter:
				<CodeBlock id="desktop-model" code="/model" label="OpenCode" />
				Pilih model yang barusan dikonfigurasi, tekan <strong>Enter</strong>&hellip; selesai! 🎉
			</Step>
		</div>

		<Separator class="my-10" />

		<section class="space-y-3">
			<Alert>
				<Shield class="text-primary" />
				<AlertTitle>Catatan transparansi</AlertTitle>
				<AlertDescription>
					Artikel asli menampilkan langkah-langkah ini beserta <strong>tangkapan layar (gambar 11–21)</strong>
					untuk letak tombol yang presisi. Untuk detail visualnya, buka
					<a
						href={ORIGINAL_URL}
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-primary hover:underline"
					>artikel aslinya</a>.
				</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<KeyRound />
				<AlertTitle>Jangan bagikan API key</AlertTitle>
				<AlertDescription>
					API key sensitif. Jangan pernah membagikannya atau menampilkannya di tangkapan layar yang
					bisa dilihat orang lain.
				</AlertDescription>
			</Alert>

			<div class="flex flex-col gap-2 pt-2 sm:flex-row">
				<Button href="/" variant="secondary">
					<ArrowLeft class="size-4" />
					Kembali ke panduan utama
				</Button>
				<Button href={ORIGINAL_URL} target="_blank" rel="noopener noreferrer" variant="outline">
					<ArrowUpRight class="size-4" />
					Sumber: hcnote.cn
				</Button>
			</div>
		</section>
	</article>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>