import { useState } from "react";
import FileUploader from "./file_uploader";

export default function ResumeForm({ submit, file, setFile }: any) {
  function handleSelectedFiles(file: File | null) {
    setFile(file);
  }

  return (
    <form onSubmit={submit}>
      <label>Company Name</label>
      <input
        type="text"
        name="company-name"
        placeholder="Company Name"
        id="company-name"
      />
      <label>Job Title</label>
      <input
        type="text"
        name="job-title"
        placeholder="Job Title"
        id="job-title"
      />
      <label>Job Description</label>
      <textarea
        name="job-description"
        placeholder="Job Description"
        id="job-description"
      />

      <div className="flex w-full flex-col">
        <label className="text-left">Upload Resume</label>
        <FileUploader filesSelected={handleSelectedFiles} />
      </div>

      <button className="primary-button">Analyze Resume</button>
    </form>
  );
}
