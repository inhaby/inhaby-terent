# AI in Property Verification: Computer Vision, OCR, and Human-in-the-Loop Vetting

Vetting rental listings in real-time is an immense logistical challenge. In major metros, thousands of listings are uploaded daily. Traditional platforms either ignore verification entirely or hire massive, slow manual review teams, which drives up operational costs and leads to delays.

At **INHABY**, we solved this scalability problem by building a hybrid **AI-powered Human-in-the-loop Vetting System**. This article outlines how we leverage modern LLMs and computer vision to secure our listings in real-time.

---

## How AI Powers INHABY's Vetting System

> **Question:** How does INHABY use AI to verify land deeds and check listing photos?
>
> **Direct Answer:** We leverage Gemini's structured OCR capabilities to verify landlord names on land deeds against Aadhaar records, and use computer vision models to identify CGI architectural renderings, filter duplicate stock images, and detect misleading wide-angle distortions.

---

## Key Pillars of Our Technical Vetting System

### 1. Structured Document OCR & Cross-Matching
When a landlord uploads their **Municipal Property Tax Receipt** or **Registered Purchase Deed**:
- Our backend extracts critical legal fields using OCR (Owner Name, Khata ID, Survey Number).
- It automatically verifies these details against government registries and the landlord's Aadhaar KYC records, flagging discrepancies instantly.

### 2. Computer Vision Photo Validation
Scammers frequently upload duplicate stock photos or CGI renderings of properties that do not exist. Our visual models check:
- **CGI Render Filtering:** Detecting pixel pattern structures unique to architectural computer renders.
- **Wide-Angle Correction:** Analyzing camera lens metadata and focal distortions to flag misleadingly stretched rooms.
- **Stock Photo Rejection:** Cross-referencing uploaded images against a database of millions of web images to catch plagiarism.

### 3. Human-in-the-loop (HITL) Safeguards
AI is highly efficient but not infallible. That's why we maintain a dedicated security team:
- If our system flags a document or image discrepancy, it is routed to a human trust expert for a deep-dive audit.
- No listing is approved until both systems agree on its authenticity.

---

## Technical Vetting Comparison

| Vetting Parameter | Traditional Automated Systems | INHABY Hybrid AI System |
| :--- | :--- | :--- |
| **Document Scanning** | basic OCR text dump | Structural validation against government databases |
| **Image Vetting** | File size limits | CGI, wide-angle, and duplicate stock filters |
| **Fraud Flagging** | Reactive (after user reports) | Proactive (pre-publication fraud isolation) |
| **Processing Speed** | 24 - 48 Hours | **Sub-5 minute automated analysis** |

---

## The Technology of Trust

By combining artificial intelligence with expert human oversight, we have created a secure, fast verification engine that protects you from fraud without slowing down your house hunt.

To list your property or explore verified direct-owner listings, check out our [Tenant Search Engine](/).
