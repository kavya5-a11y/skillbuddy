export type SkillTrack =
  | 'Tech & Software'
  | 'Data & Excel'
  | 'Product & Agile'
  | 'Finance & Freelance'
  | 'Communication';

export type CourseLevel = 'Starter' | 'Job-Ready';

export interface VideoModule {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  videoSummary: string;
  keyTakeaway: string;
}

export interface UpcomingModule {
  id: string;
  title: string;
  duration: string;
  focus: string;
}

export interface PracticalActivity {
  id: string;
  title: string;
  estimatedMinutes: number;
  practicalTip: string;
}

export interface Course {
  id: string;
  title: string;
  track: SkillTrack;
  level: CourseLevel;
  durationLabel: string;
  shortSummary: string;
  about: string;
  realWorldOutcomes: string[];
  toolsCovered: string[];
  imageUrl: string;
  instructor: string;
  instructorRole: string;
  modules: VideoModule[];
  aheadModules: UpcomingModule[];
  activities: PracticalActivity[];
  relatedIds: string[];
  nextStepIds: string[];
}

export const SKILL_TRACKS: SkillTrack[] = [
  'Tech & Software',
  'Data & Excel',
  'Product & Agile',
  'Finance & Freelance',
  'Communication',
];

export const HERO_IMAGE_URL = '/src/assets/images/hero_career_readiness_1795100606904.jpg';

export const COURSES: Course[] = [
  {
    id: 'git-team-workflows',
    title: 'Git, Pull Requests & Team Code Reviews',
    track: 'Tech & Software',
    level: 'Starter',
    durationLabel: '45 mins',
    shortSummary: 'Work cleanly on a shared codebase without breaking main or panicking over merge conflicts.',
    about:
      'College projects usually happen in a single branch or zipped folders. In your first software job, every change goes through branches, pull requests, and peer code reviews. This course walks you step by step through real team Git habits.',
    realWorldOutcomes: [
      'Create clean feature branches and write clear commit messages',
      'Open a pull request that teammates can review in minutes',
      'Resolve everyday merge conflicts calmly without losing work',
    ],
    toolsCovered: ['Git CLI', 'GitHub Pull Requests', 'VS Code Diff Viewer'],
    imageUrl: '/src/assets/images/track_tech_software_1795100606026.jpg',
    instructor: 'Maya Lin',
    instructorRole: 'Senior Software Engineer',
    modules: [
      {
        id: 'git-m1',
        title: '01. Branching Like a Real Engineering Team',
        duration: '08:20',
        durationSeconds: 500,
        videoSummary:
          'See how teams keep main deployable at all times by naming feature branches clearly and pulling updates before coding.',
        keyTakeaway:
          'Always pull the latest main branch before starting a new feature branch so your changes stay small and easy to review.',
      },
      {
        id: 'git-m2',
        title: '02. Writing Pull Requests People Want to Review',
        duration: '11:45',
        durationSeconds: 705,
        videoSummary:
          'Walk through a real PR template showing what changed, why it changed, and screenshots that save reviewers 20 minutes.',
        keyTakeaway:
          'A two-sentence summary plus a before-and-after screenshot gets your code approved twice as fast.',
      },
      {
        id: 'git-m3',
        title: '03. Solving Merge Conflicts Step by Step',
        duration: '10:15',
        durationSeconds: 615,
        videoSummary:
          'Watch a live conflict happen when two developers edit the same file, and learn how to keep both changes safely.',
        keyTakeaway:
          'Merge conflicts are normal signals—read both incoming and current blocks carefully before accepting.',
      },
    ],
    aheadModules: [
      {
        id: 'git-a1',
        title: '04. Responding to Code Review Feedback Professionally',
        duration: '08 mins',
        focus: 'How to address change requests without taking feedback personally.',
      },
      {
        id: 'git-a2',
        title: '05. Capstone: Shipping a Safe Hotfix',
        duration: '07 mins',
        focus: 'Practice tagging a release and reverting a faulty commit cleanly.',
      },
    ],
    activities: [
      {
        id: 'git-act-1',
        title: 'Create a feature branch and make two focused commits',
        estimatedMinutes: 10,
        practicalTip: 'Name your branch clearly, like feat/fix-login-validation.',
      },
      {
        id: 'git-act-2',
        title: 'Draft a pull request description with testing steps',
        estimatedMinutes: 10,
        practicalTip: 'Include one bullet on what changed and one on how you tested it.',
      },
      {
        id: 'git-act-3',
        title: 'Resolve a simulated merge conflict in two lines of text',
        estimatedMinutes: 15,
        practicalTip: 'Delete all <<<, ===, and >>> markers before committing.',
      },
      {
        id: 'git-act-4',
        title: 'Leave two constructive review comments on sample code',
        estimatedMinutes: 10,
        practicalTip: 'Ask helpful questions ("Could we handle empty arrays here?") instead of barking orders.',
      },
    ],
    relatedIds: ['production-apis-debugging'],
    nextStepIds: ['agile-sprints-jira', 'stakeholder-emails-presentations'],
  },
  {
    id: 'production-apis-debugging',
    title: 'REST APIs, Postman & Live Bug Debugging',
    track: 'Tech & Software',
    level: 'Job-Ready',
    durationLabel: '60 mins',
    shortSummary: 'Test endpoints, read server logs, and track down why a feature works locally but fails online.',
    about:
      'Academic code runs on tidy inputs in one file. Real apps talk to APIs, handle timeouts, and throw 401 or 500 errors. Learn how working engineers inspect requests, isolate bugs, and verify fixes quickly.',
    realWorldOutcomes: [
      'Inspect network headers, payloads, and HTTP status codes',
      'Build reusable API test collections in Postman',
      'Reproduce and trace a bug before writing a single line of fix code',
    ],
    toolsCovered: ['Browser DevTools', 'Postman', 'JSON Payloads'],
    imageUrl: '/src/assets/images/track_tech_software_1795100606026.jpg',
    instructor: 'Devon Patel',
    instructorRole: 'Backend Tech Lead',
    modules: [
      {
        id: 'api-m1',
        title: '01. Reading HTTP Status Codes & Network Tabs',
        duration: '12:10',
        durationSeconds: 730,
        videoSummary:
          'Decode 400 vs 401 vs 404 vs 500 responses inside browser DevTools so you know whether the bug is frontend or backend.',
        keyTakeaway:
          'Check the Network response body before guessing—the server error message usually points right to the cause.',
      },
      {
        id: 'api-m2',
        title: '02. Testing Endpoints Faster with Postman',
        duration: '14:30',
        durationSeconds: 870,
        videoSummary:
          'Set up environment variables for local and staging URLs so you can test auth tokens and POST bodies in seconds.',
        keyTakeaway:
          'Save common API calls in collections so you never retype JSON payloads from scratch.',
      },
      {
        id: 'api-m3',
        title: '03. The 4-Step Bug Reproduction Loop',
        duration: '11:40',
        durationSeconds: 700,
        videoSummary:
          'Follow a repeatable checklist to isolate failing edge cases like missing fields, stale caches, or timezone offsets.',
        keyTakeaway:
          'Never push a fix until you can reliably make the bug fail first and pass after.',
      },
    ],
    aheadModules: [
      {
        id: 'api-a1',
        title: '04. Handling Rate Limits & Timeout Retries',
        duration: '11 mins',
        focus: 'Make API integrations resilient when third-party services slow down.',
      },
      {
        id: 'api-a2',
        title: '05. Writing Clear Bug Reports for Your Team',
        duration: '10 mins',
        focus: 'Package steps to reproduce, expected output, and network logs.',
      },
    ],
    activities: [
      {
        id: 'api-act-1',
        title: 'Inspect 3 live network calls in Browser DevTools',
        estimatedMinutes: 10,
        practicalTip: 'Filter by Fetch/XHR to hide images and focus on API data.',
      },
      {
        id: 'api-act-2',
        title: 'Send a GET and POST request with custom headers',
        estimatedMinutes: 15,
        practicalTip: 'Always confirm Content-Type: application/json is set on POST requests.',
      },
      {
        id: 'api-act-3',
        title: 'Write a minimal bug report from a broken sample form',
        estimatedMinutes: 15,
        practicalTip: 'Include exact inputs, browser version, and status code.',
      },
      {
        id: 'api-act-4',
        title: 'Verify a fallback error message when an API fails',
        estimatedMinutes: 10,
        practicalTip: 'Test offline mode in DevTools to see what users actually experience.',
      },
    ],
    relatedIds: ['git-team-workflows'],
    nextStepIds: ['sql-for-day-one-analysts', 'agile-sprints-jira'],
  },
  {
    id: 'excel-business-reporting',
    title: 'Excel Pivot Tables & Real Business Reports',
    track: 'Data & Excel',
    level: 'Starter',
    durationLabel: '50 mins',
    shortSummary: 'Turn messy raw exports into clean manager-ready summaries with XLOOKUP and Pivot Tables.',
    about:
      'Almost every business role expects you to feel comfortable in spreadsheets on day one—yet college rarely teaches how to clean messy CSV files or build dynamic weekly reports. Master the 20% of Excel features used 90% of the time at work.',
    realWorldOutcomes: [
      'Clean duplicate rows, broken dates, and extra spaces in minutes',
      'Combine tables safely using XLOOKUP instead of brittle manual copy-paste',
      'Build interactive Pivot Tables that answer manager questions on the spot',
    ],
    toolsCovered: ['Microsoft Excel', 'Google Sheets', 'Pivot Tables & XLOOKUP'],
    imageUrl: '/src/assets/images/track_data_excel_1795100606741.jpg',
    instructor: 'Elena Brooks',
    instructorRole: 'Operations Analytics Manager',
    modules: [
      {
        id: 'ex-m1',
        title: '01. Cleaning Messy CSV Exports Fast',
        duration: '10:15',
        durationSeconds: 615,
        videoSummary:
          'Use TRIM, proper text casing, Remove Duplicates, and date formatting to turn raw system dumps into clean tables.',
        keyTakeaway:
          'Never analyze raw exports directly—keep a Raw Data tab untouched and clean inside a working tab.',
      },
      {
        id: 'ex-m2',
        title: '02. Matching Two Tables with XLOOKUP',
        duration: '13:40',
        durationSeconds: 820,
        videoSummary:
          'Link customer IDs to order totals automatically without breaking formulas when columns move.',
        keyTakeaway:
          'Add a friendly fallback value like "Not Found" inside XLOOKUP so missing IDs never look like errors.',
      },
      {
        id: 'ex-m3',
        title: '03. Summarizing 5,000 Rows with Pivot Tables',
        duration: '12:50',
        durationSeconds: 770,
        videoSummary:
          'Group monthly revenue by region and product category in three clicks, then add clean percentage comparisons.',
        keyTakeaway:
          'Convert your source range into a formatted Table first so Pivot Tables update automatically with new rows.',
      },
    ],
    aheadModules: [
      {
        id: 'ex-a1',
        title: '04. Designing Clean Charts Without Visual Clutter',
        duration: '07 mins',
        focus: 'Turn Pivot Tables into clear bar and line charts for team slides.',
      },
      {
        id: 'ex-a2',
        title: '05. Building a Reusable Weekly KPI Dashboard',
        duration: '08 mins',
        focus: 'Put filters and summary metrics on one clean print-ready sheet.',
      },
    ],
    activities: [
      {
        id: 'ex-act-1',
        title: 'Clean 50 sample rows with mixed casing and extra spaces',
        estimatedMinutes: 10,
        practicalTip: 'Wrap TRIM around CLEAN to strip invisible line breaks too.',
      },
      {
        id: 'ex-act-2',
        title: 'Write an XLOOKUP formula connecting product IDs to prices',
        estimatedMinutes: 15,
        practicalTip: 'Lock lookup ranges with $ signs before dragging formulas down.',
      },
      {
        id: 'ex-act-3',
        title: 'Build a Pivot Table showing monthly totals by category',
        estimatedMinutes: 15,
        practicalTip: 'Sort values descending so top performers stand out immediately.',
      },
      {
        id: 'ex-act-4',
        title: 'Format currency and percentages consistently for leadership',
        estimatedMinutes: 10,
        practicalTip: 'Drop unnecessary decimal places on large dollar totals.',
      },
    ],
    relatedIds: ['sql-for-day-one-analysts'],
    nextStepIds: ['stakeholder-emails-presentations', 'first-paycheck-taxes-budget'],
  },
  {
    id: 'sql-for-day-one-analysts',
    title: 'SQL Queries for Real Company Databases',
    track: 'Data & Excel',
    level: 'Job-Ready',
    durationLabel: '55 mins',
    shortSummary: 'Pull the exact customer, sales, or product numbers you need without waiting on someone else.',
    about:
      'Classroom SQL focuses on textbook schemas. Real company databases have messy nullable columns, timestamps, and multiple order tables. Learn how to write readable queries that answer real business questions accurately.',
    realWorldOutcomes: [
      'Filter, group, and aggregate real customer order tables',
      'Use LEFT JOIN safely without accidentally duplicating revenue totals',
      'Structure complex queries cleanly using CTEs (WITH blocks)',
    ],
    toolsCovered: ['PostgreSQL', 'SQLite', 'Query Editor Patterns'],
    imageUrl: '/src/assets/images/track_data_excel_1795100606741.jpg',
    instructor: 'Carlos Mendez',
    instructorRole: 'Lead Data Analyst',
    modules: [
      {
        id: 'sql-m1',
        title: '01. SELECT, WHERE & Date Filtering in Real Life',
        duration: '11:20',
        durationSeconds: 680,
        videoSummary:
          'Filter active users over the past 30 days and handle NULL values cleanly without dropping valid rows.',
        keyTakeaway:
          'Always check whether a date column includes timestamps before filtering with equals or BETWEEN.',
      },
      {
        id: 'sql-m2',
        title: '02. Safe JOINs & Avoiding Duplicate Counts',
        duration: '14:10',
        durationSeconds: 850,
        videoSummary:
          'Understand one-to-many joins and verify row counts before and after joining tables.',
        keyTakeaway:
          'Use COUNT(DISTINCT user_id) whenever joining a parent table to multiple child events.',
      },
      {
        id: 'sql-m3',
        title: '03. Readable Queries with CTEs & CASE Statements',
        duration: '12:40',
        durationSeconds: 760,
        videoSummary:
          'Break multi-step metrics into clear named blocks using WITH so teammates can verify your math quickly.',
        keyTakeaway:
          'Readable SQL is reliable SQL—name every CTE after the question it answers.',
      },
    ],
    aheadModules: [
      {
        id: 'sql-a1',
        title: '04. Ranking & Month-over-Month Trends',
        duration: '09 mins',
        focus: 'Use simple window functions like ROW_NUMBER and LAG.',
      },
      {
        id: 'sql-a2',
        title: '05. Exporting Clean SQL Results into Excel Reports',
        duration: '08 mins',
        focus: 'Combine SQL extraction with executive summaries.',
      },
    ],
    activities: [
      {
        id: 'sql-act-1',
        title: 'Write a query counting orders per region for the last quarter',
        estimatedMinutes: 15,
        practicalTip: 'Test with LIMIT 20 first on large tables.',
      },
      {
        id: 'sql-act-2',
        title: 'Join a users table with orders using LEFT JOIN',
        estimatedMinutes: 15,
        practicalTip: 'Check for users with zero orders using COALESCE(total, 0).',
      },
      {
        id: 'sql-act-3',
        title: 'Categorize order sizes into Small, Medium, and Large with CASE',
        estimatedMinutes: 10,
        practicalTip: 'Always end CASE blocks with an explicit ELSE label.',
      },
      {
        id: 'sql-act-4',
        title: 'Refactor a nested subquery into two clean CTE steps',
        estimatedMinutes: 15,
        practicalTip: 'Run each CTE individually if numbers look unexpected.',
      },
    ],
    relatedIds: ['excel-business-reporting'],
    nextStepIds: ['production-apis-debugging', 'stakeholder-emails-presentations'],
  },
  {
    id: 'agile-sprints-jira',
    title: 'Running Sprints, Standups & Task Boards',
    track: 'Product & Agile',
    level: 'Starter',
    durationLabel: '40 mins',
    shortSummary: 'Understand how real teams plan two-week sprints, update tickets, and run crisp 15-minute standups.',
    about:
      'Job descriptions ask for Agile experience, even for entry-level roles. This course removes the jargon and shows you how teams actually use Jira, Linear, or Trello boards from Monday sprint kickoff to Friday demos.',
    realWorldOutcomes: [
      'Break big vague goals into clear, trackable task tickets',
      'Give a confident 60-second daily standup update',
      'Flag blockers early instead of staying stuck silently',
    ],
    toolsCovered: ['Jira & Linear', 'Kanban Boards', 'Sprint Rituals'],
    imageUrl: '/src/assets/images/track_product_agile_1795100606638.jpg',
    instructor: 'Hannah Park',
    instructorRole: 'Product Operations Lead',
    modules: [
      {
        id: 'ag-m1',
        title: '01. Inside a Real Two-Week Sprint Cycle',
        duration: '09:30',
        durationSeconds: 570,
        videoSummary:
          'See how backlog grooming, sprint planning, daily check-ins, and retros fit together on an actual team calendar.',
        keyTakeaway:
          'Sprints exist to keep priorities clear for two weeks—not to rush sloppy work.',
      },
      {
        id: 'ag-m2',
        title: '02. Writing & Updating Tickets People Understand',
        duration: '10:45',
        durationSeconds: 645,
        videoSummary:
          'Learn what belongs in a ticket status, comment, and acceptance criteria so no one has to ping you for updates.',
        keyTakeaway:
          'Leave a quick comment whenever you move a ticket to Blocked or In Review.',
      },
      {
        id: 'ag-m3',
        title: '03. The 60-Second Daily Standup Formula',
        duration: '08:15',
        durationSeconds: 495,
        videoSummary:
          'Practice sharing what shipped, what is next today, and where you need a quick unblock without rambling.',
        keyTakeaway:
          'Speak to progress and blockers rather than listing every meeting on your calendar.',
      },
    ],
    aheadModules: [
      {
        id: 'ag-a1',
        title: '04. Estimating Effort Without Guessing Wildly',
        duration: '06 mins',
        focus: 'Compare task complexity realistically with your team.',
      },
      {
        id: 'ag-a2',
        title: '05. Running Helpful Sprint Retrospectives',
        duration: '06 mins',
        focus: 'Turn team frustrations into one concrete process fix.',
      },
    ],
    activities: [
      {
        id: 'ag-act-1',
        title: 'Break a 1-sentence project idea into 4 actionable board tasks',
        estimatedMinutes: 10,
        practicalTip: 'Start each task title with a clear action verb.',
      },
      {
        id: 'ag-act-2',
        title: 'Write your own 60-second standup update script',
        estimatedMinutes: 10,
        practicalTip: 'Keep it to 3 crisp sentences: Done, Next, Blockers.',
      },
      {
        id: 'ag-act-3',
        title: 'Draft a clear blocker update tagging the right teammate',
        estimatedMinutes: 10,
        practicalTip: 'Mention what you already tried so they can unblock you faster.',
      },
      {
        id: 'ag-act-4',
        title: 'Write 2 Start / Stop / Continue notes for a sample retro',
        estimatedMinutes: 10,
        practicalTip: 'Focus on team workflows, not blaming individuals.',
      },
    ],
    relatedIds: ['user-stories-roadmaps'],
    nextStepIds: ['stakeholder-emails-presentations', 'git-team-workflows'],
  },
  {
    id: 'user-stories-roadmaps',
    title: 'Writing Clear Specs & Prioritizing Features',
    track: 'Product & Agile',
    level: 'Job-Ready',
    durationLabel: '50 mins',
    shortSummary: 'Turn messy stakeholder requests into clear one-page specs and practical product priorities.',
    about:
      'Whether you work in product, ops, or engineering, teams stall when nobody writes down what "done" looks like. Learn how to ask smart clarifying questions, write tight user stories, and decide what gets built first.',
    realWorldOutcomes: [
      'Write concise one-page feature briefs engineers and designers love',
      'Define clear acceptance criteria and edge cases upfront',
      'Prioritize competing requests using impact vs effort trade-offs',
    ],
    toolsCovered: ['One-Page PRDs', 'User Story Mapping', 'Prioritization Matrices'],
    imageUrl: '/src/assets/images/track_product_agile_1795100606638.jpg',
    instructor: 'Noah Sterling',
    instructorRole: 'Senior Product Manager',
    modules: [
      {
        id: 'pm-m1',
        title: '01. Turning Vague Requests into Real Problems',
        duration: '11:10',
        durationSeconds: 670,
        videoSummary:
          'Practice asking "Who is stuck and how do we measure success?" before jumping straight into building features.',
        keyTakeaway:
          'Write the problem statement in two sentences before proposing any solution.',
      },
      {
        id: 'pm-m2',
        title: '02. Writing Tight One-Page Feature Specs',
        duration: '13:20',
        durationSeconds: 800,
        videoSummary:
          'Walk through a real one-page spec covering Goal, Scope, Out-of-Scope, and Success Metrics.',
        keyTakeaway:
          'Listing what is explicitly Out of Scope prevents endless scope creep.',
      },
      {
        id: 'pm-m3',
        title: '03. Prioritizing When Everything Feels Urgent',
        duration: '10:50',
        durationSeconds: 650,
        videoSummary:
          'Score 6 real feature ideas by user impact and build effort to explain your "Not Now" decisions clearly.',
        keyTakeaway:
          'Saying no is easiest when stakeholders see the trade-off matrix behind the decision.',
      },
    ],
    aheadModules: [
      {
        id: 'pm-a1',
        title: '04. Running a 20-Minute User Feedback Interview',
        duration: '08 mins',
        focus: 'Ask unbiased questions that reveal real user friction.',
      },
      {
        id: 'pm-a2',
        title: '05. Sharing Roadmap Updates Without Surprises',
        duration: '07 mins',
        focus: 'Communicate timeline shifts calmly to leadership.',
      },
    ],
    activities: [
      {
        id: 'pm-act-1',
        title: 'Rewrite a vague request into a 2-sentence problem statement',
        estimatedMinutes: 10,
        practicalTip: 'Focus on the user friction, not a specific button or UI idea.',
      },
      {
        id: 'pm-act-2',
        title: 'Add 3 testable acceptance criteria to a sample user story',
        estimatedMinutes: 15,
        practicalTip: 'Use Given / When / Then phrasing for clarity.',
      },
      {
        id: 'pm-act-3',
        title: 'Rank 5 sample tasks on an Impact vs Effort grid',
        estimatedMinutes: 15,
        practicalTip: 'Highlight one Quick Win and one item to defer.',
      },
      {
        id: 'pm-act-4',
        title: 'Write an explicit "Out of Scope" section of 3 bullets',
        estimatedMinutes: 10,
        practicalTip: 'This keeps small launches on schedule.',
      },
    ],
    relatedIds: ['agile-sprints-jira'],
    nextStepIds: ['stakeholder-emails-presentations', 'excel-business-reporting'],
  },
  {
    id: 'first-paycheck-taxes-budget',
    title: 'First Paycheck, Taxes & Monthly Budgeting',
    track: 'Finance & Freelance',
    level: 'Starter',
    durationLabel: '35 mins',
    shortSummary: 'Decode paycheck deductions, set up an emergency buffer, and budget your real take-home income.',
    about:
      'Getting your first full-time offer is exciting—until your first paycheck arrives smaller than expected. Learn how taxes, benefits, retirement matches, and automatic savings work in plain language.',
    realWorldOutcomes: [
      'Read every line on a pay stub and calculate actual take-home pay',
      'Build a realistic 50/30/20 or zero-based monthly budget',
      'Automate emergency savings and employer retirement matches',
    ],
    toolsCovered: ['Paycheck Breakdown Sheet', 'Budget Templates', 'Savings Automation'],
    imageUrl: '/src/assets/images/track_finance_freelance_1795100606808.jpg',
    instructor: 'Jordan Alvarez',
    instructorRole: 'Certified Financial Planner',
    modules: [
      {
        id: 'fin-m1',
        title: '01. Reading Your First Pay Stub Line by Line',
        duration: '09:10',
        durationSeconds: 550,
        videoSummary:
          'Understand gross pay, pre-tax deductions, tax withholdings, and net deposit without guesswork.',
        keyTakeaway:
          'Always plan your rent and fixed bills around net take-home pay, never your gross offer letter.',
      },
      {
        id: 'fin-m2',
        title: '02. Setting Up a Simple Monthly Cashflow System',
        duration: '10:25',
        durationSeconds: 625,
        videoSummary:
          'Automate rent, bills, savings, and guilt-free spending on payday so you never track every coffee.',
        keyTakeaway:
          'Route savings automatically the morning after payday so willpower is never required.',
      },
      {
        id: 'fin-m3',
        title: '03. Employer Matches, Benefits & Emergency Buffers',
        duration: '08:45',
        durationSeconds: 525,
        videoSummary:
          'See why grabbing your full employer retirement match is an instant 100% return and how to build a 3-month cushion.',
        keyTakeaway:
          'Start with at least the minimum contribution needed to capture 100% of your employer match.',
      },
    ],
    aheadModules: [
      {
        id: 'fin-a1',
        title: '04. Tackling Student Loans Without Stress',
        duration: '04 mins',
        focus: 'Compare repayment options alongside savings goals.',
      },
      {
        id: 'fin-a2',
        title: '05. Annual Raises & Lifestyle Creep Checkup',
        duration: '03 mins',
        focus: 'Split every raise between savings and daily lifestyle upgrades.',
      },
    ],
    activities: [
      {
        id: 'fin-act-1',
        title: 'Calculate true monthly take-home pay from a sample salary',
        estimatedMinutes: 10,
        practicalTip: 'Subtract estimated taxes, health premiums, and retirement contributions.',
      },
      {
        id: 'fin-act-2',
        title: 'List fixed essentials vs flexible monthly expenses',
        estimatedMinutes: 10,
        practicalTip: 'Keep fixed costs under 50–55% of net pay when starting out.',
      },
      {
        id: 'fin-act-3',
        title: 'Set a target 3-month emergency buffer number',
        estimatedMinutes: 5,
        practicalTip: 'Base it on bare-bones monthly essentials, not luxury spending.',
      },
      {
        id: 'fin-act-4',
        title: 'Map out automatic payday transfer dates',
        estimatedMinutes: 10,
        practicalTip: 'Align auto-transfers 1–2 days after payroll clears.',
      },
    ],
    relatedIds: ['freelance-contracts-invoicing'],
    nextStepIds: ['behavioral-interviews-star', 'excel-business-reporting'],
  },
  {
    id: 'freelance-contracts-invoicing',
    title: 'Client Proposals, Contracts & Invoicing',
    track: 'Finance & Freelance',
    level: 'Job-Ready',
    durationLabel: '45 mins',
    shortSummary: 'Price freelance projects fairly, protect yourself with simple agreements, and get paid on time.',
    about:
      'Doing freelance side work or contract gigs right after college can accelerate your portfolio—unless scope creep leaves you working for pennies. Learn the practical business mechanics of independent work.',
    realWorldOutcomes: [
      'Price project packages confidently instead of guessing hourly rates',
      'Include must-have scope, revision, and deposit terms in simple contracts',
      'Send clean professional invoices and follow up politely on late payments',
    ],
    toolsCovered: ['Proposal Templates', 'Simple SOWs', 'Invoice Checklists'],
    imageUrl: '/src/assets/images/track_finance_freelance_1795100606808.jpg',
    instructor: 'Samira Haddad',
    instructorRole: 'Independent Consultant',
    modules: [
      {
        id: 'fr-m1',
        title: '01. Pricing Your Time & Project Packages Fairly',
        duration: '11:00',
        durationSeconds: 660,
        videoSummary:
          'Account for taxes, admin time, and revisions when quoting fixed-price or hourly client work.',
        keyTakeaway:
          'Never quote a freelance hourly rate equal to a salaried job—factor in 25–30% for taxes and unbilled time.',
      },
      {
        id: 'fr-m2',
        title: '02. Simple Scope & Deposit Rules That Prevent Chaos',
        duration: '12:15',
        durationSeconds: 735,
        videoSummary:
          'Learn why taking 50% upfront, capping revision rounds, and listing deliverables in writing protects both sides.',
        keyTakeaway:
          'No work starts without a signed one-page scope and an upfront deposit.',
      },
      {
        id: 'fr-m3',
        title: '03. Sending Invoices & Polite Payment Follow-Ups',
        duration: '09:30',
        durationSeconds: 570,
        videoSummary:
          'Structure clear invoices with Net-15 terms and use friendly reminder scripts when due dates slip.',
        keyTakeaway:
          'Put an exact calendar due date on every invoice instead of vague "Due in 15 days" text.',
      },
    ],
    aheadModules: [
      {
        id: 'fr-a1',
        title: '04. Setting Aside Quarterly Freelance Taxes',
        duration: '06 mins',
        focus: 'Keep a separate tax bucket so April never brings surprises.',
      },
      {
        id: 'fr-a2',
        title: '05. Turning One-Off Clients into Repeat Retainers',
        duration: '06 mins',
        focus: 'Offer clean monthly support options after launch.',
      },
    ],
    activities: [
      {
        id: 'fr-act-1',
        title: 'Calculate your baseline sustainable freelance hourly rate',
        estimatedMinutes: 10,
        practicalTip: 'Include software costs, taxes, and non-billable outreach hours.',
      },
      {
        id: 'fr-act-2',
        title: 'Write a 3-part deliverable list with a revision cap',
        estimatedMinutes: 15,
        practicalTip: 'Specify "Includes up to 2 rounds of consolidated feedback."',
      },
      {
        id: 'fr-act-3',
        title: 'Fill out a sample Net-15 invoice with deposit credit',
        estimatedMinutes: 10,
        practicalTip: 'Include payment instructions and invoice number cleanly.',
      },
      {
        id: 'fr-act-4',
        title: 'Draft a friendly 3-day overdue reminder email',
        estimatedMinutes: 10,
        practicalTip: 'Keep the tone warm and attach the original PDF for convenience.',
      },
    ],
    relatedIds: ['first-paycheck-taxes-budget'],
    nextStepIds: ['stakeholder-emails-presentations', 'user-stories-roadmaps'],
  },
  {
    id: 'behavioral-interviews-star',
    title: 'Answering Real Interview Questions Clearly',
    track: 'Communication',
    level: 'Starter',
    durationLabel: '40 mins',
    shortSummary: 'Turn class projects, part-time jobs, and internships into crisp, memorable STAR stories.',
    about:
      'Many capable graduates lose job offers not from lack of ability, but because their interview answers ramble or sound rehearsed. Learn how to structure your experiences clearly so hiring managers see your real impact.',
    realWorldOutcomes: [
      'Build 5 versatile stories from school, clubs, or internships',
      'Answer "Tell me about yourself" in 90 focused seconds',
      'Ask thoughtful closing questions that stand out from generic candidates',
    ],
    toolsCovered: ['STAR Story Grid', '90-Second Pitch', 'Interview Prep Sheet'],
    imageUrl: '/src/assets/images/track_communication_interview_1795100606111.jpg',
    instructor: 'Marcus Reed',
    instructorRole: 'Talent Partner & Career Coach',
    modules: [
      {
        id: 'int-m1',
        title: '01. The 90-Second "Tell Me About Yourself" Opener',
        duration: '09:45',
        durationSeconds: 585,
        videoSummary:
          'Connect your background, one concrete hands-on project, and why this specific role excites you without reading your resume aloud.',
        keyTakeaway:
          'Use Present → Past → Future so your opener ends naturally on why you want this job.',
      },
      {
        id: 'int-m2',
        title: '02. Turning Class Projects into Crisp STAR Answers',
        duration: '11:30',
        durationSeconds: 690,
        videoSummary:
          'Spend 60% of your answer on the Action YOU took and the Result—not five minutes explaining background setup.',
        keyTakeaway:
          'Use "I" instead of "we" when explaining your specific contribution in a group project.',
      },
      {
        id: 'int-m3',
        title: '03. Handling Tough Questions & Asking Smart Ones Back',
        duration: '09:50',
        durationSeconds: 590,
        videoSummary:
          'Respond calmly when you do not know an answer yet, and close with smart questions about the team’s 90-day goals.',
        keyTakeaway:
          'Ask "What does success look like in the first 90 days?" to show practical ownership.',
      },
    ],
    aheadModules: [
      {
        id: 'int-a1',
        title: '04. Navigating Salary Expectations & Offer Calls',
        duration: '05 mins',
        focus: 'Respond professionally when asked about compensation ranges.',
      },
      {
        id: 'int-a2',
        title: '05. Thank-You Notes That Reinforce Fit',
        duration: '04 mins',
        focus: 'Send a 4-sentence follow-up referencing a real conversation point.',
      },
    ],
    activities: [
      {
        id: 'int-act-1',
        title: 'Write and time your 90-second intro pitch',
        estimatedMinutes: 10,
        practicalTip: 'Say it aloud once—if it feels rushed, trim one background detail.',
      },
      {
        id: 'int-act-2',
        title: 'Draft 2 STAR stories highlighting problem-solving and teamwork',
        estimatedMinutes: 15,
        practicalTip: 'Keep Situation + Task under 25 words total.',
      },
      {
        id: 'int-act-3',
        title: 'Prepare 3 practical questions to ask your interviewer',
        estimatedMinutes: 10,
        practicalTip: 'Avoid questions easily answered on the company homepage.',
      },
      {
        id: 'int-act-4',
        title: 'Write a reusable post-interview thank-you template',
        estimatedMinutes: 5,
        practicalTip: 'Send within 24 hours while the conversation is fresh.',
      },
    ],
    relatedIds: ['stakeholder-emails-presentations'],
    nextStepIds: ['first-paycheck-taxes-budget', 'agile-sprints-jira'],
  },
  {
    id: 'stakeholder-emails-presentations',
    title: 'Writing Clear Emails & Presenting Updates',
    track: 'Communication',
    level: 'Job-Ready',
    durationLabel: '45 mins',
    shortSummary: 'Write Slack updates, manager emails, and 5-slide project readouts that busy teams read immediately.',
    about:
      'College essays reward length; workplace writing rewards clarity and speed. Learn how to put the bottom line up front, summarize complex work for non-technical teammates, and run crisp project updates.',
    realWorldOutcomes: [
      'Structure emails and Slack messages with Bottom Line Up Front (BLUF)',
      'Turn detailed work into a clean 3-bullet status update',
      'Lead a 5-minute project presentation without reading off slides',
    ],
    toolsCovered: ['BLUF Writing Framework', 'Status Update Templates', 'Executive Summaries'],
    imageUrl: '/src/assets/images/track_communication_interview_1795100606111.jpg',
    instructor: 'Claire Bennett',
    instructorRole: 'Director of Operations',
    modules: [
      {
        id: 'com-m1',
        title: '01. Bottom Line Up Front: Workplace Email Habits',
        duration: '10:05',
        durationSeconds: 605,
        videoSummary:
          'See side-by-side rewrites turning a 3-paragraph wall of text into a 4-line email that gets an answer the same day.',
        keyTakeaway:
          'Put the decision needed or main takeaway in the very first sentence.',
      },
      {
        id: 'com-m2',
        title: '02. Writing Weekly Updates & Async Slack Messages',
        duration: '11:20',
        durationSeconds: 680,
        videoSummary:
          'Format weekly team updates with clear status labels, next milestones, and explicit asks.',
        keyTakeaway:
          'Replace "Just checking in!" with a specific context line and clear proposed next step.',
      },
      {
        id: 'com-m3',
        title: '03. Presenting Findings to Busy Stakeholders',
        duration: '11:55',
        durationSeconds: 715,
        videoSummary:
          'Structure a 5-minute readout: Recommendation → Evidence → Risks → Next Step.',
        keyTakeaway:
          'Start with your conclusion first so busy leaders know why the data matters.',
      },
    ],
    aheadModules: [
      {
        id: 'com-a1',
        title: '04. Pushing Back Politely on Unrealistic Deadlines',
        duration: '06 mins',
        focus: 'Offer clear trade-offs instead of saying a flat "no."',
      },
      {
        id: 'com-a2',
        title: '05. Running Meetings With Clear Notes & Owners',
        duration: '06 mins',
        focus: 'End every meeting with who-does-what-by-when.',
      },
    ],
    activities: [
      {
        id: 'com-act-1',
        title: 'Rewrite a long 180-word sample email down to 60 crisp words',
        estimatedMinutes: 10,
        practicalTip: 'Bold the exact question or deadline at the top.',
      },
      {
        id: 'com-act-2',
        title: 'Format a Friday project status update with 3 clear sections',
        estimatedMinutes: 10,
        practicalTip: 'Use Completed, In Progress, and Next Week.',
      },
      {
        id: 'com-act-3',
        title: 'Outline a 4-slide project readout starting with the conclusion',
        estimatedMinutes: 15,
        practicalTip: 'One main chart or takeaway per slide.',
      },
      {
        id: 'com-act-4',
        title: 'Draft a polite scope trade-off response to a rush request',
        estimatedMinutes: 10,
        practicalTip: 'Propose two options: deliver Option A Friday or full scope Tuesday.',
      },
    ],
    relatedIds: ['behavioral-interviews-star'],
    nextStepIds: ['excel-business-reporting', 'user-stories-roadmaps'],
  },
];
