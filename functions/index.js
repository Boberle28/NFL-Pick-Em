
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions/v2");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {getMessaging} = require("firebase-admin/messaging");

const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const lockTimes = {
  week1: "2026-09-10T00:20:00Z",
  week2: "2026-09-18T00:15:00Z",
  week3: "2026-09-25T00:15:00Z",
  week4: "2026-10-02T00:15:00Z",
  week5: "2026-10-09T00:15:00Z",
  week6: "2026-10-16T00:15:00Z",
  week7: "2026-10-23T00:15:00Z",
  week8: "2026-10-30T00:15:00Z",
  week9: "2026-11-06T01:15:00Z",
  week10: "2026-11-13T01:15:00Z",
  week11: "2026-11-20T01:15:00Z",
  week12: "2026-11-26T01:00:00Z",
  week13: "2026-12-04T01:15:00Z",
  week14: "2026-12-11T01:15:00Z",
  week15: "2026-12-18T01:15:00Z",
  week16: "2026-12-25T01:15:00Z",
  week17: "2027-01-01T01:15:00Z",
  week18: "2027-01-10T18:00:00Z",
};

exports.pickReminder = onSchedule(
    {
      schedule: "every 15 minutes",
      timeZone: "America/Chicago",
    },
    async () => {
      // 1. Get current time
      // 2. Determine current NFL week
      // 3. Get that week's betting lock time
      // 4. Check whether lock is 45–60 minutes away
      // 5. If not, return immediately
      // 6. If yes, check users who haven't made picks
      // 7. Send notifications

      const now = Date.now();

      let currentWeek = null;
      for (const [week, lockString] of Object.entries(lockTimes)) {
        const lockTime = new Date(lockString).getTime();

        if (now < lockTime) {
          currentWeek = week;
          break;
        }
      }

      if (!currentWeek) {
        return;
      }

      const lockTime = new Date(lockTimes[currentWeek]).getTime();
      const minutesUntilLock = (lockTime - now) / (1000 * 60);

      if (minutesUntilLock <= 0 || minutesUntilLock > 60) {
        return;
      }

      console.log(`Sending reminders for ${currentWeek}`);

      const snapshot = await db.collection("picks").get();

      for (const doc of snapshot.docs) {
        const data = doc.data();

        // User doesn't have notifications enabled
        if (!data.notifications || !data.notifications.enabled) {
          continue;
        }

        // User doesn't have a notification token
        if (!data.notifications || !data.notifications.token) {
          continue;
        }

        if(data.notifications.lastReminderWeek)
        {
            if(currentWeek === data.notifications.lastReminderWeek){
                continue;
            }
        }

        // User already submitted this week's picks
        if (data[currentWeek]) {
          continue;
        }

        console.log(`${doc.id} needs a reminder`);

        const displayWeek = `Week ${currentWeek.replace("week", "")}`;

        // Send notification here
        const message = {
          notification: {
            title: "NFL Pick'Em Reminder",
            body:
             `You haven't made your ${displayWeek} picks yet! ` +
             "You have less than an hour left!",
          },
          token: data.notifications.token,
        };

        try {
          await getMessaging().send(message);
          console.log(`Reminder sent to ${doc.id}`);
        } catch (error) {
          console.error(`Failed to notify ${doc.id}:`, error);
        }

        await doc.ref.update({
         "notifications.lastReminderWeek": currentWeek
        });
      }
    },
);
