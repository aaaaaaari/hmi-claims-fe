import { useState, type ChangeEvent } from "react";

interface UploadResponse {
  success: boolean;
  message?: string;
  data?: any;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<UploadStatus>("idle");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    setFiles(selectedFiles);
    setUploadStatus("");
    setStatusType("idle");
  };

  const handleUpload = async (): Promise<void> => {
    if (files.length === 0) {
      setUploadStatus("Please select files to upload");
      setStatusType("error");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Processing files...");
    setStatusType("uploading");

    try {
      const formData = new FormData();

      // Add all selected files to the form data
      files.forEach((file: File) => {
        formData.append("files", file);
      });

      const response: Response = await fetch(
        "https://bold-free-mouse.ngrok-free.app/api/v1/claims/process_files",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result: UploadResponse = await response.json();
        setUploadStatus("Files processed successfully!");
        setStatusType("success");
        console.log("Upload result:", result);

        // Reset the file input
        const fileInput = document.getElementById(
          "fileInput"
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
        setFiles([]);
      } else {
        const errorText: string = await response.text();
        setUploadStatus(
          `Upload failed: ${response.status} ${response.statusText}`
        );
        setStatusType("error");
        console.error("Upload error:", errorText);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setUploadStatus(`Upload error: ${errorMessage}`);
      setStatusType("error");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-20">
      <div className="card bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Submit New Claim</h2>
        <p className="text-gray-600 mb-6">
          Upload documents and review extracted information as well as
          adjudication results.
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="file"
              id="fileInput"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {files.length > 0 && (
            <div className="text-sm text-gray-600">
              <p className="font-medium">Selected files:</p>
              <ul className="list-disc list-inside mt-1">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={isUploading || files.length === 0}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isUploading || files.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isUploading ? "Processing..." : "Upload & Review Extracted Data"}
          </button>

          {uploadStatus && (
            <div
              className={`p-3 rounded-md text-sm ${
                statusType === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : statusType === "error"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
