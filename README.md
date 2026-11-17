# ilmucode_buildathon_aiclinicbooking
Ilmucode Buildathon - AI Clinic Booking System

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`. For the initial deployment,
set the repository's **Settings → Pages → Build and deployment → Source** to
**GitHub Actions**. The workflow deploys the production build whenever changes
are pushed to `main`.

The current booking and session data is held in browser memory and is not
persisted or shared between visitors.
