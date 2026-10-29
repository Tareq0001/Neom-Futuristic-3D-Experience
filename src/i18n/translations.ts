/**
 * NEOM 3D Futuristic Experience - Complete Bilingual Dictionary
 * Designed & Created by Tareq Abuashi
 */

export interface SectorData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  innovations: string[];
}

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  creatorTag: string;
  creatorRole: string;
  systemOnline: string;
  timeRiyadh: string;
  audioToggle: string;
  themeToggle: string;
  droneMode: string;
  orbitMode: string;
  resetCamera: string;
  teleportTo: string;
  sectorsTitle: string;
  simulatorsTitle: string;
  transitTab: string;
  energyTab: string;
  atmosphereTitle: string;
  dayCyber: string;
  sunsetAmber: string;
  neonNight: string;
  frostBlizzard: string;
  
  // Maglev Simulator
  maglevTitle: string;
  maglevSubtitle: string;
  maglevOrigin: string;
  maglevDest: string;
  maglevLaunch: string;
  maglevLaunching: string;
  maglevDistance: string;
  maglevEta: string;
  maglevSpeed: string;
  maglevGforce: string;
  maglevEnergy: string;
  maglevStatusReady: string;
  maglevStatusCruising: string;
  maglevUnitKm: string;
  maglevUnitMin: string;
  maglevUnitKmh: string;

  // Energy Simulator
  energyTitle: string;
  energySubtitle: string;
  solarIrradiance: string;
  windVelocity: string;
  hydrogenProd: string;
  totalGeneration: string;
  gridDemand: string;
  batteryStorage: string;
  carbonOffset: string;
  cleanEnergyRatio: string;
  energySurplus: string;

  // HUD & Modals
  systemTelemetry: string;
  fps: string;
  polygons: string;
  coordinates: string;
  aboutProject: string;
  aboutDescription: string;
  close: string;

  // Sectors
  sectors: Record<string, SectorData>;
}

export const translations: Record<'ar' | 'en', Translations> = {
  ar: {
    appTitle: "نِـيـوم | تجربة الميتافيرس ثلاثية الأبعاد",
    appSubtitle: "ذا لاين، أوكساجون، تروجينا، وسندالة — عاصمة المستقبل ومملكة الحلم",
    creatorTag: "الفكرة والتطوير والبرمجة المعمارية: أ. طارق ابوعشي",
    creatorRole: "كبير مهندسي النظم والمطور الإبداعي",
    systemOnline: "الأنظمة التشغيلية متصلة بنجاح",
    timeRiyadh: "توقيت نيوم (KSA UTC+3)",
    audioToggle: "المؤثرات الصوتية",
    themeToggle: "نمط العرض",
    droneMode: "جولة الدرون السينمائية",
    orbitMode: "التحكم الحر ثلاثي الأبعاد",
    resetCamera: "إعادة ضبط المنظور",
    teleportTo: "انتقال فوري إلى القطاع",
    sectorsTitle: "قطاعات نيوم الكبرى",
    simulatorsTitle: "محاكيات الطاقة والنقل الفائق",
    transitTab: "قطار ماجليف الفائق",
    energyTab: "شبكة الطاقة النظيفة 100%",
    atmosphereTitle: "البيئة والطقس الديناميكي",
    dayCyber: "نهار نيوم الساطع",
    sunsetAmber: "غروب ساحل البحر الأحمر",
    neonNight: "ليل النيون السيبراني",
    frostBlizzard: "عاصفة قمم تروجينا الجليدية",

    maglevTitle: "محاكي قطار ماجليف فائق السرعة",
    maglevSubtitle: "نظام النقل المعلق الفوري بسرعة 510 كم/س وبطاقة نظيفة صفرية الانبعاثات",
    maglevOrigin: "محطة الانطلاق",
    maglevDest: "محطة الوصول",
    maglevLaunch: "إطلاق الكبسولة فائقة السرعة",
    maglevLaunching: "الكبسولة تنطلق بسرعة قصوى...",
    maglevDistance: "المسافة المقطوعة",
    maglevEta: "زمن الرحلة التقديري",
    maglevSpeed: "السرعة التشغيلية",
    maglevGforce: "قوة التسارع G-Force",
    maglevEnergy: "استهلاك الطاقة المتجددة",
    maglevStatusReady: "جاهز للانطلاق على المسار الكهرومغناطيسي",
    maglevStatusCruising: "تسارع هيدروجيني نشط على المسار المفرغ",
    maglevUnitKm: "كم",
    maglevUnitMin: "دقيقة",
    maglevUnitKmh: "كم / ساعة",

    energyTitle: "محاكي شبكة الطاقة المتجددة 100%",
    energySubtitle: "موازنة فورية بين الطاقة الشمسية والرياح والهيدروجين الأخضر",
    solarIrradiance: "سطوع الإشعاع الشمسي (حقول تبوك)",
    windVelocity: "سرعة الرياح (خليج العقبة)",
    hydrogenProd: "إنتاج مصنع هيليوس للهيدروجين",
    totalGeneration: "إجمالي التوليد اللحظي",
    gridDemand: "حمل استهلاك المدينة",
    batteryStorage: "احتياطي بطاريات التخزين",
    carbonOffset: "انبعاثات الكربون المحيدة",
    cleanEnergyRatio: "نسبة الطاقة النظيفة",
    energySurplus: "فائض طاقة موجّه للتصدير",

    systemTelemetry: "القياس اللحظي للأنظمة",
    fps: "معدل الإطارات",
    polygons: "المضلعات ثلاثية الأبعاد",
    coordinates: "الإحداثيات الجغرافية",
    aboutProject: "عن المنصة الرقمية",
    aboutDescription: "بيئة محاكاة تفاعلية ثلاثية الأبعاد فائقة الدقة تجسد معالم وتكنولوجيا مشروع نيوم الاستثنائي (ذا لاين، أوكساجون، تروجينا، سندالة). تجمع المنصة بين محرك رسومي متطور Three.js ومحاكيات فيزيائية واقعية للقطارات المغناطيسية الفائقة وشبكات الطاقة المتجددة 100%، تم تطويرها بالكامل وبشكل مستقل بواسطة أ. طارق ابوعشي.",
    close: "إغلاق",

    sectors: {
      theline: {
        id: "theline",
        name: "ذا لاين (THE LINE)",
        tagline: "ثورة في الحياة الحضرية تضع الإنسان والطبيعة أولاً",
        description: "مدينة خطية ثورية تمتد بطول 170 كيلومتراً وارتفاع 500 متر وعرض 200 متر فقط. بلا سيارات، بلا شوارع، وصفر انبعاثات كربونية. تتيح لقاطنيها الوصول إلى جميع المرافق الحيوية في غضون 5 دقائق سيراً على الأقدام، مع قطار فائق السرعة يقطع المدينة من طرفها إلى الآخر في 20 دقيقة.",
        stats: [
          { label: "الطول المعماري", value: "170 كم" },
          { label: "الارتفاع فوق السطح", value: "500 متر" },
          { label: "السعة السكانية", value: "9 ملايين نسمة" },
          { label: "الحفاظ على الطبيعة", value: "95% من أراضي نيوم" },
        ],
        innovations: [
          "واجهات مرايا زجاجية عملاقة تعكس الطبيعة وتندمج مع التضاريس",
          "جاذبية حضرية عمودية تنعدم فيها الشوارع والسيارات",
          "ممرات هوائية وتكييف طبيعي مستدام على مدار العام",
          "شبكة قطارات ماجليف فائقة السرعة تحت الأرض",
        ]
      },
      oxagon: {
        id: "oxagon",
        name: "أوكساجون (OXAGON)",
        tagline: "أكبر هيكل عائم صناعي متقدم ومركز الاقتصاد الأزرق",
        description: "مدينة صناعية عائمة رائدة تمثل الجيل القادم من المراكز اللوجستية المؤتمتة كلياً والموانئ الصديقة للبيئة بنسبة 100%. تحتضن أكبر مصنع للهيدروجين الأخضر في العالم (مشروع هيليوس) وتعتمد على الروبوتات والذكاء الاصطناعي في إدارة سلاسل الإمداد العالمية.",
        stats: [
          { label: "التصميم الهندسي", value: "ثماني الأضلاع عائم" },
          { label: "الطاقة التشغيلية", value: "متجددة 100%" },
          { label: "الموقع الاستراتيجي", value: "قناة السويس - البحر الأحمر" },
          { label: "إنتاج الهيدروجين", value: "600 طن يومياً" },
        ],
        innovations: [
          "أكبر مجمع صناعي عائم في العالم فوق سطح البحر",
          "ميناء مؤتمت بالكامل مدعوم بإنترنت الأشياء والروبوتات",
          "مصنع هيليوس لإنتاج الهيدروجين الأخضر وتصديره عالمياً",
          "أنظمة تحلية مياه متقدمة بتقنية الصفر تصريف سائل (ZLD)",
        ]
      },
      trojena: {
        id: "trojena",
        name: "تروجينا (TROJENA)",
        tagline: "وجهة السياحة الجبلية والجليدية الأولى في الخليج العربي",
        description: "وجهة سياحية جبلية عالمية فريدة في قمم جبال نيوم، تتراوح ارتفاعاتها بين 1,500 و2,600 متر. توفر أول تجربة تزلج خارجي على الجليد الطبيعي والاصطناعي في المنطقة، وتضم بحيرة مياه عذبة صناعية عملاقة ومحمية جبلية بيئية متطورة.",
        stats: [
          { label: "الارتفاع الجبلي", value: "2,600 متر" },
          { label: "درجات الحرارة", value: "تنخفض لتحت الصفر شتاءً" },
          { label: "البحيرة المركزية", value: "بحيرة مياه عذبة عملاقة" },
          { label: "الألعاب الآسيوية الشتوية", value: "المضيف الرسمي 2029" },
        ],
        innovations: [
          "منحدرات تزلج جليدية على مدار أشهر الشتاء بقرية سياحية معلقة",
          "القرية العمودية (The Vault) المنحوتة داخل الجبل بتقنيات مستقبلية",
          "مرصد فلكي متطور وأنشطة سياحة بيئية ومغامرات فائقة التطور",
          "هندسة بيئية تحافظ على المنظومة الصخرية الطبيعية لجبال السروات",
        ]
      },
      sindalah: {
        id: "sindalah",
        name: "سندالة (SINDALAH)",
        tagline: "أولى وجهات نيوم الفاخرة وبوابة اليخوت إلى البحر الأحمر",
        description: "جزيرة فائقة الفخامة ووجهة عالمية لعشاق الإبحار والجولف والغوص. تمتد على مساحة 840,000 متر مربع في مياه البحر الأحمر الفيروزية الساحرة، وتضم مارينا متطورة لليخوت الفاخرة، وملاعب جولف بطولية، ومنتجعات بيوفيلية عضوية تتماشى مع الشعب المرجانية.",
        stats: [
          { label: "المساحة الإجمالية", value: "840,000 م²" },
          { label: "مارينا اليخوت", value: "86 رصيفاً لليخوت الفارهة" },
          { label: "ملعب الجولف", value: "18 حفرة ذو معايير بطولية" },
          { label: "الشعاب المرجانية", value: "محمية بحرية مستدامة 100%" },
        ],
        innovations: [
          "تصاميم معمارية بيوفيلية انسيابية تحاكي تضاريس الأصداف البحرية",
          "تقنيات إنارة شاطئية ذكية تحمي الأحياء المائية والسلاحف النادرة",
          "مرافئ يخوت فائقة الحداثة مع خدمات صيانة وطاقة هيدروجينية نظيفة",
          "أول وجهة تبدأ باستقبال الزوار والرواد كأيقونة حية لنيوم",
        ]
      }
    }
  },
  en: {
    appTitle: "NEOM | The 3D Metaverse Cyber-Metropolis",
    appSubtitle: "The Line, Oxagon, Trojena & Sindalah — The Capital of the Future",
    creatorTag: "Concept, System Architecture & Engineering: Tareq Abuashi",
    creatorRole: "Lead Systems Architect & Creative Technologist",
    systemOnline: "Operational Subsystems Online",
    timeRiyadh: "NEOM Time (KSA UTC+3)",
    audioToggle: "Acoustic Effects",
    themeToggle: "Visual Mode",
    droneMode: "Cinematic Drone Cam",
    orbitMode: "Free 3D Orbit Controls",
    resetCamera: "Reset Perspective",
    teleportTo: "Quantum Warp to Sector",
    sectorsTitle: "NEOM Strategic Megasectors",
    simulatorsTitle: "Transit & Clean Energy Simulators",
    transitTab: "High-Speed Maglev",
    energyTab: "100% Renewable Grid",
    atmosphereTitle: "Atmosphere & Lighting Engine",
    dayCyber: "Cyberpunk Daylight",
    sunsetAmber: "Red Sea Amber Sunset",
    neonNight: "Obsidian Neon Night",
    frostBlizzard: "Trojena Alpine Blizzard",

    maglevTitle: "Hyper-Speed Maglev Transit Calculator",
    maglevSubtitle: "Zero-emission levitation transit travelling at 510 km/h across hyperloop tubes",
    maglevOrigin: "Departure Station",
    maglevDest: "Arrival Station",
    maglevLaunch: "Dispatch High-Speed Pod",
    maglevLaunching: "Pod accelerating at maximum throughput...",
    maglevDistance: "Calculated Distance",
    maglevEta: "Estimated Transit Time",
    maglevSpeed: "Cruise Velocity",
    maglevGforce: "Kinetic Acceleration",
    maglevEnergy: "Renewable Consumption",
    maglevStatusReady: "Ready for launch along superconducting electromagnetic track",
    maglevStatusCruising: "Active hydrogen-hybrid thrust inside low-pressure tube",
    maglevUnitKm: "km",
    maglevUnitMin: "min",
    maglevUnitKmh: "km/h",

    energyTitle: "100% Renewable Energy Grid Simulator",
    energySubtitle: "Real-time automated balancing of Solar, Wind, and Green Hydrogen reserves",
    solarIrradiance: "Solar Irradiance (Tabuk Solar Fields)",
    windVelocity: "Wind Velocity (Gulf of Aqaba Turbines)",
    hydrogenProd: "Helios Green Hydrogen Generation",
    totalGeneration: "Total Power Generation",
    gridDemand: "Metropolitan Base Load",
    batteryStorage: "Megapack Storage Capacity",
    carbonOffset: "Atmospheric CO₂ Offset",
    cleanEnergyRatio: "Clean Energy Index",
    energySurplus: "Export Surplus Energy",

    systemTelemetry: "Live System Telemetry",
    fps: "FPS",
    polygons: "Triangles",
    coordinates: "Geo Coordinates",
    aboutProject: "About The Platform",
    aboutDescription: "A state-of-the-art interactive 3D simulation engine rendering the iconic futuristic megaprojects of NEOM (The Line, Oxagon, Trojena, Sindalah). Featuring cutting-edge WebGL/Three.js rendering, real-time procedural audio synthesis, and interactive kinetic physics engines. Conceived, designed, and developed independently by Tareq Abuashi.",
    close: "Close",

    sectors: {
      theline: {
        id: "theline",
        name: "THE LINE",
        tagline: "A cognitive revolution in urban civil engineering putting nature first",
        description: "A revolutionary 170-kilometer linear cognitive city standing 500 meters high and only 200 meters wide. No roads, no cars, and zero carbon emissions. Built with layered vertical urbanism, residents have access to all daily amenities within a 5-minute walk and ultra-high-speed transit connecting the entire city end-to-end in 20 minutes.",
        stats: [
          { label: "Linear Length", value: "170 km" },
          { label: "Vertical Height", value: "500 m" },
          { label: "Population Capacity", value: "9 Million" },
          { label: "Nature Preservation", value: "95% of NEOM Land" },
        ],
        innovations: [
          "Monolithic mirrored glass facades seamlessly reflecting surrounding wilderness",
          "Zero-gravity vertical urbanism with stacked micro-climatic layers",
          "Natural ventilation corridors maintaining year-round microclimate comfort",
          "Subterranean 510 km/h Maglev high-speed backbone transit network",
        ]
      },
      oxagon: {
        id: "oxagon",
        name: "OXAGON",
        tagline: "The world's largest floating industrial ecosystem & blue economy hub",
        description: "A pioneering octagonal floating city representing the next generation of automated logistics, smart factories, and 100% clean-powered port operations. Home to the Helios Green Hydrogen megaproject, Oxagon sets a new global benchmark for integrated robotics and AI supply chains.",
        stats: [
          { label: "Geometry", value: "Floating Octagonal Hub" },
          { label: "Energy Source", value: "100% Renewable" },
          { label: "Location", value: "Suez Canal - Red Sea" },
          { label: "H₂ Production", value: "600 tonnes/day" },
        ],
        innovations: [
          "World's largest floating structure engineered over the Red Sea water surface",
          "Fully autonomous next-generation port with cognitive AI container routing",
          "Helios mega-facility converting sun and wind into green hydrogen for export",
          "Closed-loop zero liquid discharge (ZLD) seawater desalination plants",
        ]
      },
      trojena: {
        id: "trojena",
        name: "TROJENA",
        tagline: "The iconic mountain destination & premier outdoor ski resort of the Gulf",
        description: "An extraordinary mountain tourism destination elevated between 1,500 and 2,600 meters in the Sarawat mountain peaks of NEOM. Trojena features the region's first outdoor natural and artificial snow skiing, a massive freshwater lake, and an architectural vault carved directly into the mountain.",
        stats: [
          { label: "Peak Altitude", value: "2,600 m" },
          { label: "Winter Climate", value: "Sub-zero temperatures" },
          { label: "Central Feature", value: "Grand Freshwater Lake" },
          { label: "Asian Winter Games", value: "Official Host 2029" },
        ],
        innovations: [
          "Year-round adventure sports and high-altitude ski slopes in winter",
          "The Vault: A futuristic vertical village carved into the mountain massif",
          "Stunning high-tech astronomical observatory and biosphere reserves",
          "Pioneering ecological preservation of ancient natural alpine geology",
        ]
      },
      sindalah: {
        id: "sindalah",
        name: "SINDALAH",
        tagline: "NEOM's inaugural luxury island & ultra-prime yachting haven",
        description: "An ultra-luxurious island escape and gateway for global yachting in the crystalline waters of the Red Sea. Spanning 840,000 square meters, Sindalah offers an 86-berth superyacht marina, world-class golf courses, Michelin-starred culinary venues, and biophilic architecture that protects vibrant coral reefs.",
        stats: [
          { label: "Total Area", value: "840,000 m²" },
          { label: "Marina Capacity", value: "86 Superyacht Berths" },
          { label: "Championship Golf", value: "18-hole par-70 layout" },
          { label: "Marine Biome", value: "100% Protected Reefs" },
        ],
        innovations: [
          "Biomorphic architecture sculpted to evoke organic marine seashells",
          "Turtle-friendly intelligent night lighting protecting Red Sea biodiversity",
          "Ultra-luxury marina offering green hydrogen bunkering and zero-noise docking",
          "First destination within NEOM welcoming international travelers",
        ]
      }
    }
  }
};
