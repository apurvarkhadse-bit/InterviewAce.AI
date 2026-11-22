export type Company = {
  id:string; name:string; logo:string; color:string; sector:string; type:string; hq:string; employees:string;
  roles:string[]; salary:string; stipend:string; cgpa:string; backlogs:string; eligibility:string[];
  skillsRequired:string[]; rounds:{name:string;desc:string;duration:string}[]; locations:string[];
  difficulty:string; hiring:string; about:string; bond:string; questions:{q:string;type:string;difficulty:string;answer:string;keywords:string[]}[];
};
export type Domain = { id:string; name:string; branch:string; icon:string; color:string; demand:number; avgSalary:string; skills:string[]; roadmap:string[]; topics:string[]; roles:string[]; description:string };
export type MCQ = { id:string; domain:string; q:string; options:string[]; answer:number; explanation:string; difficulty:string; topic:string };
export type InterviewQ = { q:string; domain:string; company:string; type:string; difficulty:string; keywords:string[]; sample:string; tips:string };

export const BRANCHES = ["Computer Science / IT","Electronics & Telecom","Mechanical / Mechatronics","Civil / Environmental","Business & Management","Basic Sciences / HSC Track"];

export const DOMAINS: Domain[] = [
 {id:"web",name:"Web Development",branch:"Computer Science / IT",icon:"🌐",color:"#0ea5e9",demand:96,avgSalary:"₹4–8 LPA",skills:["HTML/CSS","JavaScript","React","Node.js","REST API","Git"],roadmap:["HTML, CSS & Responsive Design","JavaScript ES6+ & DOM","React + Hooks + State","Node, Express & REST APIs","Databases & Auth","Deploy on Vercel / AWS"],topics:["Closures & Promises","Virtual DOM","HTTP Methods","Flexbox/Grid","API Integration","Authentication"],roles:["Frontend Intern","Full-Stack Intern","React Developer"],description:"Build modern websites & web apps used by millions. Highest internship openings for undergrads."},
 {id:"ai",name:"AI / Machine Learning",branch:"Computer Science / IT",icon:"🤖",color:"#8b5cf6",demand:98,avgSalary:"₹6–12 LPA",skills:["Python","Pandas","Scikit-learn","Neural Networks","NLP","Prompt Engineering"],roadmap:["Python & Maths for ML","Data Handling with Pandas","Supervised / Unsupervised ML","Deep Learning Basics","NLP & LLMs","Build & Deploy ML Projects"],topics:["Regression vs Classification","Overfitting","Neural Networks","Transformers","Model Evaluation"],roles:["ML Intern","AI Intern","Data Scientist Trainee"],description:"Teach machines to learn from data — the fastest growing domain in every industry."},
 {id:"ds",name:"Data Science & Analytics",branch:"Computer Science / IT",icon:"📊",color:"#10b981",demand:92,avgSalary:"₹5–9 LPA",skills:["Python","SQL","Excel","Power BI","Statistics","Visualization"],roadmap:["Excel & SQL","Python for Data","Statistics & Probability","Visualization (Power BI/Tableau)","ML for Analytics","Portfolio Projects"],topics:["SQL Joins","Mean vs Median","Correlation","Data Cleaning","Dashboards"],roles:["Data Analyst Intern","BI Intern"],description:"Turn raw data into decisions companies can act on."},
 {id:"cloud",name:"Cloud & DevOps",branch:"Computer Science / IT",icon:"☁️",color:"#f59e0b",demand:90,avgSalary:"₹5–10 LPA",skills:["AWS/Azure","Linux","Docker","CI/CD","Kubernetes Basics","Networking"],roadmap:["Linux & Networking","Cloud Fundamentals (AWS)","Docker & Containers","CI/CD Pipelines","Monitoring & Security"],topics:["EC2 vs S3","Docker vs VM","CI/CD","Load Balancer","IAM"],roles:["Cloud Intern","DevOps Intern"],description:"Deploy, scale and secure applications on the cloud."},
 {id:"cyber",name:"Cybersecurity",branch:"Computer Science / IT",icon:"🛡️",color:"#ef4444",demand:88,avgSalary:"₹5–9 LPA",skills:["Networking","Linux","Ethical Hacking Basics","OWASP","Cryptography"],roadmap:["Networking & OS","Security Fundamentals","Web Vulnerabilities (OWASP)","Tools: Wireshark, Burp","SOC & Incident Response"],topics:["Phishing","SQL Injection","Encryption","Firewalls","CIA Triad"],roles:["Security Intern","SOC Analyst Trainee"],description:"Protect systems, networks and data from attacks."},
 {id:"app",name:"Mobile App Development",branch:"Computer Science / IT",icon:"📱",color:"#ec4899",demand:85,avgSalary:"₹4–7 LPA",skills:["Flutter / React Native","Dart / JS","Firebase","UI Design","APIs"],roadmap:["Programming Basics","Flutter Widgets","State Management","Firebase & APIs","Publish to Play Store"],topics:["Stateless vs Stateful","API Calls","Navigation","Local Storage"],roles:["App Dev Intern","Flutter Intern"],description:"Create Android & iOS apps with one codebase."},
 {id:"embedded",name:"Embedded Systems",branch:"Electronics & Telecom",icon:"🔌",color:"#14b8a6",demand:82,avgSalary:"₹4–8 LPA",skills:["C / Embedded C","Microcontrollers","RTOS","UART/SPI/I2C","Arduino/ESP32"],roadmap:["C Programming","Microcontrollers (8051/ARM)","Communication Protocols","RTOS Basics","Mini Projects"],topics:["Interrupt vs Polling","UART vs SPI","ADC/DAC","Timers"],roles:["Embedded Intern","Firmware Trainee"],description:"Program the chips inside cars, appliances & medical devices."},
 {id:"vlsi",name:"VLSI Design",branch:"Electronics & Telecom",icon:"💾",color:"#6366f1",demand:80,avgSalary:"₹6–11 LPA",skills:["Digital Electronics","Verilog","CMOS","STA Basics","EDA Tools"],roadmap:["Digital Logic","Verilog / VHDL","CMOS Fundamentals","Synthesis & Timing","Verification Basics"],topics:["Flip-Flops","Setup/Hold Time","Finite State Machines","Logic Gates"],roles:["VLSI Intern","Design Trainee"],description:"Design the chips powering phones, laptops & EVs. India's semiconductor mission is booming."},
 {id:"iot",name:"IoT & Robotics",branch:"Electronics & Telecom",icon:"🤖",color:"#f97316",demand:84,avgSalary:"₹4–7 LPA",skills:["Sensors","ESP32/Raspberry Pi","MQTT","Python","Automation"],roadmap:["Electronics Basics","Sensors & Actuators","ESP32 Programming","Cloud Dashboards","Robotics Project"],topics:["MQTT","Sensor Types","Edge vs Cloud","Actuators"],roles:["IoT Intern","Robotics Intern"],description:"Connect physical devices to the internet and automate the world."},
 {id:"mech",name:"Mechanical CAD / Design",branch:"Mechanical / Mechatronics",icon:"⚙️",color:"#64748b",demand:78,avgSalary:"₹3.5–6 LPA",skills:["AutoCAD","SolidWorks","GD&T","Thermodynamics","Manufacturing"],roadmap:["Engineering Drawing","AutoCAD 2D/3D","SolidWorks Modelling","GD&T & Tolerances","Design Project"],topics:["Stress-Strain","GD&T Symbols","IC Engine","Manufacturing Processes"],roles:["Design Intern","CAD Trainee"],description:"Design machines, vehicles and products used every day."},
 {id:"civil",name:"Civil & BIM",branch:"Civil / Environmental",icon:"🏗️",color:"#a16207",demand:75,avgSalary:"₹3–5.5 LPA",skills:["AutoCAD","STAAD Pro","BIM / Revit","Surveying","Estimation"],roadmap:["Building Materials","AutoCAD Plans","Structural Basics","Revit / BIM","Site & Estimation"],topics:["RCC vs Steel","BIM Benefits","Survey Types","Load Types"],roles:["Civil Site Intern","BIM Trainee"],description:"Plan and build roads, bridges, buildings & smart cities."},
 {id:"business",name:"Business, Marketing & HR",branch:"Business & Management",icon:"💼",color:"#0f766e",demand:86,avgSalary:"₹3–6 LPA",skills:["Communication","Digital Marketing","Excel","SEO","HR Basics","Sales"],roadmap:["Communication Skills","Excel & Presentation","Digital Marketing / HR Basics","Tools: Canva, Meta Ads, ATS","Live Project / Internship"],topics:["4Ps of Marketing","SEO vs SEM","Recruitment Cycle","SWOT Analysis"],roles:["Marketing Intern","HR Intern","Business Analyst Intern"],description:"Grow brands, people and revenue — open to all streams."},
 {id:"aptitude",name:"Aptitude & Reasoning (HSC Track)",branch:"Basic Sciences / HSC Track",icon:"🧮",color:"#7c3aed",demand:94,avgSalary:"Foundation for all drives",skills:["Quantitative Aptitude","Logical Reasoning","Verbal Ability","Speed Maths"],roadmap:["Number System & Percentages","Ratio, Time & Work","Puzzles & Series","Reading Comprehension","Mock Tests Weekly"],topics:["Percentages","Time & Work","Blood Relations","Coding-Decoding","Profit & Loss"],roles:["All Internship Drives","Campus Placement Round 1"],description:"The first filter in almost every company drive — master it early."},
];

const cq = (arr:[string,string,string,string[]][]): Company["questions"] => arr.map(a=>({q:a[0],type:a[1],difficulty:a[2],keywords:a[3],answer:"Structure your answer: define the concept in one line, give a real example/project proof, naturally use the keywords shown, and close with impact or what you learned. Keep it 45–90 seconds."}));

function makeCompany(p:Partial<Company> & {questions:any[]}):Company{
 return {
  logo:p.name!.slice(0,2).toUpperCase(), color:"#2563eb", sector:"IT Services", type:"MNC", hq:"India", employees:"100k+",
  roles:["Intern","Trainee Engineer"], salary:"₹3.5–7 LPA", stipend:"₹15k–30k / month", cgpa:"6.0 CGPA / 60% throughout", backlogs:"No active backlogs",
  eligibility:["60% in 10th, 12th & current degree","No active backlogs at time of drive","Good communication skills","Willing to relocate / work in shifts"],
  skillsRequired:["One programming language (C/Java/Python)","OOPS & DBMS basics","Aptitude & Logical Reasoning","Communication"],
  rounds:[{name:"Online Assessment",desc:"Aptitude, Logical, Verbal + 1–2 Coding questions",duration:"90–120 mins"},{name:"Technical Interview",desc:"DSA basics, OOPS, DBMS, project discussion",duration:"30–45 mins"},{name:"HR Interview",desc:"Introduction, strengths, relocation, career goals",duration:"15–20 mins"}],
  locations:["Pune","Bangalore","Hyderabad","Chennai","Mumbai"], difficulty:"Medium", hiring:"Mass Hiring (Off & On Campus)", bond:"1–2 years service agreement (varies)",
  about:"Leading employer for freshers with structured training and PAN-India projects.", ...p,
 } as Company;
}

export const COMPANIES: Company[] = [
 makeCompany({id:"tcs",name:"TCS",color:"#1e40af",sector:"IT Services",hq:"Mumbai",employees:"600k+",roles:["Ninja Intern","Digital Trainee","System Engineer"],salary:"₹3.36–7 LPA (Ninja→Digital)",stipend:"₹15k–25k/mo",difficulty:"Easy–Medium",about:"Tata Consultancy Services — India's largest IT company. TCS NQT is the gateway for Ninja & Digital roles. Best first company for HSC/UG students to target.",skillsRequired:["C/Java/Python","Aptitude (NQT pattern)","OOPS, DBMS, OS basics","Email writing & verbal"],questions:cq([
  ["Tell me about yourself.","HR","Easy",["education","skills","project","goal"]],
  ["What is OOPS? Explain its 4 pillars with examples.","Technical","Easy",["encapsulation","inheritance","polymorphism","abstraction","class","object"]],
  ["Write logic to check if a number is prime / reverse a string.","Coding","Easy",["loop","condition","complexity"]],
  ["What is the difference between C and Java?","Technical","Easy",["platform independent","compiler","jvm","procedure","object oriented"]],
  ["Why do you want to join TCS?","HR","Easy",["tata","learning","growth","training"]],
  ["What is DBMS? Difference between DBMS and RDBMS?","Technical","Medium",["table","relation","sql","normalization"]],
  ["Are you ready to relocate anywhere in India?","HR","Easy",["relocate","flexible","adapt"]],
  ["Explain your final year / mini project.","Technical","Medium",["objective","technology","role","challenge","result"]],
 ])}),
 makeCompany({id:"hcl",name:"HCLTech",color:"#b91c1c",sector:"IT Services & Engineering",hq:"Noida",employees:"220k+",roles:["TechBee (HSC Track!)","Graduate Engineer Trainee","Software Intern"],salary:"₹3.25–6 LPA • TechBee starts after 12th",stipend:"₹10k–20k/mo (TechBee stipend during training)",difficulty:"Easy–Medium",about:"HCLTech's TechBee program hires students right after Class 12 (HSC) — earn while you learn, with a degree from partner universities. Perfect for HSC-passed users of InterviewAce.",skillsRequired:["Maths basics (for TechBee: 60% in 12th)","Logical reasoning","Basics of computers","Communication"],questions:cq([
  ["Why HCL TechBee / why start your career early after 12th?","HR","Easy",["early","earn","learn","career","independent"]],
  ["What is a computer network? LAN vs WAN?","Technical","Easy",["lan","wan","router","switch"]],
  ["Explain input & output devices with examples.","Technical","Easy",["keyboard","monitor","printer"]],
  ["Simple aptitude: If a train runs 60 km/h, how far in 2.5 hours?","Aptitude","Easy",["150","speed","distance","time"]],
  ["What are your strengths and weaknesses?","HR","Easy",["strength","weakness","improving"]],
  ["Basics: What is an operating system?","Technical","Easy",["windows","linux","manage","hardware"]],
 ])}),
 makeCompany({id:"infosys",name:"Infosys",color:"#0369a1",sector:"IT Services",hq:"Bengaluru",employees:"320k+",roles:["System Engineer Trainee","SP / DSE","Intern (InStep)"],salary:"₹3.6–9.5 LPA",difficulty:"Medium",about:"Infosys Mysore training is world-famous. Strong focus on puzzles, pseudo-code and DBMS in interviews.",skillsRequired:["Pseudo-code & logic","DBMS & SQL queries","Puzzles","Java/Python"],questions:cq([
  ["Solve: 8 balls, 1 heavier — minimum weighings to find it?","Puzzle","Medium",["2","balance","divide"]],
  ["Write SQL to find 2nd highest salary.","Technical","Medium",["max","subquery","limit","order by"]],
  ["What is normalization? Explain 1NF, 2NF, 3NF.","Technical","Medium",["redundancy","key","dependency"]],
  ["Difference between stack and queue?","Technical","Easy",["lifo","fifo","push","pop"]],
  ["Why Infosys? What do you know about us?","HR","Easy",["mysore","training","global"]],
  ["Explain SDLC phases.","Technical","Medium",["requirement","design","testing","deployment"]],
 ])}),
 makeCompany({id:"wipro",name:"Wipro",color:"#6d28d9",sector:"IT Services",hq:"Bengaluru",employees:"230k+",roles:["Elite Trainee","Turbo","Project Engineer"],salary:"₹3.5–6.5 LPA",difficulty:"Easy–Medium",about:"Wipro Elite National Talent Hunt hires freshers in bulk. Essay writing round is unique to Wipro.",skillsRequired:["Aptitude + Essay writing","C/Java basics","OOPS","Communication"],questions:cq([
  ["Write an essay: 'Impact of AI on jobs' (200 words).","Verbal","Medium",["introduction","example","conclusion"]],
  ["What is a pointer? Call by value vs reference?","Technical","Medium",["address","memory","value","reference"]],
  ["Explain types of inheritance.","Technical","Easy",["single","multiple","multilevel","hybrid"]],
  ["Tell me about a challenge you faced in a team.","HR","Medium",["situation","task","action","result","star"]],
 ])}),
 makeCompany({id:"accenture",name:"Accenture",color:"#7c3aed",sector:"Consulting & IT",hq:"Dublin / India Delivery",employees:"700k+ global",roles:["Associate Software Engineer","Advanced ASE","Intern"],salary:"₹4.5–6.5 LPA",difficulty:"Medium",about:"Accenture focuses on cognitive + technical assessment, coding, and a communication round. Smart, client-ready communication matters most.",skillsRequired:["Cognitive ability","Coding (arrays/strings)","Communication (SVAR-like fluency)","Cloud basics"],questions:cq([
  ["Read aloud & speak for 1 minute on 'My favourite technology'.","Communication","Medium",["fluency","pronunciation","structure"]],
  ["Find duplicate elements in an array — approach?","Coding","Medium",["hashmap","sort","complexity"]],
  ["What is cloud computing? Types of cloud services?","Technical","Medium",["iaas","paas","saas","aws","azure"]],
  ["How do you handle a difficult client / teammate?","HR","Medium",["listen","calm","solution"]],
 ])}),
 makeCompany({id:"cognizant",name:"Cognizant",color:"#1d4ed8",sector:"IT Services",hq:"USA / Chennai Delivery",employees:"340k+",roles:["GenC","GenC Elevate","Programmer Trainee"],salary:"₹4–6.75 LPA",difficulty:"Medium",about:"Cognizant GenC pattern: aptitude + automata (code debugging) is the key differentiator.",skillsRequired:["Automata fix (debugging)","Aptitude","Java/Python","SQL"],questions:cq([
  ["Debug: find the error in a loop that prints 1 to 10.","Automata","Medium",["condition","increment","off by one"]],
  ["What is Joins in SQL? Inner vs Left join?","Technical","Medium",["inner","left","matching","null"]],
  ["Explain your project architecture.","Technical","Medium",["frontend","backend","database","api"]],
  ["Where do you see yourself in 5 years?","HR","Easy",["growth","skill","lead"]],
 ])}),
 makeCompany({id:"capgemini",name:"Capgemini",color:"#0891b2",sector:"Consulting & IT",hq:"Paris / Pune Delivery",employees:"340k+",roles:["Analyst Trainee","Software Intern"],salary:"₹4–5.5 LPA",difficulty:"Medium",about:"Capgemini uses game-based assessment + pseudo-code. Fun but tricky — practice speed & accuracy.",skillsRequired:["Game-based aptitude","Pseudo-code","English communication","Technical MCQ"],questions:cq([
  ["Pseudo-code output prediction questions — how do you approach?","Technical","Medium",["dry run","trace","variable"]],
  ["What is an API? GET vs POST?","Technical","Easy",["request","response","get","post","json"]],
  ["Strengths that suit consulting?","HR","Easy",["communication","client","teamwork"]],
 ])}),
 makeCompany({id:"amazon",name:"Amazon",color:"#b45309",sector:"Product / E-commerce / AWS",hq:"Seattle / Hyderabad, Bengaluru",employees:"1.5M global",roles:["SDE Intern","Support Engineer Intern"],salary:"₹28–45 LPA (SDE) • Intern ₹80k/mo",cgpa:"No strict CGPA (skills first)",difficulty:"Hard",about:"Amazon interviews revolve around DSA + 16 Leadership Principles. STAR-format behavioural answers are mandatory.",skillsRequired:["DSA (trees, graphs, DP basics)","OOPS design","Leadership Principles (STAR)","System basics"],rounds:[{name:"Online Assessment",desc:"2 DSA coding + work simulation",duration:"90 mins"},{name:"Technical Rounds (2–3)",desc:"DSA live coding + LP questions",duration:"60 mins each"},{name:"Bar Raiser",desc:"Culture + depth check",duration:"60 mins"}],questions:cq([
  ["Tell me about a time you took ownership (Leadership Principle).","Behavioural","Hard",["situation","task","action","result","ownership"]],
  ["Find first non-repeating character in a string.","DSA","Medium",["hashmap","count","queue","complexity"]],
  ["Explain hashmap internal working & collisions.","DSA","Hard",["hash","bucket","collision","chaining"]],
  ["Design a parking lot (OOPS).","Design","Hard",["class","vehicle","slot","inheritance"]],
 ])}),
 makeCompany({id:"google",name:"Google",color:"#15803d",sector:"Product / AI",hq:"USA / Bengaluru, Hyderabad",employees:"180k+",roles:["STEP Intern (1st/2nd yr!)","SWE Intern","APM Intern"],salary:"Intern ₹1L+/mo • SWE ₹30L+",cgpa:"Strong CS fundamentals",difficulty:"Hard",about:"Google STEP is designed for 1st & 2nd year students. Focus: clean code, complexity analysis, and 'Googleyness'.",skillsRequired:["DSA mastery","Clean coding","Complexity analysis","Problem solving communication"],questions:cq([
  ["Given an array, find two numbers that sum to target — optimise it.","DSA","Medium",["hashmap","o(n)","complement"]],
  ["How does Google Search work (high level)?","Technical","Hard",["crawling","indexing","ranking"]],
  ["Tell me about a project you're proud of.","Behavioural","Medium",["impact","challenge","learned"]],
 ])}),
 makeCompany({id:"microsoft",name:"Microsoft",color:"#0369a1",sector:"Product / Cloud (Azure)",hq:"USA / Hyderabad",employees:"220k+",roles:["Explore Intern","SWE Intern","Support Intern"],salary:"Intern ₹80k+/mo",difficulty:"Hard",about:"Microsoft values growth mindset. DSA + CS fundamentals + curiosity about Azure/AI (Copilot era).",skillsRequired:["DSA","OOPS","OS/DBMS","Growth mindset stories"],questions:cq([
  ["Reverse a linked list — iterative & recursive.","DSA","Medium",["pointer","prev","next","recursion"]],
  ["What is Azure? How is cloud different from on-premise?","Technical","Medium",["azure","scalable","pay as you go"]],
  ["When did you learn something quickly?","Behavioural","Medium",["learn","feedback","growth mindset"]],
 ])}),
 makeCompany({id:"techm",name:"Tech Mahindra",color:"#b91c1c",sector:"IT & Telecom",hq:"Pune",employees:"150k+",roles:["Associate Trainee","Intern"],salary:"₹3.25–5.5 LPA",difficulty:"Easy–Medium",about:"Pune-headquartered, strong in telecom & 5G projects. Good for ENTC + CS students.",skillsRequired:["Aptitude","C/Java","Networking basics (ENTC advantage)"],questions:cq([["What is 5G? How is it different from 4G?","Technical","Medium",["speed","latency","bandwidth"]],["Basics of networking: OSI model layers?","Technical","Medium",["physical","network","transport","application"]]])}),
 makeCompany({id:"lt",name:"L&T",color:"#854d0e",sector:"Core Engineering / Construction",type:"Core Conglomerate",hq:"Mumbai",employees:"350k+",roles:["Graduate Engineer Trainee (GET)","Site Intern","Design Intern"],salary:"₹4–6.5 LPA",difficulty:"Medium",about:"Larsen & Toubro — dream core company for Civil, Mechanical & Electrical. Strong subject fundamentals + willingness for site work.",skillsRequired:["Core subjects (SOM, Thermo / RCC)","AutoCAD","Site readiness","Safety awareness"],questions:cq([
  ["What is stress and strain? Draw the curve.","Core Mech","Medium",["load","area","elongation","yield"]],
  ["Difference between RCC and PSC? Grades of concrete?","Core Civil","Medium",["reinforced","prestressed","m20","m25"]],
  ["Are you comfortable working at project sites anywhere in India?","HR","Easy",["site","relocate","field"]],
  ["What is factor of safety? Why is it used?","Core","Easy",["safety","load","design"]],
 ])}),
 makeCompany({id:"tatamotors",name:"Tata Motors",color:"#1e3a8a",sector:"Automotive / EV",type:"Core Manufacturing",hq:"Mumbai / Pune Plant",employees:"90k+",roles:["GET","EV Intern","Design Trainee"],salary:"₹4.5–7 LPA",difficulty:"Medium",about:"Leader in EVs (Nexon EV, Punch EV). Mechanical, Electrical & ENTC students — EV battery, motors & automotive design questions dominate.",skillsRequired:["IC Engine vs EV basics","Thermodynamics / Motors","CAD (CATIA/SolidWorks)","Manufacturing processes"],questions:cq([
  ["How does an EV work? Battery, motor, controller roles?","Core","Medium",["battery","bms","motor","inverter","torque"]],
  ["Difference between petrol and diesel engine?","Core","Easy",["spark","compression","efficiency"]],
  ["What is CAD? Which software have you used?","Technical","Easy",["solidworks","catia","modelling"]],
 ])}),
 makeCompany({id:"bosch",name:"Bosch",color:"#991b1b",sector:"Automotive / Embedded",type:"German MNC (Core+Tech)",hq:"Germany / Bengaluru",employees:"400k+ global",roles:["Embedded Intern","GET","Software Trainee"],salary:"₹5–9 LPA",difficulty:"Medium–Hard",about:"Bosch India (BGSW) hires heavily for embedded systems & automotive software — goldmine for ENTC students.",skillsRequired:["Embedded C","Microcontrollers","CAN protocol basics","Automotive basics"],questions:cq([
  ["What is CAN protocol? Why used in cars?","Embedded","Hard",["can","ecu","bus","message"]],
  ["Volatile keyword in C — why needed in embedded?","Embedded","Medium",["volatile","compiler","hardware","register"]],
  ["Interrupt vs polling with example.","Embedded","Easy",["interrupt","polling","isr"]],
 ])}),
 makeCompany({id:"siemens",name:"Siemens",color:"#0f766e",sector:"Automation / Energy",type:"German MNC",hq:"Germany / Pune, Goa",employees:"320k+ global",roles:["Trainee Engineer","Automation Intern"],salary:"₹5–8 LPA",difficulty:"Medium",about:"Industrial automation leader — PLC, SCADA & smart infrastructure. Mechanical, Electrical & Instrumentation friendly.",skillsRequired:["PLC basics","Electrical fundamentals","Automation concepts"],questions:cq([["What is a PLC? Where is it used?","Core","Medium",["plc","automation","ladder","input","output"]],["AC vs DC motor — applications?","Core","Easy",["ac","dc","speed control"]]])}),
 makeCompany({id:"reliance",name:"Reliance / Jio",color:"#1d4ed8",sector:"Energy, Retail, Telecom (Jio)",type:"Indian Conglomerate",hq:"Mumbai / Jamnagar",employees:"380k+",roles:["GET","Jio Intern","Retail Trainee"],salary:"₹4–7 LPA",difficulty:"Medium",about:"From Jamnagar refinery to Jio 5G — opportunities for Chemical, Mech, ENTC & CS. Process + safety questions for plant roles.",skillsRequired:["Core fundamentals","Safety (PPE, HAZOP basics)","5G basics for Jio"],questions:cq([["What safety precautions in a plant / refinery?","Core","Medium",["ppe","hazard","permit","safety"]],["What do you know about Jio 5G / Reliance's businesses?","HR","Easy",["jio","retail","energy","5g"]]])}),
 makeCompany({id:"deloitte",name:"Deloitte",color:"#15803d",sector:"Consulting / Audit / Tech",type:"Big 4",hq:"Global / Hyderabad, Mumbai",employees:"450k+ global",roles:["Analyst Trainee","Business Intern","Tech Intern"],salary:"₹6.5–7.6 LPA (Analyst)",difficulty:"Medium",about:"Big-4 consulting — case studies, guesstimates & polished communication. Open to BBA/BCom + Engineering.",skillsRequired:["Case study approach","Excel & PPT","Communication","Business basics"],questions:cq([
  ["Guesstimate: How many tea cups sold in Pune daily?","Case","Hard",["population","assumption","per day","estimate"]],
  ["What is SWOT analysis? Do it for yourself.","Business","Easy",["strength","weakness","opportunity","threat"]],
  ["Why consulting? Why Deloitte?","HR","Medium",["client","learning","exposure"]],
 ])}),
 makeCompany({id:"zomato",name:"Zomato / Swiggy",color:"#dc2626",sector:"FoodTech Startups",type:"Product Startup",hq:"Gurugram / Bengaluru",employees:"5k–10k",roles:["SDE Intern","Operations Intern","Marketing Intern"],salary:"Intern ₹30–60k/mo",difficulty:"Medium–Hard",about:"Fast-paced product startups. Real project impact from day 1. Portfolio > CGPA here.",skillsRequired:["Strong projects / portfolio","DSA basics","Product thinking"],questions:cq([["How would you improve our app for students?","Product","Medium",["user","feature","metric","feedback"]],["Show your best project — what was your exact role?","Technical","Medium",["role","stack","challenge","deployed"]]])}),
 makeCompany({id:"flipkart",name:"Flipkart",color:"#1d4ed8",sector:"E-commerce Product",type:"Product (Walmart)",hq:"Bengaluru",employees:"50k+",roles:["SDE Intern","UI Intern","Supply Chain Intern"],salary:"Intern ₹50k/mo • SDE ₹18L+",difficulty:"Hard",about:"India's e-commerce pioneer. Machine-coding round is Flipkart's signature — build a working feature in 90 minutes.",skillsRequired:["DSA","Machine coding (LLD)","Java/JS depth"],questions:cq([["Build a Snake & Ladder / Parking Lot in code (LLD).","Machine Coding","Hard",["class","design","modular","working code"]],["How does a recommendation system work?","Technical","Hard",["collaborative","history","ml","personalization"]]])}),
 makeCompany({id:"bhel",name:"BHEL / PSUs",color:"#7c2d12",sector:"PSU / Heavy Engineering",type:"Government PSU",hq:"New Delhi / Haridwar, Bhopal",employees:"30k+",roles:["Engineer Trainee (via GATE)","Apprentice (ITI/Diploma/BE)"],salary:"₹8–12 LPA (PSU pay + perks)",difficulty:"Hard (GATE-based)",about:"PSU route via GATE for core branches. Also 1-year apprenticeships — great for diploma/HSC+ITI students to gain experience.",skillsRequired:["GATE core subjects","Power plant basics","General awareness"],questions:cq([["How does a thermal power plant work?","Core","Medium",["boiler","turbine","generator","steam"]],["Why a PSU over private sector?","HR","Easy",["stability","nation","work life"]]])}),
];

export const MCQS: MCQ[] = [];
function add(domain:string, rows:[string,string[],number,string,string,string][]){ rows.forEach((r,i)=>MCQS.push({id:`${domain}-${i}`,domain,q:r[0],options:r[1],answer:r[2],explanation:r[3],topic:r[4],difficulty:r[5]})); }

add("Web Development",[
 ["Which hook manages state in a functional React component?",["useEffect","useState","useRef","useMemo"],1,"useState returns [value, setter] and triggers re-render on change.","React Hooks","Easy"],
 ["What does CSS 'flex-direction: column' do?",["Stacks items vertically","Makes text bold","Adds shadow","Hides element"],0,"Column changes main axis to vertical.","CSS Flexbox","Easy"],
 ["Which HTTP method is used to update existing data?",["GET","POST","PUT/PATCH","DELETE"],2,"PUT replaces, PATCH partially updates a resource.","HTTP","Easy"],
 ["What is a closure in JavaScript?",["A CSS property","Function remembering its outer scope variables","A loop type","An HTML tag"],1,"Inner function retains access to outer variables even after outer returns.","JavaScript","Medium"],
 ["'===' vs '==' in JavaScript?",["No difference","=== checks value+type, == converts type","== is faster","=== only for strings"],1,"Strict equality avoids type coercion bugs.","JavaScript","Easy"],
 ["What is Virtual DOM?",["Real browser DOM copy in memory for fast diffing","A database","A server","CSS framework"],0,"React diffs virtual vs previous DOM and updates only changed nodes.","React","Medium"],
 ["Which of these is NOT a valid JS data type?",["Symbol","BigInt","Float","Undefined"],2,"JS has Number (covers float), no separate Float type.","JavaScript","Easy"],
 ["What status code means 'Created'?",["200","201","404","500"],1,"201 Created is returned after successful POST creating resource.","HTTP","Easy"],
 ["Purpose of async/await?",["Styling","Handle promises with readable, synchronous-like code","Loop faster","Store data"],1,"async/await is syntactic sugar over Promises.","JavaScript","Medium"],
 ["Which tag makes a page responsive on mobile?",["<responsive>","meta viewport","<mobile>","<scale>"],1,"<meta name='viewport' content='width=device-width'> enables responsive scaling.","HTML","Easy"],
]);
add("AI / Machine Learning",[
 ["Which is a supervised learning algorithm?",["K-Means","Linear Regression","PCA","Apriori"],1,"Regression learns from labelled data → supervised.","ML Basics","Easy"],
 ["Overfitting means model performs…",["Well on train, poor on new data","Poor everywhere","Well everywhere","Only on test"],0,"Model memorises training noise, fails to generalise.","Model Evaluation","Easy"],
 ["Which library is used for data manipulation in Python?",["NumPy only","Pandas","Matplotlib","Flask"],1,"Pandas DataFrames handle tabular data.","Python","Easy"],
 ["Activation function introducing non-linearity in neurons?",["ReLU","Softmax only at input","Linear","None"],0,"ReLU: max(0,x) — most common hidden-layer activation.","Neural Networks","Medium"],
 ["NLP task of finding sentiment of a review is…",["Regression","Classification","Clustering","Ranking only"],1,"Positive/Negative = discrete classes → classification.","NLP","Easy"],
 ["Train-test split is used to…",["Speed up training","Evaluate model on unseen data","Increase data","Remove labels"],1,"Held-out test set checks generalisation.","Model Evaluation","Easy"],
 ["Which metric is best for imbalanced classification?",["Accuracy","F1-Score","MSE","R²"],1,"F1 balances precision & recall when classes are skewed.","Metrics","Medium"],
 ["Transformers (ChatGPT base) key mechanism is…",["Recurrence","Self-Attention","Convolution","Rules"],1,"Self-attention weighs importance of all tokens in parallel.","Deep Learning","Hard"],
]);
add("Data Science & Analytics",[
 ["SQL clause to filter groups after GROUP BY?",["WHERE","HAVING","ORDER BY","LIMIT"],1,"HAVING filters aggregated groups; WHERE filters rows before grouping.","SQL","Medium"],
 ["Median is preferred over mean when data has…",["No outliers","Outliers / skew","Only text","Small size"],1,"Median is robust to extreme values.","Statistics","Easy"],
 ["INNER JOIN returns…",["All rows both tables","Only matching rows in both","Only left table","Duplicates only"],1,"Intersection of both tables on join condition.","SQL","Easy"],
 ["Correlation ranges between…",["0 to 100","-1 to +1","-10 to 10","Only positive"],1,"-1 perfect negative, +1 perfect positive.","Statistics","Easy"],
 ["Which chart shows trend over time best?",["Pie","Line chart","Scatter only","Table"],1,"Line charts visualise time-series trends.","Visualization","Easy"],
 ["NULL in SQL means…",["Zero","Empty string","Missing / unknown value","False"],2,"NULL = absent value; compare with IS NULL.","SQL","Easy"],
]);
add("Aptitude & Reasoning (HSC Track)",[
 ["If 20% of a number is 50, the number is?",["200","250","300","150"],1,"50 / 0.2 = 250.","Percentages","Easy"],
 ["A does work in 10 days, B in 15 days. Together?",["5 days","6 days","7.5 days","12 days"],1,"1/10+1/15=1/6 → 6 days.","Time & Work","Medium"],
 ["Series: 2, 6, 12, 20, 30, ?",["40","42","44","36"],1,"n²+n pattern: 6²+6=42. Differences increase by 2.","Series","Medium"],
 ["Profit % if CP=₹800, SP=₹920?",["12%","15%","10%","20%"],1,"120/800 × 100 = 15%.","Profit & Loss","Easy"],
 ["If CAT = 24 (3+1+20), then DOG = ?",["26","24","28","22"],0,"D(4)+O(15)+G(7)=26.","Coding-Decoding","Easy"],
 ["Average of first 10 natural numbers?",["5","5.5","6","10"],1,"(1+10)/2 = 5.5.","Averages","Easy"],
 ["Train 72 km/h = how many m/s?",["18","20","22","24"],1,"72 × 5/18 = 20 m/s.","Speed & Distance","Easy"],
 ["Odd one out: 121, 144, 169, 190, 196",["144","190","121","196"],1,"All others are perfect squares; 190 is not.","Reasoning","Easy"],
 ["Simple interest on ₹5000 at 8% for 2 years?",["₹600","₹800","₹1000","₹400"],1,"5000×8×2/100 = ₹800.","SI/CI","Easy"],
 ["If 'MOTHER' is coded 'OQVJGT', code pattern is +2. 'SON' = ?",["UQP","TUP","UOO","RPQ"],0,"S+2=U, O+2=Q, N+2=P → UQP.","Coding-Decoding","Medium"],
]);
add("Cloud & DevOps",[
 ["AWS S3 is used for…",["Compute","Object Storage","Database only","Networking"],1,"S3 stores files/objects at scale.","AWS","Easy"],
 ["Docker container vs Virtual Machine?",["Same thing","Container shares host OS kernel, lighter","VM is lighter","Container needs full OS"],1,"Containers are lightweight, share kernel.","Docker","Medium"],
 ["CI/CD stands for…",["Code Integration/Code Design","Continuous Integration/Continuous Deployment","Central Internet/CD drive","None"],1,"Automated build-test-deploy pipeline.","DevOps","Easy"],
 ["Which AWS service runs virtual servers?",["S3","EC2","RDS","Lambda storage"],1,"EC2 = Elastic Compute Cloud.","AWS","Easy"],
]);
add("Cybersecurity",[
 ["Phishing is…",["Fishing sport","Fake emails/links stealing credentials","Antivirus","Encryption type"],1,"Social engineering via deceptive messages.","Attacks","Easy"],
 ["CIA Triad stands for…",["Central Intelligence Agency","Confidentiality, Integrity, Availability","Code, Internet, Access","None"],1,"Core security principles.","Fundamentals","Easy"],
 ["SQL Injection attacks target…",["CSS","Database queries via unsanitised input","Monitor","Keyboard"],1,"Malicious SQL inserted through input fields.","Web Security","Medium"],
 ["HTTPS uses which for encryption?",["HTTP only","TLS/SSL certificates","FTP","Telnet"],1,"TLS encrypts data in transit.","Networking","Easy"],
]);
add("Embedded Systems",[
 ["UART communication is…",["Parallel & synchronous","Serial & asynchronous","Only wireless","Only analog"],1,"UART: serial, no clock line, uses start/stop bits.","Protocols","Medium"],
 ["Interrupt vs Polling — interrupt is better because…",["CPU keeps checking","CPU reacts only when event occurs, saves power/time","Slower","Needs no code"],1,"Event-driven; CPU free for other tasks.","Microcontroller","Easy"],
 ["ADC converts…",["Digital to Analog","Analog to Digital","AC to DC only","Serial to Parallel"],1,"Analog-to-Digital Converter digitises sensor signals.","Basics","Easy"],
 ["'Volatile' in embedded C tells compiler…",["Delete variable","Value may change externally — don't optimise away","Make it faster","Store in ROM"],1,"Prevents caching hardware-mapped variables.","Embedded C","Hard"],
]);
add("Mechanical CAD / Design",[
 ["Stress is defined as…",["Force × Area","Force / Area","Force + Area","Area / Force"],1,"σ = P/A, unit N/mm² or MPa.","SOM","Easy"],
 ["GD&T symbol ◎ means…",["Flatness","Concentricity","Parallelism","Roundness only"],1,"Concentricity controls coaxial alignment.","GD&T","Medium"],
 ["Which software is parametric 3D CAD?",["MS Paint","SolidWorks","Notepad","VLC"],1,"SolidWorks/CATIA/Creo are parametric modellers.","CAD","Easy"],
 ["IC engine Otto cycle is used in…",["Diesel engine","Petrol engine","Steam turbine","Jet only"],1,"Petrol engines follow Otto cycle.","Thermo","Easy"],
]);
add("Civil & BIM",[
 ["M20 grade concrete means characteristic strength…",["20 MPa at 28 days","20 kg weight","20 mm size","20 days curing"],0,"M20 = 20 N/mm² cube strength at 28 days.","Concrete","Easy"],
 ["BIM full form?",["Building Internet Model","Building Information Modelling","Basic Indian Map","None"],1,"3D model + data for lifecycle management.","BIM","Easy"],
 ["RCC full form?",["Rapid Cement Concrete","Reinforced Cement Concrete","Ready Construction Cement","None"],1,"Concrete + steel reinforcement.","Basics","Easy"],
]);
add("Business, Marketing & HR",[
 ["4Ps of Marketing are…",["Price, Place, Product, Promotion","People only","Profit, Plan, Post, Page","None"],0,"Classic marketing mix.","Marketing","Easy"],
 ["SEO stands for…",["Social Engine Online","Search Engine Optimisation","Sales Executive Officer","None"],1,"Improving organic Google ranking.","Digital Marketing","Easy"],
 ["First step of recruitment process?",["Offer letter","Job analysis / requirement gathering","Salary payment","Exit interview"],1,"Understand role before sourcing candidates.","HR","Easy"],
 ["SWOT 'O' stands for…",["Office","Opportunities","Operations","Owner"],1,"External favourable factors.","Business","Easy"],
]);

export const TESTS = [
 {id:"tcs-nqt",title:"TCS NQT Pattern Mock",domain:"Aptitude & Reasoning (HSC Track)",company:"TCS",durationMin:15,description:"Exact NQT style: Quant, Reasoning, Coding logic",level:"Beginner"},
 {id:"web-react",title:"Web Dev + React Sprint",domain:"Web Development",company:"General",durationMin:12,description:"JS, React hooks, HTTP, CSS — internship ready",level:"Intermediate"},
 {id:"ai-basics",title:"AI / ML Fundamentals",domain:"AI / Machine Learning",company:"General",durationMin:10,description:"ML types, evaluation, neural nets, NLP",level:"Beginner"},
 {id:"sql-data",title:"SQL & Data Analytics",domain:"Data Science & Analytics",company:"Infosys",durationMin:10,description:"Joins, GROUP BY, statistics for analyst roles",level:"Intermediate"},
 {id:"aptitude-grand",title:"Grand Aptitude Challenge",domain:"Aptitude & Reasoning (HSC Track)",company:"All Companies",durationMin:15,description:"Percentages, Time-Work, Series, Coding-Decoding",level:"All Levels"},
 {id:"cloud-fund",title:"Cloud & DevOps Basics",domain:"Cloud & DevOps",company:"Accenture",durationMin:8,description:"AWS, Docker, CI/CD essentials",level:"Beginner"},
 {id:"cyber-fund",title:"Cybersecurity Essentials",domain:"Cybersecurity",company:"General",durationMin:8,description:"Phishing, OWASP, CIA triad, HTTPS",level:"Beginner"},
 {id:"embedded-c",title:"Embedded C & Protocols",domain:"Embedded Systems",company:"Bosch",durationMin:8,description:"UART, interrupts, ADC — ENTC special",level:"Intermediate"},
 {id:"mech-core",title:"Mechanical Core Rapid Fire",domain:"Mechanical CAD / Design",company:"Tata Motors",durationMin:8,description:"SOM, GD&T, engines, CAD",level:"Intermediate"},
 {id:"biz-basics",title:"Business & Marketing Basics",domain:"Business, Marketing & HR",company:"Deloitte",durationMin:8,description:"4Ps, SEO, HR cycle, SWOT",level:"Beginner"},
];

export const HR_QUESTIONS: InterviewQ[] = [
 {q:"Tell me about yourself.",domain:"HR",company:"All",type:"HR",difficulty:"Easy",keywords:["education","skills","project","internship","goal","strength"],sample:"I'm a 3rd-year CS student at XYZ College. My core skills are JavaScript and React — I built a college event portal used by 400+ students. I'm now looking for an internship where I can apply these skills and learn industry practices. My goal is to become a full-stack developer in 2 years.",tips:"Use Present → Past (project proof) → Future (goal). Keep it 60–90 seconds."},
 {q:"What are your strengths and weaknesses?",domain:"HR",company:"All",type:"HR",difficulty:"Easy",keywords:["strength","example","weakness","improving","action"],sample:"My strength is quick learning — I learned React in 3 weeks for a hackathon and our team reached finals. My weakness was public speaking; I joined the college presentation club and now present my projects confidently.",tips:"Weakness must be real but improving, with action proof."},
 {q:"Why should we hire you as an intern?",domain:"HR",company:"All",type:"HR",difficulty:"Medium",keywords:["skills","project","quick learner","team","value"],sample:"I bring hands-on project experience, not just theory — 2 deployed projects with GitHub proof. I'm a quick learner, comfortable in teams, and I treat internship tasks like real deliverables.",tips:"Connect your proof to their needs."},
 {q:"Where do you see yourself in 3–5 years?",domain:"HR",company:"All",type:"HR",difficulty:"Easy",keywords:["growth","skill","specialist","lead","learn"],sample:"In 3 years I see myself as a strong specialist in my domain, handling independent modules. In 5 years, mentoring juniors and leading small project parts.",tips:"Show ambition + loyalty to growth, not job-hopping."},
 {q:"Tell me about a challenge you faced and how you solved it.",domain:"HR",company:"All",type:"Behavioural (STAR)",difficulty:"Medium",keywords:["situation","task","action","result","learned"],sample:"Situation: our project demo crashed a night before review. Task: I owned debugging. Action: I traced logs, found an API timeout, added error handling. Result: demo succeeded, we scored top grade. I learned systematic debugging under pressure.",tips:"Always STAR format with numbers/result."},
];

export const DOMAIN_INTERVIEW_Q: Record<string, InterviewQ[]> = {
 "Web Development":[
  {q:"Explain how React's Virtual DOM improves performance.",domain:"Web Development",company:"All",type:"Technical",difficulty:"Medium",keywords:["virtual dom","diffing","reconciliation","re-render","batch"],sample:"React keeps a lightweight in-memory copy of the DOM. On state change it creates a new virtual DOM, diffs it with the previous one (reconciliation), and updates only changed real-DOM nodes in a batch — avoiding expensive full reflows.",tips:"Mention diffing + batching + keys."},
  {q:"What is the difference between let, const and var?",domain:"Web Development",company:"All",type:"Technical",difficulty:"Easy",keywords:["block scope","hoisting","reassign","function scope"],sample:"var is function-scoped and hoisted; let/const are block-scoped. const cannot be reassigned. Prefer const, then let, avoid var.",tips:"Add hoisting + TDZ one-liner."},
  {q:"How does a browser render a webpage from URL to pixels?",domain:"Web Development",company:"All",type:"Technical",difficulty:"Hard",keywords:["dns","tcp","http","html parse","cssom","render tree","paint"],sample:"DNS resolves domain → TCP/TLS connection → HTTP request → HTML parsed to DOM, CSS to CSSOM → render tree → layout → paint → composite.",tips:"Speak in pipeline order."},
  {q:"Explain REST API and common HTTP status codes.",domain:"Web Development",company:"All",type:"Technical",difficulty:"Easy",keywords:["stateless","get","post","put","delete","200","404","500","json"],sample:"REST is a stateless architecture using HTTP methods on resources: GET read, POST create (201), PUT update, DELETE remove. 200 OK, 404 Not Found, 500 Server Error. Data usually JSON.",tips:"Give one real API example from your project."},
 ],
 "AI / Machine Learning":[
  {q:"Explain supervised vs unsupervised learning with examples.",domain:"AI / Machine Learning",company:"All",type:"Technical",difficulty:"Easy",keywords:["labelled","classification","regression","clustering","unlabelled"],sample:"Supervised learns from labelled data — classification (spam/not spam) and regression (house price). Unsupervised finds patterns in unlabelled data — clustering customers into segments.",tips:"Always give 1 example each."},
  {q:"How do you handle overfitting?",domain:"AI / Machine Learning",company:"All",type:"Technical",difficulty:"Medium",keywords:["cross validation","regularization","more data","dropout","early stopping"],sample:"Use cross-validation to detect it, add regularization (L1/L2), gather more data, simplify model, dropout in neural nets, and early stopping.",tips:"Define problem first, then 3 solutions."},
  {q:"What is NLP? Where is it used around you daily?",domain:"AI / Machine Learning",company:"All",type:"Technical",difficulty:"Easy",keywords:["natural language","text","chatbot","translation","sentiment","token"],sample:"NLP lets machines understand human language: tokenization, sentiment analysis, translation. Daily uses: Google Search suggestions, chatbots, spam filters, voice assistants like Alexa.",tips:"Connect to InterviewAce's own keyword NLP!"},
 ],
 "Data Science & Analytics":[
  {q:"Write approach: find top 3 selling products per category in SQL.",domain:"Data Science & Analytics",company:"All",type:"Technical",difficulty:"Hard",keywords:["group by","order by","row_number","window","partition by"],sample:"Use ROW_NUMBER() OVER (PARTITION BY category ORDER BY SUM(sales) DESC) in a subquery/CTE, filter rank ≤ 3.",tips:"Window functions impress interviewers."},
  {q:"How do you clean a messy dataset before analysis?",domain:"Data Science & Analytics",company:"All",type:"Technical",difficulty:"Medium",keywords:["missing values","duplicates","outliers","data types","standardize"],sample:"Remove duplicates, handle missing values (drop/impute), fix data types, standardise formats, treat outliers, validate ranges.",tips:"Mention Pandas functions: dropna, fillna, drop_duplicates."},
 ],
 "Embedded Systems":[
  {q:"Explain I2C vs SPI vs UART — when to use each?",domain:"Embedded Systems",company:"Bosch",type:"Technical",difficulty:"Medium",keywords:["serial","clock","master","slave","wires","speed"],sample:"UART: 2-wire async point-to-point (debug/GPS). I2C: 2-wire sync multi-slave with addresses (sensors). SPI: 4-wire sync fastest (displays/memory) but more pins.",tips:"Make a comparison table verbally."},
 ],
 "Mechanical CAD / Design":[
  {q:"Explain stress-strain curve for mild steel.",domain:"Mechanical CAD / Design",company:"L&T",type:"Core",difficulty:"Medium",keywords:["elastic","yield","ultimate","necking","fracture","hooke"],sample:"Proportional limit (Hooke's law) → yield point → ultimate tensile strength → necking → fracture. Area under curve = toughness.",tips:"Draw mentally in order; name all points."},
 ],
 "Business, Marketing & HR":[
  {q:"How would you promote a new café near your college with zero budget?",domain:"Business, Marketing & HR",company:"All",type:"Case",difficulty:"Medium",keywords:["instagram","reels","student offer","referral","google review","influencer"],sample:"Instagram reels of making process, student ID discount, college fest stall, Google Maps listing + review offers, referral 'bring a friend free' — all organic.",tips:"Structure: audience → channels → offer → measure."},
 ],
};

export const FILLERS = ["um","uh","like","actually","basically","you know","hmm","err","so basically","literally","right"];

export function scoreAnswer(answer:string, keywords:string[]){
 const text = answer.toLowerCase();
 const matched = keywords.filter(k=>text.includes(k.toLowerCase()));
 const missed = keywords.filter(k=>!text.includes(k.toLowerCase()));
 const words = answer.trim().split(/\s+/).filter(Boolean);
 const fillerCount = FILLERS.reduce((acc,f)=>acc + (text.split(f).length-1),0);
 const keywordScore = keywords.length? Math.round((matched.length/keywords.length)*100): 60;
 const lengthScore = words.length>=40?100: words.length>=25?80: words.length>=12?55: words.length>0?30:0;
 const fluency = Math.max(20, 100 - fillerCount*9 - (words.length<10?30:0));
 const confidence = Math.min(98, Math.round((keywordScore+lengthScore+fluency)/3 + (answer.includes("example")||answer.toLowerCase().includes("project")?8:0)));
 const overall = Math.round(keywordScore*0.45 + lengthScore*0.25 + fluency*0.3);
 return {matched,missed,keywordScore,lengthScore,fluency,confidence,overall,fillerCount,wordCount:words.length};
}

export function generateSWOC(opts:{keyword:number;fluency:number;confidence:number;accuracy:number;filler:number;wpm:number;domain:string;company:string}){
 const S:string[]=[],W:string[]=[],O:string[]=[],C:string[]=[];
 if(opts.keyword>=70) S.push(`Strong ${opts.domain} keyword accuracy (${opts.keyword}%) — you use industry terminology naturally`);
 if(opts.fluency>=75) S.push("Clear speech pacing with minimal filler words");
 if(opts.accuracy>=70) S.push(`Solid assessment accuracy (${opts.accuracy}%) shows core subject grip`);
 if(opts.confidence>=70) S.push("Confident answer structure (intro → example → close)");
 if(S.length===0) S.push("You completed a full session — consistency is your first strength. Keep the streak!");
 if(opts.keyword<60) W.push(`Missing key ${opts.domain} terms — revise keyword sheets in Question Bank`);
 if(opts.filler>=5) W.push(`High filler words detected (${opts.filler}: um/uh/like) — practice pause-and-breathe technique`);
 if(opts.wpm>0 && opts.wpm<90) W.push(`Slow speaking pace (${opts.wpm} WPM vs ideal 120–150) — practice timed 60-sec answers`);
 if(opts.wpm>170) W.push(`Very fast pace (${opts.wpm} WPM) — slow down, interviewers may miss key points`);
 if(opts.confidence<60) W.push("Low confidence signals — add project examples & STAR structure to every answer");
 if(W.length===0) W.push("Answers could be longer: add metrics/numbers (e.g. 'used by 400 students')");
 O.push(`Target ${opts.company} mock path in Company Vault — questions matched to their real pattern`);
 O.push(`Complete the ${opts.domain} roadmap in Learn Hub to unlock Advanced mocks`);
 O.push("Weekly aptitude sprints can lift your Round-1 shortlist chances by ~30%");
 C.push(`${opts.company} drives are highly competitive — apply only after 3 mocks above 70%`);
 C.push("Time-limit overruns in real OAs eliminate 60% candidates — keep practising timed tests");
 if(opts.keyword<50) C.push("Technical round risk: interviewers probe missed keywords with follow-ups");
 return {strengths:S,weaknesses:W,opportunities:O,challenges:C};
}
