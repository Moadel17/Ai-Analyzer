import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/data/putter";
import back from "../assets/icons/back.svg";
import scan2 from "../assets/images/resume-scan-2.gif";
import Summary from "~/Component/summary";
import ATS from "~/Component/ATS";
import Details from "~/Component/details";

export const meta = () => [
  {
    title: "Resumind | Review",
  },
  { name: "description", content: "Details overview of your resume" },
];

// Function of Resume Details
const ResumeDetails = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageURL, setImageURL] = useState("");
  const [resumeURL, setResumeURL] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const nav = useNavigate();

  // UseEffect For Check If Is Auth
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) nav(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  // UseEffect to get resume data
  useEffect(() => {
    const ResumeAction = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      // Make Data can be read
      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      // convert pdf to can use as obj and add it path to resumeURL
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      if (!pdfBlob) return;
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeURL(resumeUrl);

      // convert image to can use and add it path to imageURL
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageURL(imageUrl);

      // Get feedback text
      setFeedback(data.feedback);

      console.log({ imageUrl, resumeUrl, feedback: data.feedback });
    };

    ResumeAction();
  }, [id]);

  // Const to show resume elements
  const Resume = () => {
    return (
      <main className="pt-0">
        <nav className="resume-nav">
          <Link to="/" className="back-button">
            <img className="w-2.5 h-2.5" src={back} alt="" />
            <span className="text-gray-800 text-sm font-semibold">
              Back To Home Page
            </span>
          </Link>
        </nav>

        <div className="flex flex-row w-full max-lg:flex-col-reverse">
          <section className="feedback-section">
            {imageURL && resumeURL && (
              <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                <a href={resumeURL} target="_blank">
                  <img
                    src={imageURL}
                    title="resume"
                    className="w-full h-full object-contain rounded-2xl"
                    alt=""
                  />
                </a>
              </div>
            )}
          </section>

          <section className="feedback-section">
            <h2 className="text-4xl text-black font-bold">Review Resume</h2>
            {feedback ? (
              <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback={feedback} />
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />
              </div>
            ) : (
              <img src={scan2} className="w-full" alt="" />
            )}
          </section>
        </div>
      </main>
    );
  };

  return <Resume />;
};
export default ResumeDetails;
