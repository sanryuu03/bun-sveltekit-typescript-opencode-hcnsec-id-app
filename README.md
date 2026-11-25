# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
bun x sv@1.7.0 create --template minimal --types ts --install bun bun-sveltekit-typescript-opencode-hcnsec-id-app
```

## Adding features

Add features to your project with `sv add`:

```sh
npx sv add
```

For example, to add Tailwind CSS:

```sh
npx sv add tailwindcss
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Deploy ke Cloudflare Workers

Project ini memakai `@sveltejs/adapter-cloudflare` + Wrangler. Output SSR ada di
`.svelte-kit/cloudflare/_worker.js`.

> 📘 **Referensi lengkap:** [docs/CLOUDFLARE_DEPLOY_TROUBLESHOOTING.md](./docs/CLOUDFLARE_DEPLOY_TROUBLESHOOTING.md)
> berisi root cause error `worker-configuration.d.ts`, langkah investigasi,
> checklist verifikasi, dan template untuk project lain.

```sh
bun run check          # 0 error
bun run build          # > Using @sveltejs/adapter-cloudflare ✔ done
bun run cf-typegen     # regenerate worker-configuration.d.ts
bunx wrangler deploy --dry-run
bun run deploy         # build + deploy
```

### Kenapa dulu gagal

`wrangler.jsonc` belum ada di repo, jadi `npx wrangler deploy` menjalankan
auto-config `sv add`. Auto-config menimpa `build` menjadi
`wrangler types --check && vite build`, lalu gagal karena
`worker-configuration.d.ts` tidak pernah dibuat:

```text
✘ [ERROR] Types file not found at worker-configuration.d.ts
```

Perbaikan yang sudah diterapkan (sama seperti pola `spill-barang-app`):

- `@sveltejs/adapter-auto` → `@sveltejs/adapter-cloudflare`
- `wrangler.jsonc` + `worker-configuration.d.ts` ikut di-commit — auto-config
  Wrangler dilewati, `build` tidak akan diubah diam-diam
- `compatibility_flags: ["nodejs_compat"]` untuk modul Node internal SvelteKit
- `packageManager: "bun@1.4.2"` supaya Cloudflare memakai bun yang mendukung
  `lockfileVersion: 2`

Di dashboard Cloudflare: **Build command** = `bun run build`, **Deploy command**
= `npx wrangler deploy` (atau kosongkan jika memakai Pages), **Build output
directory** = `.svelte-kit/cloudflare`.
