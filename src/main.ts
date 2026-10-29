/**
 * NEOM The Line & Sindalah 3D Futuristic Experience
 * Main Application Orchestrator
 * Conceived, Designed & Engineered by Tareq Abuashi
 */

import './styles/main.css';
import { World, AtmosphereType } from './scene/World';
import { soundscape } from './audio/soundscape';
import { translations } from './i18n/translations';
import { maglevSimulator } from './simulations/MaglevSimulator';
import { energySimulator } from './simulations/EnergyGridSimulator';
import confetti from 'canvas-confetti';

class NeomApp {
  private world!: World;
  private currentLang: 'ar' | 'en' = 'ar';
  private currentTheme: 'dark' | 'light' = 'dark';
  private currentSectorId: string = 'theline';
  private currentAtmo: AtmosphereType = 'neon';

  constructor() {
    this.init();
  }

  private init() {
    const container = document.getElementById('webgl-canvas-container');
    if (!container) return;

    // 1. Initialize 3D World Engine
    this.world = new World(container);
    this.world.setAtmosphere('neon');

    // 2. Setup HUD Event Bindings
    this.bindEvents();

    // 3. Render Initial State
    this.updateLanguageUI();
    this.renderSectorDetails(this.currentSectorId);
    this.updateMaglevTelemetry();
    this.updateEnergyTelemetry();

    // 4. Start Clock & Telemetry Tick
    this.startClock();
    this.startTelemetryLoop();

    // 5. Soundscape Autoplay Trigger on First Interaction
    window.addEventListener('click', () => {
      soundscape.startAmbientHum();
    }, { once: true });
  }

  private bindEvents() {
    // Sound Toggle
    const btnAudio = document.getElementById('btn-audio');
    btnAudio?.addEventListener('click', () => {
      soundscape.playClick();
      const muted = soundscape.toggleMute();
      btnAudio.classList.toggle('active', !muted);
    });

    // Language Toggle
    const btnLang = document.getElementById('btn-lang');
    btnLang?.addEventListener('click', () => {
      soundscape.playClick();
      this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
      this.updateLanguageUI();
      this.renderSectorDetails(this.currentSectorId);
      this.updateMaglevTelemetry();
      this.updateEnergyTelemetry();
    });

    // Theme Toggle
    const btnTheme = document.getElementById('btn-theme');
    btnTheme?.addEventListener('click', () => {
      soundscape.playClick();
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      const icon = document.getElementById('theme-icon');
      if (icon) icon.textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
    });

    // Drone Cam Mode
    const btnDrone = document.getElementById('btn-drone-cam');
    btnDrone?.addEventListener('click', () => {
      soundscape.playClick();
      const isDrone = this.world.toggleDroneMode();
      btnDrone.classList.toggle('active', isDrone);
    });

    // Reset Camera
    const btnReset = document.getElementById('btn-reset-cam');
    btnReset?.addEventListener('click', () => {
      soundscape.playClick();
      this.world.warpToSector(this.currentSectorId, 1.4);
    });

    // Sector Nav Pills
    const pills = document.querySelectorAll<HTMLButtonElement>('.sector-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const sector = pill.dataset.sector;
        if (!sector) return;
        this.selectSector(sector);
      });
      pill.addEventListener('mouseenter', () => soundscape.playHover());
    });

    // Atmosphere Switcher
    const atmoBtns = document.querySelectorAll<HTMLButtonElement>('.atmo-btn');
    atmoBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        soundscape.playClick();
        const atmo = btn.dataset.atmo as AtmosphereType;
        if (!atmo) return;
        this.currentAtmo = atmo;
        this.world.setAtmosphere(atmo);
        atmoBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      btn.addEventListener('mouseenter', () => soundscape.playHover());
    });

    // Simulators Tabs
    const tabMaglev = document.getElementById('tab-maglev');
    const tabEnergy = document.getElementById('tab-energy');
    const maglevContent = document.getElementById('maglev-content');
    const energyContent = document.getElementById('energy-content');

    tabMaglev?.addEventListener('click', () => {
      soundscape.playClick();
      tabMaglev.classList.add('active');
      tabEnergy?.classList.remove('active');
      if (maglevContent) maglevContent.style.display = 'flex';
      if (energyContent) energyContent.style.display = 'none';
    });

    tabEnergy?.addEventListener('click', () => {
      soundscape.playClick();
      tabEnergy.classList.add('active');
      tabMaglev?.classList.remove('active');
      if (energyContent) energyContent.style.display = 'flex';
      if (maglevContent) maglevContent.style.display = 'none';
    });

    // Maglev Selects
    const maglevOrigin = document.getElementById('maglev-origin') as HTMLSelectElement;
    const maglevDest = document.getElementById('maglev-dest') as HTMLSelectElement;

    maglevOrigin?.addEventListener('change', () => {
      soundscape.playClick();
      this.updateMaglevTelemetry();
    });

    maglevDest?.addEventListener('change', () => {
      soundscape.playClick();
      this.updateMaglevTelemetry();
    });

    // Maglev Launch Button
    const btnLaunch = document.getElementById('btn-maglev-launch');
    btnLaunch?.addEventListener('click', () => {
      this.world.triggerMaglevLaunch();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f0ff', '#f59e0b', '#10b981']
      });
    });

    // Energy Sliders
    const sliderSolar = document.getElementById('slider-solar') as HTMLInputElement;
    const sliderWind = document.getElementById('slider-wind') as HTMLInputElement;
    const sliderHydrogen = document.getElementById('slider-hydrogen') as HTMLInputElement;

    [sliderSolar, sliderWind, sliderHydrogen].forEach((slider) => {
      slider?.addEventListener('input', () => {
        this.updateEnergyTelemetry();
      });
    });

    // About Modal
    const btnAbout = document.getElementById('btn-about');
    const modal = document.getElementById('about-modal');
    const btnCloseModal = document.getElementById('modal-close-btn');

    btnAbout?.addEventListener('click', () => {
      soundscape.playClick();
      modal?.classList.add('open');
    });

    btnCloseModal?.addEventListener('click', () => {
      soundscape.playClick();
      modal?.classList.remove('open');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }

  private selectSector(sectorId: string) {
    if (this.currentSectorId === sectorId) return;
    this.currentSectorId = sectorId;

    // Warp 3D Camera
    this.world.warpToSector(sectorId, 2.2);

    // Update active pill state
    const pills = document.querySelectorAll<HTMLButtonElement>('.sector-pill');
    pills.forEach((p) => {
      p.classList.toggle('active', p.dataset.sector === sectorId);
    });

    // Update HUD Left Panel
    this.renderSectorDetails(sectorId);

    // Update Telemetry Coordinates
    const coords: Record<string, string> = {
      theline: "28°00'N 35°12'E",
      oxagon: "27°48'N 35°32'E",
      trojena: "28°32'N 35°22'E",
      sindalah: "27°52'N 34°58'E"
    };
    const coordEl = document.getElementById('metric-coords');
    if (coordEl && coords[sectorId]) {
      coordEl.textContent = coords[sectorId];
    }
  }

  private renderSectorDetails(sectorId: string) {
    const t = translations[this.currentLang];
    const data = t.sectors[sectorId];
    if (!data) return;

    const titleEl = document.getElementById('sector-title');
    const taglineEl = document.getElementById('sector-tagline');
    const descEl = document.getElementById('sector-desc');
    const specsGrid = document.getElementById('specs-grid');
    const innovationsList = document.getElementById('innovations-list');

    if (titleEl) titleEl.textContent = data.name;
    if (taglineEl) taglineEl.textContent = data.tagline;
    if (descEl) descEl.textContent = data.description;

    if (specsGrid) {
      specsGrid.innerHTML = data.stats.map(s => `
        <div class="spec-item">
          <div class="spec-label">${s.label}</div>
          <div class="spec-value">${s.value}</div>
        </div>
      `).join('');
    }

    if (innovationsList) {
      innovationsList.innerHTML = data.innovations.map(inv => `
        <div class="innovation-item">
          <span class="innovation-bullet">❖</span>
          <span>${inv}</span>
        </div>
      `).join('');
    }
  }

  private updateMaglevTelemetry() {
    const originSelect = document.getElementById('maglev-origin') as HTMLSelectElement;
    const destSelect = document.getElementById('maglev-dest') as HTMLSelectElement;
    if (!originSelect || !destSelect) return;

    const route = maglevSimulator.calculateRoute(originSelect.value, destSelect.value);
    const t = translations[this.currentLang];

    const distEl = document.getElementById('val-maglev-dist');
    const etaEl = document.getElementById('val-maglev-eta');
    const speedEl = document.getElementById('val-maglev-speed');
    const gforceEl = document.getElementById('val-maglev-gforce');

    if (distEl) distEl.textContent = `${route.distanceKm} ${t.maglevUnitKm}`;
    if (etaEl) etaEl.textContent = `${route.durationMin} ${t.maglevUnitMin}`;
    if (speedEl) speedEl.textContent = `${route.speedKmh} ${t.maglevUnitKmh}`;
    if (gforceEl) gforceEl.textContent = `${route.gForce} G`;
  }

  private updateEnergyTelemetry() {
    const sSolar = document.getElementById('slider-solar') as HTMLInputElement;
    const sWind = document.getElementById('slider-wind') as HTMLInputElement;
    const sHydrogen = document.getElementById('slider-hydrogen') as HTMLInputElement;

    const solarVal = parseInt(sSolar?.value || '85');
    const windVal = parseInt(sWind?.value || '70');
    const hydroVal = parseInt(sHydrogen?.value || '80');

    const metrics = energySimulator.computeMetrics(solarVal, windVal, hydroVal);

    const solarGwEl = document.getElementById('val-solar-gw');
    const windGwEl = document.getElementById('val-wind-gw');
    const hydroGwEl = document.getElementById('val-hydrogen-gw');

    const genEl = document.getElementById('val-energy-gen');
    const demandEl = document.getElementById('val-energy-demand');
    const batteryEl = document.getElementById('val-energy-battery');
    const carbonEl = document.getElementById('val-energy-carbon');

    if (solarGwEl) solarGwEl.textContent = `${metrics.solarGW} GW`;
    if (windGwEl) windGwEl.textContent = `${metrics.windGW} GW`;
    if (hydroGwEl) hydroGwEl.textContent = `${metrics.hydrogenGW} GW`;

    if (genEl) genEl.textContent = `${metrics.totalGenerationGW} GW`;
    if (demandEl) demandEl.textContent = `${metrics.gridDemandGW} GW`;
    if (batteryEl) batteryEl.textContent = `${metrics.batteryStorageMWh.toLocaleString()} MWh`;
    if (carbonEl) carbonEl.textContent = `${metrics.carbonOffsetTonsPerHour.toLocaleString()} ${this.currentLang === 'ar' ? 'طن/س' : 't/h'}`;
  }

  private updateLanguageUI() {
    const t = translations[this.currentLang];
    const isAr = this.currentLang === 'ar';

    document.documentElement.setAttribute('lang', this.currentLang);
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    const appTitle = document.getElementById('lbl-app-title');
    const appSubtitle = document.getElementById('lbl-app-subtitle');
    const creatorName = document.getElementById('lbl-creator-name');
    const droneCam = document.getElementById('lbl-drone-cam');
    const resetCam = document.getElementById('lbl-reset-cam');
    const audioLbl = document.getElementById('lbl-audio');
    const langLbl = document.getElementById('lbl-lang');

    if (appTitle) appTitle.textContent = t.appTitle;
    if (appSubtitle) appSubtitle.textContent = t.appSubtitle;
    if (creatorName) creatorName.textContent = isAr ? "أ. طارق ابوعشي" : "Tareq Abuashi";
    if (droneCam) droneCam.textContent = t.droneMode;
    if (resetCam) resetCam.textContent = t.resetCamera;
    if (audioLbl) audioLbl.textContent = t.audioToggle;
    if (langLbl) langLbl.textContent = isAr ? 'EN' : 'عربي';

    // Simulators labels
    const tabMaglev = document.getElementById('tab-maglev');
    const tabEnergy = document.getElementById('tab-energy');
    const lblMaglevOrigin = document.getElementById('lbl-maglev-origin');
    const lblMaglevDest = document.getElementById('lbl-maglev-dest');
    const lblMaglevDist = document.getElementById('lbl-maglev-dist');
    const lblMaglevEta = document.getElementById('lbl-maglev-eta');
    const lblMaglevSpeed = document.getElementById('lbl-maglev-speed');
    const lblMaglevGforce = document.getElementById('lbl-maglev-gforce');
    const lblMaglevLaunch = document.getElementById('lbl-maglev-launch');

    if (tabMaglev) tabMaglev.textContent = t.transitTab;
    if (tabEnergy) tabEnergy.textContent = t.energyTab;
    if (lblMaglevOrigin) lblMaglevOrigin.textContent = t.maglevOrigin;
    if (lblMaglevDest) lblMaglevDest.textContent = t.maglevDest;
    if (lblMaglevDist) lblMaglevDist.textContent = t.maglevDistance;
    if (lblMaglevEta) lblMaglevEta.textContent = t.maglevEta;
    if (lblMaglevSpeed) lblMaglevSpeed.textContent = t.maglevSpeed;
    if (lblMaglevGforce) lblMaglevGforce.textContent = t.maglevGforce;
    if (lblMaglevLaunch) lblMaglevLaunch.textContent = t.maglevLaunch;

    // Energy labels
    const lblSolar = document.getElementById('lbl-solar');
    const lblWind = document.getElementById('lbl-wind');
    const lblHydrogen = document.getElementById('lbl-hydrogen');
    const lblEnergyGen = document.getElementById('lbl-energy-gen');
    const lblEnergyDemand = document.getElementById('lbl-energy-demand');
    const lblEnergyBattery = document.getElementById('lbl-energy-battery');
    const lblEnergyCarbon = document.getElementById('lbl-energy-carbon');

    if (lblSolar) lblSolar.textContent = t.solarIrradiance;
    if (lblWind) lblWind.textContent = t.windVelocity;
    if (lblHydrogen) lblHydrogen.textContent = t.hydrogenProd;
    if (lblEnergyGen) lblEnergyGen.textContent = t.totalGeneration;
    if (lblEnergyDemand) lblEnergyDemand.textContent = t.gridDemand;
    if (lblEnergyBattery) lblEnergyBattery.textContent = t.batteryStorage;
    if (lblEnergyCarbon) lblEnergyCarbon.textContent = t.carbonOffset;

    // Modal
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close-btn');

    if (modalTitle) modalTitle.textContent = t.aboutProject;
    if (modalDesc) modalDesc.textContent = t.aboutDescription;
    if (modalClose) modalClose.textContent = t.close;
  }

  private startClock() {
    const clockEl = document.getElementById('live-clock');
    const updateTime = () => {
      const now = new Date();
      // KSA UTC+3 time
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Riyadh',
        hour12: false
      });
      if (clockEl) {
        clockEl.textContent = `${timeStr} KSA`;
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  private startTelemetryLoop() {
    const fpsEl = document.getElementById('metric-fps');
    setInterval(() => {
      if (fpsEl && this.world) {
        fpsEl.textContent = `${this.world.fps}`;
      }
    }, 1000);
  }
}

// Instantiate application on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new NeomApp();
});
