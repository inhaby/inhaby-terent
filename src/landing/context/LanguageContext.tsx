import React, { createContext, useContext, useState, useEffect } from "react";
import { extendedTranslations } from "./translations";

export type LanguageCode = "en" | "hi" | "ja" | "zh" | "ko";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
];

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navbar
    "nav.savings": "Savings Calculator",
    "nav.careers": "Careers",
    "nav.pricing": "Pricing",
    "nav.blog": "Trust Blog",
    "nav.help": "Help",
    "nav.login": "Login",
    
    // Hero
    "hero.live": "Currently live in Metro Cities",
    "hero.title1": "Find trusted homes ",
    "hero.title2": "with ",
    "hero.title_accent": "Inhaby",
    "hero.subtitle_mobile": "Discover verified homes directly from owners—zero brokerage, zero surprises.",
    "hero.subtitle_desktop": "Discover verified homes, connect directly with verified owners, and rent with confidence—without brokerage or hidden surprises.",
    
    // Buttons
    "btn.explore": "Explore Verified Homes",
    "btn.trust_score": "Check Rent Trust Score",
    "btn.verify_now": "Verify My Rental Now",
    "btn.owner_list": "List Property (Free)",

    // Carousel
    "carousel.badge_verified": "VERIFIED",
    "carousel.badge_no_brokerage": "NO BROKERAGE",
    "carousel.badge_just_updated": "JUST UPDATED",
    "carousel.title": "Handpicked Verified Listings",
    "carousel.subtitle": "Updated daily. Hand-screened, verified directly with land registry deeds.",
    "carousel.view_all": "View All 1,200+ Listings",
    "carousel.verify_property": "Verify Property",
    "carousel.direct_owner": "Direct Owner",

    // Journeys
    "journey.tab_journey": "Tenant & Landlord Journeys",
    "journey.tab_verification": "Automated Document Verification",
    "journey.badge_trusted": "TRUSTED & VERIFIED",
    "journey.title_renter": "Looking for a home?",
    "journey.title_landlord": "Want to list your property?",
    "journey.step_1": "1. Find Verified Homes",
    "journey.step_2": "2. Direct Connection",
    "journey.step_3": "3. Transparent Contracts",
    "journey.step_4": "4. Safe Deposit Box",
    "journey.desc_1": "Explore properties that are physically verified and matched with legal title deeds.",
    "journey.desc_2": "Communicate directly with landlords without any pushy middleman or broker.",
    "journey.desc_3": "Digitally sign state-approved rental contracts with immutable tamper-proof logs.",
    "journey.desc_4": "Keep your security deposit secured in a joint-escrow trust account.",
  },
  hi: {
    // Navbar
    "nav.savings": "बचत कैलकुलेटर",
    "nav.careers": "करियर",
    "nav.pricing": "मूल्य निर्धारण",
    "nav.blog": "ट्रस्ट ब्लॉग",
    "nav.help": "सहायता",
    "nav.login": "लॉगिन",
    
    // Hero
    "hero.live": "वर्तमान में मेट्रो शहरों में लाइव",
    "hero.title1": "भरोसेमंद घर खोजें ",
    "hero.title2": "सिर्फ ",
    "hero.title_accent": "इनहैबी पर",
    "hero.subtitle_mobile": "सीधे मालिकों से सत्यापित घर खोजें—शून्य दलाली, शून्य आश्चर्य।",
    "hero.subtitle_desktop": "सत्यापित घर खोजें, सत्यापित मालिकों से सीधे जुड़ें, और विश्वास के साथ किराए पर लें—बिना किसी दलाली या छिपे हुए आश्चर्य के।",
    
    // Buttons
    "btn.explore": "सत्यापित घर खोजें",
    "btn.trust_score": "रेंट ट्रस्ट स्कोर जांचें",
    "btn.verify_now": "अभी सत्यापन कराएं",
    "btn.owner_list": "संपत्ति सूचीबद्ध करें (मुफ़्त)",

    // Carousel
    "carousel.badge_verified": "सत्यापित",
    "carousel.badge_no_brokerage": "कोई दलाली नहीं",
    "carousel.badge_just_updated": "अभी अपडेट किया गया",
    "carousel.title": "चुनिंदा सत्यापित सूचियां",
    "carousel.subtitle": "दैनिक अपडेटेड। भूमि रजिस्ट्री विलेखों के साथ सीधे सत्यापित किया गया।",
    "carousel.view_all": "सभी 1,200+ सूचियां देखें",
    "carousel.verify_property": "संपत्ति सत्यापित करें",
    "carousel.direct_owner": "सीधे मालिक",

    // Journeys
    "journey.tab_journey": "किराएदार और मकान मालिक यात्रा",
    "journey.tab_verification": "स्वचालित दस्तावेज़ सत्यापन",
    "journey.badge_trusted": "भरोसेमंद और सत्यापित",
    "journey.title_renter": "घर की तलाश है?",
    "journey.title_landlord": "अपनी संपत्ति सूचीबद्ध करना चाहते हैं?",
    "journey.step_1": "1. सत्यापित घर खोजें",
    "journey.step_2": "2. सीधा संपर्क",
    "journey.step_3": "3. पारदर्शी अनुबंध",
    "journey.step_4": "4. सुरक्षित जमा बॉक्स",
    "journey.desc_1": "उन संपत्तियों का पता लगाएं जो भौतिक रूप से सत्यापित हैं और कानूनी विलेखों से मेल खाती हैं।",
    "journey.desc_2": "बिना किसी बिचौलिए या दलाल के सीधे मकान मालिकों से संपर्क करें।",
    "journey.desc_3": "अपरिवर्तनीय छेड़छाड़-मुक्त लॉग के साथ डिजिटल रूप से राज्य-अनुमोदित अनुबंधों पर हस्ताक्षर करें।",
    "journey.desc_4": "अपनी सुरक्षा जमा राशि को एक संयुक्त एस्क्रो ट्रस्ट खाते में सुरक्षित रखें।",
  },
  ja: {
    // Navbar
    "nav.savings": "節約計算ツール",
    "nav.careers": "採用情報",
    "nav.pricing": "料金プラン",
    "nav.blog": "トラストブログ",
    "nav.help": "ヘルプ",
    "nav.login": "ログイン",
    
    // Hero
    "hero.live": "現在、主要都市でサービス提供中",
    "hero.title1": "信頼できる住まいを ",
    "hero.title2": "、 ",
    "hero.title_accent": "Inhabyで見つける",
    "hero.subtitle_mobile": "オーナーから直接、検証済みの物件を見つけましょう。仲介手数料ゼロ、予期せぬトラブルもありません。",
    "hero.subtitle_desktop": "検証済みの家を見つけ、検証済みのオーナーと直接つながり、安心してレンタルできます。仲介手数料や隠れた費用はありません。",
    
    // Buttons
    "btn.explore": "検証済みの物件を探す",
    "btn.trust_score": "家賃信頼スコアをチェック",
    "btn.verify_now": "今すぐ検証する",
    "btn.owner_list": "物件を掲載する（無料）",

    // Carousel
    "carousel.badge_verified": "検証済み",
    "carousel.badge_no_brokerage": "仲介手数料なし",
    "carousel.badge_just_updated": "新着情報",
    "carousel.title": "厳選された検証済み物件",
    "carousel.subtitle": "毎日更新。不動産登記簿と直接照合・検証済み。",
    "carousel.view_all": "すべての1,200件以上の物件を見る",
    "carousel.verify_property": "物件を検証する",
    "carousel.direct_owner": "オーナー直接物件",

    // Journeys
    "journey.tab_journey": "テナント＆ランドロードのジャーニー",
    "journey.tab_verification": "自動ドキュメント検証",
    "journey.badge_trusted": "信頼＆検証済み",
    "journey.title_renter": "お家をお探しですか？",
    "journey.title_landlord": "物件を掲載しますか？",
    "journey.step_1": "1. 検証済みの家を見つける",
    "journey.step_2": "2. 直接つながる",
    "journey.step_3": "3. 透明性のある契約",
    "journey.step_4": "4. 安全な預金管理",
    "journey.desc_1": "現地調査が行われ、法的な所有権登記簿と照合された安全な物件を探索できます。",
    "journey.desc_2": "強引な代理人や仲介業者を介さず、オーナーと直接やり取りが可能です。",
    "journey.desc_3": "改ざん不可能なデジタルログを使用して、州承認の賃貸契約に安全に署名します。",
    "journey.desc_4": "お客様の保証金を、共同エスクロー信託口座で安全に保管・管理します。",
  },
  zh: {
    // Navbar
    "nav.savings": "省钱计算器",
    "nav.careers": "职业生涯",
    "nav.pricing": "定价",
    "nav.blog": "信任博客",
    "nav.help": "帮助",
    "nav.login": "登录",
    
    // Hero
    "hero.live": "目前已在各大都市开通",
    "hero.title1": "寻找值得信赖的房源 ",
    "hero.title2": "就在 ",
    "hero.title_accent": "Inhaby",
    "hero.subtitle_mobile": "直接向业主寻找经过验证的房源——零中介费，零套路。",
    "hero.subtitle_desktop": "发现经过验证的房源，直接与经过验证的业主联系，充满信心地租房——无需中介费，也无隐藏费用。",
    
    // Buttons
    "btn.explore": "浏览已验证房源",
    "btn.trust_score": "测试租房信用分",
    "btn.verify_now": "立即验证我的租赁",
    "btn.owner_list": "免费发布房源",

    // Carousel
    "carousel.badge_verified": "已验证",
    "carousel.badge_no_brokerage": "零中介费",
    "carousel.badge_just_updated": "刚刚更新",
    "carousel.title": "严选已验证房源",
    "carousel.subtitle": "每日更新。通过土地产权契据直接进行人工严格审核和验证。",
    "carousel.view_all": "查看全部 1,200+ 房源",
    "carousel.verify_property": "验证房源",
    "carousel.direct_owner": "业主直租",

    // Journeys
    "journey.tab_journey": "租客与房东指南",
    "journey.tab_verification": "自动化文档验证",
    "journey.badge_trusted": "信赖与安全",
    "journey.title_renter": "正在寻找温馨的家？",
    "journey.title_landlord": "想要发布您的房源？",
    "journey.step_1": "1. 寻找已验证房源",
    "journey.step_2": "2. 与业主直连",
    "journey.step_3": "3. 透明化的电子合同",
    "journey.step_4": "4. 押金信托托管",
    "journey.desc_1": "浏览经过实地考察并与法律契据完美匹配的真实房源。",
    "journey.desc_2": "直接与房东进行沟通，避开中介话术和高昂中介费。",
    "journey.desc_3": "在线签署受法律保护的合同，具备防篡改的区块链式存证日志。",
    "journey.desc_4": "将您的租房押金安全存管在受监管的联合托管信托账户中。",
  },
  ko: {
    // Navbar
    "nav.savings": "절약 계산기",
    "nav.careers": "채용 정보",
    "nav.pricing": "요금 안내",
    "nav.blog": "신뢰 블로그",
    "nav.help": "도움말",
    "nav.login": "로그인",
    
    // Hero
    "hero.live": "현재 대도시 서비스 제공 중",
    "hero.title1": "신뢰할 수 있는 집 찾기 ",
    "hero.title2": "오직 ",
    "hero.title_accent": "Inhaby에서",
    "hero.subtitle_mobile": "집주인으로부터 직접 검증된 주택을 찾아보세요 — 중개 수수료 제로, 예상치 못한 비용 제로.",
    "hero.subtitle_desktop": "검증된 집을 찾고, 검증된 집주인과 직접 소통하며 안심하고 렌트하세요 — 중개 수수료나 숨겨진 비용 없이.",
    
    // Buttons
    "btn.explore": "검증된 주택 둘러보기",
    "btn.trust_score": "렌트 신뢰 등급 확인",
    "btn.verify_now": "지금 즉시 임대 검증하기",
    "btn.owner_list": "내 매물 등록하기 (무료)",

    // Carousel
    "carousel.badge_verified": "인증 완료",
    "carousel.badge_no_brokerage": "중개료 없음",
    "carousel.badge_just_updated": "방금 업데이트",
    "carousel.title": "엄선된 검증 완료 매물",
    "carousel.subtitle": "매일 업데이트. 토지 대장 및 등기부 등본과 직접 교차 대조하여 실시간 확인 완료.",
    "carousel.view_all": "전체 1,200+ 매물 보기",
    "carousel.verify_property": "매물 검증하기",
    "carousel.direct_owner": "집주인 직거래",

    // Journeys
    "journey.tab_journey": "세입자 & 임대인 맞춤 여정",
    "journey.tab_verification": "자동화 서류 검증 시스템",
    "journey.badge_trusted": "신뢰 및 검증 완료",
    "journey.title_renter": "집을 찾고 계신가요?",
    "journey.title_landlord": "소유한 매물을 올리고 싶으신가요?",
    "journey.step_1": "1. 검증된 매물 찾기",
    "journey.step_2": "2. 집주인 직접 연결",
    "journey.step_3": "3. 투명한 임대차 계약",
    "journey.step_4": "4. 안전 보증금 에스크로",
    "journey.desc_1": "현장 조사를 완수하고 실제 법적 소유권 대장과 일치하는 실매물만 탐색합니다.",
    "journey.desc_2": "불필요한 중개 수수료나 집값 띄우기 없이 집주인과 안전하게 직접 연락합니다.",
    "journey.desc_3": "정부 표준 임대 계약서를 기반으로 위변조 방지 기술이 적용된 계약을 디지털로 체결합니다.",
    "journey.desc_4": "안전하게 회수할 수 있도록 보증금을 금융사 연계 공동 에스크로 계좌에 예치합니다.",
  },
};

// Global map to track original English values of DOM text nodes and input placeholders
const originalTexts = new WeakMap<Node, string>();

const wordDictionary: Record<Exclude<LanguageCode, "en">, Record<string, string>> = {
  hi: {
    "savings": "बचत",
    "calculator": "कैलकुलेटर",
    "careers": "करियर",
    "pricing": "मूल्य निर्धारण",
    "blog": "ब्लॉग",
    "help": "सहायता",
    "login": "लॉगिन",
    "explore": "खोजें",
    "verified": "सत्यापित",
    "brokerage": "दलाली",
    "home": "घर",
    "back": "पीछे",
    "send": "भेजें",
    "free": "मुफ़्त",
    "value": "मूल्य",
    "check": "जांचें",
    "rent": "किराया",
    "trust": "ट्रस्ट",
    "score": "स्कोर",
    "verify": "सत्यापित करें",
    "property": "संपत्ति",
    "owner": "मालिक",
    "tenant": "किराएदार",
    "direct": "सीधा",
    "zero": "शून्य",
    "e-stamp": "ई-स्टांप",
    "privacy": "गोपनीयता",
    "terms": "शर्तें",
    "service": "सेवा",
    "security": "सुरक्षा",
    "support": "सहायता",
    "contact": "संपर्क",
    "about": "के बारे में",
    "mission": "मिशन",
    "portal": "पोर्टل",
    "agreement": "समझौता",
    "contract": "अनुबंध",
    "escrow": "एस्क्रो",
    "deposit": "जमा",
    "safe": "सुरक्षित",
    "metro": "मेट्रो",
    "cities": "शहर",
    "live": "लाइव",
    "daily": "दैनिक",
    "updated": "अपडेट किया गया",
    "listings": "सूचियां",
    "view": "देखें",
    "all": "सभी",
    "room": "कमरा",
    "actual": "वास्तविक",
    "wide-angle": "वाइड-एंगल",
    "wide": "वाइड",
    "angle": "कोण",
    "cgi": "सीजीआई",
    "render": "रेंडर",
    "photos": "तस्वीरें",
    "real": "वास्तविक",
    "honest": "ईमानदार",
    "genuine": "असली",
    "deed": "विलेख",
    "identity": "पहचान",
    "aadhaar": "आधार",
    "passport": "पासपोर्ट",
    "government": "सरकार",
    "credentials": "साख",
    "matched": "मेल खाता",
    "ananya": "अनन्या",
    "roy": "रॉय",
    "lease": "पट्टा",
    "drafting": "प्रारूपण",
    "society": "सोसाइटी",
    "maintenance": "रखरखाव",
    "fee": "शुल्क",
    "fees": "शुल्क",
    "hidden": "छिपा हुआ",
    "lock": "ताला",
    "ecosystem": "पारिस्थितिकी तंत्र",
    "fraud": "धोखाधड़ी",
    "report": "रिपोर्ट",
    "kyc": "केवाईसी",
    "status": "स्थिति",
    "notification": "अधिसूचना",
    "filter": "फिल्टर",
    "dashboard": "डैशबोर्ड",
    "labels": "लेबल",
    "stamps": "स्टांप",
    "stamp": "स्टांप",
    "legal": "कानूनी",
    "blockchain": "ब्लॉकचेन",
    "immutable": "अपरिवर्तनीय",
    "registry": "रजिस्ट्री",
    "inspection": "निरीक्षण",
    "manual": "मैन्युअल",
    "ai": "एआई",
    "document": "दस्तावेज़",
    "ownership": "स्वामित्व",
    "landlord": "मकान मालिक",
    "preparing": "तैयार करना",
    "relocation": "स्थानांतरण",
    "affordability": "किफायती",
    "co-living": "सह-रहना",
    "pg": "पीजी",
    "hostel": "छात्रावास",
    "apartment": "अपार्टमेंट",
    "house": "मकान",
    "roommate": "कमरे का साथी",
    "e-sign": "ई-साइन",
    "stamping": "स्टांपिंग",
    "refund": "वापसी",
    "dispute": "विवाद",
    "resolution": "समाधान",
    "ledger": "बहीखाता",
    "rejected": "अस्वीकृत",
    "pending": "लंबित",
    "active": "सक्रिय",
    "inactive": "निष्क्रिय",
    "successful": "सफल",
    "failed": "विफल",
    "processing": "प्रसंस्करण",
    "completed": "पूरा हुआ",
    "yes": "हाँ",
    "no": "नहीं",
    "month": "महीना",
    "months": "महीने",
    "year": "साल",
    "years": "साल",
    "day": "दिन",
    "days": "दिन",
    "ago": "पहले",
    "just": "अभी",
    "now": "अभी",
    "today": "आज",
    "tomorrow": "कल",
    "yesterday": "कल",
    "search": "खोजें",
    "select": "चुनें",
    "enter": "दर्ज करें",
    "submit": "जमा करें",
    "cancel": "रद्द करें",
    "save": "सहेजें",
    "close": "बंद करें",
    "open": "खोलें",
    "total": "कुल",
    "amount": "राशि",
    "price": "कीमत"
  },
  ja: {
    "savings": "節約",
    "calculator": "計算ツール",
    "careers": "採用情報",
    "pricing": "料金プラン",
    "blog": "ブログ",
    "help": "ヘルプ",
    "login": "ログイン",
    "explore": "探す",
    "verified": "検証済み",
    "brokerage": "仲介手数料",
    "home": "ホーム",
    "back": "戻る",
    "send": "送信",
    "free": "無料",
    "value": "価値",
    "check": "チェック",
    "rent": "家賃",
    "trust": "信頼",
    "score": "スコア",
    "verify": "検証する",
    "property": "物件",
    "owner": "オーナー",
    "tenant": "テナント",
    "direct": "直接",
    "zero": "ゼロ",
    "e-stamp": "電子スタンプ",
    "privacy": "プライバシー",
    "terms": "規約",
    "service": "サービス",
    "security": "セキュリティ",
    "support": "サポート",
    "contact": "連絡先",
    "about": "概要",
    "mission": "ミッション",
    "portal": "ポータル",
    "agreement": "合意",
    "contract": "契約",
    "escrow": "エスクロー",
    "deposit": "預金",
    "safe": "安全",
    "metro": "メトロ",
    "cities": "都市",
    "live": "ライブ",
    "daily": "毎日",
    "updated": "更新済み",
    "listings": "物件一覧",
    "view": "見る",
    "all": "すべて",
    "room": "部屋",
    "actual": "実際",
    "wide-angle": "広角",
    "wide": "広角",
    "angle": "アングル",
    "cgi": "CGI",
    "render": "レンダリング",
    "photos": "写真",
    "real": "リアル",
    "honest": "誠実",
    "genuine": "本物",
    "deed": "権利証書",
    "identity": "身元",
    "aadhaar": "Aadhaar",
    "passport": "パスポート",
    "government": "政府",
    "credentials": "認証情報",
    "matched": "一致",
    "ananya": "アナニヤ",
    "roy": "ロイ",
    "lease": "賃貸借",
    "drafting": "作成",
    "society": "ソサエティ",
    "maintenance": "維持費",
    "fee": "手数料",
    "fees": "料金",
    "hidden": "隠れた",
    "lock": "ロック",
    "ecosystem": "エコシステム",
    "fraud": "詐欺",
    "report": "報告",
    "kyc": "KYC",
    "status": "ステータス",
    "notification": "通知",
    "filter": "フィルター",
    "dashboard": "ダッシュボード",
    "labels": "ラベル",
    "stamps": "スタンプ",
    "stamp": "スタンプ",
    "legal": "法的",
    "blockchain": "ブロックチェーン",
    "immutable": "不変",
    "registry": "登記簿",
    "inspection": "調査",
    "manual": "目視",
    "ai": "AI",
    "document": "書類",
    "ownership": "所有権",
    "landlord": "大家",
    "preparing": "準備",
    "relocation": "転居",
    "affordability": "手頃さ",
    "co-living": "コリービング",
    "pg": "PG",
    "hostel": "ホステル",
    "apartment": "アパート",
    "house": "一軒家",
    "roommate": "ルームメイト",
    "e-sign": "電子署名",
    "stamping": "スタンプ処理",
    "refund": "返金",
    "dispute": "紛争",
    "resolution": "解決",
    "ledger": "台帳",
    "rejected": "却下",
    "pending": "保留中",
    "active": "有効",
    "inactive": "無効",
    "successful": "成功",
    "failed": "失敗",
    "processing": "処理中",
    "completed": "完了",
    "yes": "はい",
    "no": "いいえ",
    "month": "月",
    "months": "ヶ月",
    "year": "年",
    "years": "年",
    "day": "日",
    "days": "日",
    "ago": "前",
    "just": "たった今",
    "now": "今",
    "today": "今日",
    "tomorrow": "明日",
    "yesterday": "昨日",
    "search": "検索",
    "select": "選択",
    "enter": "入力",
    "submit": "送信",
    "cancel": "キャンセル",
    "save": "保存",
    "close": "閉じる",
    "open": "開く",
    "total": "合計",
    "amount": "金額",
    "price": "価格"
  },
  zh: {
    "savings": "省钱",
    "calculator": "计算器",
    "careers": "职业生涯",
    "pricing": "价格",
    "blog": "博客",
    "help": "帮助",
    "login": "登录",
    "explore": "探索",
    "verified": "已验证",
    "brokerage": "中介费",
    "home": "首页",
    "back": "返回",
    "send": "发送",
    "free": "免费",
    "value": "价值",
    "check": "检查",
    "rent": "租金",
    "trust": "信任",
    "score": "分数",
    "verify": "验证",
    "property": "房源",
    "owner": "业主",
    "tenant": "租客",
    "direct": "直连",
    "zero": "零",
    "e-stamp": "电子印花",
    "privacy": "隐私",
    "terms": "条款",
    "service": "服务",
    "security": "安全",
    "support": "客服",
    "contact": "联系",
    "about": "关于",
    "mission": "使命",
    "portal": "门户",
    "agreement": "协议",
    "contract": "合同",
    "escrow": "托管",
    "deposit": "押金",
    "safe": "安全",
    "metro": "都市",
    "cities": "城市",
    "live": "在线",
    "daily": "每日",
    "updated": "更新",
    "listings": "房源列表",
    "view": "查看",
    "all": "全部",
    "room": "房间",
    "actual": "真实",
    "wide-angle": "广角",
    "wide": "广角",
    "angle": "角度",
    "cgi": "CGI",
    "render": "渲染",
    "photos": "照片",
    "real": "真实",
    "honest": "诚实",
    "genuine": "正版",
    "deed": "产权证",
    "identity": "身份",
    "aadhaar": "Aadhaar",
    "passport": "护照",
    "government": "政府",
    "credentials": "凭证",
    "matched": "匹配",
    "ananya": "阿南雅",
    "roy": "罗伊",
    "lease": "租赁",
    "drafting": "起草",
    "society": "物业",
    "maintenance": "维护费",
    "fee": "费用",
    "fees": "费用",
    "hidden": "隐藏",
    "lock": "锁定",
    "ecosystem": "生态系统",
    "fraud": "欺诈",
    "report": "举报",
    "kyc": "实名认证",
    "status": "状态",
    "notification": "通知",
    "filter": "筛选",
    "dashboard": "控制台",
    "labels": "标签",
    "stamps": "印花税",
    "stamp": "印花",
    "legal": "法律",
    "blockchain": "区块链",
    "immutable": "不可篡改",
    "registry": "登记",
    "inspection": "实地考察",
    "manual": "人工",
    "ai": "人工智能",
    "document": "文档",
    "ownership": "产权",
    "landlord": "房东",
    "preparing": "准备",
    "relocation": "搬迁",
    "affordability": "承受力",
    "co-living": "合租",
    "pg": "PG",
    "hostel": "旅馆",
    "apartment": "公寓",
    "house": "住宅",
    "roommate": "室友",
    "e-sign": "电子签名",
    "stamping": "盖印",
    "refund": "退款",
    "dispute": "争议",
    "resolution": "解决",
    "ledger": "账本",
    "rejected": "已拒绝",
    "pending": "待审核",
    "active": "活跃",
    "inactive": "不活跃",
    "successful": "成功",
    "failed": "失败",
    "processing": "处理中",
    "completed": "已完成",
    "yes": "是",
    "no": "否",
    "month": "月",
    "months": "个月",
    "year": "年",
    "years": "年",
    "day": "天",
    "days": "天",
    "ago": "前",
    "just": "刚刚",
    "now": "现在",
    "today": "今天",
    "tomorrow": "明天",
    "yesterday": "昨天",
    "search": "搜索",
    "select": "选择",
    "enter": "输入",
    "submit": "提交",
    "cancel": "取消",
    "save": "保存",
    "close": "关闭",
    "open": "打开",
    "total": "总计",
    "amount": "金额",
    "price": "价格"
  },
  ko: {
    "savings": "절약",
    "calculator": "계산기",
    "careers": "채용",
    "pricing": "요금",
    "blog": "블로그",
    "help": "도움말",
    "login": "로그인",
    "explore": "둘러보기",
    "verified": "검증됨",
    "brokerage": "중개 수수료",
    "home": "홈",
    "back": "뒤로가기",
    "send": "전송",
    "free": "무료",
    "value": "가치",
    "check": "확인",
    "rent": "임대료",
    "trust": "신뢰",
    "score": "점수",
    "verify": "검증하기",
    "property": "매물",
    "owner": "집주인",
    "tenant": "세입자",
    "direct": "직거래",
    "zero": "제로",
    "e-stamp": "전자 인지세",
    "privacy": "개인정보",
    "terms": "약관",
    "service": "서비스",
    "security": "보안",
    "support": "지원",
    "contact": "연락",
    "about": "소개",
    "mission": "미션",
    "portal": "포탈",
    "agreement": "합의",
    "contract": "계약",
    "escrow": "에스크로",
    "deposit": "보증금",
    "safe": "안전",
    "metro": "대도시",
    "cities": "도시",
    "live": "라이브",
    "daily": "매일",
    "updated": "업데이트됨",
    "listings": "매물목록",
    "view": "보기",
    "all": "전체",
    "room": "방",
    "actual": "실제",
    "wide-angle": "광각",
    "wide": "광각",
    "angle": "앵글",
    "cgi": "CGI",
    "render": "렌더",
    "photos": "사진",
    "real": "실제",
    "honest": "정직",
    "genuine": "진짜",
    "deed": "등기부",
    "identity": "신원",
    "aadhaar": "Aadhaar",
    "passport": "여권",
    "government": "정부",
    "credentials": "인증서",
    "matched": "일치",
    "ananya": "아난야",
    "roy": "로이",
    "lease": "임대",
    "drafting": "작성",
    "society": "관리단",
    "maintenance": "관리비",
    "fee": "요금",
    "fees": "요금",
    "hidden": "숨겨진",
    "lock": "잠금",
    "ecosystem": "생태계",
    "fraud": "사기",
    "report": "신고",
    "kyc": "신원인증",
    "status": "상태",
    "notification": "알림",
    "filter": "필터",
    "dashboard": "대시보드",
    "labels": "라벨",
    "stamps": "스탬프",
    "stamp": "도장",
    "legal": "법적",
    "blockchain": "블록체인",
    "immutable": "변경불가",
    "registry": "등기",
    "inspection": "실사",
    "manual": "수동",
    "ai": "인공지능",
    "document": "서류",
    "ownership": "소유권",
    "landlord": "임대인",
    "preparing": "준비",
    "relocation": "이전",
    "affordability": "적정성",
    "co-living": "셰어하우스",
    "pg": "PG",
    "hostel": "호스텔",
    "apartment": "아파트",
    "house": "단독주택",
    "roommate": "룸메이트",
    "e-sign": "전자서명",
    "stamping": "인장날인",
    "refund": "환불",
    "dispute": "분쟁",
    "resolution": "해결",
    "ledger": "원장",
    "rejected": "반려됨",
    "pending": "대기중",
    "active": "활성",
    "inactive": "비활성",
    "successful": "성공",
    "failed": "실패",
    "processing": "처리중",
    "completed": "완료됨",
    "yes": "예",
    "no": "아니오",
    "month": "월",
    "months": "개월",
    "year": "년",
    "years": "년",
    "day": "일",
    "days": "일",
    "ago": "전",
    "just": "방금",
    "now": "지금",
    "today": "오늘",
    "tomorrow": "내일",
    "yesterday": "어제",
    "search": "검색",
    "select": "선택",
    "enter": "입력",
    "submit": "제출",
    "cancel": "취소",
    "save": "저장",
    "close": "닫기",
    "open": "열기",
    "total": "합계",
    "amount": "금액",
    "price": "가격"
  }
};

function translateWordByWord(text: string, lang: LanguageCode): string {
  if (lang === "en") return text;
  const dict = wordDictionary[lang];
  if (!dict) return text;

  // Split by alphanumeric boundaries while keeping non-alphanumeric chars intact
  return text.replace(/\b[a-zA-Z0-9-]+\b/g, (match) => {
    const lower = match.toLowerCase();
    if (dict[lower]) {
      const translated = dict[lower];
      if (match === match.toUpperCase()) {
        return translated.toUpperCase();
      }
      return translated;
    }
    return match;
  });
}

/**
 * Automatically formats numbers, currencies, and dates/months to match the locale of the active language.
 */
function localizeNumbersAndDatesInText(text: string, lang: LanguageCode): string {
  const localeMap: Record<LanguageCode, string> = {
    en: "en-IN", // Indian Rupee numbering format
    hi: "hi-IN",
    ja: "ja-JP",
    zh: "zh-CN",
    ko: "ko-KR",
  };
  const locale = localeMap[lang] || "en-US";

  let result = text;

  // 1. Matches integers/decimals with optional currency symbol (₹ or $) and comma formatting
  const numberRegex = /(?:₹|\$)?\s*\d{1,3}(?:,\d{2,3})*(?:\.\d+)?|\b\d{4,12}\b/g;
  result = result.replace(numberRegex, (match) => {
    const hasRupee = match.includes("₹");
    const hasDollar = match.includes("$");
    const digitsOnly = match.replace(/[^\d.]/g, "");
    const parsedNum = parseFloat(digitsOnly);

    if (isNaN(parsedNum)) return match;

    let formatted = parsedNum.toLocaleString(locale);

    if (hasRupee) {
      formatted = "₹" + formatted;
    } else if (hasDollar) {
      formatted = "$" + formatted;
    }
    return formatted;
  });

  // 2. Localize English month names into respective languages
  if (lang !== "en") {
    const monthsEng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsHi = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    const monthsJa = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    const monthsZh = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    const monthsKo = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    const monthMap: Record<LanguageCode, string[]> = {
      en: monthsEng,
      hi: monthsHi,
      ja: monthsJa,
      zh: monthsZh,
      ko: monthsKo,
    };

    const targets = monthMap[lang];
    if (targets) {
      monthsEng.forEach((m, idx) => {
        const regex = new RegExp(`\\b${m}\\b`, "gi");
        result = result.replace(regex, targets[idx]);
      });
    }
  }

  return result;
}

/**
 * Normalizes text and searches both the base structured translations and 
 * the deep translation dictionary to locate a perfect translation.
 */
function getTranslationForText(text: string, lang: LanguageCode): string {
  if (lang === "en") return text;
  
  const trimmed = text.trim();
  if (!trimmed) return text;

  // Collapse consecutive whitespaces and newlines into single spaces for robust matching across JSX formatting
  const normalizedInput = trimmed.replace(/\s+/g, " ");

  // 1. Direct match in the comprehensive extended dictionary
  const extDict = extendedTranslations[lang] || {};
  if (extDict[trimmed]) {
    return extDict[trimmed];
  }

  // 1b. Normalized match in extended dictionary
  for (const [key, val] of Object.entries(extDict)) {
    if (key.replace(/\s+/g, " ") === normalizedInput) {
      return val;
    }
  }

  // 2. Lookup matching English text in the base translations object
  const enBase = translations["en"] || {};
  const langBase = translations[lang] || {};
  const foundKey = Object.keys(enBase).find((k) => enBase[k] === trimmed);
  if (foundKey && langBase[foundKey]) {
    return langBase[foundKey];
  }

  // 2b. Normalized lookup in the base translations object
  const foundKeyNormalized = Object.keys(enBase).find(
    (k) => enBase[k].replace(/\s+/g, " ") === normalizedInput
  );
  if (foundKeyNormalized && langBase[foundKeyNormalized]) {
    return langBase[foundKeyNormalized];
  }

  // 3. Fallback: Case-insensitive dictionary lookup
  const lowerTrimmed = trimmed.toLowerCase();
  for (const [enKey, transVal] of Object.entries(extDict)) {
    if (enKey.toLowerCase() === lowerTrimmed) {
      return transVal;
    }
  }

  // 3b. Case-insensitive and normalized dictionary lookup
  const lowerNormalized = normalizedInput.toLowerCase();
  for (const [enKey, transVal] of Object.entries(extDict)) {
    if (enKey.replace(/\s+/g, " ").toLowerCase() === lowerNormalized) {
      return transVal;
    }
  }

  // 4. Fallback: Translate word-by-word
  const wordTranslated = translateWordByWord(trimmed, lang);
  if (wordTranslated !== trimmed) {
    return wordTranslated;
  }

  return text;
}

/**
 * Recursively walks DOM nodes starting from root, saving the original English text
 * and translating to the target language on the fly.
 */
function translateNode(node: Node, lang: LanguageCode) {
  if (node.nodeType === Node.TEXT_NODE) {
    const currentVal = node.nodeValue || "";
    if (!originalTexts.has(node)) {
      originalTexts.set(node, currentVal);
    }
    
    const originalVal = originalTexts.get(node) || currentVal;
    const trimmedOriginal = originalVal.trim();
    
    if (trimmedOriginal) {
      if (lang === "en") {
        if (node.nodeValue !== originalVal) {
          node.nodeValue = originalVal;
        }
      } else {
        const translated = getTranslationForText(trimmedOriginal, lang);
        const localized = localizeNumbersAndDatesInText(translated, lang);
        if (localized !== trimmedOriginal) {
          const finalVal = originalVal.replace(trimmedOriginal, localized);
          if (node.nodeValue !== finalVal) {
            node.nodeValue = finalVal;
          }
        }
      }
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    const tagName = el.tagName.toLowerCase();
    
    // Avoid translating code, style, scripts and system metadata
    if (tagName === "script" || tagName === "style" || tagName === "code" || tagName === "pre") {
      return;
    }

    // Input & Textarea placeholder translation
    if (tagName === "input" || tagName === "textarea") {
      const inputEl = el as HTMLInputElement | HTMLTextAreaElement;
      const placeholderVal = inputEl.placeholder || "";
      if (placeholderVal) {
        if (!originalTexts.has(inputEl)) {
          originalTexts.set(inputEl, placeholderVal);
        }
        const originalPlaceholder = originalTexts.get(inputEl) || placeholderVal;
        const trimmedOriginalPlaceholder = originalPlaceholder.trim();
        if (trimmedOriginalPlaceholder) {
          if (lang === "en") {
            if (inputEl.placeholder !== originalPlaceholder) {
              inputEl.placeholder = originalPlaceholder;
            }
          } else {
            const translatedPlaceholder = getTranslationForText(trimmedOriginalPlaceholder, lang);
            const localizedPlaceholder = localizeNumbersAndDatesInText(translatedPlaceholder, lang);
            if (localizedPlaceholder !== trimmedOriginalPlaceholder) {
              inputEl.placeholder = localizedPlaceholder;
            }
          }
        }
      }
    }

    // Recurse children
    let child = node.firstChild;
    while (child) {
      translateNode(child, lang);
      child = child.nextSibling;
    }
  }
}

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Try to load language following strict priority order:
  // 0. URL Parameter (lang)
  // 1. Logged-in user preference (inhaby_user_lang)
  // 2. Local Storage (inhaby_language)
  // 3. Browser Language (navigator.language)
  // 4. Default to English (en)
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== "undefined") {
      // Prioritize manual user selection over everything (including stale URL query parameters)
      const manualSelection = localStorage.getItem("inhaby_manual_lang_selected");
      const userPref = localStorage.getItem("inhaby_user_lang") as LanguageCode;
      if (manualSelection === "true" && userPref && ["en", "hi", "ja", "zh", "ko"].includes(userPref)) {
        return userPref;
      }

      // 0. URL search parameter
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang") as LanguageCode;
      if (urlLang && ["en", "hi", "ja", "zh", "ko"].includes(urlLang)) {
        return urlLang;
      }

      // 1. Logged-in user preference
      if (userPref && ["en", "hi", "ja", "zh", "ko"].includes(userPref)) {
        return userPref;
      }

      // 2. Local Storage
      const saved = localStorage.getItem("inhaby_language") as LanguageCode;
      if (saved && ["en", "hi", "ja", "zh", "ko"].includes(saved)) {
        return saved;
      }

      // 3. Browser Language
      const bLang = (navigator.language || "").split("-")[0].toLowerCase() as LanguageCode;
      if (["en", "hi", "ja", "zh", "ko"].includes(bLang)) {
        return bLang;
      }
    }
    // 4. Default
    return "en";
  });

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    localStorage.setItem("inhaby_language", code);
    localStorage.setItem("inhaby_user_lang", code); // Sync both storage keys to preserve preference
    localStorage.setItem("inhaby_manual_lang_selected", "true"); // Flag manual selection to bypass stale url params
    const found = languages.find((l) => l.code === code);
    if (found) {
      localStorage.setItem("inhaby_language_name", found.name);
    }
    // Update URL query parameter without page reload safely (wrapped to handle sandboxed iframe rules)
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", code);
        window.history.pushState({}, "", url.toString());
      } catch (err) {
        console.warn("Failed to push history state in iframe sandbox:", err);
      }
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  // Real-time DOM Translation hook and MutationObserver
  useEffect(() => {
    // 1. Correctly identify lang on HTML element for accessibility & SEO (Chinese -> zh-CN)
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;

    // Update or add hreflang tags in the document head to prevent layout shifts & improve SEO
    const existingHreflangs = document.querySelectorAll("link[rel='alternate'][hreflang]");
    existingHreflangs.forEach((el) => el.remove());

    const currentUrl = new URL(window.location.href);
    
    // Add alternate links for each language
    languages.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lang.code;
      const url = new URL(currentUrl.toString());
      url.searchParams.set("lang", lang.code);
      link.href = url.toString();
      document.head.appendChild(link);
    });

    // Add x-default pointing to English or default URL without query param
    const defaultLink = document.createElement("link");
    defaultLink.rel = "alternate";
    defaultLink.hreflang = "x-default";
    const defaultUrl = new URL(currentUrl.toString());
    defaultUrl.searchParams.delete("lang");
    defaultLink.href = defaultUrl.toString();
    document.head.appendChild(defaultLink);

    // 2. Trigger initial complete scan of document body
    translateNode(document.body, language);

    // 3. Setup robust MutationObserver to translate any newly added or modified nodes
    const observer = new MutationObserver((mutations) => {
      // Temporarily disconnect observer to prevent mutation loops during modifications
      observer.disconnect();

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            translateNode(node, language);
          });
        } else if (mutation.type === "characterData") {
          const node = mutation.target;
          const currentVal = node.nodeValue || "";
          
          // Detect if React updated the node's underlying value, meaning the original has changed
          const originalVal = originalTexts.get(node);
          const expectedTranslated = originalVal ? getTranslationForText(originalVal.trim(), language) : "";
          const expectedFull = originalVal && expectedTranslated 
            ? originalVal.replace(originalVal.trim(), expectedTranslated) 
            : "";

          if (currentVal !== expectedFull && currentVal !== originalVal) {
            // New text rendered dynamically by React (e.g. calculator values); update original mapping
            originalTexts.set(node, currentVal);
          }
          
          translateNode(node, language);
        }
      });

      // Re-observe after handling modifications safely
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Cleanup observer on unmount or before next run
    return () => {
      observer.disconnect();
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
