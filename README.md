💊 PillPal
<div align="center">
Smart Medication Management System
Scan • Track • Adhere — before it's too late
Show Image
Show Image
Show Image
Show Image
Show Image
Features • App Flow • Tech Stack • Getting Started
</div>

🚨 The Problem
Medication non-adherence is a silent crisis:

💀 125,000 deaths annually in the US caused by not taking medication correctly
🏥 $300 billion in avoidable healthcare costs every year
👴 Elderly patients managing multiple prescriptions with no system to verify compliance
🎓 University students forgetting doses during high-stress periods like exams
💊 Chronic condition patients asking "did I already take my pill today?" every single morning

92% of missed doses are not intentional — people are simply busy, forgetful, or overwhelmed.

💡 The Solution
PillPal is a smart, hardware-integrated medication management system that combines computer vision, IoT weight sensors, and a beautiful web interface to make adherence effortless.
LayerWhat It Does📸 Computer VisionScans prescription bottle labels with OpenCV + Tesseract OCR⚖️ Arduino SensorsLoad cell weight sensors detect when a pill is physically removed🌐 Web AppAnimated 7-day tracker, drug encyclopedia, analytics, refill tracking📅 Google CalendarAuto-creates 90-day recurring medication reminders

✨ Features
🔐 Authentication

Email + password login and sign-up
Password reveal toggle
Remember me checkbox
Google Sign-In button
Animated floating pill background during auth


💊 Weekly Pillbox Tracker

Animated 7-day rainbow pillbox grid (Sunday → Saturday)
Click any compartment to mark a pill as taken
Confetti animation (80 particles) fires on every dose marked
Streak counter with 🔥 badge
Missed day detection with pulsing red ! indicator
Green/red sensor status dots showing pill count per compartment
Glowing highlight pulse on today's compartment
3D tilt hover effect on stats card and compartments


📸 Medication Scanner
The scan flow walks through 5 steps:
Camera → Scanning → Success → Drug Info → Schedule → Google Calendar
Camera — Live webcam with animated corner brackets and sweeping cyan scan line
Scanning — Connects to backend OCR endpoint; falls back to mock data if unavailable
Drug Information Encyclopedia — After detecting a medication, shows:
SectionContents🏷️ Also Known AsAll brand name aliases✅ What It TreatsFull list of conditions it addresses⚠️ Side EffectsCommon side effects to watch for🚨 WarningsCritical usage warnings
Medications currently in the database:
MedicationCategoryBrand NamesLisinopril 10mgACE InhibitorPrinivil, ZestrilMetformin 500mgAntidiabeticGlucophage, Fortamet, GlumetzaAtorvastatin 20mgStatinLipitorAmlodipine 5mgCalcium Channel BlockerNorvasc
Schedule Setup — Choose 1x / 2x / 3x daily with individual time pickers per dose
Google Calendar — Opens a pre-filled event with:

1-hour duration (visible in calendar view)
90-day daily recurrence rule
Medication name, dosage, instructions, and times in description


🔔 Refill Tracker
Amazon-style order tracking with 5 stages:
Order Received → Being Prepared → Ready for Pickup → Out for Delivery → Delivered

Animated progress bar across all stages
🚚 Bouncing truck animation when out for delivery
Animated route line from pharmacy 🏥 → home 🏠
Pharmacy info card with call and directions buttons
Refill alert banner when ≤ 2 days of pills remain


📊 Analytics Dashboard
ChartData Shown📅 Bar ChartWeekly doses taken vs missed (per day)📈 Line Chart6-month adherence percentage trend🥧 Pie ChartMedication type breakdown💡 Insights4 auto-generated adherence tips
Stat cards: Overall Adherence · Current Streak · Best Streak · Total Doses

🌙 Dark Mode

Toggle in navbar (☀️ → 🌙) with spring animation
Applied across WeeklyView, RefillTracker, and AnalyticsDashboard


💫 Splash Screen

5 bouncing pill animations on a sky blue gradient
Progress bar counting 0 → 100% over ~3 seconds
20 floating background particles
Transitions automatically into login screen


📐 The Math
Weekly adherence rate:
Adherence=Doses Taken7×100%\text{Adherence} = \frac{\text{Doses Taken}}{7} \times 100\%Adherence=7Doses Taken​×100%
Refill alert triggers when:
Days Remaining=7−Doses Taken≤2\text{Days Remaining} = 7 - \text{Doses Taken} \leq 2Days Remaining=7−Doses Taken≤2
Streak counter resets on first missed day:
Streak=∑i=0today1[dayi=taken]\text{Streak} = \sum_{i=0}^{\text{today}} \mathbb{1}[\text{day}_i = \text{taken}]Streak=i=0∑today​1[dayi​=taken]
Arduino sensor pill detection uses a weight threshold:
Pill Removed={Trueif wmeasured<wbaseline−δFalseotherwise\text{Pill Removed} = \begin{cases} \text{True} & \text{if } w_{\text{measured}} < w_{\text{baseline}} - \delta \\ \text{False} & \text{otherwise} \end{cases}Pill Removed={TrueFalse​if wmeasured​<wbaseline​−δotherwise​
where \( \delta \) is the minimum detectable pill weight, calibrated per medication type.

🛠️ Tech Stack
Frontend
TechnologyPurposeReact 18 + TypeScriptCore frameworkViteBuild toolTailwind CSSStylingFramer MotionAll animations (tilt, confetti, transitions)RechartsAnalytics chartsreact-webcamCamera access for pill scanning
Backend & Hardware
TechnologyPurposeOpenCV + TesseractPrescription label OCR (teammate)Arduino + Load CellsWeight-based pill detection (teammates)Google Calendar URL APIRecurring medication remindersNode.js / ExpressREST API at localhost:3000

🔌 Backend API
PillPal connects to these endpoints with automatic mock fallback for demos:
POST /scan-image
Body:    { image: "base64...", timestamp: "ISO string" }
Returns: { name, dosage, instructions, patientName }

POST /add-medication
Body:    { medication: {...}, schedule: {...}, timestamp: "ISO string" }
Returns: { success: true }
If the backend is offline, the app falls back to demo mode automatically — fully presentable without hardware.

🚀 App Flow
Splash Screen (loading animation)
         ↓
   Login / Sign Up
         ↓
   Landing Page
         ↓
  "Start Tracking"
         ↓
     Weekly View
      ├── Click compartment → mark taken + confetti 🎉
      ├── 💊 Floating button → view / delete medications
      ├── ＋ Floating button → ScanFlow
      │       ├── 📸 Camera (live webcam)
      │       ├── 🔍 Scanning (OCR backend or mock fallback)
      │       ├── ✅ Medication detected
      │       ├── 📖 Drug information encyclopedia
      │       ├── ⏰ Schedule setup (frequency + times)
      │       └── 📅 Add to Google Calendar
      ├── 🔔 Track Refill Status → RefillTracker
      └── 📊 View Analytics → AnalyticsDashboard

⚙️ Getting Started
Prerequisites

Node.js 18+
npm

Installation
bash# Clone the repo
git clone https://github.com/sansitamalhotra/makeUofT.git
cd makeUofT

# Install dependencies
npm install

# Start the dev server
npm run dev
Open http://localhost:5173 in your browser.

Note: The app runs fully in demo mode without the backend. To enable real OCR scanning and Arduino sensor tracking, run the backend server at http://localhost:3000.


👥 Team
NameRoleSansita MalhotraFrontend — React/TypeScript, animations, Google Calendar integration, UI/UXTeammate 2Backend — OpenCV + Tesseract OCR prescription scanningTeammate 3Hardware — Arduino load cell sensors + weight detectionTeammate 4Hardware — Arduino load cell sensors + ESP32 integration

🔮 What's Next

 Real-time WebSocket connection between Arduino sensors and UI
 Expanded drug database beyond 4 medications
 Push notifications for missed doses
 Multi-medication pillbox compartment support
 Caregiver / family account sharing
 Real pharmacy API integration for live refill tracking
 Mobile app (React Native)


<div align="center">
Built with 💊 at MakeUofT 2025
Reducing the 125,000 annual deaths from medication non-adherence — one pill at a time.
</div>
