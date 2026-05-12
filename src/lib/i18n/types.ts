export type Locale = "id" | "en";

export interface Dictionary {
  // Navbar
  nav: {
    diagnostic: string;
    catalog: string;
    dashboard: string;
    getStarted: string;
  };
  // Footer
  footer: {
    description: string;
    madeWith: string;
    forBeautyEnthusiasts: string;
    explore: string;
    skinDiagnostic: string;
    beautyCatalog: string;
    recommendations: string;
    company: string;
    aboutUs: string;
    privacyPolicy: string;
    termsOfService: string;
    contactUs: string;
    allRightsReserved: string;
  };
  // Home page
  home: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;
    startQuiz: string;
    exploreCatalog: string;
    lovedByUsers: string;
    skinTypeAnalyzed: string;
    analyzed: string;
    perfectMatch: string;
    accurate: string;
    // Problem section
    commonProblem: string;
    whyWrongMakeup: string;
    problemDescription: string;
    problem1Title: string;
    problem1Desc: string;
    problem1Solution: string;
    problem2Title: string;
    problem2Desc: string;
    problem2Solution: string;
    problem3Title: string;
    problem3Desc: string;
    problem3Solution: string;
    tryQuiz: string;
    // Triple Skin Diagnostic section
    howItWorks: string;
    tripleSkinTitle: string;
    tripleSkinDesc: string;
    step01: string;
    step02: string;
    step03: string;
    skinType: string;
    skinTone: string;
    faceShape: string;
    skinTypeDesc: string;
    skinToneDesc: string;
    faceShapeDesc: string;
    startFreeDiagnostic: string;
    // Featured catalog
    curatedForYou: string;
    featuredCatalog: string;
    featuredDesc: string;
    viewAll: string;
    viewAllProducts: string;
    // Testimonials
    testimonials: string;
    whatCommunitySays: string;
    says: string;
    // CTA section
    readyToFind: string;
    readyToFindHighlight: string;
    ctaDescription: string;
    seeAllProducts: string;
    proMuaRecommendation: string;
  };
  // Diagnostic page
  diagnostic: {
    badge: string;
    title: string;
    description: string;
    // Quiz steps
    step1of3: string;
    step2of3: string;
    step3of3: string;
    whatSkinType: string;
    skinTypeInstruction: string;
    oily: string;
    oilyDesc: string;
    dry: string;
    dryDesc: string;
    combination: string;
    combinationDesc: string;
    normal: string;
    normalDesc: string;
    sensitive: string;
    sensitiveDesc: string;
    skinToneUndertone: string;
    skinToneInstruction: string;
    jewelryQuestion: string;
    gold: string;
    silver: string;
    both: string;
    veinQuestion: string;
    green: string;
    bluePurple: string;
    mixed: string;
    selectSkinDepth: string;
    faceShapeTitle: string;
    faceShapeInstruction: string;
    oval: string;
    round: string;
    square: string;
    heart: string;
    diamond: string;
    oblong: string;
    // Results
    profileReady: string;
    personalizedProfile: string;
    viewMatchingProducts: string;
    retakeQuiz: string;
    back: string;
    continue_: string;
    seeResults: string;
  };
  // Products page
  products: {
    badge: string;
    title: string;
    description: string;
    showing: string;
    productsText: string;
    noProducts: string;
    noProductsDesc: string;
    personalizedForYou: string;
  };
  // Recommend page
  recommend: {
    title: string;
    description: string;
    howSkinFeel: string;
    skinFeelDesc: string;
    whatSkinTone: string;
    skinToneDesc: string;
    whatFaceShape: string;
    faceShapeDesc: string;
    findingMatches: string;
    aiAnalyzing: string;
    recommendedForYou: string;
    basedOnProfile: string;
    viewDetails: string;
    startOver: string;
    noMatches: string;
    noMatchesDesc: string;
    tryAgain: string;
    getResults: string;
    back: string;
    continue_: string;
  };
  // Dashboard
  dashboard: {
    title: string;
    description: string;
    upgradeToPremium: string;
    upgradeDesc: string;
    profileViews: string;
    totalVisits: string;
    totalClicks: string;
    thisMonth: string;
    balance: string;
    balanceAccumulated: string;
    activeProducts: string;
    onPublicProfile: string;
    affiliateCode: string;
    affiliateCodeDesc: string;
    selectProducts: string;
    selectProductsDesc: string;
  };
}
