const admin = require("firebase-admin");

// 1. Service Account Setup
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://starx-network-default-rtdb.firebaseio.com"
});

const db = admin.database();

// ⚠️ Targeted Users List (Updated)
const TARGET_UIDS = [
  // Old UIDs
  "8ay4ij3RMxO1kuWVoDVGu8jrxji2",
  "bkF05S2Y4xhlS9ub99Z2D1kgGmR2",
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
  "Cn4ubODBsBfgIR1Zvp8xZZcgCCE2",
  "qmvyWA8OiGe7Hm6h7FseCQJlsGw2",
  "MXufnelnuXQ3FGiJtMzQZ6PRHzE3"
];

async function distributeSalary() {
  console.log(`🚀 Starting Salary Distribution for ${TARGET_UIDS.length} specific users...`);

  try {
    const updates = {};
    const salaryAmount = 3000;

    // 2. Loop through listed UIDs
    TARGET_UIDS.forEach((uid) => {
      // ✅ Safe Atomic Increment (Purana balance + 3000)
      updates[`users/${uid}/balance`] = admin.database.ServerValue.increment(salaryAmount);
      
      // Optional: Track last payment time
      updates[`users/${uid}/lastSalaryTime`] = admin.database.ServerValue.TIMESTAMP;
    });

    // 3. Send Bulk Update to Realtime Database
    if (Object.keys(updates).length > 0) {
      await db.ref().update(updates);
      console.log(`🎉 Success! Added ${salaryAmount} STRX to ${TARGET_UIDS.length} users.`);
    } else {
      console.log("❌ No UIDs provided in the list.");
    }

  } catch (error) {
    console.error("❌ Error distributing salary:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

distributeSalary();
