import React, { useState, useRef, useEffect } from 'react';
import { Upload, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/dialog';
import { Input } from './components/input';
import { Button } from './components/button';
import { Label } from './components/label';
import './App.css';

const EvidenceManagementSystem = () => {
  // Upload Evidence State
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadCaseId, setUploadCaseId] = useState('');
  const [uploadSelectedFile, setUploadSelectedFile] = useState(null);

  // Verify Evidence State
  const [isInitialVerifyDialogOpen, setIsInitialVerifyDialogOpen] = useState(false);
  const [initialCaseId, setInitialCaseId] = useState('');
  const [isCaseIdValid, setIsCaseIdValid] = useState(false);
  const [isFullVerifyDialogOpen, setIsFullVerifyDialogOpen] = useState(false);
  const [verifyUsername, setVerifyUsername] = useState('');
  const [verifySelectedFile, setVerifySelectedFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  // Upload Evidence Handlers
  const handleUploadEvidenceClick = () => {
    setIsUploadDialogOpen(true);
  };

  const handleUploadFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadSelectedFile(file);
    }
  };

  const handleSubmitEvidence = () => {
    // Validate inputs
    if (!uploadName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!uploadCaseId.trim()) {
      alert('Please enter the Case ID');
      return;
    }

    if (!uploadSelectedFile) {
      alert('Please select a file to upload');
      return;
    }

    // Perform upload logic here
    console.log('Uploading Evidence:', {
      name: uploadName,
      caseId: uploadCaseId,
      fileName: uploadSelectedFile.name
    });

    // Reset form and close dialog
    setUploadName('');
    setUploadCaseId('');
    setUploadSelectedFile(null);
    setIsUploadDialogOpen(false);

    // Show success message
    alert('Evidence uploaded successfully!');
  };

  // Verify Evidence Handlers
  const handleInitialVerifyClick = () => {
    setIsInitialVerifyDialogOpen(true);
  };

  const handleCaseIdVerification = () => {
    // Simulated backend verification
    if (initialCaseId.trim()) {
      // Simulating backend verification
      const isValid = initialCaseId.length >= 5; // Simple validation
      
      if (isValid) {
        setIsCaseIdValid(true);
        setIsInitialVerifyDialogOpen(false);
        setIsFullVerifyDialogOpen(true);
      } else {
        alert('Invalid Case ID. Please try again.');
      }
    } else {
      alert('Please enter a Case ID');
    }
  };

  const handleVerifyFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVerifySelectedFile(file);
    }
  };

  const handleFullVerification = () => {
    // Validate inputs
    if (!verifyUsername.trim()) {
      alert('Please enter your username');
      return;
    }

    if (!verifySelectedFile) {
      alert('Please select a file to verify');
      return;
    }

    // Simulated verification logic
    const isVerified = Math.random() > 0.5; // Simulated verification result

    setVerificationResult({
      caseId: initialCaseId,
      username: verifyUsername,
      fileName: verifySelectedFile.name,
      isVerified: isVerified
    });

    // Reset verification inputs
    setInitialCaseId('');
    setVerifyUsername('');
    setVerifySelectedFile(null);
    setIsCaseIdValid(false);
    setIsFullVerifyDialogOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 p-4">
          {/* Add the blockchain header here - line 213 */}
          <div className="blockchain-header">
            <div className="blockchain-logo">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="blockchain-title">Digital Evidence Management</h1>
              <p className="blockchain-subtitle">Blockchain-secured evidence verification system</p>
            </div>
          </div>
    
    
    {/* Upload Evidence Button */}
      <Button 
        className="button button-primary" 
        onClick={handleUploadEvidenceClick}
      >
        <Upload className="mr-2" size={20} />
        Upload Evidence
      </Button>

      {/* Verify Evidence Button */}
      <Button 
        onClick={handleInitialVerifyClick} 
        variant="secondary"
        className="button button-secondary w-full max-w-md"
      >
        <Shield className="mr-2" size={20} />
        Verify Evidence
      </Button>

      {/* Upload Evidence Dialog - Only render when open */}
      {isUploadDialogOpen && (
        <Dialog 
          open={isUploadDialogOpen} 
          onOpenChange={(open) => setIsUploadDialogOpen(open)}
        >
          <DialogContent className="dialog-content">
            <DialogHeader className="dialog-header">
              <DialogTitle className="dialog-title">Upload Digital Evidence</DialogTitle>
              <DialogDescription className="dialog-description">
                Please provide your details and select the evidence file
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="uploadName" className="label">Your Name</Label>
                <Input 
                  id="uploadName"
                  className="input"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="uploadCaseId">Case ID</Label>
                <Input 
                  id="uploadCaseId"
                  value={uploadCaseId}
                  onChange={(e) => setUploadCaseId(e.target.value)}
                  placeholder="Enter the Case ID"
                />
              </div>

              <div>
                <Label>Upload Evidence File</Label>
                <Input 
                  type="file" 
                  onChange={handleUploadFileChange}
                />
              </div>

              {uploadSelectedFile && (
                <div className="file-preview">
                  <p className="file-name"><strong>File:</strong> {uploadSelectedFile.name}</p>
                  <p className="file-size"><strong>Size:</strong> {(uploadSelectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              <Button 
                onClick={handleSubmitEvidence}
                disabled={!uploadName || !uploadCaseId || !uploadSelectedFile}
                className="w-full"
              >
                Submit Evidence
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Initial Case ID Verification Dialog - Only render when open */}
      {isInitialVerifyDialogOpen && (
        <Dialog 
          open={isInitialVerifyDialogOpen} 
          onOpenChange={(open) => setIsInitialVerifyDialogOpen(open)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Verify Case ID</DialogTitle>
              <DialogDescription>
                Enter the unique Case ID to proceed with verification
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="initialCaseId">Case ID</Label>
                <Input 
                  id="initialCaseId"
                  value={initialCaseId}
                  onChange={(e) => setInitialCaseId(e.target.value)}
                  placeholder="Enter the unique Case ID"
                />
              </div>

              <Button 
                onClick={handleCaseIdVerification}
                disabled={!initialCaseId}
                className="w-full"
              >
                Verify Case ID
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Full Verification Dialog - Only render when open */}
      {isFullVerifyDialogOpen && (
        <Dialog 
          open={isFullVerifyDialogOpen} 
          onOpenChange={(open) => setIsFullVerifyDialogOpen(open)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Evidence Verification</DialogTitle>
              <DialogDescription>
                Enter your username and upload the evidence file
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="verifyUsername">Username</Label>
                <Input 
                  id="verifyUsername"
                  value={verifyUsername}
                  onChange={(e) => setVerifyUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <Label>Upload Evidence File to Verify</Label>
                <Input 
                  type="file" 
                  onChange={handleVerifyFileChange}
                />
              </div>

              {verifySelectedFile && (
                <div className="bg-gray-100 p-3 rounded">
                  <p><strong>File:</strong> {verifySelectedFile.name}</p>
                  <p><strong>Size:</strong> {(verifySelectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}

              <Button 
                onClick={handleFullVerification}
                disabled={!verifyUsername || !verifySelectedFile}
                className="w-full"
              >
                Verify Evidence
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Verification Result Display */}
      {verificationResult && (
        <div className={`notification ${verificationResult.isVerified ? 'bg-green-500' : 'bg-red-500'}`}>
          <p>Case ID: {verificationResult.caseId}</p>
          <p>Username: {verificationResult.username}</p>
          <p>File: {verificationResult.fileName}</p>
          <p>
            {verificationResult.isVerified 
              ? 'Evidence Verified Successfully' 
              : 'Evidence Verification Failed'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EvidenceManagementSystem;