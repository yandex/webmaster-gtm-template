# Yandex Webmaster verification template for GTM

This template does one thing only: it adds the Yandex Webmaster verification meta tag to the `head` of the site homepage.

```html
<meta name="yandex-verification" content="YOUR_ID">
```

<img src="img/gtm-template-setup.png" alt="Google Tag Manager setup for the Yandex Webmaster template" width="360">

## What is inside

- One input field: `Webmaster verification ID`.
- One helper script that adds `meta[name="yandex-verification"]` tags to `head`.
- Duplicate protection: if a meta tag with the same verification ID already exists in `head`, the script does not add it again.
- Multiple verification IDs are supported: different IDs are added as separate meta tags.

## Install from GTM Gallery

The template is already published in the Google Tag Manager Community Template Gallery, so this is the default installation path.

1. Open your GTM container.
2. Go to `Templates`.
3. In `Tag Templates`, open the Gallery and find `Official Yandex Webmaster`.
4. Add the template to the container.
5. Create a new tag from this template.
6. Paste the value from the `content` attribute that Yandex Webmaster gives you.
7. Set trigger to `Initialization - All Pages`.
8. Set `Advanced Settings -> Tag firing options` to `Once per page`.
9. Publish the container.

## Manual Setup

Use manual setup only if you need to install the template from the repository version directly.

1. Download or copy [`template.tpl`](template.tpl) from this repository.
2. In GTM, go to `Templates`, create a new tag template, and import [`template.tpl`](template.tpl).
3. Create a tag from this template.
4. Paste the value from the `content` attribute that Yandex Webmaster gives you.
5. Set trigger to `Initialization - All Pages`.
6. Set `Advanced Settings -> Tag firing options` to `Once per page`.
7. Publish the container.

The repository version uses the public helper script hosted at:

`https://cdn.jsdelivr.net/gh/yandex/webmaster-gtm-template@cc8bead2195157cf02650a02485ef44b1fa4a0c1/webmaster-verification.js`

## Verification after publish

1. Open the site homepage and confirm that the page source contains `<meta name="yandex-verification" ...>` inside `head`.
2. In Yandex Webmaster, click `Verify`.
3. If verification fails, check that the same token is used and that the tag is present on the canonical homepage URL.
4. If needed, verify in browser DevTools:
   ```js
   Array.from(document.head.querySelectorAll('meta[name="yandex-verification"]')).map(function(meta) { return meta.outerHTML; })
   ```

## Repository Files

- Template source: [`template.tpl`](template.tpl)
- Helper source: [`webmaster-verification.js`](webmaster-verification.js)
- Screenshot used in this README: [`img/gtm-template-setup.png`](img/gtm-template-setup.png)
- Template icon: [`img/webmaster-favicon.png`](img/webmaster-favicon.png)

## Implementation Notes

The template uses `injectScript`, because GTM custom templates do not provide a direct API for writing into `document.head`.

- The GTM Gallery version is the recommended installation path.
- The repository version is useful for manual import, review, or local changes before publishing a new gallery release.
- The helper URL in [`template.tpl`](template.tpl) must stay aligned with the `inject_script` permission and the built-in tests.
