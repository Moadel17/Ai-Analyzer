import NavBar from "~/Component/navbar";
import bg from "../assets/images/bg-main.svg";
import scan from "../assets/images/resume-scan.gif";
import { useState, type FormEvent } from "react";
import ResumeForm from "~/Component/resume_form";

export default function ResumeUpload() {
  const [isProcess, setIsProcess] = useState(false);
  const [textService, setTextService] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest("form");

    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");

    // console.log(companyName, jobTitle, jobDescription, file);
  }

  return (
    <main className="p-5" style={{ backgroundImage: `url(${bg})` }}>
      <NavBar />

      <section className="main-section flex justify-center">
        <div className="page-head space-y-4">
          <h1>Smart feedback for your dream job</h1>
        </div>
        {isProcess ? (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-xl">{textService}</p>
            <img className="w-100 mt-0" src={scan} alt="" />
          </div>
        ) : (
          <h2>Drop your resume for an ATS score and improvement tips</h2>
        )}

        {!isProcess && (
          <div className="w-200 shadow-2xl p-10 rounded-4xl">
            <ResumeForm file={file} setFile={setFile} submit={handleSubmit} />
          </div>
        )}
      </section>
    </main>
  );
}
