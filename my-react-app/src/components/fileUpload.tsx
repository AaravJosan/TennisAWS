import React, {
  useRef,
  useState,
  ChangeEvent,
  DragEvent,
  MouseEvent,
} from "react";

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isMp4File = (candidate: File) =>
    candidate.type === "video/mp4" ||
    candidate.name.toLowerCase().endsWith(".mp4");

  const acceptFile = (candidates: File[]) => {
    const validFile = candidates.find(isMp4File);
    if (validFile) {
      setFile(validFile);
      setError(null);
    } else if (candidates.length > 0) {
      setFile(null);
      setError("Please upload an MP4 video file.");
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    acceptFile(selectedFiles);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    acceptFile(droppedFiles);
  };

  const handleRemoveFile = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setFile(null);
    setError(null);
  };

  const handleAnalyze = () => {
    if (!file) {
      return;
    }
    // Placeholder action until backend integration is ready.
    console.info(`Analyzing ${file.name}`);
  };

  const analyzeButtonClasses = [
    "mt-6 w-full rounded-full py-3 text-sm font-semibold transition-all duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
    file
      ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-violet-900/30 hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400"
      : "bg-slate-900/80 text-slate-500 border border-white/10 cursor-not-allowed opacity-70",
  ].join(" ");

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Dropzone / Clickable area */}
      <div
        className={`
          border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center 
          transition-all cursor-pointer
          ${
            isDragging
              ? "border-violet-400/80 bg-violet-600/30 shadow-lg shadow-violet-900/40"
              : "border-white/15 bg-slate-900/60 hover:bg-slate-900/70"
          }
        `}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-500/20 text-violet-200 shadow mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16v1a1 1 0 001 1h6a1 1 0 001-1v-1M7 9l5-4 5 4m-5-4v11"
                />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-100 truncate max-w-[220px]">
              {file.name}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="mt-4 text-xs text-red-400 hover:text-red-300"
            >
              Remove file
            </button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-500/20 text-violet-200 shadow mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12l4.5-4.5m0 0L16.5 12m-4.5-4.5V21"
                />
              </svg>
            </div>
            <p className="text-sm text-slate-100 font-medium">
              Drag & drop your MP4 video
            </p>
            <p className="text-xs text-slate-400 mt-1">
              or{" "}
              <span className="text-violet-300 font-semibold underline">
                click to browse
              </span>
            </p>
            <p className="text-[10px] text-slate-500 mt-4">
              Only MP4 files are supported
            </p>
          </>
        )}

        {/* Hidden input */}
        <input
          type="file"
          accept="video/mp4"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-400 text-center">{error}</p>
      )}

    <button
        type="button"
        onClick={handleAnalyze}
        disabled={!file}
        className={analyzeButtonClasses}
      >
        Analyze
      </button>

    </div>
  );
}

export default FileUpload;
