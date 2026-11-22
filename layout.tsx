import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = { title:"InterviewAce — AI Mock Interviews & Skill Assessment", description:"AI-powered virtual interview preparation, company question banks, skill tests and SWOC analysis for HSC & undergraduate students." };
export default function RootLayout({children}:{children:ReactNode}){ return <html lang="en"><body>{children}</body></html>; }
