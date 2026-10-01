# AVASA — hosting guide

Domain: **avasaestoxstableevershine.com** (registered at GoDaddy)
Hosting: **MilesWeb Premium** (same account that runs aryafitness.co.in — that site is NOT touched anywhere in this guide)
Site type: static HTML — no PHP, no database, no build step. Fully responsive.

---

## 0. What's in the ZIP

```
index.html          → 2 BHK page (this becomes the homepage)
support.js
map.html            → location map, loaded in an iframe by the page
assets/             → all images + logos for the 2 BHK page
1bhk/               → complete 1 BHK page (yourdomain.com/1bhk/)
  index.html, support.js, map.html, assets/
.htaccess           → gzip, image caching, force-HTTPS
README-DEPLOY.md    → this file
```

Want 1 BHK as the homepage instead? Swap: move `1bhk/` contents to the top level and put the current top-level files into a `2bhk/` folder.

---

## 1. MilesWeb — add the domain (addon domain)

Client area → **Hosting** → the *Premium / aryafitness.co.in* row → **Control Panel** → left menu **Domains** → **Add Domain**.

- Tab: **Addon**  ("Has a separate document root and will serve different content")
- **Addon Domain:** `avasaestoxstableevershine.com`
  (no `https://`, no `www` — the grey `www.` box is just a label)
- **Document Root:** leave **blank** → it defaults to `/avasaestoxstableevershine.com`
- **Add Addon Domain**

Plan allows 24 addon domains, so this costs nothing extra. Arya Fitness stays in its own root.

---

## 2. Find the server IP

Any one of these:

- Windows → Command Prompt → `ping aryafitness.co.in` → the address in brackets, e.g. `103.x.x.x`
- MilesWeb client area → click the **Premium** product row (not the button) → *Server Information* → Shared IP / nameservers
- cPanel → right sidebar **General Information** → *Shared IP Address*

---

## 3. GoDaddy — point the domain at MilesWeb

Leave nameservers on GoDaddy's defaults (`NS27/NS28.DOMAINCONTROL.COM`) and edit records:

GoDaddy → **My Products** → `avasaestoxstableevershine.com` → **DNS** → **DNS Records**

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | MilesWeb server IP from step 2 | 600 |
| CNAME | `www` | `avasaestoxstableevershine.com` | 1 hour |

- Delete any existing `@` A record pointing at GoDaddy parking (`Parked`/`WebsiteBuilder`) and any Forwarding rule on the domain.
- Propagation: usually 30 min – 2 h, up to 24 h.

**Alternative (all DNS at MilesWeb):** copy the two MilesWeb nameservers from step 2, then GoDaddy → DNS → **Nameservers → Change → I'll use my own nameservers** → paste both. Then no A record is needed. Only do one of the two approaches, not both.

---

## 4. Upload the site

cPanel → **File Manager** → open the folder `avasaestoxstableevershine.com` (created in step 1).

1. Delete any auto-created placeholder (`index.html`, `default.html`, `cgi-bin` can stay).
2. **Upload** the ZIP.
3. Back in File Manager → right-click the ZIP → **Extract** → extract into the same folder.
4. Delete the ZIP.
5. Enable *Settings → Show Hidden Files* so `.htaccess` is visible — confirm it's there.

Final structure must be:

```
avasaestoxstableevershine.com/
  index.html
  support.js
  map.html
  .htaccess
  assets/…
  1bhk/index.html
```

Not `avasaestoxstableevershine.com/deploy/index.html` — if you see that, move the files up one level.

---

## 5. HTTPS (do this after DNS resolves)

cPanel → **SSL & Security** / **SSL/TLS Status** → tick `avasaestoxstableevershine.com` and `www.…` → **Run AutoSSL**.

If it fails, DNS hasn't propagated yet — wait and re-run. Don't skip it: `.htaccess` forces HTTPS, so without a certificate the browser will warn.

---

## 6. Check

- `https://avasaestoxstableevershine.com` → 2 BHK page
- `https://avasaestoxstableevershine.com/1bhk/` → 1 BHK page
- Test on a phone: nav collapses to a Menu button, galleries swipe horizontally.
- `https://aryafitness.co.in` → unchanged.

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| GoDaddy parking page still shows | DNS not propagated, or a Forwarding rule still active on the domain |
| Blank white page | `support.js` missing or not next to `index.html` — re-extract |
| Images broken | `assets/` folder not extracted, or nested one level too deep |
| Map area empty | `map.html` missing from the same folder; it also needs internet (OpenStreetMap tiles) |
| "Not secure" warning | AutoSSL not run yet (step 5) |
| 500 error | `.htaccess` conflict — rename it to `.htaccess-off` and reload; the site still works, just without gzip/caching |

## Known limitation

The enquiry form is front-end only — submissions are not emailed anywhere yet. MilesWeb supports PHP, so it can be wired to send to an inbox (or to a form service). Ask and I'll add it.
