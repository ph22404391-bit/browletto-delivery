// ================= BROWLETTO DELIVERY CONFIG =================
// Fill in your real values below, then save. This file is loaded by index.html
// and admin-dispatch.html — keep it in the same folder as both.

window.BROWLETTO_CONFIG = {

  // 1) FIREBASE — get this from Firebase Console > Project Settings > Your apps > Web app
  //    (Same project you can reuse/create fresh — doesn't have to be MediFast's project)
  firebaseConfig: {
    apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
    authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
    projectId: "PASTE_YOUR_PROJECT_ID",
    storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
    messagingSenderId: "PASTE_SENDER_ID",
    appId: "PASTE_APP_ID",
  },

  // 2) CAFE LOCATION — open Google Maps, right-click your cafe's exact spot, copy the lat/lng shown
  cafeLat: 20.9042,   // ⚠️ placeholder — replace with Browletto Dhule's real latitude
  cafeLng: 74.7749,   // ⚠️ placeholder — replace with Browletto Dhule's real longitude

  // 3) DELIVERY RULES
  freeDeliveryKm: 3,     // orders within this radius: free delivery
  maxDeliveryKm: 7,      // orders beyond this radius: blocked (not deliverable yet)
  deliveryFee: 40,       // flat fee (₹) for orders between freeDeliveryKm and maxDeliveryKm

  // 4) WHATSAPP — the number that RECEIVES orders (your cafe's order-taking number)
  //    Format: country code + number, no + or spaces. e.g. India: 91XXXXXXXXXX
  whatsappNumber: "91XXXXXXXXXX",
};
