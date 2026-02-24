const admin = require("firebase-admin");

// 1. Service Account Setup
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://starx-network-default-rtdb.firebaseio.com"
});

const db = admin.database();

async function resetWinterPoints() {
  console.log("🚀 Sabhi users ke winterPoints 0 karne ka process start ho raha hai...");

  try {
    const usersRef = db.ref("users");
    
    // Sabhi users ka data fetch karna
    console.log("⏳ Users ka data fetch ho raha hai, kripya intezaar karein...");
    const snapshot = await usersRef.once("value");

    if (!snapshot.exists()) {
      console.log("❌ Database mein koi users nahi mile.");
      return process.exit(0);
    }

    const updates = {};
    let userCount = 0;

    // Har user node par loop chalana aur updates object tayar karna
    snapshot.forEach((childSnapshot) => {
      const uid = childSnapshot.key;
      
      // Har UID ke liye winterPoints ko 0 set karna
      updates[`users/${uid}/winterPoints`] = 0;
      userCount++;
    });

    // Bulk update perform karna
    if (Object.keys(updates).length > 0) {
      console.log(`⏳ ${userCount} users ka data update ho raha hai...`);
      await db.ref().update(updates);
      console.log(`🎉 Success! Total ${userCount} users ke winterPoints 0 ho gaye hain.`);
    }

  } catch (error) {
    console.error("❌ Error resetting winterPoints:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

resetWinterPoints();
