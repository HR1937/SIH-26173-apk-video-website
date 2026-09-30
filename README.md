# iTantra Vercel Website

Static Vercel-ready landing page with:
- **View Video**: Google Drive preview inside a modal, with a new-tab fallback.
- **Download APK**: stable GitHub `latest/download` URL.

## Configure

Edit `config.js`:

```js
videoDriveUrl: "YOUR_GOOGLE_DRIVE_VIDEO_LINK"
apkUrl: "https://github.com/YOUR_USERNAME/YOUR_REPO/releases/latest/download/app-release.apk"
```

## Keep the Download APK button permanent

Create a **public** GitHub repository and create a Release for each APK.

For every release:
1. Build your new APK.
2. Create a new GitHub Release.
3. Upload the APK.
4. Name the uploaded asset exactly `app-release.apk`.
5. Publish the release.

The website always uses:

```text
https://github.com/YOUR_USERNAME/YOUR_REPO/releases/latest/download/app-release.apk
```

So you do **not** need to edit or redeploy the website when the APK changes.

`latest` refers to the latest published non-draft release. If the repository is private, public visitors will not be able to download the asset.

## Deploy on Vercel

1. Put this folder in GitHub.
2. Import the repository into Vercel.
3. No build command is required.
4. Deploy.

You can also deploy with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Google Drive video

Set the Drive file's sharing permission so your intended visitors can view it. The site converts a normal Drive sharing URL into:

```text
https://drive.google.com/file/d/FILE_ID/preview
```

If Google does not allow the embedded player, the page still has an **Open video in new tab** fallback.
