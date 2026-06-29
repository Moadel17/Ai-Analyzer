import NavBar from "~/Component/navbar";
import type { Route } from "./+types/home";
import "../app.css";
import { resumes } from "~/data/resume";
import ResumeCard from "~/Component/resumeCard";
import { usePuterStore } from "~/data/putter";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import bg from "../assets/images/bg-main.svg";

export default function Home() {
  // Auth Constant
  const { auth } = usePuterStore();
  const nav = useNavigate();

  // UseEffect For Check If Is Auth
  useEffect(() => {
    if (!auth.isAuthenticated) nav("/auth?next=/");
  }, [auth.isAuthenticated]);

  return (
    <main className="p-5" style={{ backgroundImage: `url(${bg})` }}>
      <NavBar />

      <section className="main-section flex justify-center text-center ">
        <div className="page-head space-y-4">
          <h1 className="font-bold text-3xl">
            Track Your Application & Resumes Rating
          </h1>
          <h2 className="font-bold text-1xl">
            Review your submissions and check AI-Powered feedback.
          </h2>
        </div>
      </section>

      <section className="resume-cards flex align-middle flex-wrap justify-center gap-10 mt-15">
        {resumes.map((ele) => (
          <ResumeCard ele={ele} />
        ))}
      </section>
    </main>
  );
}
