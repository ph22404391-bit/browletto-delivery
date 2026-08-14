# Browletto Home Delivery — Setup Guide

## What you have
- `index.html` — customer ordering page (menu, cart, address, WhatsApp handoff)
- `admin-dispatch.html` — your dispatch dashboard (live orders, status, rider handoff)
- `config.js` — all your settings in one place (Firebase, cafe location, delivery rules, WhatsApp number)
- `menu-data.js` — full menu, editable
- `manifest.json` — makes the page installable like an app

## Step 1 — Check the menu
Open `menu-data.js` in any text editor. Every item was transcribed from your menu photos —
scan through once and fix any name/price mistakes before going live.

## Step 2 — Set up Firebase (5 min)
1. Go to console.firebase.google.com → create a project (or reuse an existing one)
2. Build → Firestore Database → Create database → Start in production mode
3. Project settings (gear icon) → scroll to "Your apps" → click the web icon `</>` → register app
4. Copy the `firebaseConfig` object it gives you into `config.js`
5. In Firestore → Rules, set:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /orders/{orderId} {
         allow read, write: if true; // tighten this later with Firebase Auth once admin login is added
       }
     }
   }
   ```

## Step 3 — Set your cafe's location
1. Open Google Maps, find Browletto Dhule, right-click the exact spot → the lat/lng appears at the top — click it to copy
2. Paste into `cafeLat` and `cafeLng` in `config.js`

## Step 4 — Set delivery rules & WhatsApp number
In `config.js`, set:
- `freeDeliveryKm` / `maxDeliveryKm` / `deliveryFee` to whatever you want
- `whatsappNumber` — the number that should RECEIVE orders (format: `91XXXXXXXXXX`, no spaces or +)
- `adminPin` (add this line) — a PIN for `admin-dispatch.html`, e.g. `adminPin: "browletto2024"`

## Step 5 — Add your icons (optional but recommended)
Export your BB logo as `icon-192.png` and `icon-512.png` and drop them in the same folder —
this makes the "Add to Home Screen" icon look right instead of a blank default.

## Step 6 — Host it (GitHub Pages, free)
1. Create a new GitHub repo, e.g. `browletto-delivery`
2. Upload all 6 files (index.html, admin-dispatch.html, config.js, menu-data.js, manifest.json, icons)
3. Repo → Settings → Pages → Source: branch `main`, folder `/root` → Save
4. Your live links will be:
   - Customer ordering: `https://yourusername.github.io/browletto-delivery/`
   - Admin dispatch: `https://yourusername.github.io/browletto-delivery/admin-dispatch.html`

**Do this immediately after:** unlike last time, don't leave these files sitting only in a Claude
chat — once they're in the GitHub repo, they're safe permanently and you can always find them there.

## Step 7 — Generate your QR code
Use any free QR generator (e.g. qr-code-generator.com) pointing to your customer ordering link
from Step 6. Print it for table tents, packaging stickers, and your Instagram bio link.

## Step 8 — Test end-to-end before printing QR codes
1. Open the customer link on your phone, add items, fill in a test order, confirm
2. Check it appears in Firestore (Firebase Console → Firestore Database)
3. Open `admin-dispatch.html`, enter your PIN, confirm the order shows up
4. Walk it through: Start Preparing → Mark Ready → Dispatch to Rider → Mark Delivered
5. Confirm the WhatsApp message opens correctly with the order details

## How dispatch to your delivery partner works
Since most local delivery partners (Dunzo/Porter/local riders) don't give small businesses API
access, the handoff stays manual by design: when you tap **"Dispatch to Rider"** in the admin
panel, the customer's address and phone are right there on screen — call your rider/partner,
read it out or screenshot it, and send. The order status still updates for the customer either way.

## Notes
- Payment is currently COD or "Pay Online" as a label only — if you want real online payment
  (UPI/cards), that's a separate Razorpay integration step, let me know when you're ready for it.
- Delivery radius uses the customer's live phone location (with their permission) — if they deny
  location access, the order still goes through and your team confirms distance manually on WhatsApp.
