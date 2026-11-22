"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { BRANCHES, COMPANIES, DOMAINS, MCQS, TESTS, HR_QUESTIONS, DOMAIN_INTERVIEW_Q, scoreAnswer, generateSWOC, type Company, type InterviewQ } from "@/lib/data";
import { Mic, MicOff, Play, Square, Volume2, Brain, Target, Trophy, Building2, BookOpen, BarChart3, Zap, Clock, CheckCircle2, XCircle, ChevronRight, Search, Bookmark, Sparkles, GraduationCap, Briefcase, Users, Award, TrendingUp, Shield, Timer, FileText, MessageSquare, Headphones, ArrowRight, LogOut, LayoutDashboard, ListChecks, Video, Library, PieChart, Crown, Flame, Star, IndianRupee, MapPin, Filter, RotateCcw, Eye, Lightbulb, AlertTriangle, ThumbsUp, Rocket, Code2, Globe, Bot, Send, X, Trash2, Maximize2, Minimize2 } from "lucide-react";

const HERO_IMG="https://images.pexels.com/photos/16659308/pexels-photo-16659308.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const IMG2="https://images.pexels.com/photos/6348135/pexels-photo-6348135.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
const IMG3="https://images.pexels.com/photos/35754370/pexels-photo-35754370.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

type User={id:number;name:string;email:string;branch?:string;targetRole?:string;college?:string;year?:string;targetCompany?:string};
type View="home"|"dashboard"|"tests"|"interview"|"companies"|"domains"|"questions"|"swoc"|"leaderboard"|"learn"|"resume";

type ResumeData={name:string;headline:string;email:string;phone:string;location:string;linkedin:string;github:string;portfolio:string;summary:string;skills:string;education:{degree:string;institute:string;year:string;score:string}[];experience:{role:string;company:string;period:string;description:string}[];projects:{name:string;tech:string;link:string;description:string}[];achievements:string;languages:string};
const EMPTY_RESUME:ResumeData={name:"",headline:"Aspiring Software Developer",email:"",phone:"",location:"",linkedin:"",github:"",portfolio:"",summary:"",skills:"",education:[{degree:"",institute:"",year:"",score:""}],experience:[],projects:[{name:"",tech:"",link:"",description:""}],achievements:"",languages:"English, Hindi"};

function Badge({children,color="#334155"}:{children:any;color?:string}){return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-white" style={{background:color}}>{children}</span>}
function StatCard({icon:Icon,label,value,sub,color}:{icon:any;label:string;value:any;sub:string;color:string}){return <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-4"><div className="flex items-center justify-between"><span className="text-slate-400 text-xs font-medium">{label}</span><span className="p-2 rounded-lg" style={{background:color+"22",color}}><Icon size={16}/></span></div><div className="text-2xl font-extrabold mt-1 text-white">{value}</div><div className="text-[11px] text-slate-500">{sub}</div></div>}
function Bar({label,val,color="#10b981"}:{label:string;val:number;color?:string}){return <div><div className="flex justify-between text-xs mb-1"><span className="text-slate-300">{label}</span><span className="font-bold text-white">{val}%</span></div><div className="h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{width:`${Math.min(100,val)}%`,background:color}}/></div></div>}
function SWOCBox({title,items,color,icon:Icon}:{title:string;items:string[];color:string;icon:any}){return <div className="rounded-2xl p-4 border" style={{background:color+"12",borderColor:color+"44"}}><div className="flex items-center gap-2 font-bold mb-2" style={{color}}><Icon size={17}/>{title}</div><ul className="space-y-1.5">{items.map((s,i)=><li key={i} className="text-[13px] text-slate-200 flex gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{background:color}}/>{s}</li>)}</ul></div>}

export default function App(){
 const [user,setUser]=useState<User|null>(null);
 const [view,setView]=useState<View>("home");
 const [authMode,setAuthMode]=useState<"login"|"signup"|null>(null);
 const [authForm,setAuthForm]=useState({name:"",email:"",password:"",branch:BRANCHES[0],college:"",year:"3rd Year",targetCompany:"TCS",targetRole:"Web Development Intern"});
 const [authErr,setAuthErr]=useState(""); const [authBusy,setAuthBusy]=useState(false);
 const [attempts,setAttempts]=useState<any>({assessments:[],interviews:[],bookmarks:[],leaderboard:[],platform:{}});
 const [toast,setToast]=useState("");

 // tests
 const [testFilter,setTestFilter]=useState("All");
 const [activeTest,setActiveTest]=useState<any>(null);
 const [testQs,setTestQs]=useState<any[]>([]);
 const [answers,setAnswers]=useState<Record<number,number>>({});
 const [qIdx,setQIdx]=useState(0);
 const [timeLeft,setTimeLeft]=useState(0);
 const [testResult,setTestResult]=useState<any>(null);
 const testTimer=useRef<any>(null);

 // interview
 const [ivSetup,setIvSetup]=useState({domain:"Web Development",company:"TCS",count:5,mode:"voice",difficulty:"Mixed"});
 const [ivQueue,setIvQueue]=useState<InterviewQ[]>([]);
 const [ivIdx,setIvIdx]=useState(0);
 const [ivActive,setIvActive]=useState(false);
 const [transcript,setTranscript]=useState("");
 const [listening,setListening]=useState(false);
 const [speaking,setSpeaking]=useState(false);
 const [ivAnswers,setIvAnswers]=useState<any[]>([]);
 const [ivReport,setIvReport]=useState<any>(null);
 const [ivSeconds,setIvSeconds]=useState(0);
 const [recording,setRecording]=useState(false);
 const [audioUrl,setAudioUrl]=useState("");
 const recogRef=useRef<any>(null); const mediaRef=useRef<any>(null); const chunksRef=useRef<any[]>([]); const ivTimer=useRef<any>(null);

 // companies / questions
 const [compSearch,setCompSearch]=useState(""); const [compSector,setCompSector]=useState("All"); const [selCompany,setSelCompany]=useState<Company|null>(null);
 const [qSearch,setQSearch]=useState(""); const [qDomain,setQDomain]=useState("All"); const [openQ,setOpenQ]=useState<string|null>(null);
 const [selDomain,setSelDomain]=useState<any>(DOMAINS[0]);
 const [learnChecks,setLearnChecks]=useState<Record<string,boolean>>({});
 // resume builder
 const [resume,setResume]=useState<ResumeData>(EMPTY_RESUME);
 const [resumeTemplate,setResumeTemplate]=useState<"classic"|"modern"|"compact">("modern");
 const [resumeSection,setResumeSection]=useState("Profile");
 const [atsScore,setAtsScore]=useState(0);
 const [resumeSaving,setResumeSaving]=useState(false);
 // Ace AI universal agent
 const [agentOpen,setAgentOpen]=useState(false);
 const [agentExpanded,setAgentExpanded]=useState(false);
 const [agentInput,setAgentInput]=useState("");
 const [agentBusy,setAgentBusy]=useState(false);
 const [agentMessages,setAgentMessages]=useState<any[]>([{role:"assistant",content:"Hi! I’m Ace AI, your placement copilot. Ask me about resumes, companies, interviews, tests, learning plans, or what to do next.",metadata:{suggestions:["Make my 7-day plan","Review my resume","Prepare me for TCS","What should I practice today?"]}}]);
 const agentEndRef=useRef<HTMLDivElement|null>(null);

 useEffect(()=>{ try{const u=localStorage.getItem("ia_user"); if(u){setUser(JSON.parse(u)); setView("dashboard");}}catch{} },[]);
 useEffect(()=>{ if(user){ loadAttempts(user.id); loadResume(user); loadAgentHistory(user.id); } },[user]);
 useEffect(()=>{agentEndRef.current?.scrollIntoView({behavior:"smooth"});},[agentMessages,agentBusy]);
 useEffect(()=>{ if(activeTest && timeLeft>0 && !testResult){ testTimer.current=setTimeout(()=>setTimeLeft(t=>t-1),1000);} if(activeTest && timeLeft===0 && !testResult && testQs.length){submitTest();} return ()=>clearTimeout(testTimer.current); },[timeLeft,activeTest]);
 useEffect(()=>{ if(ivActive){ ivTimer.current=setInterval(()=>setIvSeconds(s=>s+1),1000);} else clearInterval(ivTimer.current); return ()=>clearInterval(ivTimer.current); },[ivActive]);

 const notify=(m:string)=>{setToast(m); setTimeout(()=>setToast(""),3200);};
 async function loadAttempts(uid:number){ try{const r=await fetch(`/api/attempts?userId=${uid}`); const d=await r.json(); setAttempts(d);}catch{} }
 async function loadAgentHistory(uid:number){try{const r=await fetch(`/api/agent?userId=${uid}`);const d=await r.json();if(d.messages?.length)setAgentMessages(d.messages);}catch{}}
 function runAgentAction(action:any){
  if(!action?.view)return; const target=action.view as View;
  if(action.payload?.company){const c=COMPANIES.find(x=>x.name===action.payload.company);if(c&&target==="companies")setSelCompany(c);if(target==="interview")setIvSetup(s=>({...s,company:action.payload.company}));}
  if(action.payload?.domain){const d=DOMAINS.find(x=>x.name===action.payload.domain);if(d)setSelDomain(d);if(target==="interview")setIvSetup(s=>({...s,domain:action.payload.domain}));}
  if(action.payload?.test){const test=TESTS.find(x=>x.id===action.payload.test);if(test){startTest(test);setAgentOpen(false);return;}}
  setView(target);setAgentOpen(false);window.scrollTo({top:0,behavior:"smooth"});
 }
 async function askAgent(text?:string){
  const msg=(text??agentInput).trim();if(!msg||agentBusy)return;setAgentInput("");setAgentMessages(m=>[...m,{role:"user",content:msg,metadata:{}}]);setAgentBusy(true);setAgentOpen(true);
  try{const r=await fetch("/api/agent",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:msg,userId:user?.id||0,user:{name:user?.name,targetRole:user?.targetRole,targetCompany:user?.targetCompany,branch:user?.branch}})});const d=await r.json();if(!r.ok)throw new Error(d.error);setAgentMessages(m=>[...m,{role:"assistant",content:d.answer,metadata:{action:d.action,cards:d.cards,suggestions:d.suggestions}}]);}catch{setAgentMessages(m=>[...m,{role:"assistant",content:"I’m temporarily unable to respond. You can still use every InterviewAce tool from the menu.",metadata:{suggestions:["Try again","Open resume builder"]}}]);}setAgentBusy(false);
 }
 async function clearAgent(){if(user?.id)await fetch("/api/agent",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:user.id})});setAgentMessages([{role:"assistant",content:"Fresh start! What would you like help with?",metadata:{suggestions:["Make my 7-day plan","Review my resume","Prepare me for TCS"]}}]);}
 async function loadResume(u:User){
  const starter={...EMPTY_RESUME,name:u.name||"",email:u.email||"",headline:u.targetRole||"Aspiring Professional"};
  try{ const r=await fetch(`/api/resume?userId=${u.id}`); const d=await r.json(); if(d.resume?.content){setResume({...starter,...d.resume.content});setAtsScore(d.resume.atsScore||0);} else setResume(starter); }catch{setResume(starter);}
 }
 async function calculateAtsNow(data=resume){ try{const r=await fetch("/api/resume",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:data})});const d=await r.json();setAtsScore(d.atsScore||0);}catch{} }
 async function saveResume(){
  if(!user?.id){notify("Create a free account to save permanently. You can still print this resume now.");calculateAtsNow();return;}
  setResumeSaving(true); try{const r=await fetch("/api/resume",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userId:user.id,title:`${resume.name||"My"} Resume`,content:resume})});const d=await r.json();if(!r.ok)throw new Error(d.error);setAtsScore(d.atsScore||0);notify("✅ Resume saved and ATS score updated!");}catch(e:any){notify(e.message||"Could not save resume");}setResumeSaving(false);
 }
 function updateResume(key:keyof ResumeData,value:any){const next={...resume,[key]:value};setResume(next);}
 function updateResumeItem(section:"education"|"experience"|"projects",index:number,key:string,value:string){const list=[...resume[section]] as any[];list[index]={...list[index],[key]:value};updateResume(section,list as any);}
 function printResume(){document.body.classList.add("printing-resume");window.print();setTimeout(()=>document.body.classList.remove("printing-resume"),500);}
 function improveSummary(){
  const role=resume.headline||user?.targetRole||"intern"; const skills=resume.skills||DOMAINS.find(d=>role.toLowerCase().includes(d.name.toLowerCase().split(" ")[0]))?.skills.slice(0,4).join(", ")||"problem solving, communication and teamwork";
  updateResume("summary",`Motivated ${role} with hands-on knowledge of ${skills}. Built practical academic and personal projects with a focus on clean, user-friendly solutions. Quick learner and collaborative team member seeking an internship to contribute technical skills while gaining industry experience.`); notify("✨ ATS-friendly summary generated — personalise it with your results!");
 }

 async function doAuth(e:any){ e.preventDefault(); setAuthBusy(true); setAuthErr("");
  try{ const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:authMode,...authForm})}); const d=await r.json();
   if(!r.ok) throw new Error(d.error||"Failed");
   setUser(d.user); localStorage.setItem("ia_user",JSON.stringify(d.user)); setAuthMode(null); setView("dashboard"); notify(`Welcome ${d.user.name}! Your InterviewAce journey begins 🎯`);
  }catch(err:any){setAuthErr(err.message);} setAuthBusy(false);
 }
 function demoLogin(){ const u:User={id:0,name:"Guest Student",email:"guest@interviewace.in",branch:"Computer Science / IT",targetRole:"Web Development Intern",targetCompany:"TCS",year:"3rd Year"}; setUser(u); setView("dashboard"); notify("Demo mode — explore everything! Sign up to save progress permanently."); loadAttempts(0); }
 function logout(){ setUser(null); localStorage.removeItem("ia_user"); setView("home"); }

 // ---------- TESTS ----------
 function startTest(t:any){
   let qs=MCQS.filter(m=>m.domain===t.domain);
   if(qs.length<6) qs=[...qs, ...MCQS.filter(m=>m.domain==="Aptitude & Reasoning (HSC Track)")].slice(0,8);
   qs=qs.slice(0,10);
   setActiveTest(t); setTestQs(qs); setAnswers({}); setQIdx(0); setTestResult(null); setTimeLeft(t.durationMin*60); setView("tests"); window.scrollTo({top:0});
 }
 async function submitTest(){
   if(!activeTest||testResult) return;
   let score=0; const details=testQs.map((q,i)=>{const ok=answers[i]===q.answer; if(ok)score++; return {q:q.q,topic:q.topic,your:answers[i]??-1,correct:q.answer,options:q.options,explanation:q.explanation,ok};});
   const acc=testQs.length?Math.round(score/testQs.length*100):0;
   const taken=activeTest.durationMin*60-timeLeft;
   const res={score,total:testQs.length,accuracy:acc,details,timeTaken:taken};
   setTestResult(res);
   try{ await fetch("/api/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:"assessment",userId:user?.id||0,userName:user?.name||"Guest",testId:activeTest.id,testTitle:activeTest.title,domain:activeTest.domain,score,total:testQs.length,accuracy:acc,timeTakenSec:taken,details})}); if(user) loadAttempts(user.id);}catch{}
 }

 // ---------- INTERVIEW ----------
 function speak(text:string){ try{ window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="en-IN"; u.rate=0.98; u.onstart=()=>setSpeaking(true); u.onend=()=>setSpeaking(false); window.speechSynthesis.speak(u);}catch{} }
 function buildQueue(){
   const comp=COMPANIES.find(c=>c.name===ivSetup.company);
   const compQs:InterviewQ[]=(comp?.questions||[]).map(q=>({q:q.q,domain:ivSetup.domain,company:comp!.name,type:q.type,difficulty:q.difficulty,keywords:q.keywords,sample:q.answer,tips:`Asked at ${comp!.name} — pattern-matched question.`}));
   const domQs=DOMAIN_INTERVIEW_Q[ivSetup.domain]||[];
   const pool=[HR_QUESTIONS[0], ...domQs, ...compQs, HR_QUESTIONS[2], HR_QUESTIONS[4]].filter(Boolean);
   const uniq=[...new Map(pool.map(q=>[q.q,q])).values()].slice(0,ivSetup.count);
   return uniq;
 }
 function startInterview(preset?:{domain?:string;company?:string}){
   if(preset) setIvSetup(s=>({...s,...preset}));
   const setup={...ivSetup,...preset};
   // rebuild with preset values
   const comp=COMPANIES.find(c=>c.name===(setup.company));
   const compQs:InterviewQ[]=(comp?.questions||[]).map(q=>({q:q.q,domain:setup.domain||ivSetup.domain,company:comp!.name,type:q.type,difficulty:q.difficulty,keywords:q.keywords,sample:q.answer,tips:`Asked at ${comp!.name}.`}));
   const domQs=DOMAIN_INTERVIEW_Q[setup.domain||ivSetup.domain]||[];
   const pool=[HR_QUESTIONS[0],...domQs,...compQs,HR_QUESTIONS[2],HR_QUESTIONS[4]].filter(Boolean);
   const uniq=[...new Map(pool.map(q=>[q.q,q])).values()].slice(0,setup.count||ivSetup.count);
   setIvQueue(uniq); setIvIdx(0); setIvAnswers([]); setTranscript(""); setIvReport(null); setIvSeconds(0); setIvActive(true); setView("interview");
   setTimeout(()=>speak(`Welcome to your ${setup.company||ivSetup.company} mock interview. Question one. ${uniq[0]?.q}`),400);
 }
 function toggleListen(){
   const SR=(window as any).SpeechRecognition||(window as any).webkitSpeechRecognition;
   if(!SR){ notify("⚠️ Speech recognition needs Chrome/Edge. You can type your answer instead — scoring works the same!"); return; }
   if(listening){ recogRef.current?.stop(); setListening(false); return; }
   const r=new SR(); r.lang="en-IN"; r.continuous=true; r.interimResults=true;
   r.onresult=(e:any)=>{ let final=""; for(let i=0;i<e.results.length;i++) final+=e.results[i][0].transcript+" "; setTranscript(final); };
   r.onend=()=>setListening(false); r.onerror=()=>setListening(false);
   recogRef.current=r; r.start(); setListening(true);
 }
 async function toggleRecord(){
   if(recording){ mediaRef.current?.stop(); setRecording(false); return; }
   try{ const stream=await navigator.mediaDevices.getUserMedia({audio:true}); chunksRef.current=[]; const mr=new MediaRecorder(stream); mr.ondataavailable=(e)=>chunksRef.current.push(e.data); mr.onstop=()=>{const blob=new Blob(chunksRef.current,{type:"audio/webm"}); setAudioUrl(URL.createObjectURL(blob)); stream.getTracks().forEach(t=>t.stop());}; mediaRef.current=mr; mr.start(); setRecording(true);}catch{notify("Microphone permission denied — typing mode still works fully.");}
 }
 async function nextQuestion(){
   const q=ivQueue[ivIdx]; if(!q)return;
   const s=scoreAnswer(transcript,q.keywords);
   const wpm=ivSeconds>5? Math.round(s.wordCount/(ivSeconds/60)):0;
   const entry={question:q.q,answer:transcript,...s,wpm,keywords:q.keywords,sample:q.sample};
   const all=[...ivAnswers,entry]; setIvAnswers(all); setTranscript(""); setIvSeconds(0); if(listening){recogRef.current?.stop(); setListening(false);}
   if(ivIdx+1>=ivQueue.length){ finishInterview(all); }
   else{ const n=ivQueue[ivIdx+1]; setIvIdx(ivIdx+1); setTimeout(()=>speak(`Next question. ${n.q}`),300); }
 }
 async function finishInterview(all:any[]){
   setIvActive(false);
   const avg=(k:string)=>Math.round(all.reduce((a,b)=>a+(b[k]||0),0)/Math.max(1,all.length));
   const report={overall:avg("overall"),keyword:avg("keywordScore"),fluency:avg("fluency"),confidence:avg("confidence"),filler:all.reduce((a,b)=>a+b.fillerCount,0),wpm:avg("wpm")||110,answers:all,domain:ivSetup.domain,company:ivSetup.company};
   let swoc=generateSWOC({keyword:report.keyword,fluency:report.fluency,confidence:report.confidence,accuracy:report.keyword,filler:report.filler,wpm:report.wpm,domain:report.domain,company:report.company});
   try{ const r=await fetch("/api/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:"interview",userId:user?.id||0,userName:user?.name||"Guest",domain:report.domain,company:report.company,mode:ivSetup.mode,overallScore:report.overall,keywordScore:report.keyword,fluencyScore:report.fluency,confidenceScore:report.confidence,fillerCount:report.filler,wpm:report.wpm,transcript:all})}); const d=await r.json(); if(d.swoc) swoc=d.swoc; if(user)loadAttempts(user.id);}catch{}
   setIvReport({...report,swoc}); speak(`Interview complete. Your overall score is ${report.overall} percent. Check your detailed SWOC report.`);
 }
 async function bookmark(q:string,domain:string,company:string){ try{await fetch("/api/attempts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:"bookmark",userId:user?.id||0,question:q,domain,company})}); notify("🔖 Bookmarked! Find it in your dashboard."); if(user)loadAttempts(user.id);}catch{notify("Bookmarked locally");} }

 const allQuestions:InterviewQ[]=useMemo(()=>[...HR_QUESTIONS,...Object.values(DOMAIN_INTERVIEW_Q).flat(),...COMPANIES.flatMap(c=>c.questions.map(q=>({q:q.q,domain:c.sector,company:c.name,type:q.type,difficulty:q.difficulty,keywords:q.keywords,sample:q.answer,tips:`Real ${c.name} pattern question.`})))],[]);
 const filteredQs=allQuestions.filter(q=>(qDomain==="All"||q.domain===qDomain||q.company===qDomain||q.type===qDomain)&&(q.q.toLowerCase().includes(qSearch.toLowerCase())||q.company.toLowerCase().includes(qSearch.toLowerCase())));
 const myStats=useMemo(()=>{
   const a=attempts.assessments||[], iv=attempts.interviews||[];
   const avgAcc=a.length?Math.round(a.reduce((x:any,y:any)=>x+y.accuracy,0)/a.length):0;
   const avgIv=iv.length?Math.round(iv.reduce((x:any,y:any)=>x+y.overallScore,0)/iv.length):0;
   const readiness=Math.round((avgAcc*0.4+avgIv*0.6))||0;
   return {tests:a.length,interviews:iv.length,avgAcc,avgIv,readiness,points:a.reduce((x:any,y:any)=>x+y.score*10,0)+iv.reduce((x:any,y:any)=>x+y.overallScore*2,0)};
 },[attempts]);
 const personalSWOC=useMemo(()=>{
   const latest=(attempts.interviews||[])[0];
   if(latest?.swoc && latest.swoc.strengths) return latest.swoc;
   if(ivReport?.swoc) return ivReport.swoc;
   return generateSWOC({keyword:myStats.avgIv||55,fluency:65,confidence:myStats.readiness||50,accuracy:myStats.avgAcc||50,filler:4,wpm:115,domain:user?.targetRole||"Web Development",company:user?.targetCompany||"TCS"});
 },[attempts,ivReport,myStats,user]);

 const NAV=[{id:"dashboard",label:"Dashboard",icon:LayoutDashboard},{id:"tests",label:"Skill Assessment",icon:ListChecks},{id:"interview",label:"AI Mock Interview",icon:Video},{id:"resume",label:"Resume Builder",icon:FileText},{id:"companies",label:"Company Vault",icon:Building2},{id:"domains",label:"Domains & Branches",icon:Library},{id:"questions",label:"Question Bank",icon:MessageSquare},{id:"swoc",label:"SWOC Analytics",icon:PieChart},{id:"learn",label:"Learn Hub",icon:BookOpen},{id:"leaderboard",label:"Leaderboard",icon:Crown}] as const;

 // ================= LANDING =================
 if(!user && view==="home"){
  return <div className="min-h-screen bg-[#0b1120]">
   {toast&&<div className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl text-sm font-semibold">{toast}</div>}
   <header className="sticky top-0 z-50 bg-[#0b1120]/95 backdrop-blur border-b border-white/10">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
     <div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-slate-950">A</div><div><div className="font-extrabold text-white leading-none">Interview<span className="text-emerald-400">Ace</span></div><div className="text-[10px] text-slate-400">AI Interview Preparation Platform</div></div></div>
     <nav className="hidden lg:flex gap-6 text-sm text-slate-300"><a href="#features" className="hover:text-emerald-400">Features</a><a href="#companies" className="hover:text-emerald-400">Companies</a><a href="#domains" className="hover:text-emerald-400">Domains</a><a href="#swoc" className="hover:text-emerald-400">SWOC</a><a href="#how" className="hover:text-emerald-400">How it Works</a></nav>
     <div className="flex gap-2"><button onClick={()=>setAuthMode("login")} className="px-4 py-2 rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/10">Login</button><button onClick={()=>setAuthMode("signup")} className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-bold hover:bg-emerald-400">Sign Up Free</button></div>
    </div>
   </header>

   <section className="max-w-7xl mx-auto px-4 pt-12 pb-10 grid lg:grid-cols-2 gap-10 items-center">
    <div>
     <Badge color="#065f46">🎓 For HSC-Passed & Undergraduate Students</Badge>
     <h1 className="text-4xl md:text-[54px] font-black leading-[1.05] text-white mt-4">Ace Your First <span className="text-emerald-400">Internship Interview</span> with AI Practice</h1>
     <p className="text-slate-400 mt-4 text-[17px] leading-relaxed">InterviewAce is an AI-powered virtual mock interview & skill assessment platform. Speak to our AI interviewer, get instant NLP keyword scoring, filler-word detection, company-specific question banks (TCS, HCL, Infosys, Amazon…) and a personal <b className="text-slate-200">SWOC report</b> after every session.</p>
     <div className="flex flex-wrap gap-3 mt-6">
      <button onClick={()=>setAuthMode("signup")} className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center gap-2">Create Free Account <ArrowRight size={17}/></button>
      <button onClick={demoLogin} className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/15 font-bold rounded-xl flex items-center gap-2"><Play size={16}/> Try Live Demo</button>
     </div>
     <div className="grid grid-cols-4 gap-3 mt-8 text-center">
      {[["20+","Companies"],["250+","Questions"],["13","Domains"],["100%","Free"]].map(s=><div key={s[1]} className="bg-[#111a2e] border border-white/10 rounded-xl py-3"><div className="font-extrabold text-emerald-400 text-lg">{s[0]}</div><div className="text-[11px] text-slate-400">{s[1]}</div></div>)}
     </div>
     <div className="flex gap-4 mt-5 text-xs text-slate-400"><span className="flex items-center gap-1"><CheckCircle2 size={13} className="text-emerald-400"/>No credit card</span><span className="flex items-center gap-1"><Mic size={13} className="text-emerald-400"/>Voice + Text modes</span><span className="flex items-center gap-1"><Shield size={13} className="text-emerald-400"/>Browser-based STT/TTS</span></div>
    </div>
    <div className="relative">
     <img src={HERO_IMG} alt="Student preparing for interview" className="rounded-3xl w-full h-[420px] object-cover border border-white/10"/>
     <div className="absolute -bottom-5 -left-3 bg-[#111a2e] border border-emerald-500/40 rounded-2xl p-4 shadow-2xl w-[280px]" style={{animation:"floaty 4s ease-in-out infinite"}}>
      <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold"><span className="w-2 h-2 rounded-full bg-red-500" style={{animation:"pulse-dot 1s infinite"}}/>LIVE AI INTERVIEW • TCS Pattern</div>
      <p className="text-sm mt-2 text-slate-200">"Explain OOPS with real-world examples…"</p>
      <div className="flex items-end gap-1 mt-3 h-7">{[0.1,0.7,0.3,0.9,0.5,0.2,0.8,0.4,0.6,0.15,0.75,0.35].map((d,i)=><div key={i} className="w-1.5 bg-emerald-400 rounded eq-bar" style={{animationDelay:`${d}s`}}/>)}</div>
      <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[11px]"><div className="bg-white/5 rounded-lg py-1.5"><b className="text-emerald-400 block text-sm">86%</b>Keywords</div><div className="bg-white/5 rounded-lg py-1.5"><b className="text-sky-400 block text-sm">132</b>WPM</div><div className="bg-white/5 rounded-lg py-1.5"><b className="text-amber-400 block text-sm">2</b>Fillers</div></div>
     </div>
     <div className="absolute -top-4 -right-2 bg-emerald-500 text-slate-950 rounded-2xl px-4 py-2.5 font-extrabold text-sm shadow-xl flex items-center gap-2"><Trophy size={16}/> SWOC Report Ready!</div>
    </div>
   </section>

   <div className="border-y border-white/10 bg-[#0e1628] py-4 overflow-hidden"><div className="flex gap-3 animate-marquee w-max">{[...COMPANIES,...COMPANIES].map((c,i)=><span key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm whitespace-nowrap"><span className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white" style={{background:c.color}}>{c.logo}</span>{c.name}</span>)}</div></div>

   <section id="features" className="max-w-7xl mx-auto px-4 py-14">
    <h2 className="text-3xl font-extrabold text-white text-center">One Platform. <span className="text-emerald-400">Complete Placement Prep.</span></h2>
    <p className="text-center text-slate-400 mt-2 max-w-2xl mx-auto">Built with Web Speech API, MediaRecorder & NLP keyword scoring — zero cost, low latency, right in your browser.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
     {[
      {i:Video,t:"AI Mock Interview Simulator",d:"AI speaks questions aloud (TTS), listens to you (STT), detects fillers, measures WPM & scores technical keywords in real time.",c:"#10b981"},
      {i:ListChecks,t:"Skill Assessment Engine",d:"Timed MCQ tests for TCS NQT, Web Dev, AI/ML, Aptitude & 10+ domains with instant diagnostic reports & explanations.",c:"#0ea5e9"},
      {i:Building2,t:"Company Interview Vault",d:"20+ companies — eligibility, CGPA criteria, salary, round patterns & real frequently-asked questions with sample answers.",c:"#f59e0b"},
      {i:PieChart,t:"Personal SWOC Analysis",d:"Auto-generated Strengths, Weaknesses, Opportunities & Challenges after every test & interview. Know exactly what to fix.",c:"#8b5cf6"},
      {i:Brain,t:"NLP Keyword Scoring",d:"Rule-based NLP engine checks if your answer uses industry-standard terms interviewers actually listen for.",c:"#ec4899"},
      {i:BookOpen,t:"Self-Learning Hub",d:"Branch-wise roadmaps (CS, ENTC, Mech, Civil, Business, HSC) with skill checklists to bridge college → industry gap.",c:"#14b8a6"},
     ].map(f=><div key={f.t} className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/50 transition"><span className="inline-block p-3 rounded-xl" style={{background:f.c+"20",color:f.c}}><f.i size={22}/></span><h3 className="font-bold text-white mt-3">{f.t}</h3><p className="text-sm text-slate-400 mt-1 leading-relaxed">{f.d}</p></div>)}
    </div>
   </section>

   <section id="domains" className="bg-[#0e1628] border-y border-white/10 py-14"><div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-extrabold text-white">Every Branch. <span className="text-emerald-400">Every Domain.</span></h2>
    <div className="flex flex-wrap gap-2 mt-4">{BRANCHES.map(b=><Badge key={b} color="#1e293b">{b}</Badge>)}</div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">{DOMAINS.map(d=><button key={d.id} onClick={demoLogin} className="text-left bg-[#111a2e] border border-white/10 rounded-2xl p-4 hover:border-emerald-500/60 transition"><div className="text-2xl">{d.icon}</div><div className="font-bold text-white mt-1 text-[15px]">{d.name}</div><div className="text-[11px] text-slate-500">{d.branch}</div><div className="flex justify-between mt-3 text-xs"><span className="text-emerald-400 font-bold">{d.demand}% demand</span><span className="text-slate-300">{d.avgSalary}</span></div></button>)}</div>
   </div></section>

   <section id="companies" className="max-w-7xl mx-auto px-4 py-14">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-3xl font-extrabold text-white">Company-Specific Preparation</h2><p className="text-slate-400 mt-1">Real eligibility, salary, rounds & questions — tap any company in the app.</p></div><button onClick={demoLogin} className="px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm">Explore Company Vault →</button></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">{COMPANIES.slice(0,8).map(c=><div key={c.id} className="bg-[#111a2e] border border-white/10 rounded-2xl p-4"><div className="flex items-center gap-3"><span className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white" style={{background:c.color}}>{c.logo}</span><div><div className="font-bold text-white">{c.name}</div><div className="text-[11px] text-slate-500">{c.sector}</div></div></div><div className="mt-3 space-y-1 text-xs text-slate-300"><div className="flex justify-between"><span>Package</span><b className="text-emerald-400">{c.salary.split("•")[0]}</b></div><div className="flex justify-between"><span>Criteria</span><span>{c.cgpa}</span></div><div className="flex justify-between"><span>Questions</span><b>{c.questions.length} in vault</b></div></div></div>)}</div>
   </section>

   <section id="swoc" className="bg-[#0e1628] border-y border-white/10 py-14"><div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
    <div><h2 className="text-3xl font-extrabold text-white">Your Personal <span className="text-emerald-400">SWOC Analysis</span>, Auto-Generated</h2><p className="text-slate-400 mt-3 leading-relaxed">After every mock interview and assessment, InterviewAce analyses keyword accuracy, speech pacing, filler words and confidence to build your SWOC matrix — with concrete next actions, not generic advice.</p>
    <img src={IMG2} alt="Student learning" className="rounded-2xl mt-5 h-52 w-full object-cover border border-white/10"/></div>
    <div className="grid sm:grid-cols-2 gap-3">
     <SWOCBox title="Strengths" color="#10b981" icon={ThumbsUp} items={["High keyword match accuracy","Clear speech pacing (130 WPM)","Strong core subject grip"]}/>
     <SWOCBox title="Weaknesses" color="#f59e0b" icon={AlertTriangle} items={["Fillers detected: 'um', 'like'","Missed domain terms in Q3","Answers too short (<25 words)"]}/>
     <SWOCBox title="Opportunities" color="#0ea5e9" icon={Rocket} items={["TCS NQT path unlocked","Complete React roadmap → Advanced mocks","Weekly aptitude sprints"]}/>
     <SWOCBox title="Challenges" color="#ef4444" icon={Shield} items={["High competition in off-campus drives","OA time-limit elimination risk","Follow-up probing on weak topics"]}/>
    </div>
   </div></section>

   <section id="how" className="max-w-7xl mx-auto px-4 py-14">
    <h2 className="text-3xl font-extrabold text-white text-center">How InterviewAce Works</h2>
    <div className="grid md:grid-cols-4 gap-4 mt-8">{[["1","Create Account","Sign up, pick your branch, target company & role. Takes 30 seconds."],["2","Take Skill Tests","Timed assessments diagnose your level in aptitude & domain skills."],["3","Face the AI Interviewer","Speak answers aloud. AI scores keywords, fluency, fillers & confidence."],["4","Get SWOC + Improve","Personal report tells exactly what to practise next. Repeat & ace it."]].map(s=><div key={s[0]} className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 text-center"><div className="w-11 h-11 mx-auto rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-lg">{s[0]}</div><h3 className="font-bold text-white mt-3">{s[1]}</h3><p className="text-sm text-slate-400 mt-1">{s[2]}</p></div>)}</div>
    <div className="bg-emerald-500 rounded-3xl p-8 mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
     <div><h3 className="text-2xl font-black text-slate-950">Your first interview is 2 minutes away.</h3><p className="text-emerald-900 font-medium">Free forever for students • HSC & UG friendly • Works in Chrome</p></div>
     <button onClick={()=>setAuthMode("signup")} className="px-7 py-3.5 bg-slate-950 text-white font-bold rounded-xl whitespace-nowrap">Start Practising Free →</button>
    </div>
   </section>
   <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">InterviewAce — AI-Powered Virtual Interview Preparation & Skill Assessment Platform • Built for HSC & Undergraduate Students 🇮🇳</footer>

   {authMode&&<div className="fixed inset-0 bg-black/70 z-[80] flex items-center justify-center p-4" onClick={()=>setAuthMode(null)}>
    <form onSubmit={doAuth} onClick={e=>e.stopPropagation()} className="bg-[#111a2e] border border-white/15 rounded-3xl p-6 w-full max-w-md max-h-[92vh] overflow-y-auto">
     <div className="flex items-center gap-2 mb-1"><div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-slate-950">A</div><h3 className="text-xl font-extrabold text-white">{authMode==="signup"?"Create your account":"Welcome back"}</h3></div>
     <p className="text-sm text-slate-400 mb-4">{authMode==="signup"?"Free forever for students. Personalised by branch & target company.":"Login to continue your preparation streak."}</p>
     {authErr&&<div className="bg-red-500/15 border border-red-500/40 text-red-300 text-sm rounded-xl px-3 py-2 mb-3">{authErr}</div>}
     <div className="space-y-3">
      {authMode==="signup"&&<><input required placeholder="Full name" value={authForm.name} onChange={e=>setAuthForm({...authForm,name:e.target.value})} className="w-full bg-[#0b1120] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm"/>
      <div className="grid grid-cols-2 gap-2"><select value={authForm.branch} onChange={e=>setAuthForm({...authForm,branch:e.target.value})} className="bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm">{BRANCHES.map(b=><option key={b}>{b}</option>)}</select>
      <select value={authForm.year} onChange={e=>setAuthForm({...authForm,year:e.target.value})} className="bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm">{["HSC Passed (12th)","1st Year","2nd Year","3rd Year","Final Year","Recent Graduate"].map(y=><option key={y}>{y}</option>)}</select></div>
      <input placeholder="College / School name" value={authForm.college} onChange={e=>setAuthForm({...authForm,college:e.target.value})} className="w-full bg-[#0b1120] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm"/>
      <div className="grid grid-cols-2 gap-2"><select value={authForm.targetCompany} onChange={e=>setAuthForm({...authForm,targetCompany:e.target.value})} className="bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm">{COMPANIES.map(c=><option key={c.id}>{c.name}</option>)}</select>
      <select value={authForm.targetRole} onChange={e=>setAuthForm({...authForm,targetRole:e.target.value})} className="bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm">{DOMAINS.map(d=><option key={d.id} value={d.name+" Intern"}>{d.name} Intern</option>)}</select></div></>}
      <input required type="email" placeholder="Email address" value={authForm.email} onChange={e=>setAuthForm({...authForm,email:e.target.value})} className="w-full bg-[#0b1120] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm"/>
      <input required type="password" placeholder="Password" value={authForm.password} onChange={e=>setAuthForm({...authForm,password:e.target.value})} className="w-full bg-[#0b1120] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm"/>
     </div>
     <button disabled={authBusy} className="w-full mt-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl disabled:opacity-60">{authBusy?"Please wait…":authMode==="signup"?"Create Account & Start →":"Login →"}</button>
     <button type="button" onClick={demoLogin} className="w-full mt-2 py-2.5 bg-white/10 rounded-xl text-sm font-semibold">Continue as Guest (Demo)</button>
     <p className="text-center text-xs text-slate-500 mt-3">{authMode==="signup"?<>Already have an account? <button type="button" className="text-emerald-400 font-bold" onClick={()=>setAuthMode("login")}>Login</button></>:<>New here? <button type="button" className="text-emerald-400 font-bold" onClick={()=>setAuthMode("signup")}>Sign up free</button></>}</p>
    </form></div>}
  </div>;
 }

 // ================= APP SHELL =================
 return <div className="min-h-screen bg-[#0b1120] flex">
  {toast&&<div className="fixed top-4 left-1/2 -translate-x-1/2 z-[90] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl text-sm font-semibold max-w-[92vw] text-center">{toast}</div>}
  {/* Sidebar */}
  <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0e1628] border-r border-white/10 sticky top-0 h-screen p-4">
   <div className="flex items-center gap-2.5 px-1"><div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-slate-950">A</div><div><div className="font-extrabold text-white leading-none">Interview<span className="text-emerald-400">Ace</span></div><div className="text-[10px] text-slate-500">AI Interview Platform</div></div></div>
   <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-3 mt-5">
    <div className="flex items-center gap-2.5"><div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">{user?.name?.[0]||"G"}</div><div className="min-w-0"><div className="font-bold text-white text-sm truncate">{user?.name}</div><div className="text-[11px] text-slate-500 truncate">{user?.year} • {user?.branch}</div></div></div>
    <div className="mt-3"><Bar label="Interview Readiness" val={myStats.readiness} color="#10b981"/></div>
    <div className="flex justify-between text-[11px] mt-2 text-slate-400"><span className="flex items-center gap-1"><Flame size={12} className="text-orange-400"/>Target: {user?.targetCompany||"TCS"}</span><span className="flex items-center gap-1"><Star size={12} className="text-amber-400"/>{myStats.points} pts</span></div>
   </div>
   <nav className="mt-4 space-y-1 flex-1 overflow-y-auto">{NAV.map(n=><button key={n.id} onClick={()=>{setView(n.id as View); if(n.id!=="tests"){setActiveTest(null);} window.scrollTo({top:0});}} className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${view===n.id?"bg-emerald-500 text-slate-950":"text-slate-300 hover:bg-white/10"}`}><n.icon size={17}/>{n.label}</button>)}</nav>
   <button onClick={logout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 px-3 py-2"><LogOut size={16}/>Logout</button>
  </aside>

  <main className="flex-1 min-w-0">
   {/* Mobile header */}
   <div className="lg:hidden sticky top-0 z-40 bg-[#0b1120]/95 backdrop-blur border-b border-white/10 px-4 py-3">
    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-sm">A</div><b className="text-white">Interview<span className="text-emerald-400">Ace</span></b></div><button onClick={logout} className="text-xs text-slate-400 flex items-center gap-1"><LogOut size={14}/>Logout</button></div>
    <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1">{NAV.map(n=><button key={n.id} onClick={()=>{setView(n.id as View); if(n.id!=="tests")setActiveTest(null);}} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${view===n.id?"bg-emerald-500 text-slate-950":"bg-white/10 text-slate-300"}`}><n.icon size={13}/>{n.label}</button>)}</div>
   </div>

   <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
   {/* ===== DASHBOARD ===== */}
   {view==="dashboard"&&<div>
    <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl md:text-3xl font-extrabold text-white">Namaste, {user?.name?.split(" ")[0]} 👋</h1><p className="text-slate-400 text-sm mt-0.5">Target: <b className="text-emerald-400">{user?.targetRole}</b> at <b className="text-emerald-400">{user?.targetCompany}</b> • {user?.college||"Keep practising daily for best results"}</p></div>
    <div className="flex gap-2"><button onClick={()=>startInterview()} className="px-4 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2"><Mic size={15}/>Start Mock Interview</button><button onClick={()=>setView("tests")} className="px-4 py-2.5 bg-white/10 font-bold rounded-xl text-sm">Take a Test</button></div></div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
     <StatCard icon={Target} label="Readiness Score" value={`${myStats.readiness}%`} sub="Tests + interviews combined" color="#10b981"/>
     <StatCard icon={ListChecks} label="Tests Taken" value={myStats.tests} sub={`Avg accuracy ${myStats.avgAcc}%`} color="#0ea5e9"/>
     <StatCard icon={Video} label="Mock Interviews" value={myStats.interviews} sub={`Avg score ${myStats.avgIv}%`} color="#8b5cf6"/>
     <StatCard icon={Trophy} label="Ace Points" value={myStats.points} sub="Earn 10/correct, 2/iv-point" color="#f59e0b"/>
    </div>

    <div className="grid lg:grid-cols-3 gap-4 mt-4">
     <div className="lg:col-span-2 bg-[#111a2e] border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold text-white flex items-center gap-2"><Sparkles size={16} className="text-emerald-400"/>Recommended For You</h3>
      <div className="grid sm:grid-cols-2 gap-3 mt-3">
       {TESTS.slice(0,4).map(t=><button key={t.id} onClick={()=>startTest(t)} className="text-left bg-[#0b1120] border border-white/10 rounded-xl p-3.5 hover:border-emerald-500/60"><Badge color="#065f46">{t.company}</Badge><div className="font-bold text-white text-sm mt-1.5">{t.title}</div><div className="text-xs text-slate-400 mt-0.5">{t.description}</div><div className="text-[11px] text-emerald-400 font-bold mt-2 flex items-center gap-1"><Clock size={11}/>{t.durationMin} mins • Start →</div></button>)}
      </div>
      <h3 className="font-bold text-white mt-5 mb-2">Recent Activity</h3>
      {([...(attempts.assessments||[]).map((a:any)=>({...a,kind:"test",date:a.createdAt})),...(attempts.interviews||[]).map((a:any)=>({...a,kind:"iv",date:a.createdAt}))].sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).slice(0,5)).map((a:any,i:number)=><div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 text-sm"><div className="flex items-center gap-2.5"><span className={`p-2 rounded-lg ${a.kind==="test"?"bg-sky-500/15 text-sky-400":"bg-violet-500/15 text-violet-400"}`}>{a.kind==="test"?<ListChecks size={15}/>:<Video size={15}/>}</span><div><div className="text-white font-medium">{a.kind==="test"?a.testTitle:`${a.company} Mock — ${a.domain}`}</div><div className="text-[11px] text-slate-500">{a.date?new Date(a.date).toLocaleString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):""}</div></div></div><Badge color={(a.kind==="test"?a.accuracy:a.overallScore)>=70?"#065f46":"#92400e"}>{a.kind==="test"?`${a.score}/${a.total} • ${a.accuracy}%`:`${a.overallScore}%`}</Badge></div>)}
      {(attempts.assessments||[]).length===0&&(attempts.interviews||[]).length===0&&<div className="text-sm text-slate-500 bg-[#0b1120] rounded-xl p-4 text-center">No activity yet. Take your first test above or start a mock interview — takes 5 minutes! 🚀</div>}
     </div>
     <div className="space-y-4">
      <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5">
       <h3 className="font-bold text-white flex items-center gap-2"><PieChart size={16} className="text-violet-400"/>Mini SWOC</h3>
       <div className="mt-3 space-y-2.5 text-[13px]">
        <div><span className="text-emerald-400 font-bold">S • </span><span className="text-slate-300">{personalSWOC.strengths?.[0]}</span></div>
        <div><span className="text-amber-400 font-bold">W • </span><span className="text-slate-300">{personalSWOC.weaknesses?.[0]}</span></div>
        <div><span className="text-sky-400 font-bold">O • </span><span className="text-slate-300">{personalSWOC.opportunities?.[0]}</span></div>
        <div><span className="text-red-400 font-bold">C • </span><span className="text-slate-300">{personalSWOC.challenges?.[0]}</span></div>
       </div>
       <button onClick={()=>setView("swoc")} className="w-full mt-4 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-bold">Full SWOC Report →</button>
      </div>
      <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5">
       <h3 className="font-bold text-white flex items-center gap-2"><Bookmark size={16} className="text-amber-400"/>Bookmarked Questions ({(attempts.bookmarks||[]).length})</h3>
       {(attempts.bookmarks||[]).slice(0,4).map((b:any)=><div key={b.id} className="text-[13px] text-slate-300 py-2 border-b border-white/5">• {b.question} <span className="text-slate-500">({b.company})</span></div>)}
       {(attempts.bookmarks||[]).length===0&&<p className="text-xs text-slate-500 mt-2">Bookmark tough questions from the Question Bank to revise later.</p>}
      </div>
      <img src={IMG3} alt="Student" className="rounded-2xl h-36 w-full object-cover border border-white/10"/>
     </div>
    </div>
   </div>}

   {/* ===== TESTS ===== */}
   {view==="tests"&&!activeTest&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><ListChecks className="text-sky-400"/>Skill Assessment Center</h1>
    <p className="text-slate-400 text-sm mt-1">{MCQS.length}+ questions • Timed tests • Instant report with explanations • Topic-wise analysis</p>
    <div className="flex gap-2 mt-4 flex-wrap">{["All",...new Set(TESTS.map(t=>t.domain))].map(f=><button key={f} onClick={()=>setTestFilter(f)} className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${testFilter===f?"bg-emerald-500 text-slate-950":"bg-white/10 text-slate-300"}`}>{f}</button>)}</div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">{TESTS.filter(t=>testFilter==="All"||t.domain===testFilter).map(t=>{const past=(attempts.assessments||[]).filter((a:any)=>a.testId===t.id); const best=past.length?Math.max(...past.map((a:any)=>a.accuracy)):null; return <div key={t.id} className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 hover:border-sky-500/50 transition">
     <div className="flex justify-between"><Badge color="#075985">{t.company}</Badge><Badge color="#334155">{t.level}</Badge></div>
     <h3 className="font-bold text-white mt-2.5">{t.title}</h3><p className="text-xs text-slate-400 mt-1">{t.description}</p>
     <div className="flex gap-3 text-[11px] text-slate-400 mt-3"><span className="flex items-center gap-1"><Clock size={11}/>{t.durationMin} mins</span><span className="flex items-center gap-1"><FileText size={11}/>{Math.min(10,MCQS.filter(m=>m.domain===t.domain).length||8)} questions</span>{best!==null&&<span className="text-emerald-400 font-bold">Best: {best}%</span>}</div>
     <button onClick={()=>startTest(t)} className="w-full mt-4 py-2.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-sm font-bold flex items-center justify-center gap-2"><Play size={14}/>Start Test</button></div>})}</div>
    {(attempts.assessments||[]).length>0&&<div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5 mt-5"><h3 className="font-bold text-white">📈 Your Test History & Detailed Reports</h3>{(attempts.assessments||[]).slice(0,8).map((a:any)=><div key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 border-b border-white/5 text-sm"><div><span className="text-white font-medium">{a.testTitle}</span><span className="text-slate-500 text-xs ml-2">{new Date(a.createdAt).toLocaleDateString("en-IN")} • {Math.floor((a.timeTakenSec||0)/60)}m {((a.timeTakenSec||0)%60)}s</span></div><div className="flex items-center gap-2"><div className="w-24"><Bar label="" val={a.accuracy} color={a.accuracy>=70?"#10b981":"#f59e0b"}/></div><Badge color={a.accuracy>=70?"#065f46":"#92400e"}>{a.score}/{a.total}</Badge></div></div>)}</div>}
   </div>}

   {view==="tests"&&activeTest&&!testResult&&<div className="max-w-3xl mx-auto">
    <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5">
     <div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="font-extrabold text-white text-lg">{activeTest.title}</h2><span className="text-xs text-slate-400">{activeTest.domain} • Question {qIdx+1}/{testQs.length}</span></div>
     <div className={`flex items-center gap-2 font-mono font-bold px-3 py-1.5 rounded-xl ${timeLeft<60?"bg-red-500/20 text-red-400":"bg-white/10 text-white"}`}><Timer size={16}/>{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,"0")}</div></div>
     <div className="h-2 bg-slate-800 rounded-full mt-4 overflow-hidden"><div className="h-full bg-sky-500 transition-all" style={{width:`${(qIdx+1)/testQs.length*100}%`}}/></div>
     <div className="flex gap-1.5 mt-3 flex-wrap">{testQs.map((_,i)=><button key={i} onClick={()=>setQIdx(i)} className={`w-8 h-8 rounded-lg text-xs font-bold ${i===qIdx?"bg-sky-500 text-white":answers[i]!==undefined?"bg-emerald-500/30 text-emerald-300 border border-emerald-500/50":"bg-white/10 text-slate-300"}`}>{i+1}</button>)}</div>
     {testQs[qIdx]&&<div className="mt-5"><div className="flex gap-2"><Badge color="#334155">{testQs[qIdx].topic}</Badge><Badge color={testQs[qIdx].difficulty==="Hard"?"#991b1b":testQs[qIdx].difficulty==="Medium"?"#92400e":"#065f46"}>{testQs[qIdx].difficulty}</Badge></div>
     <h3 className="text-lg font-semibold text-white mt-3 leading-relaxed">{testQs[qIdx].q}</h3>
     <div className="space-y-2 mt-4">{testQs[qIdx].options.map((o:string,i:number)=><button key={i} onClick={()=>setAnswers({...answers,[qIdx]:i})} className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${answers[qIdx]===i?"bg-sky-500/20 border-sky-400 text-white font-semibold":"bg-[#0b1120] border-white/10 text-slate-300 hover:border-white/30"}`}><span className="font-bold mr-2">{String.fromCharCode(65+i)}.</span>{o}</button>)}</div></div>}
     <div className="flex justify-between mt-6"><button disabled={qIdx===0} onClick={()=>setQIdx(qIdx-1)} className="px-4 py-2.5 bg-white/10 rounded-xl text-sm font-bold disabled:opacity-40">← Previous</button>
     {qIdx<testQs.length-1?<button onClick={()=>setQIdx(qIdx+1)} className="px-5 py-2.5 bg-sky-600 rounded-xl text-sm font-bold">Next →</button>:<button onClick={submitTest} className="px-5 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold">Submit Test ✓</button>}</div>
     <button onClick={submitTest} className="w-full mt-3 text-xs text-slate-500 hover:text-slate-300">Finish & submit now ({Object.keys(answers).length}/{testQs.length} answered)</button>
    </div>
   </div>}

   {view==="tests"&&activeTest&&testResult&&<div className="max-w-3xl mx-auto">
    <div className="bg-[#111a2e] border border-emerald-500/30 rounded-3xl p-6 text-center">
     <div className="text-5xl">{testResult.accuracy>=70?"🏆":testResult.accuracy>=40?"💪":"📚"}</div>
     <h2 className="text-2xl font-extrabold text-white mt-2">{testResult.accuracy>=70?"Excellent! Interview-Ready Level":testResult.accuracy>=40?"Good Attempt — Keep Pushing":"Needs Practice — Roadmap Below"}</h2>
     <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mt-4">
      <div className="bg-[#0b1120] rounded-xl py-3"><div className="text-2xl font-black text-emerald-400">{testResult.score}/{testResult.total}</div><div className="text-[11px] text-slate-500">Score</div></div>
      <div className="bg-[#0b1120] rounded-xl py-3"><div className="text-2xl font-black text-sky-400">{testResult.accuracy}%</div><div className="text-[11px] text-slate-500">Accuracy</div></div>
      <div className="bg-[#0b1120] rounded-xl py-3"><div className="text-2xl font-black text-amber-400">{Math.floor(testResult.timeTaken/60)}m {testResult.timeTaken%60}s</div><div className="text-[11px] text-slate-500">Time Taken</div></div>
     </div>
     <div className="max-w-md mx-auto mt-4 text-left"><Bar label="Overall Performance" val={testResult.accuracy} color={testResult.accuracy>=70?"#10b981":"#f59e0b"}/></div>
     <div className="flex gap-2 justify-center mt-5 flex-wrap"><button onClick={()=>startTest(activeTest)} className="px-4 py-2.5 bg-white/10 rounded-xl text-sm font-bold flex items-center gap-1.5"><RotateCcw size={14}/>Retry</button><button onClick={()=>{setActiveTest(null);setTestResult(null);}} className="px-4 py-2.5 bg-sky-600 rounded-xl text-sm font-bold">All Tests</button><button onClick={()=>startInterview({domain:activeTest.domain})} className="px-4 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold flex items-center gap-1.5"><Mic size={14}/>Try Mock Interview</button><button onClick={()=>setView("swoc")} className="px-4 py-2.5 bg-violet-600 rounded-xl text-sm font-bold">View SWOC</button></div>
    </div>
    <h3 className="font-bold text-white mt-6 mb-3">📋 Detailed Answer Analysis</h3>
    <div className="space-y-3">{testResult.details.map((d:any,i:number)=><div key={i} className={`rounded-2xl p-4 border ${d.ok?"bg-emerald-500/5 border-emerald-500/30":"bg-red-500/5 border-red-500/30"}`}>
     <div className="flex gap-2 items-start">{d.ok?<CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18}/>:<XCircle className="text-red-400 shrink-0 mt-0.5" size={18}/>}<div><div className="text-sm font-semibold text-white">Q{i+1}. {d.q}</div>
     <div className="text-xs mt-1.5 space-y-0.5"><div className={d.ok?"text-emerald-300":"text-red-300"}>Your answer: {d.your>=0?d.options[d.your]:"Not attempted"}</div>{!d.ok&&<div className="text-emerald-300">Correct: {d.options[d.correct]}</div>}<div className="text-slate-400">💡 {d.explanation} <span className="text-slate-500">• Topic: {d.topic}</span></div></div></div></div></div>)}</div>
   </div>}

   {/* ===== INTERVIEW ===== */}
   {view==="interview"&&!ivActive&&!ivReport&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Video className="text-emerald-400"/>AI Mock Interview Studio</h1>
    <p className="text-slate-400 text-sm mt-1">Real-time voice interview • Web Speech API (STT + TTS) • NLP keyword scoring • Filler & WPM analysis • MediaRecorder audio review</p>
    <div className="grid lg:grid-cols-5 gap-4 mt-5">
     <div className="lg:col-span-3 bg-[#111a2e] border border-white/10 rounded-2xl p-5">
      <h3 className="font-bold text-white">⚙️ Configure Your Interview</h3>
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
       <label className="text-xs text-slate-400">Domain / Career Track<select value={ivSetup.domain} onChange={e=>setIvSetup({...ivSetup,domain:e.target.value})} className="mt-1 w-full bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white">{DOMAINS.map(d=><option key={d.id}>{d.name}</option>)}<option>HR</option></select></label>
       <label className="text-xs text-slate-400">Target Company<select value={ivSetup.company} onChange={e=>setIvSetup({...ivSetup,company:e.target.value})} className="mt-1 w-full bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white">{COMPANIES.map(c=><option key={c.id}>{c.name}</option>)}</select></label>
       <label className="text-xs text-slate-400">Number of Questions<select value={ivSetup.count} onChange={e=>setIvSetup({...ivSetup,count:Number(e.target.value)})} className="mt-1 w-full bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white"><option value={3}>3 — Quick (5 mins)</option><option value={5}>5 — Standard (10 mins)</option><option value={8}>8 — Full Drive (18 mins)</option></select></label>
       <label className="text-xs text-slate-400">Answer Mode<select value={ivSetup.mode} onChange={e=>setIvSetup({...ivSetup,mode:e.target.value})} className="mt-1 w-full bg-[#0b1120] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white"><option value="voice">🎙️ Voice (Speak answers)</option><option value="text">⌨️ Text (Type answers)</option><option value="both">🔀 Both</option></select></label>
      </div>
      <div className="bg-[#0b1120] border border-white/10 rounded-xl p-3.5 mt-4 text-[13px] text-slate-300">
       <b className="text-white">How scoring works:</b> Our NLP engine checks industry keywords in your answer, answer depth (words), filler words (um, uh, like…), speaking pace (WPM) and confidence signals (examples/projects). You get a full SWOC report at the end.
      </div>
      <button onClick={()=>startInterview()} className="w-full mt-4 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl flex items-center justify-center gap-2"><Mic size={18}/>Start {ivSetup.company} Mock Interview</button>
      <p className="text-[11px] text-slate-500 text-center mt-2">🎧 Use Chrome/Edge + headphones for best voice accuracy. Allow microphone when asked.</p>
     </div>
     <div className="lg:col-span-2 space-y-4">
      <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5"><h3 className="font-bold text-white">🏢 Quick Company Mocks</h3><div className="grid grid-cols-2 gap-2 mt-3">{COMPANIES.slice(0,8).map(c=><button key={c.id} onClick={()=>startInterview({company:c.name})} className="flex items-center gap-2 bg-[#0b1120] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-semibold hover:border-emerald-500/60 text-left"><span className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-black text-white shrink-0" style={{background:c.color}}>{c.logo}</span><span className="truncate">{c.name}</span></button>)}</div></div>
      <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5"><h3 className="font-bold text-white">📜 Past Interviews</h3>{(attempts.interviews||[]).slice(0,4).map((s:any)=><div key={s.id} className="flex justify-between py-2 border-b border-white/5 text-sm"><span className="text-slate-300">{s.company} • {s.domain}</span><Badge color={s.overallScore>=70?"#065f46":"#92400e"}>{s.overallScore}%</Badge></div>)}{(attempts.interviews||[]).length===0&&<p className="text-xs text-slate-500 mt-2">No interviews yet — your history will appear here.</p>}</div>
     </div>
    </div>
   </div>}

   {view==="interview"&&ivActive&&ivQueue[ivIdx]&&<div className="max-w-4xl mx-auto">
    <div className="bg-[#111a2e] border border-emerald-500/30 rounded-3xl overflow-hidden">
     <div className="bg-[#0e1628] px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10">
      <div className="flex items-center gap-2 text-sm"><span className="w-2.5 h-2.5 rounded-full bg-red-500" style={{animation:"pulse-dot 1s infinite"}}/><b className="text-white">LIVE</b><span className="text-slate-400">{ivSetup.company} • {ivSetup.domain}</span></div>
      <div className="flex items-center gap-3 text-sm"><span className="text-slate-300">Q {ivIdx+1}/{ivQueue.length}</span><span className="font-mono bg-white/10 px-2.5 py-1 rounded-lg text-white"><Timer size={13} className="inline mr-1"/>{Math.floor(ivSeconds/60)}:{String(ivSeconds%60).padStart(2,"0")}</span></div>
     </div>
     <div className="h-1.5 bg-slate-800"><div className="h-full bg-emerald-500 transition-all" style={{width:`${(ivIdx)/ivQueue.length*100}%`}}/></div>
     <div className="p-5 md:p-6">
      <div className="flex gap-4">
       <div className="shrink-0 text-center"><div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500/15 border-2 ${speaking?"border-emerald-400":"border-white/15"} flex items-center justify-center text-3xl`}>🤖</div><div className="text-[10px] text-slate-400 mt-1.5 font-bold">ACE AI<br/>Interviewer</div>
       {speaking&&<div className="flex items-end justify-center gap-0.5 h-5 mt-1">{[0.2,0.6,0.1,0.8,0.4].map((d,i)=><div key={i} className="w-1 bg-emerald-400 rounded eq-bar" style={{animationDelay:`${d}s`}}/>)}</div>}</div>
       <div className="flex-1 min-w-0">
        <div className="flex gap-2 flex-wrap"><Badge color="#065f46">{ivQueue[ivIdx].type}</Badge><Badge color="#334155">{ivQueue[ivIdx].difficulty}</Badge><Badge color="#1e3a5f">{ivQueue[ivIdx].company}</Badge></div>
        <h2 className="text-lg md:text-xl font-bold text-white mt-2 leading-relaxed">{ivQueue[ivIdx].q}</h2>
        <button onClick={()=>speak(ivQueue[ivIdx].q)} className="mt-2 text-xs flex items-center gap-1.5 text-emerald-400 font-bold hover:text-emerald-300"><Volume2 size={14}/>Listen to question again</button>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2 mt-3 text-xs text-amber-200 flex gap-2"><Lightbulb size={14} className="shrink-0 mt-0.5"/><span><b>Interviewer listens for:</b> {ivQueue[ivIdx].keywords.join(", ")} — use these naturally. Aim 40+ words with an example.</span></div>
       </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-5 text-center">
       {(()=>{const s=scoreAnswer(transcript,ivQueue[ivIdx].keywords); const wpm=ivSeconds>5?Math.round(s.wordCount/(ivSeconds/60)):0; return <>
        <div className="bg-[#0b1120] rounded-xl py-2.5"><div className="font-black text-emerald-400">{s.wordCount}</div><div className="text-[10px] text-slate-500">Words</div></div>
        <div className="bg-[#0b1120] rounded-xl py-2.5"><div className="font-black text-sky-400">{s.matched.length}/{ivQueue[ivIdx].keywords.length}</div><div className="text-[10px] text-slate-500">Keywords Hit</div></div>
        <div className="bg-[#0b1120] rounded-xl py-2.5"><div className="font-black text-amber-400">{s.fillerCount}</div><div className="text-[10px] text-slate-500">Fillers (um/like)</div></div>
        <div className="bg-[#0b1120] rounded-xl py-2.5"><div className="font-black text-violet-400">{wpm||"—"}</div><div className="text-[10px] text-slate-500">WPM (ideal 120–150)</div></div></>})()}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
       <button onClick={toggleListen} className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 ${listening?"bg-red-600 text-white":"bg-emerald-500 text-slate-950"}`}>{listening?<><MicOff size={16}/>Stop Listening</>:<><Mic size={16}/>Speak Answer</>}</button>
       <button onClick={toggleRecord} className={`px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 ${recording?"bg-red-500/20 text-red-300 border border-red-500/50":"bg-white/10"}`}>{recording?<Square size={14}/>:<Play size={14}/>}{recording?"Stop Recording":"Record Audio"}</button>
       {audioUrl&&<audio src={audioUrl} controls className="h-11 max-w-[220px]"/>}
       {listening&&<span className="flex items-end gap-1 h-11 pb-2">{[0.1,0.5,0.9,0.3,0.7,0.2].map((d,i)=><span key={i} className="w-1.5 bg-red-400 rounded eq-bar" style={{animationDelay:`${d}s`}}/>) }<span className="text-xs text-red-300 ml-1 font-bold">Listening… speak now</span></span>}
      </div>
      <textarea value={transcript} onChange={e=>setTranscript(e.target.value)} rows={5} placeholder="🎙️ Your spoken answer appears here in real time… or type/paste your answer. Example: 'In my project…' — mention keywords & examples for higher score." className="w-full mt-3 bg-[#0b1120] border border-white/15 rounded-2xl p-4 text-sm leading-relaxed text-slate-100"/>
      <div className="flex flex-wrap justify-between gap-2 mt-4">
       <button onClick={()=>{if(confirm("End interview now? You'll get a report for answered questions.")){ ivAnswers.length?finishInterview(ivAnswers):(setIvActive(false),setIvQueue([])); }}} className="px-4 py-2.5 bg-red-500/15 text-red-300 border border-red-500/40 rounded-xl text-sm font-bold">End Interview</button>
       <button onClick={nextQuestion} className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-extrabold text-sm flex items-center gap-2">{ivIdx+1>=ivQueue.length?"Finish & Get SWOC Report 🏆":"Submit Answer → Next Question"}</button>
      </div>
     </div>
    </div>
   </div>}

   {view==="interview"&&ivReport&&<div className="max-w-4xl mx-auto">
    <div className="bg-[#111a2e] border border-emerald-500/40 rounded-3xl p-6 text-center">
     <div className="text-5xl">🎓</div><h2 className="text-2xl font-extrabold text-white mt-2">Interview Report — {ivReport.company}</h2><p className="text-slate-400 text-sm">{ivReport.domain} • {ivReport.answers.length} questions answered</p>
     <div className="relative w-36 h-36 mx-auto mt-4"><svg viewBox="0 0 120 120" className="w-full h-full -rotate-90"><circle cx="60" cy="60" r="52" fill="none" stroke="#1e293b" strokeWidth="10"/><circle cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${ivReport.overall/100*327} 327`}/></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-black text-white">{ivReport.overall}%</span><span className="text-[10px] text-slate-400 font-bold">OVERALL</span></div></div>
     <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-lg mx-auto text-left mt-4">
      <Bar label="🎯 Keyword / Technical Accuracy" val={ivReport.keyword} color="#10b981"/><Bar label="🗣️ Fluency (fillers)" val={ivReport.fluency} color="#0ea5e9"/>
      <Bar label="💪 Confidence" val={ivReport.confidence} color="#8b5cf6"/><Bar label={`⚡ Pace — ${ivReport.wpm} WPM`} val={Math.min(100,Math.round(ivReport.wpm/1.5))} color="#f59e0b"/>
     </div>
     <div className="flex gap-2 justify-center mt-5 flex-wrap"><button onClick={()=>{setIvReport(null); startInterview();}} className="px-4 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold flex items-center gap-1.5"><RotateCcw size={14}/>Practice Again</button><button onClick={()=>{setIvReport(null);}} className="px-4 py-2.5 bg-white/10 rounded-xl text-sm font-bold">New Setup</button><button onClick={()=>setView("dashboard")} className="px-4 py-2.5 bg-sky-600 rounded-xl text-sm font-bold">Dashboard</button></div>
    </div>
    <h3 className="font-extrabold text-white text-lg mt-6 mb-3 flex items-center gap-2"><PieChart className="text-violet-400"/>Your SWOC Analysis (from this interview)</h3>
    <div className="grid sm:grid-cols-2 gap-3">
     <SWOCBox title="Strengths" color="#10b981" icon={ThumbsUp} items={ivReport.swoc.strengths}/><SWOCBox title="Weaknesses" color="#f59e0b" icon={AlertTriangle} items={ivReport.swoc.weaknesses}/>
     <SWOCBox title="Opportunities" color="#0ea5e9" icon={Rocket} items={ivReport.swoc.opportunities}/><SWOCBox title="Challenges" color="#ef4444" icon={Shield} items={ivReport.swoc.challenges}/>
    </div>
    <h3 className="font-extrabold text-white text-lg mt-6 mb-3">📝 Question-by-Question Breakdown</h3>
    <div className="space-y-3">{ivReport.answers.map((a:any,i:number)=><div key={i} className="bg-[#111a2e] border border-white/10 rounded-2xl p-4">
     <div className="flex justify-between gap-2"><b className="text-white text-sm">Q{i+1}. {a.question}</b><Badge color={a.overall>=70?"#065f46":"#92400e"}>{a.overall}%</Badge></div>
     <p className="text-[13px] text-slate-300 bg-[#0b1120] rounded-xl p-3 mt-2 italic">"{a.answer||"(No answer given)"}"</p>
     <div className="flex flex-wrap gap-1.5 mt-2">{a.matched.map((k:string)=><span key={k} className="text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">✓ {k}</span>)}{a.missed.map((k:string)=><span key={k} className="text-[11px] bg-red-500/10 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full">✗ missed: {k}</span>)}</div>
     <div className="text-xs text-slate-400 mt-2">Fillers: {a.fillerCount} • Words: {a.wordCount} • Fluency: {a.fluency}%</div>
     <details className="mt-2"><summary className="text-xs text-sky-400 font-bold cursor-pointer">View model answer</summary><p className="text-[13px] text-slate-300 bg-sky-500/5 border border-sky-500/20 rounded-xl p-3 mt-1.5">{a.sample}</p></details>
    </div>)}</div>
   </div>}

   {/* ===== COMPANIES ===== */}
   {view==="companies"&&!selCompany&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Building2 className="text-amber-400"/>Company Interview Vault</h1>
    <p className="text-slate-400 text-sm mt-1">{COMPANIES.length} companies • Eligibility, salary, rounds, skills required & real questions</p>
    <div className="flex flex-col sm:flex-row gap-2 mt-4"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-3 text-slate-500"/><input value={compSearch} onChange={e=>setCompSearch(e.target.value)} placeholder="Search TCS, HCL, Amazon, Bosch…" className="w-full bg-[#111a2e] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-sm"/></div>
    <select value={compSector} onChange={e=>setCompSector(e.target.value)} className="bg-[#111a2e] border border-white/15 rounded-xl px-3 py-2.5 text-sm"><option>All</option>{[...new Set(COMPANIES.map(c=>c.type))].map(t=><option key={t}>{t}</option>)}</select></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">{COMPANIES.filter(c=>(compSector==="All"||c.type===compSector)&&c.name.toLowerCase().includes(compSearch.toLowerCase())).map(c=><div key={c.id} className="bg-[#111a2e] border border-white/10 rounded-2xl p-4 hover:border-amber-500/50 transition">
     <div className="flex items-center gap-3"><span className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg shrink-0" style={{background:c.color}}>{c.logo}</span><div className="min-w-0"><div className="font-bold text-white truncate">{c.name}</div><div className="text-[11px] text-slate-500">{c.sector} • {c.hq}</div></div><Badge color={c.difficulty.includes("Hard")?"#991b1b":c.difficulty.includes("Medium")?"#92400e":"#065f46"}>{c.difficulty}</Badge></div>
     <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 min-h-[32px]">{c.about}</p>
     <div className="space-y-1 text-xs mt-2"><div className="flex justify-between"><span className="text-slate-400 flex items-center gap-1"><IndianRupee size={11}/>Package</span><b className="text-emerald-400 text-right">{c.salary}</b></div><div className="flex justify-between"><span className="text-slate-400">Criteria</span><span className="text-slate-200 text-right">{c.cgpa}</span></div><div className="flex justify-between"><span className="text-slate-400">Roles</span><span className="text-slate-200 text-right truncate ml-3">{c.roles[0]}</span></div></div>
     <div className="flex gap-2 mt-3.5"><button onClick={()=>setSelCompany(c)} className="flex-1 py-2 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/15">View Requirements</button><button onClick={()=>startInterview({company:c.name})} className="flex-1 py-2 bg-emerald-500 text-slate-950 rounded-lg text-xs font-bold">🎙️ Mock Interview</button></div>
    </div>)}</div>
   </div>}

   {view==="companies"&&selCompany&&<div>
    <button onClick={()=>setSelCompany(null)} className="text-sm text-sky-400 font-bold mb-3">← All Companies</button>
    <div className="bg-[#111a2e] border border-white/10 rounded-3xl p-6">
     <div className="flex flex-wrap items-start justify-between gap-4"><div className="flex gap-4"><span className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-2xl shrink-0" style={{background:selCompany.color}}>{selCompany.logo}</span><div><h1 className="text-2xl font-extrabold text-white">{selCompany.name}</h1><p className="text-slate-400 text-sm">{selCompany.sector} • {selCompany.type} • HQ: {selCompany.hq} • {selCompany.employees} employees</p><div className="flex gap-2 mt-2 flex-wrap"><Badge color="#065f46">{selCompany.hiring}</Badge><Badge color="#334155">{selCompany.difficulty}</Badge><Badge color="#7c2d12">Bond: {selCompany.bond}</Badge></div></div></div>
     <button onClick={()=>startInterview({company:selCompany.name})} className="px-5 py-3 bg-emerald-500 text-slate-950 font-extrabold rounded-xl text-sm flex items-center gap-2"><Mic size={16}/>Start {selCompany.name} Mock</button></div>
     <p className="text-slate-300 text-sm leading-relaxed mt-4">{selCompany.about}</p>
     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
      <div className="bg-[#0b1120] rounded-xl p-3"><div className="text-[11px] text-slate-500">💰 Package</div><div className="font-bold text-emerald-400 text-sm mt-0.5">{selCompany.salary}</div></div>
      <div className="bg-[#0b1120] rounded-xl p-3"><div className="text-[11px] text-slate-500">🎓 Intern Stipend</div><div className="font-bold text-white text-sm mt-0.5">{selCompany.stipend}</div></div>
      <div className="bg-[#0b1120] rounded-xl p-3"><div className="text-[11px] text-slate-500">📊 CGPA Criteria</div><div className="font-bold text-white text-sm mt-0.5">{selCompany.cgpa}</div></div>
      <div className="bg-[#0b1120] rounded-xl p-3"><div className="text-[11px] text-slate-500">📍 Locations</div><div className="font-bold text-white text-sm mt-0.5">{selCompany.locations.join(", ")}</div></div>
     </div>
     <div className="grid md:grid-cols-2 gap-4 mt-5">
      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-4"><h3 className="font-bold text-white text-sm">✅ Eligibility Requirements</h3><ul className="mt-2 space-y-1.5">{selCompany.eligibility.map((e,i)=><li key={i} className="text-[13px] text-slate-300 flex gap-2"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5"/>{e}</li>)}<li className="text-[13px] text-slate-300 flex gap-2"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5"/>Backlogs: {selCompany.backlogs}</li></ul>
      <h3 className="font-bold text-white text-sm mt-4">💼 Roles Hiring</h3><div className="flex flex-wrap gap-1.5 mt-2">{selCompany.roles.map(r=><Badge key={r} color="#1e3a5f">{r}</Badge>)}</div></div>
      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-4"><h3 className="font-bold text-white text-sm">🛠️ Skills Required</h3><div className="flex flex-wrap gap-1.5 mt-2">{selCompany.skillsRequired.map(s=><span key={s} className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">{s}</span>)}</div>
      <h3 className="font-bold text-white text-sm mt-4">🔄 Selection Rounds</h3><div className="mt-2 space-y-2">{selCompany.rounds.map((r,i)=><div key={i} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-black flex items-center justify-center shrink-0">{i+1}</span><div><div className="text-[13px] font-bold text-white">{r.name} <span className="text-slate-500 font-normal">• {r.duration}</span></div><div className="text-xs text-slate-400">{r.desc}</div></div></div>)}</div></div>
     </div>
    </div>
    <h3 className="font-extrabold text-white text-lg mt-6 mb-3">❓ Frequently Asked at {selCompany.name} ({selCompany.questions.length})</h3>
    <div className="space-y-2.5">{selCompany.questions.map((q,i)=>{const key=selCompany.id+i; return <div key={key} className="bg-[#111a2e] border border-white/10 rounded-2xl p-4">
     <div className="flex justify-between gap-2"><button onClick={()=>setOpenQ(openQ===key?null:key)} className="text-left font-semibold text-white text-sm flex-1">{i+1}. {q.q}</button><div className="flex gap-1.5 shrink-0"><Badge color="#334155">{q.type}</Badge><button onClick={()=>bookmark(q.q,selCompany.sector,selCompany.name)} className="text-amber-400"><Bookmark size={16}/></button></div></div>
     {openQ===key&&<div className="mt-3"><div className="flex flex-wrap gap-1.5">{q.keywords.map(k=><span key={k} className="text-[11px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">keyword: {k}</span>)}</div><p className="text-[13px] text-slate-300 bg-[#0b1120] rounded-xl p-3 mt-2">💡 <b>How to answer:</b> {q.answer}</p><button onClick={()=>startInterview({company:selCompany.name})} className="mt-2 text-xs font-bold text-emerald-400">🎙️ Practise this in voice mock →</button></div>}
    </div>})}</div>
   </div>}

   {/* ===== DOMAINS ===== */}
   {view==="domains"&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Library className="text-teal-400"/>Domains & Branches</h1>
    <p className="text-slate-400 text-sm mt-1">Branch-wise career tracks with roadmaps, skills & salary insights</p>
    {BRANCHES.map(branch=><div key={branch} className="mt-6"><h2 className="font-bold text-white flex items-center gap-2"><GraduationCap size={17} className="text-emerald-400"/>{branch}</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">{DOMAINS.filter(d=>d.branch===branch).map(d=><button key={d.id} onClick={()=>{setSelDomain(d); setView("learn");}} className="text-left bg-[#111a2e] border border-white/10 rounded-2xl p-4 hover:border-emerald-500/60 transition"><div className="text-3xl">{d.icon}</div><div className="font-bold text-white mt-1">{d.name}</div><p className="text-xs text-slate-400 mt-1 line-clamp-2">{d.description}</p><div className="flex flex-wrap gap-1.5 mt-2.5">{d.skills.slice(0,4).map(s=><span key={s} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300">{s}</span>)}</div><div className="mt-3"><Bar label="Market Demand" val={d.demand} color={d.color}/></div><div className="flex justify-between text-xs mt-2"><span className="text-slate-400">{d.roles[0]}</span><b className="text-emerald-400">{d.avgSalary}</b></div><div className="text-xs text-sky-400 font-bold mt-2">View Roadmap →</div></button>)}</div></div>)}
   </div>}

   {/* ===== LEARN ===== */}
   {view==="learn"&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><BookOpen className="text-emerald-400"/>Self-Learning Hub</h1>
    <p className="text-slate-400 text-sm mt-1">Pick a domain → follow the roadmap → tick topics → test yourself → face the AI interviewer</p>
    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">{DOMAINS.map(d=><button key={d.id} onClick={()=>setSelDomain(d)} className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ${selDomain?.id===d.id?"bg-emerald-500 text-slate-950":"bg-white/10 text-slate-300"}`}>{d.icon} {d.name}</button>)}</div>
    {selDomain&&<div className="grid lg:grid-cols-3 gap-4 mt-3">
     <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5"><div className="text-4xl">{selDomain.icon}</div><h2 className="text-xl font-extrabold text-white mt-1">{selDomain.name}</h2><p className="text-sm text-slate-400 mt-1">{selDomain.description}</p>
      <div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span className="text-slate-400">Branch</span><b className="text-white text-right">{selDomain.branch}</b></div><div className="flex justify-between"><span className="text-slate-400">Avg Salary</span><b className="text-emerald-400">{selDomain.avgSalary}</b></div><div className="flex justify-between"><span className="text-slate-400">Demand</span><b className="text-white">{selDomain.demand}%</b></div></div>
      <h3 className="font-bold text-white text-sm mt-4">Roles you can target</h3><div className="flex flex-wrap gap-1.5 mt-1.5">{selDomain.roles.map((r:string)=><Badge key={r} color="#065f46">{r}</Badge>)}</div>
      <div className="flex flex-col gap-2 mt-5"><button onClick={()=>{const t=TESTS.find(t=>t.domain===selDomain.name); t?startTest(t):notify("Take the Grand Aptitude test — common for this track!");}} className="py-2.5 bg-sky-600 rounded-xl text-sm font-bold">📝 Take {selDomain.name} Test</button><button onClick={()=>startInterview({domain:selDomain.name})} className="py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold">🎙️ {selDomain.name} Mock Interview</button></div></div>
     <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5"><h3 className="font-bold text-white">🗺️ Learning Roadmap</h3><div className="mt-3 space-y-0">{selDomain.roadmap.map((r:string,i:number)=>{const key=selDomain.id+"-r"+i; return <div key={key} className="flex gap-3"><div className="flex flex-col items-center"><button onClick={()=>setLearnChecks({...learnChecks,[key]:!learnChecks[key]})} className={`w-7 h-7 rounded-full font-black text-xs shrink-0 ${learnChecks[key]?"bg-emerald-500 text-slate-950":"bg-white/10 text-white border border-white/20"}`}>{learnChecks[key]?"✓":i+1}</button>{i<selDomain.roadmap.length-1&&<div className="w-0.5 h-6 bg-white/15"/>}</div><div className={`text-sm pt-1 ${learnChecks[key]?"text-slate-500 line-through":"text-slate-200"}`}>{r}</div></div>})}</div>
      <div className="mt-3"><Bar label="Roadmap Progress" val={Math.round(selDomain.roadmap.filter((_:string,i:number)=>learnChecks[selDomain.id+"-r"+i]).length/selDomain.roadmap.length*100)} color="#10b981"/></div></div>
     <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-5"><h3 className="font-bold text-white">🔑 Must-Know Interview Topics</h3><div className="mt-3 space-y-2">{selDomain.topics.map((t:string)=><div key={t} className="flex items-center gap-2 text-sm text-slate-200 bg-[#0b1120] rounded-xl px-3 py-2.5"><Zap size={13} className="text-amber-400 shrink-0"/>{t}</div>)}</div>
      <h3 className="font-bold text-white mt-4">Skills to build</h3><div className="flex flex-wrap gap-1.5 mt-2">{selDomain.skills.map((s:string)=><span key={s} className="text-xs bg-violet-500/10 text-violet-300 border border-violet-500/30 px-2.5 py-1 rounded-full">{s}</span>)}</div></div>
    </div>}
   </div>}

   {/* ===== QUESTIONS ===== */}
   {view==="questions"&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><MessageSquare className="text-pink-400"/>Question Bank</h1>
    <p className="text-slate-400 text-sm mt-1">{allQuestions.length}+ interview questions with keywords, model answers & tips — HR, Technical, Company-specific</p>
    <div className="flex flex-col sm:flex-row gap-2 mt-4"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-3 text-slate-500"/><input value={qSearch} onChange={e=>setQSearch(e.target.value)} placeholder="Search questions or companies…" className="w-full bg-[#111a2e] border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-sm"/></div>
    <select value={qDomain} onChange={e=>setQDomain(e.target.value)} className="bg-[#111a2e] border border-white/15 rounded-xl px-3 py-2.5 text-sm max-w-full"><option>All</option><option>HR</option><option>Technical</option>{DOMAINS.map(d=><option key={d.id}>{d.name}</option>)}{COMPANIES.map(c=><option key={c.id}>{c.name}</option>)}</select></div>
    <div className="text-xs text-slate-500 mt-2">Showing {filteredQs.length} questions</div>
    <div className="space-y-2.5 mt-3">{filteredQs.slice(0,60).map((q,i)=>{const key="qb"+i+q.q.slice(0,10); return <div key={key} className="bg-[#111a2e] border border-white/10 rounded-2xl p-4">
     <div className="flex justify-between gap-2"><button onClick={()=>setOpenQ(openQ===key?null:key)} className="text-left font-semibold text-white text-sm flex-1">{q.q}</button><div className="flex gap-1.5 shrink-0 items-start"><Badge color="#1e3a5f">{q.company}</Badge><Badge color={q.difficulty==="Hard"?"#991b1b":q.difficulty==="Medium"?"#92400e":"#065f46"}>{q.difficulty}</Badge><button onClick={()=>bookmark(q.q,q.domain,q.company)} className="text-amber-400"><Bookmark size={16}/></button></div></div>
     {openQ===key&&<div className="mt-3 space-y-2"><div className="flex flex-wrap gap-1.5">{q.keywords.map(k=><span key={k} className="text-[11px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">🔑 {k}</span>)}</div><p className="text-[13px] text-slate-300 bg-[#0b1120] rounded-xl p-3"><b className="text-sky-300">Model answer:</b> {q.sample}</p><p className="text-xs text-amber-300">💡 Tip: {q.tips}</p>
     <button onClick={()=>{setIvSetup(s=>({...s,domain:DOMAINS.some(d=>d.name===q.domain)?q.domain:s.domain,company:COMPANIES.some(c=>c.name===q.company)?q.company:s.company})); startInterview({company:COMPANIES.some(c=>c.name===q.company)?q.company:ivSetup.company});}} className="text-xs font-bold text-emerald-400">🎙️ Practise in voice mock →</button></div>}
    </div>})}</div>
   </div>}

   {/* ===== RESUME BUILDER ===== */}
   {view==="resume"&&<div className="resume-page">
    <div className="flex flex-wrap items-end justify-between gap-3 no-print"><div><h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><FileText className="text-cyan-400"/>AI Resume Builder</h1><p className="text-slate-400 text-sm mt-1">Build an ATS-friendly internship resume • Live preview • Smart suggestions • Save & export as PDF</p></div>
    <div className="flex gap-2"><button onClick={()=>calculateAtsNow()} className="px-4 py-2.5 bg-white/10 rounded-xl text-sm font-bold">⚡ Check ATS</button><button onClick={saveResume} disabled={resumeSaving} className="px-4 py-2.5 bg-sky-600 rounded-xl text-sm font-bold disabled:opacity-50">{resumeSaving?"Saving…":"💾 Save"}</button><button onClick={printResume} className="px-4 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold">⬇ Export PDF</button></div></div>
    <div className="grid lg:grid-cols-[430px_1fr] gap-4 mt-5">
     <div className="no-print min-w-0">
      <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-4">
       <div className="flex justify-between text-xs mb-1.5"><b className="text-white">ATS Readiness</b><b className={atsScore>=75?"text-emerald-400":atsScore>=50?"text-amber-400":"text-red-400"}>{atsScore}/100 • {atsScore>=75?"Strong":atsScore>=50?"Needs Polish":"Incomplete"}</b></div><Bar label="" val={atsScore} color={atsScore>=75?"#10b981":atsScore>=50?"#f59e0b":"#ef4444"}/>
       <div className="grid grid-cols-3 gap-2 mt-3">{(["modern","classic","compact"] as const).map(t=><button key={t} onClick={()=>setResumeTemplate(t)} className={`rounded-xl border p-2 text-xs capitalize font-bold ${resumeTemplate===t?"border-cyan-400 bg-cyan-500/15 text-cyan-300":"border-white/10 bg-[#0b1120] text-slate-400"}`}><span className="block text-lg">{t==="modern"?"▥":t==="classic"?"▤":"▦"}</span>{t}</button>)}</div>
      </div>
      <div className="flex gap-1.5 overflow-x-auto py-3">{["Profile","Summary","Education","Experience","Projects","Skills","More"].map(s=><button key={s} onClick={()=>setResumeSection(s)} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${resumeSection===s?"bg-cyan-500 text-slate-950":"bg-white/10 text-slate-300"}`}>{s}</button>)}</div>
      <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-4 space-y-3">
       {resumeSection==="Profile"&&<><h3 className="font-bold text-white">Personal Information</h3><div className="grid grid-cols-2 gap-2"><input value={resume.name} onChange={e=>updateResume("name",e.target.value)} placeholder="Full name *" className="col-span-2 resume-input"/><input value={resume.headline} onChange={e=>updateResume("headline",e.target.value)} placeholder="Target role / headline" className="col-span-2 resume-input"/><input value={resume.email} onChange={e=>updateResume("email",e.target.value)} placeholder="Email *" className="resume-input"/><input value={resume.phone} onChange={e=>updateResume("phone",e.target.value)} placeholder="Phone *" className="resume-input"/><input value={resume.location} onChange={e=>updateResume("location",e.target.value)} placeholder="City, State" className="col-span-2 resume-input"/><input value={resume.linkedin} onChange={e=>updateResume("linkedin",e.target.value)} placeholder="LinkedIn URL" className="col-span-2 resume-input"/><input value={resume.github} onChange={e=>updateResume("github",e.target.value)} placeholder="GitHub URL" className="resume-input"/><input value={resume.portfolio} onChange={e=>updateResume("portfolio",e.target.value)} placeholder="Portfolio URL" className="resume-input"/></div></>}
       {resumeSection==="Summary"&&<><div className="flex justify-between items-center"><h3 className="font-bold text-white">Professional Summary</h3><button onClick={improveSummary} className="text-xs text-cyan-400 font-bold">✨ AI Improve</button></div><textarea rows={7} value={resume.summary} onChange={e=>updateResume("summary",e.target.value)} placeholder="Write 3–4 lines: who you are, strongest skills, project proof, and internship goal…" className="resume-input resize-none"/><div className="text-[11px] text-slate-500">{resume.summary.trim().split(/\s+/).filter(Boolean).length} words • Ideal: 35–65 words • Avoid “I/me” and generic objectives.</div></>}
       {resumeSection==="Education"&&<><h3 className="font-bold text-white">Education</h3>{resume.education.map((e,i)=><div key={i} className="bg-[#0b1120] border border-white/10 rounded-xl p-3 grid grid-cols-2 gap-2"><input value={e.degree} onChange={x=>updateResumeItem("education",i,"degree",x.target.value)} placeholder="Degree / HSC *" className="col-span-2 resume-input"/><input value={e.institute} onChange={x=>updateResumeItem("education",i,"institute",x.target.value)} placeholder="College / School *" className="col-span-2 resume-input"/><input value={e.year} onChange={x=>updateResumeItem("education",i,"year",x.target.value)} placeholder="2023–2027" className="resume-input"/><input value={e.score} onChange={x=>updateResumeItem("education",i,"score",x.target.value)} placeholder="CGPA / Percentage" className="resume-input"/><button onClick={()=>updateResume("education",resume.education.filter((_,n)=>n!==i))} className="col-span-2 text-xs text-red-400 text-right">Remove entry</button></div>)}<button onClick={()=>updateResume("education",[...resume.education,{degree:"",institute:"",year:"",score:""}])} className="w-full py-2 border border-dashed border-white/20 rounded-xl text-xs font-bold text-cyan-400">+ Add Education</button></>}
       {resumeSection==="Experience"&&<><div><h3 className="font-bold text-white">Experience / Internship</h3><p className="text-[11px] text-slate-500">No experience? Add volunteering, freelancing, club leadership or skip this section.</p></div>{resume.experience.map((e,i)=><div key={i} className="bg-[#0b1120] border border-white/10 rounded-xl p-3 grid grid-cols-2 gap-2"><input value={e.role} onChange={x=>updateResumeItem("experience",i,"role",x.target.value)} placeholder="Role" className="resume-input"/><input value={e.company} onChange={x=>updateResumeItem("experience",i,"company",x.target.value)} placeholder="Organisation" className="resume-input"/><input value={e.period} onChange={x=>updateResumeItem("experience",i,"period",x.target.value)} placeholder="Jun–Aug 2025" className="col-span-2 resume-input"/><textarea value={e.description} onChange={x=>updateResumeItem("experience",i,"description",x.target.value)} placeholder="Start with action verbs. Add numbers and impact…" rows={3} className="col-span-2 resume-input"/><button onClick={()=>updateResume("experience",resume.experience.filter((_,n)=>n!==i))} className="col-span-2 text-xs text-red-400 text-right">Remove entry</button></div>)}<button onClick={()=>updateResume("experience",[...resume.experience,{role:"",company:"",period:"",description:""}])} className="w-full py-2 border border-dashed border-white/20 rounded-xl text-xs font-bold text-cyan-400">+ Add Experience</button></>}
       {resumeSection==="Projects"&&<><div><h3 className="font-bold text-white">Projects</h3><p className="text-[11px] text-slate-500">For freshers, 2–3 deployed projects with numbers are your strongest proof.</p></div>{resume.projects.map((p,i)=><div key={i} className="bg-[#0b1120] border border-white/10 rounded-xl p-3 grid grid-cols-2 gap-2"><input value={p.name} onChange={x=>updateResumeItem("projects",i,"name",x.target.value)} placeholder="Project name *" className="resume-input"/><input value={p.tech} onChange={x=>updateResumeItem("projects",i,"tech",x.target.value)} placeholder="React, Node, PostgreSQL" className="resume-input"/><input value={p.link} onChange={x=>updateResumeItem("projects",i,"link",x.target.value)} placeholder="Live / GitHub URL" className="col-span-2 resume-input"/><textarea value={p.description} onChange={x=>updateResumeItem("projects",i,"description",x.target.value)} placeholder="Built [what] using [tech], achieving [measurable result]. Example: reduced load time by 35%." rows={3} className="col-span-2 resume-input"/><button onClick={()=>updateResume("projects",resume.projects.filter((_,n)=>n!==i))} className="col-span-2 text-xs text-red-400 text-right">Remove project</button></div>)}<button onClick={()=>updateResume("projects",[...resume.projects,{name:"",tech:"",link:"",description:""}])} className="w-full py-2 border border-dashed border-white/20 rounded-xl text-xs font-bold text-cyan-400">+ Add Project</button></>}
       {resumeSection==="Skills"&&<><h3 className="font-bold text-white">Skills & Keywords</h3><textarea rows={5} value={resume.skills} onChange={e=>updateResume("skills",e.target.value)} placeholder="JavaScript, React, Node.js, PostgreSQL, Git, REST APIs, Communication" className="resume-input"/><p className="text-[11px] text-slate-500">Separate with commas. Match the skills in the internship job description.</p><div className="flex flex-wrap gap-1.5">{(DOMAINS.find(d=>(resume.headline+user?.targetRole).toLowerCase().includes(d.name.split(" ")[0].toLowerCase()))?.skills||DOMAINS[0].skills).map(s=><button key={s} onClick={()=>!resume.skills.toLowerCase().includes(s.toLowerCase())&&updateResume("skills",resume.skills?resume.skills+", "+s:s)} className="text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-full">+ {s}</button>)}</div></>}
       {resumeSection==="More"&&<><h3 className="font-bold text-white">Achievements & Languages</h3><textarea rows={5} value={resume.achievements} onChange={e=>updateResume("achievements",e.target.value)} placeholder={"Hackathon finalist — Top 10 of 120 teams\nSolved 200+ DSA problems\nCollege Coding Club Coordinator"} className="resume-input"/><input value={resume.languages} onChange={e=>updateResume("languages",e.target.value)} placeholder="English, Hindi, Marathi" className="resume-input"/><div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200">💡 <b>ATS tip:</b> Keep resume to one page, use standard headings, avoid photos/tables, quantify results, and customise skills for each company.</div></>}
       <button onClick={()=>{calculateAtsNow();const sections=["Profile","Summary","Education","Experience","Projects","Skills","More"];setResumeSection(sections[(sections.indexOf(resumeSection)+1)%sections.length]);}} className="w-full py-2.5 bg-cyan-600 rounded-xl text-sm font-bold">Update Score & Next Section →</button>
      </div>
     </div>

     <div className="min-w-0"><div className="no-print flex items-center justify-between mb-2 text-xs text-slate-400"><span>LIVE ATS PREVIEW • A4</span><span>Tip: browser Print → Save as PDF</span></div>
      <article id="resume-document" className={`resume-document resume-${resumeTemplate}`}>
       <header className="resume-header"><h1>{resume.name||"YOUR NAME"}</h1><h2>{resume.headline||"Target Internship Role"}</h2><div className="resume-contact">{[resume.email,resume.phone,resume.location,resume.linkedin&&"LinkedIn",resume.github&&"GitHub",resume.portfolio&&"Portfolio"].filter(Boolean).map((x,i)=><span key={i}>{x}</span>)}</div></header>
       {resume.summary&&<section><h3>Professional Summary</h3><p>{resume.summary}</p></section>}
       {resume.skills&&<section><h3>Technical & Professional Skills</h3><p className="resume-skills">{resume.skills}</p></section>}
       {resume.education.some(e=>e.degree||e.institute)&&<section><h3>Education</h3>{resume.education.filter(e=>e.degree||e.institute).map((e,i)=><div className="resume-entry" key={i}><div className="resume-row"><b>{e.degree||"Degree / Qualification"}</b><b>{e.year}</b></div><div className="resume-row"><span>{e.institute}</span><span>{e.score}</span></div></div>)}</section>}
       {resume.experience.some(e=>e.role||e.company)&&<section><h3>Experience</h3>{resume.experience.filter(e=>e.role||e.company).map((e,i)=><div className="resume-entry" key={i}><div className="resume-row"><b>{e.role}</b><b>{e.period}</b></div><div className="resume-muted">{e.company}</div><p>• {e.description}</p></div>)}</section>}
       {resume.projects.some(p=>p.name||p.description)&&<section><h3>Projects</h3>{resume.projects.filter(p=>p.name||p.description).map((p,i)=><div className="resume-entry" key={i}><div className="resume-row"><b>{p.name||"Project Name"}</b><span className="resume-muted">{p.tech}</span></div><p>• {p.description||"Describe what you built, the technology used, and a measurable result."}</p>{p.link&&<small>{p.link}</small>}</div>)}</section>}
       {resume.achievements&&<section><h3>Achievements & Leadership</h3>{resume.achievements.split("\n").filter(Boolean).map((a,i)=><p key={i}>• {a}</p>)}</section>}
       {resume.languages&&<section><h3>Languages</h3><p>{resume.languages}</p></section>}
       {!resume.summary&&!resume.skills&&!resume.education.some(e=>e.degree)&&<div className="resume-placeholder"><b>Your resume preview will appear here.</b><span>Start with Profile, then complete each section. Aim for ATS score 75+.</span></div>}
      </article>
     </div>
    </div>
   </div>}

   {/* ===== SWOC ===== */}
   {view==="swoc"&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><PieChart className="text-violet-400"/>SWOC Analytics</h1>
    <p className="text-slate-400 text-sm mt-1">Auto-generated from your assessments & mock interviews — Strengths, Weaknesses, Opportunities, Challenges</p>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
     <StatCard icon={Target} label="Readiness" value={`${myStats.readiness}%`} sub="Overall placement readiness" color="#10b981"/><StatCard icon={Brain} label="Test Accuracy" value={`${myStats.avgAcc}%`} sub={`${myStats.tests} tests taken`} color="#0ea5e9"/><StatCard icon={Mic} label="Interview Avg" value={`${myStats.avgIv}%`} sub={`${myStats.interviews} mocks done`} color="#8b5cf6"/><StatCard icon={TrendingUp} label="Verdict" value={myStats.readiness>=70?"Drive Ready":myStats.readiness>=40?"Almost There":"Keep Building"} sub={myStats.readiness>=70?"Apply confidently now":"3 mocks >70% = apply"} color="#f59e0b"/>
    </div>
    <h2 className="font-extrabold text-white text-lg mt-6 mb-3">🪞 Your Personal SWOC Matrix</h2>
    <div className="grid sm:grid-cols-2 gap-3">
     <SWOCBox title="Strengths (Internal +)" color="#10b981" icon={ThumbsUp} items={personalSWOC.strengths||[]}/><SWOCBox title="Weaknesses (Internal −)" color="#f59e0b" icon={AlertTriangle} items={personalSWOC.weaknesses||[]}/>
     <SWOCBox title="Opportunities (External +)" color="#0ea5e9" icon={Rocket} items={personalSWOC.opportunities||[]}/><SWOCBox title="Challenges (External −)" color="#ef4444" icon={Shield} items={personalSWOC.challenges||[]}/>
    </div>
    <div className="bg-[#111a2e] border border-emerald-500/30 rounded-2xl p-5 mt-4"><h3 className="font-bold text-white flex items-center gap-2"><Sparkles size={16} className="text-emerald-400"/>Your 7-Day Improvement Plan</h3>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-3 text-[13px]">{["Day 1–2: Revise missed keywords from Question Bank","Day 3: 2 timed aptitude tests (aim >70%)","Day 4–5: Voice mocks — record & listen for fillers","Day 6: Company-specific mock ("+(user?.targetCompany||"TCS")+")","Day 7: Full SWOC review + HR STAR answers","Daily: 1 topic from your domain roadmap","Speak 60-sec answers aloud — every day","Update resume with project metrics"].map((s,i)=><div key={i} className="bg-[#0b1120] rounded-xl px-3 py-2.5 text-slate-300">✅ {s}</div>)}</div>
    <div className="flex gap-2 mt-4 flex-wrap"><button onClick={()=>startInterview()} className="px-4 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold">🎙️ Start Improving Now</button><button onClick={()=>setView("learn")} className="px-4 py-2.5 bg-white/10 rounded-xl text-sm font-bold">Open Roadmap</button></div></div>

    <h2 className="font-extrabold text-white text-lg mt-8 mb-3">🏛️ Platform SWOC — InterviewAce Itself</h2>
    <div className="grid sm:grid-cols-2 gap-3">
     <SWOCBox title="Strengths" color="#10b981" icon={Award} items={["Cost-effective browser-based speech (MediaRecorder + Web Speech API) — zero API cost","Real-time multi-modal feedback: STT + NLP keyword scoring + filler/WPM analysis","Built specifically for HSC & undergraduate internship seekers"]}/>
     <SWOCBox title="Weaknesses" color="#f59e0b" icon={AlertTriangle} items={["Web Speech API accuracy varies with accent & background noise","Rule-based scoring needs continuous keyword mapping per new domain","Voice features work best in Chrome/Edge"]}/>
     <SWOCBox title="Opportunities" color="#0ea5e9" icon={Globe} items={["College placement-cell partnerships for bulk drives","Future: body-language analysis, resume parsing, soft-skills modules","EdTech & training-institute integrations"]}/>
     <SWOCBox title="Challenges" color="#ef4444" icon={Shield} items={["Rapidly evolving GenAI competition","Keeping 20+ company question banks updated every season","Reaching students in low-connectivity regions"]}/>
    </div>
   </div>}

   {/* ===== LEADERBOARD ===== */}
   {view==="leaderboard"&&<div>
    <h1 className="text-2xl font-extrabold text-white flex items-center gap-2"><Crown className="text-amber-400"/>Leaderboard</h1>
    <p className="text-slate-400 text-sm mt-1">Top performers across InterviewAce • Platform: {attempts.platform?.totalAttempts||0} tests + {attempts.platform?.totalInterviews||0} interviews taken</p>
    <div className="bg-[#111a2e] border border-white/10 rounded-2xl mt-5 overflow-hidden">
     {(attempts.leaderboard||[]).length===0&&<div className="p-8 text-center text-slate-400 text-sm">No scores yet — take a test or mock interview and claim Rank #1! 👑<div className="mt-3"><button onClick={()=>setView("tests")} className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold text-sm">Take First Test</button></div></div>}
     {(attempts.leaderboard||[]).map((l:any,i:number)=><div key={i} className={`flex items-center gap-3 px-5 py-3.5 border-b border-white/5 ${l.name===user?.name?"bg-emerald-500/10":""}`}>
      <span className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${i===0?"bg-amber-400 text-slate-950":i===1?"bg-slate-300 text-slate-900":i===2?"bg-amber-700 text-white":"bg-white/10 text-white"}`}>{i+1}</span>
      <div className="flex-1 min-w-0"><div className="font-bold text-white text-sm truncate">{l.name} {l.name===user?.name&&<span className="text-emerald-400">(You)</span>} {i===0&&"👑"}</div><div className="text-[11px] text-slate-500">{l.tests} tests • {l.interviews} interviews</div></div>
      <div className="font-extrabold text-amber-400">{l.points} <span className="text-[10px] text-slate-500">PTS</span></div></div>)}
    </div>
    <div className="grid sm:grid-cols-3 gap-3 mt-4 text-center">{[["📝","+10 pts","per correct test answer"],["🎙️","+2 pts","per interview score point"],["🔥","Daily Streak","practise daily, rank faster"]].map(r=><div key={r[1]} className="bg-[#111a2e] border border-white/10 rounded-2xl p-4"><div className="text-2xl">{r[0]}</div><div className="font-bold text-white mt-1">{r[1]}</div><div className="text-xs text-slate-500">{r[2]}</div></div>)}</div>
   </div>}
   </div>
   <footer className="text-center text-xs text-slate-600 py-6 border-t border-white/5 mt-4">InterviewAce • AI Mock Interviews • Skill Assessment • Resume Builder • Ace AI Agent • Made for HSC & UG students 🇮🇳</footer>
  </main>

  {/* Ace AI — universal placement agent */}
  <button onClick={()=>setAgentOpen(!agentOpen)} aria-label="Open Ace AI agent" className={`no-print fixed z-[70] right-4 md:right-6 bottom-4 md:bottom-6 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all ${agentOpen?"bg-slate-700 rotate-3":"bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 hover:scale-105"}`}>
   {agentOpen?<X size={23}/>:<><Bot size={25}/><span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0b1120]" style={{animation:"pulse-dot 1.4s infinite"}}/></>}
  </button>
  {agentOpen&&<section className={`no-print fixed z-[69] bg-[#0e1628] border border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col transition-all ${agentExpanded?"inset-3 md:inset-8 rounded-3xl":"right-3 md:right-6 bottom-20 md:bottom-24 w-[calc(100vw-24px)] sm:w-[410px] h-[610px] max-h-[calc(100vh-105px)] rounded-3xl"}`}>
   <header className="px-4 py-3.5 bg-gradient-to-r from-emerald-500/15 to-cyan-500/10 border-b border-white/10 flex items-center gap-3 shrink-0">
    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 flex items-center justify-center"><Bot size={21}/></span>
    <div className="flex-1"><div className="font-extrabold text-white flex items-center gap-2">Ace AI <Badge color="#065f46">AGENT</Badge></div><div className="text-[10px] text-emerald-300 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>Online • Knows your InterviewAce progress</div></div>
    <button title="Clear conversation" onClick={clearAgent} className="p-2 text-slate-400 hover:text-red-400"><Trash2 size={16}/></button><button title="Expand" onClick={()=>setAgentExpanded(!agentExpanded)} className="p-2 text-slate-400 hover:text-white">{agentExpanded?<Minimize2 size={16}/>:<Maximize2 size={16}/>}</button>
   </header>
   <div className={`flex-1 overflow-y-auto p-3.5 space-y-3 ${agentExpanded?"md:px-[15%]":""}`}>
    {agentMessages.map((m:any,i:number)=><div key={m.id||i} className={m.role==="user"?"flex justify-end":"flex justify-start gap-2"}>
     {m.role!=="user"&&<span className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-1"><Bot size={15}/></span>}
     <div className={`max-w-[88%] ${m.role==="user"?"bg-emerald-500 text-slate-950 rounded-2xl rounded-br-sm px-3.5 py-2.5":"min-w-0"}`}>
      <div className={m.role==="user"?"text-[13px] font-medium":"bg-[#111a2e] border border-white/10 rounded-2xl rounded-tl-sm px-3.5 py-3 text-[13px] text-slate-200 whitespace-pre-line leading-relaxed"}>{m.content}</div>
      {m.metadata?.cards?.length>0&&<div className="space-y-1.5 mt-2">{m.metadata.cards.map((c:any,n:number)=><div key={n} className="bg-[#0b1120] border border-white/10 rounded-xl px-3 py-2"><div className="text-xs font-semibold text-white">{c.title}</div><div className="text-[10px] text-slate-500 mt-0.5">{c.meta}</div></div>)}</div>}
      {m.metadata?.action&&<button onClick={()=>runAgentAction(m.metadata.action)} className="mt-2 w-full py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5">{m.metadata.action.label}<ArrowRight size={13}/></button>}
      {m.metadata?.suggestions?.length>0&&<div className="flex flex-wrap gap-1.5 mt-2">{m.metadata.suggestions.slice(0,4).map((s:string)=><button key={s} onClick={()=>askAgent(s)} className="text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 hover:bg-cyan-500/20 rounded-full px-2.5 py-1.5">{s}</button>)}</div>}
     </div>
    </div>)}
    {agentBusy&&<div className="flex gap-2"><span className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center"><Bot size={15}/></span><div className="bg-[#111a2e] border border-white/10 rounded-2xl px-4 py-3 flex gap-1.5">{[0,1,2].map(x=><span key={x} className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{animationDelay:`${x*150}ms`}}/>)}</div></div>}
    <div ref={agentEndRef}/>
   </div>
   <div className={`border-t border-white/10 p-3 bg-[#0b1120] shrink-0 ${agentExpanded?"md:px-[15%]":""}`}>
    <form onSubmit={e=>{e.preventDefault();askAgent();}} className="flex gap-2 items-end"><textarea rows={1} value={agentInput} onChange={e=>setAgentInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();askAgent();}}} placeholder="Ask Ace anything about your placement…" className="flex-1 max-h-24 resize-none bg-[#111a2e] border border-white/15 rounded-xl px-3 py-2.5 text-[13px]"/><button disabled={!agentInput.trim()||agentBusy} className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center disabled:opacity-40"><Send size={17}/></button></form>
    <div className="text-[9px] text-slate-600 text-center mt-1.5">Ace AI uses your saved progress to personalise guidance • Verify company criteria before applying</div>
   </div>
  </section>}
 </div>;
}
