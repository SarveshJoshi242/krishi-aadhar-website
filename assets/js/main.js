/**
 * Krishi-Aadhar Flagship Website Script (Light Theme Edition)
 * Interactive Modules: AI Disease Doctor, NPK Fertilizer Calculator, Mandi Tracker, Voice Assistant, QR Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDiseaseDoctor();
  initFertilizerCalculator();
  initMandiTracker();
  initVoiceAssistant();
  initQRCodeModal();
  initCopyButtons();
  initLightbox();
});

/* ==========================================================================
   1. Navbar & Navigation
   ========================================================================== */
function initNavbar() {
  const nav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('shadow-md', 'bg-white/95', 'border-slate-200/90');
      nav.classList.remove('bg-white/80', 'border-slate-200/50');
    } else {
      nav.classList.remove('shadow-md', 'bg-white/95', 'border-slate-200/90');
      nav.classList.add('bg-white/80', 'border-slate-200/50');
    }
  });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* ==========================================================================
   2. AI Disease Doctor Simulator
   ========================================================================== */
const sampleDiseases = {
  tomato: {
    crop: 'Tomato (टमाटर / टोमॅटो)',
    disease: 'Early Blight (करपा / अगेती झुलसा)',
    pathogen: 'Alternaria solani (Fungal)',
    confidence: '98.6%',
    status: 'CONFIRMED DIAGNOSIS',
    statusColor: 'emerald',
    icon: '🍅',
    symptoms: 'Concentric dark brown rings ("bullseye" target spots) on lower older foliage surrounded by chlorotic yellow halo.',
    medicine: 'Mancozeb 75% WP or Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
    brand: 'Ridomil Gold / Amistar Top',
    dosage: '2.0 - 2.5 g per Liter of water',
    organic: 'Trichoderma viride @ 5g/L + Cold-pressed Neem Oil (1500 ppm) @ 3ml/L',
    cost: '₹320 - ₹480 per Acre',
    phi: 'Safety harvest interval: 7 days'
  },
  potato: {
    crop: 'Potato (आलू / बटाटा)',
    disease: 'Late Blight (पिछेती झुलसा / लेट ब्लाईट)',
    pathogen: 'Phytophthora infestans (Oomycete)',
    confidence: '97.4%',
    status: 'CONFIRMED DIAGNOSIS',
    statusColor: 'emerald',
    icon: '🥔',
    symptoms: 'Water-soaked irregular blackish-purple lesions rapidly expanding in high humidity; white fungal mildew on leaf undersides.',
    medicine: 'Cymoxanil 8% + Mancozeb 64% WP or Dimethomorph 50% WP',
    brand: 'Curzate M8 / Acrobat',
    dosage: '3.0 g per Liter of water',
    organic: 'Copper Oxychloride (COC 50% WP) @ 2.5g/L + Pseudomonas fluorescens',
    cost: '₹450 - ₹620 per Acre',
    phi: 'Safety harvest interval: 10 days'
  },
  cotton: {
    crop: 'Cotton (कपास / कापूस)',
    disease: 'Leaf Curl Virus (CLCuV / पान चुरमुरणे)',
    pathogen: 'Begomovirus (Whitefly Vector)',
    confidence: '96.8%',
    status: 'CONFIRMED DIAGNOSIS',
    statusColor: 'emerald',
    icon: '🌾',
    symptoms: 'Upward/downward leaf cupping, thickening of primary veins, enations (leaf-like outgrowths) on lower leaf surface.',
    medicine: 'Imidacloprid 17.8% SL or Dinotefuran 20% SG (Controls Whitefly vector)',
    brand: 'Confidor / Oshin',
    dosage: '0.5 ml per Liter of water (Vector control)',
    organic: 'Yellow Sticky Traps (16/acre) + 5% NSKE (Neem Seed Kernel Extract)',
    cost: '₹280 - ₹380 per Acre',
    phi: 'Safety harvest interval: 14 days'
  },
  rice: {
    crop: 'Rice / Paddy (धान / भात)',
    disease: 'Bacterial Leaf Blight (BLB / तांबेरा)',
    pathogen: 'Xanthomonas oryzae pv. oryzae',
    confidence: '98.1%',
    status: 'CONFIRMED DIAGNOSIS',
    statusColor: 'emerald',
    icon: '🌾',
    symptoms: 'Water-soaked to yellowish-green wavy stripes along leaf margins; milky bacterial ooze droplets visible in early morning.',
    medicine: 'Streptocycline (90:10) + Copper Oxychloride 50% WP',
    brand: 'Streptomycin Sulphate + Blitox-50',
    dosage: '6g Streptocycline + 300g COC in 200 Liters of water per acre',
    organic: 'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed',
    cost: '₹340 - ₹460 per Acre',
    phi: 'Safety harvest interval: 12 days'
  },
  sugarcane: {
    crop: 'Sugarcane (गन्ना / ऊस)',
    disease: 'Red Rot (लाल सड़न / तांबडा रोग)',
    pathogen: 'Colletotrichum falcatum (Fungal)',
    confidence: '95.9%',
    status: 'CONFIRMED DIAGNOSIS',
    statusColor: 'emerald',
    icon: '🎋',
    symptoms: 'Third and fourth leaves wither from tip; internal pith tissue shows bright red discoloration interspersed with white transverse bands.',
    medicine: 'Carbendazim 50% WP or Thiophanate Methyl 70% WP',
    brand: 'Bavistin / Roko',
    dosage: '2.0 g per Liter for sett dip & basal soil drenching',
    organic: 'Sett dipping in Trichoderma harzianum @ 10g/L for 30 minutes',
    cost: '₹550 - ₹750 per Acre',
    phi: 'Pre-planting / Early vegetative'
  },
  chilli: {
    crop: 'Chilli (मिर्च / मिरची)',
    disease: 'Anthracnose & Dieback (डाईबैक / फळसड)',
    pathogen: 'Colletotrichum capsici',
    confidence: '97.8%',
    status: 'CONFIRMED DIAGNOSIS',
    statusColor: 'emerald',
    icon: '🌶️',
    symptoms: 'Circular sunken black lesions on ripening fruits; twig tips dry up turning straw-colored from top downward ("Die-back").',
    medicine: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC or Tebuconazole 25.9% EC',
    brand: 'Custodia / Folicur',
    dosage: '1.0 ml per Liter of water',
    organic: 'Neem seed oil spray + bio-agent Bacillus subtilis @ 5ml/L',
    cost: '₹410 - ₹590 per Acre',
    phi: 'Safety harvest interval: 5 days'
  }
};

function initDiseaseDoctor() {
  const sampleBtns = document.querySelectorAll('.disease-sample-btn');
  const resultCard = document.getElementById('disease-result');
  const scannerAnimation = document.getElementById('scanner-animation');

  if (!sampleBtns.length || !resultCard) return;

  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sampleBtns.forEach(b => {
        b.classList.remove('active', 'border-emerald-600', 'bg-emerald-50', 'text-emerald-800', 'shadow-sm');
        b.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      });
      btn.classList.add('active', 'border-emerald-600', 'bg-emerald-50', 'text-emerald-800', 'shadow-sm');
      btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');

      const cropKey = btn.dataset.crop;
      const data = sampleDiseases[cropKey];
      if (!data) return;

      // Animate scan
      if (scannerAnimation) {
        scannerAnimation.classList.remove('hidden');
      }
      resultCard.style.opacity = '0.4';

      setTimeout(() => {
        if (scannerAnimation) scannerAnimation.classList.add('hidden');
        resultCard.style.opacity = '1';

        document.getElementById('res-crop').textContent = data.crop;
        document.getElementById('res-disease').textContent = data.disease;
        document.getElementById('res-confidence').textContent = data.confidence;
        document.getElementById('res-pathogen').textContent = data.pathogen;
        document.getElementById('res-symptoms').textContent = data.symptoms;
        document.getElementById('res-medicine').textContent = data.medicine;
        document.getElementById('res-brand').textContent = data.brand;
        document.getElementById('res-dosage').textContent = data.dosage;
        document.getElementById('res-organic').textContent = data.organic;
        document.getElementById('res-cost').textContent = data.cost;
        document.getElementById('res-phi').textContent = data.phi;
      }, 500);
    });
  });
}

/* ==========================================================================
   3. Soil Health NPK & 50kg Fertilizer Calculator
   ========================================================================== */
const cropNPKRequirements = {
  sugarcane: { name: 'Sugarcane (ऊस)', n: 250, p: 115, k: 115, stages: 'Basal (15%), 30-45 Days (35%), Earthing Up 90 Days (50%)' },
  cotton: { name: 'Cotton (कापूस)', n: 120, p: 60, k: 60, stages: 'Basal (20%), Squaring 45 Days (40%), Boll Formation 75 Days (40%)' },
  wheat: { name: 'Wheat (गहू)', n: 120, p: 60, k: 40, stages: 'Basal (50% N + 100% P & K), Crown Root Initiation 21 Days (25% N), Flowering (25% N)' },
  rice: { name: 'Rice / Paddy (भात)', n: 100, p: 50, k: 50, stages: 'Basal (50% N + 100% P & K), Tillering 25 Days (25% N), Panicle 45 Days (25% N)' },
  tomato: { name: 'Tomato (टोमॅटो)', n: 150, p: 100, k: 120, stages: 'Basal (30%), Vegetative 30 Days (30%), Fruit Set 60 Days (40%)' },
  corn: { name: 'Corn / Maize (मका)', n: 120, p: 60, k: 40, stages: 'Basal (33% N + 100% P & K), Knee High Stage (33% N), Tasseling (33% N)' }
};

function initFertilizerCalculator() {
  const cropSelect = document.getElementById('calc-crop');
  const acresInput = document.getElementById('calc-acres');
  const soilTypeSelect = document.getElementById('calc-soil-status');
  const phInput = document.getElementById('calc-ph');
  const calculateBtn = document.getElementById('calc-btn');

  if (!calculateBtn) return;

  function calculate() {
    const cropKey = cropSelect.value;
    const acres = parseFloat(acresInput.value) || 1;
    const soilFactor = parseFloat(soilTypeSelect.value) || 1.0;
    const ph = parseFloat(phInput.value) || 7.0;

    const req = cropNPKRequirements[cropKey] || cropNPKRequirements.sugarcane;

    // Adjusted NPK for target acres and soil fertility
    const targetN = (req.n * acres * soilFactor);
    const targetP = (req.p * acres * soilFactor);
    const targetK = (req.k * acres * soilFactor);

    // DAP provides 18% N and 46% P2O5
    // Each 50kg bag of DAP provides 23kg P2O5 and 9kg N
    const dapBags = Math.ceil(targetP / 23);
    const nFromDAP = dapBags * 9;

    // Remaining N supplied by Urea (46% N -> 23kg N per 50kg bag)
    const remainingN = Math.max(0, targetN - nFromDAP);
    const ureaBags = Math.ceil(remainingN / 23);

    // MOP provides 60% K2O (30kg K2O per 50kg bag)
    const mopBags = Math.ceil(targetK / 30);

    // Soil amendment check
    let amendmentText = "Soil pH is in optimal balanced range (6.5 – 7.8). No chemical amendment needed.";
    let amendmentClass = "text-emerald-800 bg-emerald-50 border-emerald-200";
    if (ph < 6.5) {
      const limeKg = Math.round((6.5 - ph) * 400 * acres);
      amendmentText = `⚠️ Acidic Soil detected (pH ${ph}). Recommend Agricultural Lime (CaCO₃) @ ${limeKg} kg to neutralize acidity before fertilizer application.`;
      amendmentClass = "text-amber-800 bg-amber-50 border-amber-200";
    } else if (ph > 7.8) {
      const gypsumKg = Math.round((ph - 7.5) * 500 * acres);
      amendmentText = `⚠️ Alkaline/Saline Soil detected (pH ${ph}). Recommend Agricultural Gypsum (CaSO₄·2H₂O) @ ${gypsumKg} kg to displace excess sodium.`;
      amendmentClass = "text-amber-800 bg-amber-50 border-amber-200";
    }

    // Render results
    document.getElementById('res-urea-bags').textContent = `${ureaBags} Bags`;
    document.getElementById('res-urea-kg').textContent = `(${ureaBags * 50} kg total)`;

    document.getElementById('res-dap-bags').textContent = `${dapBags} Bags`;
    document.getElementById('res-dap-kg').textContent = `(${dapBags * 50} kg total)`;

    document.getElementById('res-mop-bags').textContent = `${mopBags} Bags`;
    document.getElementById('res-mop-kg').textContent = `(${mopBags * 50} kg total)`;

    const totalCost = (ureaBags * 266) + (dapBags * 1350) + (mopBags * 1650);
    document.getElementById('res-fert-cost').textContent = `₹${totalCost.toLocaleString('en-IN')}`;
    document.getElementById('res-schedule-text').textContent = req.stages;

    const amendEl = document.getElementById('res-ph-amendment');
    amendEl.textContent = amendmentText;
    amendEl.className = `p-4 rounded-xl text-sm font-medium border ${amendmentClass}`;
  }

  calculateBtn.addEventListener('click', calculate);
  cropSelect.addEventListener('change', calculate);
  soilTypeSelect.addEventListener('change', calculate);
}

/* ==========================================================================
   4. Live APMC Mandi Price Tracker
   ========================================================================== */
const mandiData = [
  { mandi: 'Kolhapur APMC', commodity: 'Soybean (सोयाबीन)', min: 4650, max: 5120, modal: 4950, msp: 4600, trend: '+3.8%', status: 'Bullish' },
  { mandi: 'Pune APMC (Gultekdi)', commodity: 'Tomato (टोमॅटो)', min: 1400, max: 2800, modal: 2400, msp: 1200, trend: '+14.2%', status: 'Bullish' },
  { mandi: 'Nashik (Lasalgaon)', commodity: 'Onion (कांदा)', min: 1850, max: 3200, modal: 2750, msp: 1900, trend: '+8.5%', status: 'Bullish' },
  { mandi: 'Nagpur APMC', commodity: 'Cotton (कापूस - Medium Staple)', min: 7200, max: 7850, modal: 7600, msp: 7121, trend: '+2.1%', status: 'Bullish' },
  { mandi: 'Solapur APMC', commodity: 'Wheat (गहू - Sharbati)', min: 2450, max: 2950, modal: 2780, msp: 2275, trend: '+5.4%', status: 'Bullish' },
  { mandi: 'Kolhapur (Shahupuri)', commodity: 'Jaggery / Gul (गुळ)', min: 3800, max: 4600, modal: 4300, msp: 3500, trend: '+6.2%', status: 'Bullish' },
  { mandi: 'Mumbai APMC (Vashi)', commodity: 'Rice (बासमती / इंद्रायणी)', min: 3800, max: 5400, modal: 4900, msp: 2203, trend: '+1.5%', status: 'Stable' },
  { mandi: 'Sangli APMC', commodity: 'Turmeric (हळद)', min: 12500, max: 16800, modal: 14500, msp: 9500, trend: '+18.4%', status: 'Bullish' }
];

function initMandiTracker() {
  const container = document.getElementById('mandi-table-body');
  const searchInput = document.getElementById('mandi-search');
  if (!container) return;

  function renderTable(items) {
    container.innerHTML = '';
    if (!items.length) {
      container.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-slate-500 font-medium">No matching commodity or mandi found.</td></tr>`;
      return;
    }

    items.forEach(row => {
      const diffMSP = row.modal - row.msp;
      const mspBadge = diffMSP >= 0 
        ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">+₹${diffMSP} vs MSP</span>`
        : `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">-₹${Math.abs(diffMSP)} vs MSP</span>`;

      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-200/80 hover:bg-emerald-50/50 transition-colors';
      tr.innerHTML = `
        <td class="py-3.5 px-4 font-semibold text-slate-800">${row.mandi}</td>
        <td class="py-3.5 px-4 font-medium text-emerald-700">${row.commodity}</td>
        <td class="py-3.5 px-4 text-slate-600 font-mono">₹${row.min.toLocaleString('en-IN')} – ₹${row.max.toLocaleString('en-IN')}</td>
        <td class="py-3.5 px-4 font-bold text-slate-900 text-base">₹${row.modal.toLocaleString('en-IN')} <span class="text-xs font-normal text-slate-500">/ Qtl</span></td>
        <td class="py-3.5 px-4">${mspBadge}</td>
        <td class="py-3.5 px-4 font-bold text-emerald-600 font-mono">${row.trend}</td>
      `;
      container.appendChild(tr);
    });
  }

  renderTable(mandiData);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = mandiData.filter(d => 
        d.mandi.toLowerCase().includes(query) || 
        d.commodity.toLowerCase().includes(query)
      );
      renderTable(filtered);
    });
  }
}

/* ==========================================================================
   5. Multilingual Voice Assistant Demo
   ========================================================================== */
const voiceSnippets = {
  marathi: {
    lang: 'Marathi (मराठी)',
    prompt: '“माझ्या टोमॅटो पिकावर काळे डाग पडले आहेत, काय औषध फवारावे?”',
    answer: '“टोमॅटो पिकावरील लक्षणे अर्ली ब्लाईट (Early Blight) करपा रोगाची आहेत. यावर रिडोमिल गोल्ड (Ridomil Gold) किंवा मॅन्कोझेब ७५% WP २.५ ग्रॅम प्रति लिटर पाण्यात मिसळून तात्काळ फवारणी करा.”'
  },
  hindi: {
    lang: 'Hindi (हिंदी)',
    prompt: '“कपास की फसल में गुलाबी सुंडी नियंत्रण के लिए क्या उपाय करें?”',
    answer: '“गुलाबी सुंडी (Pink Bollworm) की रोकथाम के लिए फेरोमोन ट्रैप (Pheromone Traps) प्रति एकड़ 8 लगाएं और प्रोफेनोफॉस 40% + साइपरमेथ्रिन 4% ईसी का 2 मिली प्रति लीटर पानी में छिड़काव करें।”'
  },
  english: {
    lang: 'English',
    prompt: '“Calculate fertilizer dose and today\'s MSP difference for 2 acres Sugarcane.”',
    answer: '“For 2 acres Sugarcane, apply 11 bags Urea, 5 bags DAP, and 4 bags MOP. Kolhapur Gur mandi is currently trading at ₹4,300/Qtl, which is ₹800 (+22.8%) above baseline MSP.”'
  }
};

function initVoiceAssistant() {
  const tabs = document.querySelectorAll('.voice-lang-tab');
  const playBtn = document.getElementById('voice-play-btn');
  const promptEl = document.getElementById('voice-prompt-text');
  const answerEl = document.getElementById('voice-answer-text');
  const wave = document.getElementById('voice-audio-wave');
  let currentLang = 'marathi';

  if (!tabs.length || !promptEl) return;

  function updateContent(langKey) {
    currentLang = langKey;
    const data = voiceSnippets[langKey];
    promptEl.textContent = data.prompt;
    answerEl.textContent = data.answer;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'border-emerald-600', 'bg-emerald-50', 'text-emerald-800', 'shadow-sm');
        t.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      });
      tab.classList.add('active', 'border-emerald-600', 'bg-emerald-50', 'text-emerald-800', 'shadow-sm');
      tab.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
      updateContent(tab.dataset.lang);
    });
  });

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (wave) wave.classList.add('active');
      playBtn.classList.add('scale-95');

      // Use Web Speech API if supported
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const textToSpeak = voiceSnippets[currentLang].answer.replace(/“|”/g, '');
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.rate = 0.95;
        if (currentLang === 'hindi' || currentLang === 'marathi') {
          utter.lang = 'hi-IN';
        } else {
          utter.lang = 'en-IN';
        }
        utter.onend = () => {
          if (wave) wave.classList.remove('active');
          playBtn.classList.remove('scale-95');
        };
        utter.onerror = () => {
          if (wave) wave.classList.remove('active');
          playBtn.classList.remove('scale-95');
        };
        window.speechSynthesis.speak(utter);
      } else {
        setTimeout(() => {
          if (wave) wave.classList.remove('active');
          playBtn.classList.remove('scale-95');
        }, 3500);
      }
    });
  }
}

/* ==========================================================================
   6. Dynamic QR Code Generator & Modal
   ========================================================================== */
function initQRCodeModal() {
  const modal = document.getElementById('qr-modal');
  const openBtns = document.querySelectorAll('.open-qr-btn');
  const closeBtn = document.getElementById('close-qr-btn');
  const canvas = document.getElementById('qr-code-canvas');

  if (!modal || !canvas) return;

  function generateQR() {
    const apkUrl = window.location.origin + window.location.pathname.replace(/\/$/, '') + '/downloads/krushi-aadhar-cloud.apk';
    
    const ctx = canvas.getContext('2d');
    const size = 260;
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(apkUrl)}&color=059669&bgcolor=ffffff&margin=1`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
    };
    img.onerror = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = '#059669';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scan to Download APK', size/2, size/2 - 10);
      ctx.fillText(apkUrl.slice(0, 28) + '...', size/2, size/2 + 15);
    };

    const linkEl = document.getElementById('qr-direct-link');
    if (linkEl) {
      linkEl.href = apkUrl;
      linkEl.textContent = apkUrl;
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      generateQR();
      modal.classList.remove('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

/* ==========================================================================
   7. Copy-to-Clipboard Utility
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copyText;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ Copied!`;
        btn.classList.add('text-emerald-600', 'font-bold');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('text-emerald-600', 'font-bold');
        }, 2000);
      });
    });
  });
}

/* ==========================================================================
   8. Fullscreen Image Lightbox Modal
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('close-lightbox-btn');
  const cards = document.querySelectorAll('.screenshot-card');

  if (!modal || !imgEl || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.img;
      const title = card.dataset.title || 'Application Screen';
      imgEl.src = src;
      if (titleEl) titleEl.textContent = title;
      modal.classList.remove('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}
