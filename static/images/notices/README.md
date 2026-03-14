# Notice Boxes — Reference Guide

## How to Use

```
{{< notice "COLOR" "filename.ext" "Your message here." >}}
```

- **COLOR** — one of the color names in the table below
- **filename.ext** — any file you drop into `/static/images/notices/` (gif, webp, png — any name)
- **message** — the text that appears inside the box

You never need to touch any code. Just drop a file in this folder and reference it by name.

---

## Examples

```
{{< notice "red" "skull.gif" "Exposed admin credentials found in the source." >}}
{{< notice "green" "trophy.webp" "Got root. Box complete." >}}
{{< notice "golden" "star.gif" "Key finding: ADCS ESC8 is exploitable with PetitPotam." >}}
{{< notice "grey" "hole.webp" "Rabbit hole — this path leads nowhere, skip it." >}}
{{< notice "cyan" "scan.gif" "Starting recon phase — full TCP scan + directory brute." >}}
{{< notice "orange" "warn.webp" "This technique triggers Windows Defender — test in a lab first." >}}
{{< notice "normal" "note.gif" "This is informational context about the target environment." >}}
{{< notice "blush" "heart.webp" "Personal note — I hit this exact bug in a real engagement last year." >}}
{{< notice "brown" "map.gif" "Background: the org runs a hybrid Azure AD setup with on-prem sync." >}}
```

---

## Color Reference

| Color | Hex / Theme | Use Case | Suggested Emoji Type |
|-------|-------------|----------|----------------------|
| `normal` | Purple — matches the summary box | General info, methodology notes, neutral context | 📝 info, note, read |
| `red` | `#EF4444` Red | Red flags, exposed secrets, danger, critical vulns | 💀 skull, alert, danger |
| `green` | `#22C55A` Green | Achievement, shell obtained, flag captured, success | 🏆 trophy, check, win |
| `golden` | `#FBB924` Amber/Gold | Key findings, conclusions, chain summary, cool discovery | ⭐ star, crown, key |
| `grey` | `#94A3B8` Slate Grey | Rabbit holes, dead ends, paths that go nowhere | 🕳️ hole, ghost, meh |
| `cyan` | `#06B6D4` Cyan | Recon, enumeration, scanning, reconnaissance phase | 🔍 scan, scope, radar |
| `orange` | `#F97316` Orange | Caution, noisy technique, potential detection risk | ⚠️ caution, fire, loud |
| `blush` | `#FFDBFD` Soft Pink | Personal notes, asides, real-world parallels, commentary | 💬 thought, memo, personal |
| `brown` | `#8C5A3C` Warm Brown | Target background, OSINT context, org structure lore | 🗺️ map, folder, archive |

---

## Adding New Images

1. Drop any `.gif`, `.webp`, or `.png` into this folder (`/static/images/notices/`)
2. The filename can be anything — `adladaokdozkdz.gif` works fine
3. Reference it directly: `{{< notice "red" "adladaokdozkdz.gif" "text" >}}`
4. No code changes needed — ever

---

## Notes

- All colors support both **dark** and **light** theme automatically
- All colors support **glass mode** automatically  
- The left accent bar color always matches the notice color
- Text color adapts per theme for readability
- Images are rendered at **36×36px** — use square images for best results
- Animated WebP and GIF both work
