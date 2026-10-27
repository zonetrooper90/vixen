# Gallery — macOS anime application (development)

**Repository:** `zonetrooper90/vixen` (temporary repository name). **Gallery** is the application's current working title; neither name has been confirmed as the final brand.

## v0.2.5 — Apple Silicon preview

The first available build is a **development prototype for local video playback**. It is not yet a live anime streaming/download application. It includes our custom player UI, theme-aware split progress timeline, 10-second seek controls, local video selection, three themes, and experimental VLC support for local files. Streaming providers, downloading, and embedded MPV remain future development tasks.

### Test on macOS without Node.js or npm

1. Open **Actions → Build Gallery for Apple Silicon**.
2. Choose a successful run for `main` (or select **Run workflow**).
3. Download the `Gallery-v0.2.5-Apple-Silicon-DMG` artifact.
4. Extract the downloaded artifact ZIP, then double-click the **Gallery-v0.2.5-arm64.dmg** inside it.
5. Drag **Gallery.app** from the mounted DMG into Applications and open it. No local npm installation is required.

The development preview uses **ad-hoc code signing** (matching the StrawVerse development build) and is **not Apple Developer ID signed or notarized**. The DMG and `.app` have been verified in GitHub's macOS build workflow. Gatekeeper may still require approval on another Mac; do not disable Gatekeeper globally. This is not a public distribution-ready signature.

### Scope

- **macOS Apple Silicon (ARM64) only** for active development.
- App identifier: `dev.gallery.anime` (development identifier). Local settings: `~/Library/Application Support/GalleryAnime`.
- StrawVerse-mac source, caches, and settings remain independent and untouched.
- The temporary `gallery/v0.2.3-preview` branch in StrawVerse-mac was a staging area, not the source of truth. New work belongs here.
- Season navigation remains provisional; autoplay and queues are omitted by design.
- v0.x.x development versions; v1.0.0 reserved for a future stable release.

### Project structure

- `app/` — interface and player
- `electron/` — native desktop shell and settings
- `tests/` — unit tests
- `.github/workflows/build-macos.yml` — Apple Silicon GitHub Actions build

The built-in player in this early milestone uses browser video playback for **local media testing**, not yet MPV-backed streaming.

## Player improvements in v0.2.3

- Compact single-row back/title/audio header, allowing the video to take up more room.
- Playback controls fade after 2.6 seconds of inactivity during playback, reveal on pointer or keyboard activity, and remain visible while paused.
- Local video and VLC controls are grouped in an initially collapsed, **development-only** section. Do not include these test controls in a future production UI.

### Player polish in v0.2.3

- Removed the duplicated upper-right fullscreen control; the bottom-right player control is the single fullscreen action.
- Controls now fade out in 0.62 seconds and fade back in in 0.30 seconds, while retaining the existing 2.6-second idle delay. Reduced-motion preferences still disable the animation.

### Player navigation in v0.2.4

- The episode navigation below the player matches the video frame width and centers the series and episode labels between Previous (left) and Next (right).

### Security maintenance in v0.2.5

- Upgrade Electron from 37 to 45 to address advisories identified in the October 2026 dependency audit.
- Gate macOS packaging on npm security advisories and an updated ClamAV signature scan. No change bypasses browser security warnings.
