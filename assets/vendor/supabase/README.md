# Vendored Supabase design tokens

Unmodified copies of the Supabase Design System colour tokens. Do not edit these files —
override in `assets/css/tokens.css` instead, and only with a cited source (see `DESIGN.md`).

- Repository: https://github.com/supabase/supabase
- Commit: `e3febf3b632a24bca72d73fd644f83a983f7cf84`
- License: Apache-2.0 (copy in [`LICENSE`](LICENSE))

| File | Upstream path | Git blob |
| --- | --- | --- |
| `global.css` | `packages/ui/build/css/source/global.css` | `8a8d1d26` |
| `semantic.css` | `packages/ui/build/css/source/semantic.css` | `4a51e400` |
| `compat.css` | `packages/ui/build/css/source/compat.css` | `23ea0b3b` |
| `dark.css` | `packages/ui/build/css/themes/dark.css` | `e09068e1` |
| `light.css` | `packages/ui/build/css/themes/light.css` | `492040b6` |

The load order matches `packages/config/tailwind.config.css` lines 12–20:
global → semantic → compat → dark → light.

To check a file is still identical to upstream:

```bash
git hash-object assets/vendor/supabase/semantic.css   # must print the blob above
```
