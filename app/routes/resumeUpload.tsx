import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "~/Component/navbar";
import ResumeForm from "~/Component/resume_form";
import { convertPdfToImage } from "~/data/convert-to-image";
import { generateUUID } from "~/data/fileSize";
import { usePuterStore } from "~/data/putter";
import { prepareInstructions } from "~/data/resume";
import bg from "../assets/images/bg-main.svg";
import scan from "../assets/images/resume-scan.gif";

interface DataProps {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
}

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const setTime = () =>
    setTimeout(() => {
      setIsProcessing(false);
    }, 10000);

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: DataProps) => {
    setIsProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile)
      return (setStatusText("Error: Failed to upload file"), setTime());

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return (
        setStatusText("Error: Failed to convert PDF to image"),
        setTime()
      );

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage)
      return (setStatusText("Error: Failed to upload image"), setTime());

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback)
      return (setStatusText("Error: Failed to analyze resume"), setTime());

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");

    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main style={{ backgroundImage: `url(${bg})` }}>
      <NavBar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src={scan} className="w-100" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <ResumeForm setFile={setFile} handleSubmit={handleSubmit} />
          )}
        </div>
      </section>
    </main>
  );
};
export default Upload;
