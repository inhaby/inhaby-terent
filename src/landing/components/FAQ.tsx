import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "How does verification work?",
    answer: "Every single listing undergoes our rigorous 7-step protocol. We cross-reference official government land deeds to confirm ownership, examine high-resolution geo-tagged photos, and conduct manual checks on pricing. We reject over 40% of submitted properties to maintain our zero-fraud catalog.",
  },
  {
    question: "How are properties verified?",
    answer: "Our trained verification experts inspect each submitted property. We verify physical existence, layout, amenities, and room status to ensure that what you see online is exactly what you get in real life. No fake placeholders, no duplicate listings.",
  },
  {
    question: "How are owners verified?",
    answer: "Landlords must upload their official land title deed or society registration certificate alongside standard government identity proofs. Our back-office desk checks these credentials against municipal registries to guarantee that you are speaking directly to the legal owner of the property—not a proxy broker.",
  },
  {
    question: "Is there brokerage?",
    answer: "No. There is absolutely zero brokerage. Traditional platforms rely on local agents who charge 1-2 months of rent as commission. Inhaby cuts out the middleman completely. We provide the technology directly to landlords and tenants, saving you ₹25,000 to ₹80,000 per move-in.",
  },
  {
    question: "Can owners list for free?",
    answer: "Yes, owners can list their properties completely for free on our Owner Portal. There are no listing fees, sign-up fees, or subscription charges. We verify the property for free to keep our catalog authentic.",
  },
  {
    question: "How do I contact owners?",
    answer: "Once you register on our Tenant Portal, you can chat directly with verified owners, arrange digital or physical visits, or ask questions in real time—all with complete privacy and zero third-party brokers involved.",
  },
  {
    question: "How are lease agreements signed?",
    answer: "No need to visit a sub-registrar's office. Inhaby generates custom, legally compliant digital rental agreements. Both parties sign securely using Aadhaar-based e-signatures, and we handle the legal e-stamping process. You receive a fully registered, downloadable PDF in minutes.",
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-24 bg-muted/30 relative overflow-hidden border-t border-b border-border">
      {/* Background soft glow */}
      <div className="absolute bottom-[-10%] left-[10%] w-96 h-96 bg-primary/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-5 sm:px-6 mx-auto relative z-10 max-w-4xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary-soft rounded-full border border-primary/10">
            Common Questions
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl font-sans">
            Got questions? We have answers.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Find transparent answers to how our verification protocols, direct-to-owner contracts, and safety guarantees work.
          </p>
        </motion.div>

        {/* Accordion FAQ Grid */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-background border border-border rounded-2xl hover:border-primary/25 transition-all duration-300 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none select-none cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-extrabold text-foreground text-sm sm:text-base tracking-tight">
                      {item.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-foreground" />
                    ) : (
                      <Plus className="w-4 h-4 text-foreground" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-border/40">
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed pt-4 font-medium max-w-3xl">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
