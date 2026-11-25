# Playbook: gagal deploy SvelteKit + Bun ke Cloudflare

> Panduan ini ditulis setelah kasus ini terjadi di
> `bun-sveltekit-typescript-opencode-hcnsec-id-app`. Tujuannya: kalau error yang
> sama muncul di project lain, tinggal ikuti checklist di bawah — tidak perlu
> menyelidik dari nol.

---

## 1. Kapan pakai playbook ini

Pakai jika log deploy Cloudflare terlihat seperti ini:

```text
Success: Build command completed
Executing user deploy command: npx wrangler deploy
Detected Project Settings:
 - Framework: SvelteKit
...
🛠️  Configuring project for SvelteKit with "sv add"
? Proceed with setup?
🤖 Using fallback value in non-interactive context: yes
📝 Update package.json scripts:
 - "build": "wrangler types --check && vite build"
[build] ✘ [ERROR] Types file not found at worker-configuration.d.ts.
Failed: error occurred while running deploy command
```

**Petunjuk paling penting:** ada baris `Success: Build command completed`
sebelum error. Artinya **build aplikasimu sudah berhasil**. Yang gagal adalah
build kedua yang dipicu oleh langkah deploy. Jangan buang waktu mencari bug di
komponen Svelte atau di `src/`.

Error ini juga sering didampingi peringatan:

```text
Could not detect a supported production environment.
```

Itu berasal dari `@sveltejs/adapter-auto`.

---

## 2. Urutan investigasi yang saya pakai

1. **Baca log dari atas ke bawah.** Tandai dua fakta: build pertama sukses, dan
   `package.json` disunting oleh Wrangler di dalam container.
2. **Cek project yang sudah berhasil.** Saya mulai dari
   `bun-sveltekit-typescript-hasans-iot-lab-app` karena diminta. Ternyata project
   itu **tidak deploy ke Cloudflare** — ia memakai `@sveltejs/adapter-node` +
   Dockerfile + VPS. Jadi polanya tidak relevan untuk error ini.
3. **Cari project dengan gejala identik.** Di
   `bun-sveltekit-typescript-spill-barang-app` ada
   `docs/CLOUDFLARE_DEPLOYMENT_TROUBLESHOOTING.md` yang mencatat log yang hampir
   sama persis. Itu memberi konfirmasi akar masalahnya.
4. **Ambil pola yang sudah terbukti**, lalu sesuaikan dengan versi SvelteKit 3 /
   Wrangler di project ini. Satu penyesuaian diperlukan karena Wrangler terbaru
   menghasilkan tipe `GlobalProps` (lihat langkah 6).
5. **Verifikasi lokal sebelum push** dengan `check`, `build`, dan
   `wrangler deploy --dry-run`.

> Aturan emas: **jangan menebak. Bandingkan dengan project yang sudah sukses di
> platform yang sama.** Bedanya biasanya cuma satu atau dua baris konfigurasi.

---

## 3. Akar masalah

Ada dua masalah yang saling berantai:

### 3.1 `adapter-auto` bukan adapter Cloudflare

`@sveltejs/adapter-auto` hanya mendeteksi platform tertentu. Di Workers
Builds ia gagal mendeteksi target, sehingga `.svelte-kit/cloudflare/_worker.js`
tidak terbentuk. Untuk Cloudflare harus memakai `@sveltejs/adapter-cloudflare`.

### 3.2 `wrangler.jsonc` tidak ada di repo

Karena tidak ada config Wrangler yang terbaca, `wrangler deploy` menjalankan
auto-config `sv add`. Karena build berjalan non-interaktif, Wrangler menjawab
"ya" sendiri terhadap prompt setup, lalu:

1. menimpa script `build` menjadi `wrangler types --check && vite build`;
2. membuat `wrangler.jsonc` **di dalam container**, yang langsung dibuang;
3. tidak pernah menjalankan `wrangler types` untuk membuat
   `worker-configuration.d.ts`;
4. build kedua gagal di `wrangler types --check`.

Menambahkan file `worker-configuration.d.ts` kosong **bukan** perbaikan yang
benar — auto-config tetap akan menimpa script `build`. Yang menyembuhkan adalah
mencegah auto-config berjalan sama sekali.

---

## 4. Lima hal wajib (+ satu catatan)

| # | Apa | Kenapa |
|---|---|---|
| 1 | `@sveltejs/adapter-cloudflare` di `devDependencies` | Outputnya `_worker.js`, bukan kode Node |
| 2 | `import adapter from '@sveltejs/adapter-cloudflare'` di `vite.config.ts` | Menggantikan `adapter-auto` |
| 3 | `wrangler.jsonc` **di-commit** | Kehadirannya membuat Wrangler melewati auto-config |
| 4 | `worker-configuration.d.ts` **di-commit** | Cadangan kalau ada perintah `wrangler types --check` |
| 5 | `packageManager: "bun@X.Y.Z"` | Cloudflare membaca versi bun dari sini; tanpa ini ia bisa memakai bun 1.2.15 yang gagal membaca `lockfileVersion: 2` |
| 6 | `compatibility_flags: ["nodejs_compat"]` | Modul Node internal SvelteKit tetap bisa dipakai di runtime Workers |
| 7 | `build` tetap `vite build` | Jangan pernah menaruh `wrangler types --check` di script build |

Opsi tambahan untuk `wrangler.jsonc`: `"observability": { "enabled": true }`
dan binding `assets` ke `.svelte-kit/cloudflare`.

---

## 5. Langkah perbaikan

### Langkah 0 — Pastikan targetnya memang Cloudflare

| Target | Adapter |
|---|---|
| Cloudflare Workers / Pages | `@sveltejs/adapter-cloudflare` ← playbook ini |
| VPS / Docker / Node server | `@sveltejs/adapter-node` ← pola `hasans-iot-lab-app` |
| Vercel / Netlify | adapter masing-masing |

Kalau targetnya VPS, **jangan** ikuti langkah di bawah.

### Langkah 1 — Pasang dependency

```sh
bun add -d @sveltejs/adapter-cloudflare wrangler
bun remove @sveltejs/adapter-auto
```

### Langkah 2 — Ganti adapter

```ts
// vite.config.ts
import adapter from '@sveltejs/adapter-cloudflare';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter()
		})
	]
});
```

### Langkah 3 — Buat `wrangler.jsonc` di root

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "nama-project-kamu",
	"main": ".svelte-kit/cloudflare/_worker.js",
	"compatibility_date": "2025-02-14",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"observability": {
		"enabled": true
	},
	"assets": {
		"binding": "ASSETS",
		"directory": ".svelte-kit/cloudflare"
	}
}
```

`name` harus sama dengan Worker name di dashboard Cloudflare.

### Langkah 4 — Generate dan commit tipe Worker

```sh
bun run cf-typegen     # atau: bunx wrangler types
git add worker-configuration.d.ts
```

Isi awalnya kurang lebih:

```ts
interface __BaseEnv_Env {
	ASSETS: Fetcher;
}
declare namespace Cloudflare {
	interface GlobalProps {
		mainModule: typeof import("./.svelte-kit/cloudflare/_worker");
	}
	interface Env extends __BaseEnv_Env {}
}
interface Env extends __BaseEnv_Env {}
```

### Langkah 5 — Rapikan `package.json`

```jsonc
{
	"packageManager": "bun@1.4.2",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",              // jangan diubah
		"preview": "vite preview",
		"deploy": "bun run build && wrangler deploy",
		"cf-typegen": "wrangler types",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"
	}
}
```

Versi `packageManager` berikut versi bun yang dipakai lokal / di CI. Yang
penting: harus cukup baru untuk membaca `bun.lock` `lockfileVersion: 2`.

### Langkah 6 — Berhati-hati dengan `tsconfig.json`

Project lama (mis. `spill-barang-app`) menyarankan:

```json
"include": ["src", "vite.config.ts", "worker-configuration.d.ts"]
```

Itu aman untuk tipe yang **tidak** punya `GlobalProps`. Wrangler `4.151+` /
`4.168` menghasilkan:

```ts
interface GlobalProps {
	mainModule: typeof import("./.svelte-kit/cloudflare/_worker");
}
```

Kalau file itu dimasukkan ke `include`, `svelte-check` ikut menype-check seluruh
`.svelte-kit/output` dan bisa muncul ratusan error yang menyesatkan.

**Aturan untuk project ini:** commit `worker-configuration.d.ts`, tetapi
**biarkan `include` tetap** `["src", "vite.config.ts"]`. File itu tetap berguna
untuk `wrangler types --check`; hanya tidak dimasukkan ke program TypeScript
sehari-hari.

### Langkah 7 — Cek dashboard Cloudflare

| Pengaturan | Nilai |
|---|---|
| Build command | `bun run build` |
| Build output directory | `.svelte-kit/cloudflare` |
| Deploy command (Workers Builds) | `npx wrangler deploy` |
| Deploy command (Pages) | **kosong** — Pages sudah upload output sendiri |

Kalau memakai **Cloudflare Pages**, kolom Deploy command sebaiknya dikosongkan.
Mengisi `npx wrangler deploy` di Pages adalah perintah Workers dan memicu
auto-config ini.

---

## 6. Verifikasi sebelum push

Jalankan semuanya secara berurutan:

```sh
bun install
bun run check
bun run build
bunx wrangler deploy --dry-run
```

Output yang diharapkan:

```text
svelte-check found 0 errors and 0 warnings
> Using @sveltejs/adapter-cloudflare
✔ done
⛅️ wrangler ...
✨ Read 30 files from the assets directory .../.svelte-kit/cloudflare
Your Worker has access to the following bindings:
Binding            Resource
env.ASSETS         Assets
--dry-run: exiting now.
```

**Tanda auto-config masih aktif:** muncul prompt
`Do you want to modify these settings?` atau baris
`📝 Update package.json scripts:`. Kalau itu muncul, berarti `wrangler.jsonc`
belum terbaca dari root repo.

### Guard ekstra: pastikan Wrangler tidak menyunting `package.json`

```sh
cp package.json /tmp/package.before.json
bunx wrangler deploy --dry-run >/dev/null
cmp -s package.json /tmp/package.before.json && echo "aman"
```

Harus mencetak `aman`.

---

## 7. Jebakan yang sudah dicoba / harus dihindari

| Jebakan | Kenapa salah |
|---|---|
| Membuat `worker-configuration.d.ts` kosong saja | Auto-config tetap menimpa `build` |
| Men set `build` ke `wrangler types --check && vite build` | Perintah itu milik auto-config CI, bukan script project |
| Pakai `@sveltejs/adapter-node` lalu deploy ke Workers | Output butuh API Node (`process`, `node:http`) yang tidak ada di Workers → 500 / Worker startup error |
| Menghapus Deploy command tanpa mengubah adapter | Build sukses tapi output `_worker.js` tetap tidak ada |
| Lupa `packageManager` | Cloudflare bisa pakai bun 1.2.15 → `Unknown lockfile version` |
| Memasukkan tipe dengan `GlobalProps` ke `tsconfig.include` | `svelte-check` membaca output build dan flooded error |
| Mengira kode yang rusak | Log `Success: Build command completed` membuktikan sebaliknya |

---

## 8. Checklist siap pakai untuk project baru

Salin ini ke issue / catatan project baru:

```md
- [ ] Target dikonfirmasi: Cloudflare Workers/Pages (bukan VPS)
- [ ] `bun add -d @sveltejs/adapter-cloudflare wrangler`
- [ ] `bun remove @sveltejs/adapter-auto`
- [ ] `vite.config.ts` import `@sveltejs/adapter-cloudflare`
- [ ] `wrangler.jsonc` ada di root & di-commit (name sesuai dashboard)
- [ ] `compatibility_flags: ["nodejs_compat"]`
- [ ] `assets.directory = ".svelte-kit/cloudflare"`
- [ ] `worker-configuration.d.ts` di-generate & di-commit
- [ ] `packageManager` ada di `package.json`
- [ ] `build` masih `vite build`
- [ ] script `deploy` + `cf-typegen` ada
- [ ] `bun run check` → 0 error
- [ ] `bun run build` → `Using @sveltejs/adapter-cloudflare ✔ done`
- [ ] `bunx wrangler deploy --dry-run` → tanpa prompt auto-config
- [ ] Dashboard: build command, output dir, deploy command sudah benar
- [ ] Push → clear build cache → deploy ulang
```

---

## 9. Ringkasan perbandingan project

| Project | Target | Pola |
|---|---|---|
| `bun-sveltekit-typescript-hasans-iot-lab-app` | VPS | `adapter-node` + Dockerfile + compose |
| `bun-sveltekit-typescript-spill-barang-app` | Cloudflare | `adapter-cloudflare` + `wrangler.jsonc` + tipe Worker |
| `bun-sveltekit-typescript-utility-tracker-app` | Cloudflare Pages | 4 wajib + **Deploy command kosong** |
| Project ini | Cloudflare Workers | Pola `spill-barang-app` + penyesuaian `GlobalProps` |

Kalau ragu, bandingkan `package.json`, `vite.config.ts`, dan `wrangler.jsonc`
dengan project yang sudah live di platform yang sama.
