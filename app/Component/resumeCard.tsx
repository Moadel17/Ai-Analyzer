import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/data/putter";
import ScoreCircle from "~/data/scoreCircle";

export default function ResumeCard({ resume }: any) {
  const { fs } = usePuterStore();
  const [resumeURL, setResumeURL] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;

      let Url = URL.createObjectURL(blob);
      setResumeURL(Url);
    };

    loadResume();
  }, [resume.imagePath]);

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="card w-100 h-full bg-white p-5">
      <div className="head flex justify-between">
        <div className="title">
          <h3 className="font-bold text-1xl">{resume.companyName}</h3>
          <p>{resume.jobTitle}</p>
        </div>
        <ScoreCircle score={resume.feedback.overallScore} />
      </div>

      {resumeURL && (
        <img className="w-full h-100 object-fill mt-5" src={resumeURL} alt="" />
      )}
    </Link>
  );
}
