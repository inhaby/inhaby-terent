import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const [submittedFeedbackToken, setSubmittedFeedbackToken] = useState<string | null>(null);
  const [feedbackCategories, setFeedbackCategories] = useState<string[]>([]);
  const [feedbackDescription, setFeedbackDescription] = useState<string>('');
  const [feedbackAttachmentName, setFeedbackAttachmentName] = useState<string>('');

  const toggleFeedbackCategory = (item: string) => {
    if (feedbackCategories.includes(item)) {
      setFeedbackCategories(feedbackCategories.filter(x => x !== item));
    } else {
      setFeedbackCategories([...feedbackCategories, item]);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackDescription.trim()) return;

    setTimeout(() => {
      setSubmittedFeedbackToken(`FD-${String(Math.floor(Math.random() * 90000) + 10000)}`);
    }, 400);
  };

  return (
    <div className="space-y-6 text-sans">
      <div>
        <h2 className="font-serif text-3xl font-bold text-theme-text-primary tracking-tight">Feedback & Suggestions</h2>
        <p className="text-xs text-theme-text-secondary mt-1">
          Help improve Homstay Zero-Brokerage system by sharing performance bugs or layout ideas.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submittedFeedbackToken ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-green-500/5 border border-green-500/20 rounded-[28px] text-center space-y-4 font-sans"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <CheckCircle2 size={32} className="stroke-[3]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-theme-text-primary uppercase tracking-wide">Review Registered!</h3>
              <p className="text-xs text-theme-text-secondary mt-1 max-w-sm mx-auto leading-relaxed">
                "Thank you for helping improve Homstay."
              </p>
              <p className="text-[10px] text-theme-text-secondary mt-1">
                Our system registered your checklist with serial token:
              </p>
              <code className="block mt-2 font-mono text-xs font-black bg-theme-bg border border-theme-border px-3 py-1 bg-[#1a1a1c] text-[#fbfbfb] select-all rounded-lg max-w-[170px] mx-auto uppercase letter-spacing-1.5">{submittedFeedbackToken}</code>
            </div>
            <button 
              onClick={() => {
                setSubmittedFeedbackToken(null);
                setFeedbackCategories([]);
                setFeedbackDescription('');
                setFeedbackAttachmentName('');
              }}
              className="mt-2 bg-theme-accent hover:bg-theme-accent-hover text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              Submit fresh feedback
            </button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            onSubmit={handleFeedbackSubmit} 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Category choices checkboxes */}
            <div>
              <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-2">Select Related Categories</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'UI Design', 'Bug Report', 'Search Experience', 
                  'Property Quality', 'Booking Flow', 'Performance', 
                  'Feature Request', 'Other'
                ].map((item) => {
                  const isChosen = feedbackCategories.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFeedbackCategory(item)}
                      className={`py-2 px-1 text-center text-[10px] border font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                        isChosen 
                          ? 'bg-theme-accent border-theme-accent text-white shadow-sm' 
                          : 'bg-theme-bg border-theme-border text-theme-text-secondary hover:bg-theme-border/40'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback desc */}
            <div>
              <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5">Feedback details</label>
              <textarea 
                rows={4}
                placeholder="Give details about structural queries, slow page speeds, design ideas..."
                value={feedbackDescription}
                onChange={(e) => setFeedbackDescription(e.target.value)}
                className="w-full text-xs font-semibold text-theme-text-primary p-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:ring-1 focus:ring-theme-accent resize-none text-theme-text-primary"
                required
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="text-[10px] font-black text-theme-text-secondary uppercase tracking-widest block mb-1.5 font-bold">Screenshot Upload</label>
              <div className="relative border border-dashed border-theme-border rounded-xl p-3 text-center bg-theme-bg hover:bg-theme-border/20 cursor-pointer">
                <span className="text-[9px] font-bold text-[#8c8888] uppercase">Attach layout image mocks</span>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFeedbackAttachmentName(e.target.files[0].name);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {feedbackAttachmentName && (
                <p className="text-[9.5px] font-extrabold text-[#2a2a2a] dark:text-white mt-1 border-b border-theme-border pb-0.5 inline-block">{feedbackAttachmentName}</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={!feedbackDescription}
              className={`w-full py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                feedbackDescription 
                  ? 'bg-theme-accent hover:bg-theme-accent-hover text-white shadow-md cursor-pointer' 
                  : 'bg-theme-border/60 text-theme-text-secondary/50 cursor-not-allowed'
              }`}
            >
              Submit Feedback
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackSection;
