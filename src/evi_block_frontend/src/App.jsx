import { useState } from "react";
import { evi_block_backend } from "declarations/evi_block_backend";

// Hashing function using Web Crypto API
async function hashFile(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function App() {
  const [caseNo, setCaseNo] = useState("");
  const [userId, setUserId] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [verifyCaseNo, setVerifyCaseNo] = useState("");
  const [verifyFileHash, setVerifyFileHash] = useState("");
  const [uploadResponse, setUploadResponse] = useState("");
  const [verifyResponse, setVerifyResponse] = useState("");

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const hash = await hashFile(file);
      setFileHash(hash);
    }
  }

  async function handleUpload(event) {
    event.preventDefault();
    if (!fileHash) {
      setUploadResponse("Please select a file first.");
      return;
    }
    try {
      const response = await evi_block_backend.upload_evidence(caseNo, userId, fileHash);
      setUploadResponse(response);
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadResponse("Error uploading evidence");
    }
  }

  async function handleVerify(event) {
    event.preventDefault();
    if (!verifyFileHash) {
      setVerifyResponse("Please select a file first.");
      return;
    }
    try {
      const response = await evi_block_backend.verify_evidence(verifyCaseNo, verifyFileHash);
      setVerifyResponse(response);
    } catch (error) {
      console.error("Verification Error:", error);
      setVerifyResponse("Error verifying evidence");
    }
  }

  async function handleVerifyFile(event) {
    const file = event.target.files[0];
    if (file) {
      const hash = await hashFile(file);
      setVerifyFileHash(hash);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <img src="/logo2.svg" alt="DFINITY logo" className="w-24 mx-auto mb-4" />

        <h2 className="text-xl font-bold text-gray-700 text-center">Upload Evidence</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Case No:</label>
            <input
              type="text"
              value={caseNo}
              onChange={(e) => setCaseNo(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Upload File:</label>
            <input type="file" onChange={handleFileUpload} required className="mt-1 w-full" />
            {fileHash && <p className="text-xs text-gray-500 break-all mt-2">File Hash: {fileHash}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </form>
        {uploadResponse && <p className="mt-2 text-center text-sm text-gray-700">{uploadResponse}</p>}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mt-6">
        <h2 className="text-xl font-bold text-gray-700 text-center">Verify Evidence</h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Case No:</label>
            <input
              type="text"
              value={verifyCaseNo}
              onChange={(e) => setVerifyCaseNo(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Upload File for Verification:</label>
            <input type="file" onChange={handleVerifyFile} required className="mt-1 w-full" />
            {verifyFileHash && <p className="text-xs text-gray-500 break-all mt-2">Generated Hash: {verifyFileHash}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Verify
          </button>
        </form>
        {verifyResponse && <p className="mt-2 text-center text-sm text-gray-700">{verifyResponse}</p>}
      </div>
    </main>
  );
}

export default App;
