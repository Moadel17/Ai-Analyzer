import type { ReactNode } from "react";
import { Link } from "react-router";
import ScoreCircle from "~/data/scoreCircle";

export default function ResumeCard({ ele }: any) {
  return (
    <Link to={`/resume/${ele.id}`} className="card w-100 h-full bg-white p-5">
      <div className="head flex justify-between">
        <div className="title">
          <h3 className="font-bold text-1xl">{ele.companyName}</h3>
          <p>{ele.jobTitle}</p>
        </div>
        <ScoreCircle score={ele.feedback.overallScore} />
      </div>

      <img
        className="w-full h-100 object-fill mt-5"
        src={ele.imagePath}
        alt=""
      />
    </Link>
  );
}
