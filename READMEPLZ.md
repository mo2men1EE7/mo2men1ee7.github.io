# BluRRedSec

Personal security portfolio — HTB writeups, notes, cheatsheets, blogs.

## Setup

```bash
hugo server -D          # local preview at localhost:1313
```

No submodules. Custom theme lives in `themes/blurredsec/`.

## Writing a post

1. Copy the right template from `templates/`
2. Create `content/Writeups/your-post/index.md`
3. Add screenshots to `content/Writeups/your-post/images/`
4. Set `draft: false` when ready to publish
5. Git push → auto-deploys via GitHub Actions

## Deployment

GitHub Pages → Settings → Pages → Source: GitHub Actions
Update `baseURL` in `hugo.toml` to your GitHub Pages URL.
