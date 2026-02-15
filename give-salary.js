const admin = require("firebase-admin");

// 1. Service Account Setup
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://starx-network-default-rtdb.firebaseio.com"
});

const db = admin.database();

// ⚠️ Final Updated List (62 Users)
const TARGET_UIDS = [
  // --- Batch 1 (21 Users) ---
  "8ay4ij3RMxO1kuWVoDVGu8jrxji2",
  "BkF05S2Y4xhlS9ub99Z2D1kgGmR2",
  "FgDLJ4KiSebfPaweOcaaAhkHNIR2",
  "kKrLzf3n8JY3ceoewBScqcogvPC2",
  "f6HXtrXnQzQR4A3Wp4loAdSnl1z2",
  "xLxzTjjOyca7zwUZ3CIRN3m2pEV2",
  "x17wZseSmAOAIQq3J2WkIVKeOKq1",
  "a9PpozBcruayKTQdOmupOPxgIAS2",
  "nH1ComFO7Je6GMfFX5sOvKBk2Xs1",
  "eQSBVz6AZdbIPq6YlNYt5UWhQBN2",
  "TA5l0LaOodOfBzGinIEV0G1BTxn2",
  "YWhrlUjnc7Nk8udRwSlL00iPFIh2",
  "fIFAjhEeNRPBDDrNvVvIAK9lXys2",
  "scWOcvAccFgS8F9dXhQ1IW6ll4l2",
  "r5g2EMPpIlRWTA2sLdghLGOjPXg2",
  "7r0PtHAU8UaZfN3CSp8fBE58OG82",
  "8N8xbB7NSfbZWqGhFw83MQf8JwN2",
  "S4m4O7XgEyfJb5ZPR7MYNWzHaY93",
  "78WZ4MENo8SsoNmwCOt4yhYEFD03",
  "Vmb9SFdOwJYdCKPSmh7hdTxzvEP2",
  "6xBkoRhdSnaWWDlrchjC9AvEQMi2",

  // --- Batch 2 (3 Users) ---
  "Cn4ubODBsBfgIR1Zvp8xZZcgCCE2",
  "qmvyWA8OiGe7Hm6h7FseCQJlsGw2",
  "MXufnelnuXQ3FGiJtMzQZ6PRHzE3",

  // --- Batch 3 (8 Users) ---
  "4Db4QcfSqfNk6F5MPGk6Cy0FJ5P2",
  "KrIDnEC3BHR0SESc55Dx2U8YIoK2",
  "Za03o0LaMSR8IKz6KLKHN7FVKMy1",
  "dXavWhPSfiV8sb1ca2nHvHGo8Jl1",
  "KqZ2oagWjpat4DbwHtLE6tTl3ma2",
  "zEI0sByuOpd9ngMF0u5Ih2vJk2H3",
  "HEbjRcYKBLYkOhqHZIU8aWomX9M2",
  "grtn69SezqSLBMk2Q6Be7dEF8Yv2",

  // --- Batch 4 (4 Users) ---
  "UYy6aiCZUzTjyvT5Rvc48fpTrho1",
  "9mDPJKR3NfaZUcpnQNFfJk4iiBi1",
  "uOkThAbi8dh10pkcorFKE7k98ZK2",
  "ZyRrcXC56JW45jrkdpOUlWJRfm63",

  // --- Batch 5 (9 Users) ---
  "YKhVbYkPz0NObpNm4mTdkpQfmPt1",
  "piGYlVwARCUNYnKTCZ8oFcOEYsi1",
  "qxpyfr9bipN3IXERUbJtAtYRUDs1",
  "77kTEpTkzxS4hShjBrC8t0h7qvI2",
  "E4w81dod7XUF8ec8kIilGfkPOdO2",
  "iGtBY1GM2PXGLMbrWNssV749k0a2",
  "VeQ2cqJ2hrVYhNLAPZoKTCc15AD3",
  "pqlfretoh1flXVxdsowDR9OYtts1",
  "6Kug4tQbL6aFTTD4Jw95NvJ73JI3",

  // --- Batch 6 (7 Users) ---
  "GwrKV5i9adYinOOqVwA1Q9CSuej2",
  "YclTkCkiTFgBMB9qvelakPCmKI93",
  "Sf77AfSVfvSWNFQLTtxWbuU2RJf2",
  "SfZBlb8NTncvmAJIszkAK3TJLEX2",
  "WEm3Drbb2dXF3iG6gArQHyT8WK03",
  "vNA5awpqy2d9dAJaBe5k5LfZOQO2",
  "1Ujo5P5Yj8V3huo8Alz6koW3zE32",

  // --- Batch 7 (1 User) ---
  "AgTboyUvq3cE4aWu8CT2Po39vh42",

  // --- Batch 8 (5 Users) ---
  "Jy8vMfqWo6RuwMAnRTk11IrGYZ32",
  "fkP1CcAVVTSSLCziEMW9OGLcEFh1",
  "X8gbm0QxRuMZD0FqXhmYt6UzPZC3",
  "AisZhacebFc7b3SgCCzSmOCVCVx2",
  "OiGIGWScBuMwZBd1QuYUdqIJGr33",

  // --- Batch 9 (New 4 Users) ---
  "PiGcRsQmkTVtsUxV07Uo3pRrR2c2",
  "9Wne7flOUEMnLYt1YvaHWShi0dC3",
  "Jrxo2Sr8NwRpM89C0qiEhmaRX4k1",
  "lSRJFHeexoN2c2FzqxrKxV8FhtT2"
];

async function assignAmbassadorBadges() {
  console.log(`🚀 Assigning Ambassador Badges to ${TARGET_UIDS.length} users...`);

  try {
    const updates = {};

    // Loop through all UIDs
    TARGET_UIDS.forEach((uid) => {
      // ✅ Assign 'isAmbassador: true' to the user's profile
      updates[`users/${uid}/isAmbassador`] = true;
    });

    // Send Bulk Update to Realtime Database
    if (Object.keys(updates).length > 0) {
      await db.ref().update(updates);
      console.log(`🎉 Success! Ambassador badge added for ${TARGET_UIDS.length} users.`);
    } else {
      console.log("❌ No UIDs provided in the list.");
    }

  } catch (error) {
    console.error("❌ Error setting badges:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

assignAmbassadorBadges();
