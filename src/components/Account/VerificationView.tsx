import React from 'react';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Upload 
} from 'lucide-react';

interface VerificationViewProps {
  profilePhone: string;
  profileEmail: string;
  mobileVerified: boolean;
  setMobileVerified: (val: boolean) => void;
  emailVerified: boolean;
  setEmailVerified: (val: boolean) => void;
  govIdStatus: string;
  setGovIdStatus: (val: any) => void;
  isMobileOtpSent: boolean;
  setIsMobileOtpSent: (val: boolean) => void;
  mobileOtpValue: string;
  setMobileOtpValue: (val: string) => void;
  isEmailOtpSent: boolean;
  setIsEmailOtpSent: (val: boolean) => void;
  emailOtpValue: string;
  setEmailOtpValue: (val: string) => void;
  selectedIdType: string;
  setSelectedIdType: (val: string) => void;
  idNumber: string;
  setIdNumber: (val: string) => void;
  uploadedFile: { name: string; size: string } | null;
  setUploadedFile: (val: { name: string; size: string } | null) => void;
  isUploading: boolean;
  uploadProgress: number;
  handleIdUpload: (e: React.FormEvent) => void;
  requestChangesReason: { title: string; reason: string };
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  profilePhone,
  profileEmail,
  mobileVerified,
  setMobileVerified,
  emailVerified,
  setEmailVerified,
  govIdStatus,
  setGovIdStatus,
  isMobileOtpSent,
  setIsMobileOtpSent,
  mobileOtpValue,
  setMobileOtpValue,
  isEmailOtpSent,
  setIsEmailOtpSent,
  emailOtpValue,
  setEmailOtpValue,
  selectedIdType,
  setSelectedIdType,
  idNumber,
  setIdNumber,
  uploadedFile,
  setUploadedFile,
  isUploading,
  uploadProgress,
  handleIdUpload,
  requestChangesReason
}) => {
  return (
    <div className="space-y-6 text-sans">
      {/* Header Title */}
      <div>
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Verification Center</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Authenticate your phone, email, and identity to satisfy tenancy pre-requisites.
          All information is securely encrypted under industry-grade AES keys.
        </p>
      </div>

      {/* Simulated administrator dashboard console to test approved / pending etc */}
      <div className="p-4 bg-[#fbf9f4] dark:bg-theme-border/30 border border-theme-border rounded-2xl">
        <div className="flex items-center gap-1.5 mb-2 text-[#996515] dark:text-amber-400 font-sans">
          <HelpCircle size={15} />
          <span className="text-[10px] font-black uppercase tracking-widest">Advocate Sandbox Controls</span>
        </div>
        <p className="text-[10px] text-theme-text-secondary leading-normal mb-3 font-sans">
          Use this developer-sandbox to live-simulate database status results of the ID submission workflow. Changing this instantly toggles block/allow permissions.
        </p>
        <div className="flex flex-wrap gap-2 font-sans">
          {[
            { status: 'Request Changes', color: 'bg-amber-500/10 hover:bg-amber-500/15 text-amber-600 border-amber-500/20' },
            { status: 'Pending Review', color: 'bg-indigo-500/10 hover:bg-indigo-500/15 text-indigo-600 border-indigo-500/20' },
            { status: 'Approved', color: 'bg-green-500/10 hover:bg-green-500/15 text-green-600 border-green-500/20' },
            { status: 'Rejected', color: 'bg-red-500/10 hover:bg-red-500/15 text-red-500 border-red-500/20' }
          ].map((item) => (
            <button
              key={item.status}
              onClick={() => {
                setGovIdStatus(item.status as any);
                if (item.status === 'Approved') {
                  setUploadedFile({ name: 'Simulated_Approved_Aadhaar_Scan.pdf', size: '1.2 MB' });
                } else if (item.status === 'Request Changes') {
                  setUploadedFile(null);
                }
              }}
              className={`px-2.5 py-1.5 border text-[9px] font-black uppercase tracking-wide rounded-lg cursor-pointer transition-all ${
                govIdStatus === item.status 
                  ? 'bg-theme-accent border-theme-accent text-white scale-[1.03]' 
                  : item.color
              }`}
            >
              Simulate: {item.status}
            </button>
          ))}
        </div>
      </div>

      {/* A. MOBILE OTP SIMULATION CARD */}
      <div className="p-5 border border-theme-border/70 rounded-2xl space-y-4 font-sans">
        <div className="flex justify-between items-center bg-theme-bg p-2 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-theme-accent-soft text-theme-accent rounded-lg">
              <Phone size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-theme-text-primary">Mobile Verification</h3>
              <p className="text-[10px] text-theme-text-secondary">{profilePhone}</p>
            </div>
          </div>
          {mobileVerified ? (
            <span className="text-[9px] font-black bg-green-500/10 text-green-600 px-2.5 py-1 rounded-lg uppercase tracking-wide flex items-center gap-1">
              <CheckCircle2 size={10} className="stroke-[3]" />
              <span>Verified</span>
            </span>
          ) : (
            <span className="text-[9px] font-black bg-red-500/10 text-red-500 px-2.5 py-1 rounded-lg uppercase tracking-wide">
              Pending
            </span>
          )}
        </div>

        {!mobileVerified && (
          <div className="pt-1.5 space-y-2.5">
            {!isMobileOtpSent ? (
              <button 
                onClick={() => setIsMobileOtpSent(true)}
                className="w-full py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                Retrieve Verification OTP
              </button>
            ) : (
              <div className="space-y-3.5 border border-dashed border-theme-border p-3.5 rounded-xl bg-theme-bg">
                <div className="flex justify-between text-[10px] font-extrabold uppercase">
                  <span className="text-amber-600">OTP Sent! Check simulated inbox</span>
                  <span className="text-theme-text-secondary">Expires in 2:00</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter 4-character code (Type '1234')"
                    maxLength={4}
                    value={mobileOtpValue}
                    onChange={(e) => setMobileOtpValue(e.target.value)}
                    className="flex-1 text-center font-mono font-bold tracking-[0.5em] text-xs p-2 bg-theme-surface border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent text-theme-text-primary"
                  />
                  <button 
                    onClick={() => {
                      if (mobileOtpValue === '1234') {
                        setMobileVerified(true);
                        setIsMobileOtpSent(false);
                      } else {
                        alert('Incorrect code. Use code "1234" to test Mobile verification simulation!');
                      }
                    }}
                    className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Verify Code
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* B. EMAIL OTP SIMULATION CARD */}
      <div className="p-5 border border-theme-border/70 rounded-2xl space-y-4 font-sans">
        <div className="flex justify-between items-center bg-theme-bg p-2 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-theme-accent-soft text-theme-accent rounded-lg">
              <Mail size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-theme-text-primary">Email Verification</h3>
              <p className="text-[10px] text-theme-text-secondary">{profileEmail}</p>
            </div>
          </div>
          {emailVerified ? (
            <span className="text-[9px] font-black bg-green-500/10 text-green-600 px-2.5 py-1 rounded-lg uppercase tracking-wide flex items-center gap-1">
              <CheckCircle2 size={10} className="stroke-[3]" />
              <span>Verified</span>
            </span>
          ) : (
            <span className="text-[9px] font-black bg-red-500/10 text-red-500 px-2.5 py-1 rounded-lg uppercase tracking-wide">
              Pending
            </span>
          )}
        </div>

        {!emailVerified && (
          <div className="pt-1.5 space-y-2.5">
            {!isEmailOtpSent ? (
              <button 
                onClick={() => setIsEmailOtpSent(true)}
                className="w-full py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                Authenticate Email OTP
              </button>
            ) : (
              <div className="space-y-3.5 border border-dashed border-theme-border p-3.5 rounded-xl bg-theme-bg">
                <div className="flex justify-between text-[10px] font-extrabold uppercase">
                  <span className="text-amber-600">Simulating inbox delivery...</span>
                  <span className="text-theme-text-secondary">Valid 2m</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type '5678' to verify mail"
                    maxLength={4}
                    value={emailOtpValue}
                    onChange={(e) => setEmailOtpValue(e.target.value)}
                    className="flex-1 text-center font-mono font-bold tracking-[0.5em] text-xs p-2 bg-theme-surface border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent text-theme-text-primary"
                  />
                  <button 
                    onClick={() => {
                      if (emailOtpValue === '5678') {
                        setEmailVerified(true);
                        setIsEmailOtpSent(false);
                      } else {
                        alert('Code invalid. Use code "5678" to proceed Email authentication!');
                      }
                    }}
                    className="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Verify Code
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* C. GOVERNMENT ID VERIFICATION */}
      <div className="p-5 border border-theme-border/70 rounded-2xl space-y-5 font-sans">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-theme-accent-soft text-theme-accent rounded-lg">
            <ShieldCheck size={16} />
          </div>
          <h3 className="text-xs font-bold text-theme-text-primary uppercase tracking-wide">Government ID Validation</h3>
        </div>

        {/* Status Conditional Display */}
        {govIdStatus === 'Request Changes' && (
          <div className="p-4 bg-orange-500/5 border border-orange-500/25 rounded-xl text-xs space-y-2 text-[#9a4515]">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wide">
              <AlertTriangle size={15} />
              <span>Correction Required by Reviewer</span>
            </div>
            <div>
              <p className="font-bold">Failure Area: {requestChangesReason.title}</p>
              <p className="text-theme-text-secondary mt-1 font-medium leading-relaxed bg-white/40 dark:bg-black/10 p-2.5 rounded-lg border border-theme-border dark:border-theme-border/40">
                "{requestChangesReason.reason}"
              </p>
            </div>
            <p className="text-[10px] font-semibold text-theme-text-secondary mt-1 uppercase text-right">
              Assessed today by Homstay Support Admin
            </p>
          </div>
        )}

        {govIdStatus === 'Approved' ? (
          <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <CheckCircle2 size={24} className="stroke-[3]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-theme-text-primary uppercase tracking-wider">Verification Complete (100% Authorized)</h4>
              <p className="text-[10px] text-theme-text-secondary mt-1 px-4 leading-relaxed">
                Your government registration scan has been successfully matched with state registries. You are authorized to bid, tour, and execute contracts.
              </p>
            </div>
            <div className="bg-theme-bg p-3.5 rounded-xl border border-theme-border text-left">
              <p className="text-[10px] text-theme-text-secondary uppercase font-bold tracking-wider">Verified Credential File</p>
              <p className="text-xs font-bold text-theme-text-primary mt-1 select-all">{uploadedFile?.name || 'Verified_Gov_Documents.pdf'}</p>
              <p className="text-[9.5px] text-green-600 font-extrabold mt-1.5 uppercase leading-none">✓ Immutable: User cannot modify approved records</p>
            </div>
          </div>
        ) : govIdStatus === 'Pending Review' ? (
          <div className="p-5 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl text-center space-y-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto text-indigo-600 animate-spin">
              <Clock size={20} className="stroke-[3.5]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-theme-text-primary uppercase tracking-wider">Awaiting Verification Review</h4>
              <p className="text-[10px] text-theme-text-secondary mt-1 leading-relaxed">
                Your identity documents have been posted to the administrative verification queue. The typical processing duration spans less than 1-2 hours.
              </p>
            </div>
            <div className="bg-theme-bg p-3 rounded-lg flex items-center justify-between text-left">
              <span className="text-xs text-theme-text-primary font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]" title={uploadedFile?.name}>{uploadedFile?.name || 'ID_Draft_Submission.pdf'}</span>
              <span className="text-[9px] font-black bg-amber-500/10 text-amber-600 px-2.5 py-0.5 rounded uppercase">Submitted</span>
            </div>
          </div>
        ) : (
          /* Form state */
          <form onSubmit={handleIdUpload} className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Select Document Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Aadhaar', 'Passport', 'Driving License', 'Voter ID'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedIdType(type)}
                    className={`py-2 px-1 rounded-xl text-[10px] border font-black uppercase tracking-wider text-center cursor-pointer ${
                      selectedIdType === type 
                        ? 'bg-theme-accent border-theme-accent text-white shadow-md' 
                        : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:bg-theme-border/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Document Number</label>
                <input 
                  type="text" 
                  placeholder={`Provide ${selectedIdType} ID Number`}
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Upload scanned image / PDF</label>
                <div className="relative border border-dashed border-theme-border rounded-xl p-3 bg-theme-bg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-theme-border/20 transition-all">
                  <Upload size={16} className="text-theme-text-secondary mb-1" />
                  <span className="text-[9px] font-extrabold text-theme-text-primary uppercase">Choose PDF, JPG, or PNG</span>
                  <span className="text-[8px] text-[#9a9a9a] leading-none mt-1">Maximum size limit: 5 MB</span>
                  <input 
                    type="file" 
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFile({
                          name: e.target.files[0].name,
                          size: (e.target.files[0].size / 1024 / 1024).toFixed(1) + ' MB'
                        });
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {uploadedFile && (
              <div className="bg-[#f0f9ff] border border-blue-100 p-3 rounded-xl flex items-center justify-between text-left">
                <div>
                  <p className="text-[10px] font-black text-[#1e3a8a] uppercase leading-none">Draft Attached File</p>
                  <p className="text-xs text-theme-text-primary font-bold mt-1 max-w-[180px] sm:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">{uploadedFile.name} ({uploadedFile.size})</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setUploadedFile(null)}
                  className="text-[10px] font-black text-red-500 hover:underline uppercase"
                >
                  Remove
                </button>
              </div>
            )}

            {isUploading ? (
              <div className="space-y-2 pt-2 text-center">
                <div className="w-full h-2 bg-theme-bg rounded-full overflow-hidden border border-theme-border">
                  <div className="h-full bg-theme-accent transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
                <p className="text-[9px] text-[#9c9c9c] font-bold uppercase tracking-widest">Encrypting and uploading file... {uploadProgress}%</p>
              </div>
            ) : (
              <button 
                type="submit"
                disabled={!idNumber || !uploadedFile}
                className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  idNumber && uploadedFile 
                    ? 'bg-theme-accent hover:bg-theme-accent-hover text-white shadow-lg shadow-theme-accent/20 cursor-pointer' 
                    : 'bg-theme-border/60 text-theme-text-secondary/50 cursor-not-allowed'
                }`}
              >
                Post Identity Verification Documents
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
