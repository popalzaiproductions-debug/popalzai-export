# Sample maker entries → Google Sheet

Every "Download my mock" on `/sample-maker` posts the entrant's email and design
details here, and each one becomes a row in a Google Sheet.

## Setting it up

1. **Make the Sheet.** Go to sheets.new while signed in to the Google account
   that should own the entries. Name it something like "Sample maker entries".
2. **Add the script.** In that Sheet: Extensions → Apps Script. Delete what's
   in the editor, paste in all of `Code.gs` from this folder, and save.
   - Change `NOTIFY_EMAIL` if alerts should go somewhere else, or set it to
     `''` for no alert emails.
3. **Deploy it.** Deploy → New deployment → the gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**. This means anyone can *send* an entry, which
     is what the website needs. It does not let anyone see the Sheet.
   - Click Deploy.
4. **Authorise it.** Google asks for permission to edit your spreadsheets and
   send email as you. Because the script is yours and not published, it warns
   "Google hasn't verified this app". Choose Advanced → Go to (project name) →
   Allow.
5. **Copy the Web app URL.** It ends in `/exec`. Paste it into
   `src/data/site.ts` as `ENTRY_ENDPOINT`.
6. **Check it.** Open the URL in a browser. You should see
   `{"ok":true,"service":"popalzai-sample-maker-entries"}`.

## Changing the script later

Edits don't go live until you redeploy: Deploy → Manage deployments → pencil →
Version: **New version** → Deploy. Doing it that way keeps the same URL.
Choosing "New deployment" instead creates a new URL, and the site would need
updating.

## Notes

- The site sends the body as `text/plain`. Apps Script can't answer the CORS
  preflight a `Content-Type: application/json` request triggers, so that
  request would fail before reaching the script. The body is still JSON; the
  script parses it.
- Anyone who finds the URL can post to it. The script checks the email, caps
  every field at 500 characters, and stops text starting with `=`, `+`, `-`
  or `@` being run as a formula. It can't stop someone posting junk rows.
- Personal Google accounts can send about 100 alert emails a day. Past that the
  row still saves, but that entry's alert doesn't arrive.
