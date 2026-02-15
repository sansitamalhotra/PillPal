// server.js
import express from "express";
import { google } from "googleapis";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Google Calendar setup
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
const calendar = google.calendar({ version: "v3", auth: oauth2Client });

// Root route
app.get("/", (req, res) => {
    res.send("✅ Server running. Use /calendar-text to add events.");
});

// Add calendar event from frontend OCR text
app.post("/scan-image", async (req, res) => {
    const pillData = req.body;
    console.log("Received pill data:", pillData);

    // Call Google Calendar API here
    try {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 15);

        const event = await calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: `💊 Take ${pillData.name}`,
                description: `${pillData.dosage}\n${pillData.frequency}\n${pillData.timing}\nQuantity: ${pillData.quantity}`,
                start: { dateTime: start.toISOString(), timeZone: "America/Toronto" },
                end: { dateTime: end.toISOString(), timeZone: "America/Toronto" },
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: "popup", minutes: 0 } // 0 minutes = immediately at event start
                    ]
                }
            }
        });

        res.json({ success: true, event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Calendar insert failed", details: err.message });
    }
});


app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
