import NavBar from "~/Component/navbar";
import "../app.css";
import ResumeCard from "~/Component/resumeCard";
import { usePuterStore } from "~/data/putter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import bg from "../assets/images/bg-main.svg";
import scan2 from "../assets/images/resume-scan-2.gif";

export default function Home() {
  // Auth Constant
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const nav = useNavigate();

  // UseEffect For Check If Is Auth
  useEffect(() => {
    if (!auth.isAuthenticated) nav("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="p-5" style={{ backgroundImage: `url(${bg})` }}>
      <NavBar />

      <section className="main-section flex justify-center text-center ">
        <div className="page-head space-y-4">
          <h1 className="font-bold text-3xl">
            Track Your Application & Resumes Rating
          </h1>

          {!loadingResumes && resumes.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-Powered feedback.</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src={scan2} alt="" className="w-200" />
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 mt-10">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold">
              Upload Resume
            </Link>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <section className="resume-cards flex align-middle flex-wrap justify-center gap-10 mt-15">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
