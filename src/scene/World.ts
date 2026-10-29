/**
 * NEOM World Engine - Three.js Scene, Camera, Atmospheres & Physics Loop
 * Conceived & Engineered by Tareq Abuashi
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { CityGenerator, GeneratedCity } from './CityGenerator';
import { soundscape } from '../audio/soundscape';

export type AtmosphereType = 'day' | 'sunset' | 'neon' | 'frost';

export class World {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;
  
  private container: HTMLElement;
  private cityData: GeneratedCity;
  private dirLight!: THREE.DirectionalLight;
  private hemiLight!: THREE.HemisphereLight;
  private ambientLight!: THREE.AmbientLight;

  // Camera States
  public isDroneMode: boolean = false;
  private droneSplineProgress: number = 0;
  private droneCurve!: THREE.CatmullRomCurve3;

  // Sector Targets
  public sectorCameras: Record<string, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
    theline: {
      pos: new THREE.Vector3(75, 42, 85),
      target: new THREE.Vector3(0, 18, 0)
    },
    oxagon: {
      pos: new THREE.Vector3(210, 48, -25),
      target: new THREE.Vector3(140, 8, -80)
    },
    trojena: {
      pos: new THREE.Vector3(-85, 75, -15),
      target: new THREE.Vector3(-140, 28, -80)
    },
    sindalah: {
      pos: new THREE.Vector3(185, 42, 165),
      target: new THREE.Vector3(130, 6, 110)
    }
  };

  // Parallax
  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  
  // Telemetry metrics
  public fps: number = 60;
  private lastTime = performance.now();
  private frameCount = 0;

  // Pod animation state
  private podDirection = 1;
  private podSpeed = 85; // units per sec
  private podMinZ = -120;
  private podMaxZ = 120;
  public isMaglevLaunching = false;

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020617);
    this.scene.fog = new THREE.FogExp2(0x020617, 0.0018);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.5,
      2500
    );
    this.camera.position.copy(this.sectorCameras.theline.pos);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going beneath ground
    this.controls.minDistance = 15;
    this.controls.maxDistance = 550;
    this.controls.target.copy(this.sectorCameras.theline.target);

    // 5. Lighting
    this.setupLighting();

    // 6. Generate Mega-City
    this.cityData = CityGenerator.generateWorld();
    this.scene.add(this.cityData.group);

    // 7. Setup Cinematic Drone Path
    this.setupDroneSpline();

    // 8. Event Listeners
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));

    // 9. Start Rendering Loop
    this.animate();
  }

  private setupLighting() {
    this.hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x020617, 0.8);
    this.scene.add(this.hemiLight);

    this.ambientLight = new THREE.AmbientLight(0x0f172a, 0.6);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    this.dirLight.position.set(150, 220, 100);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 600;
    const d = 250;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.scene.add(this.dirLight);
  }

  /**
   * Continuous Cinematic Drone Path flying across all 4 megaprojects
   */
  private setupDroneSpline() {
    const points = [
      new THREE.Vector3(0, 18, 110),      // The Line South
      new THREE.Vector3(0, 22, -110),     // The Line North Glide
      new THREE.Vector3(80, 35, -100),    // Heading to Oxagon
      new THREE.Vector3(140, 25, -80),    // Oxagon Port Flyover
      new THREE.Vector3(60, 50, -40),     // Ascending towards Trojena
      new THREE.Vector3(-140, 60, -80),   // Trojena Mountain Peak & Lake
      new THREE.Vector3(-80, 45, 40),     // Swooping towards Red Sea
      new THREE.Vector3(130, 20, 110),    // Sindalah Lagoon Skim
      new THREE.Vector3(70, 30, 120),     // Returning to The Line
    ];

    this.droneCurve = new THREE.CatmullRomCurve3(points, true);
  }

  public setAtmosphere(type: AtmosphereType) {
    switch (type) {
      case 'day':
        this.scene.background = new THREE.Color(0x0f172a);
        this.scene.fog = new THREE.FogExp2(0x0f172a, 0.0014);
        this.dirLight.color.setHex(0xffffff);
        this.dirLight.intensity = 2.4;
        this.dirLight.position.set(120, 250, 100);
        this.hemiLight.color.setHex(0x38bdf8);
        this.hemiLight.intensity = 0.9;
        this.renderer.toneMappingExposure = 1.15;
        break;

      case 'sunset':
        this.scene.background = new THREE.Color(0x2d0b13);
        this.scene.fog = new THREE.FogExp2(0x2d0b13, 0.0018);
        this.dirLight.color.setHex(0xf97316);
        this.dirLight.intensity = 3.2;
        this.dirLight.position.set(-200, 60, 150);
        this.hemiLight.color.setHex(0xfbbf24);
        this.hemiLight.intensity = 0.7;
        this.renderer.toneMappingExposure = 1.25;
        break;

      case 'neon':
        this.scene.background = new THREE.Color(0x020617);
        this.scene.fog = new THREE.FogExp2(0x020617, 0.0022);
        this.dirLight.color.setHex(0x00f0ff);
        this.dirLight.intensity = 0.7;
        this.dirLight.position.set(50, 100, 50);
        this.hemiLight.color.setHex(0x1e1b4b);
        this.hemiLight.intensity = 0.5;
        this.renderer.toneMappingExposure = 1.4;
        break;

      case 'frost':
        this.scene.background = new THREE.Color(0x1e293b);
        this.scene.fog = new THREE.FogExp2(0x1e293b, 0.0032);
        this.dirLight.color.setHex(0xe0f2fe);
        this.dirLight.intensity = 1.9;
        this.dirLight.position.set(-150, 200, -100);
        this.hemiLight.color.setHex(0x93c5fd);
        this.hemiLight.intensity = 1.1;
        this.renderer.toneMappingExposure = 1.05;
        break;
    }
  }

  /**
   * Smooth GSAP Camera Teleportation with FOV Punch and Audio Warp
   */
  public warpToSector(sectorId: string, duration: number = 2.0) {
    const config = this.sectorCameras[sectorId];
    if (!config) return;

    soundscape.playWarp();

    // Disable drone mode on manual warp
    this.isDroneMode = false;
    this.controls.enabled = false;

    // Camera FOV cinematic hyper-speed warp pulse
    gsap.to(this.camera, {
      fov: 62,
      duration: duration * 0.35,
      ease: 'power2.in',
      onUpdate: () => this.camera.updateProjectionMatrix(),
      onComplete: () => {
        gsap.to(this.camera, {
          fov: 48,
          duration: duration * 0.65,
          ease: 'power3.out',
          onUpdate: () => this.camera.updateProjectionMatrix()
        });
      }
    });

    // Animate Camera Position
    gsap.to(this.camera.position, {
      x: config.pos.x,
      y: config.pos.y,
      z: config.pos.z,
      duration: duration,
      ease: 'power3.inOut'
    });

    // Animate Orbit Controls Target
    gsap.to(this.controls.target, {
      x: config.target.x,
      y: config.target.y,
      z: config.target.z,
      duration: duration,
      ease: 'power3.inOut',
      onComplete: () => {
        this.controls.enabled = true;
      }
    });
  }

  /**
   * Launch high-speed Maglev pod across the track with dynamic camera tracking
   */
  public triggerMaglevLaunch() {
    this.isMaglevLaunching = true;
    soundscape.playLaunch();

    const pod = this.cityData.maglevPod;
    pod.position.z = -130;

    // High speed acceleration tween
    gsap.to(pod.position, {
      z: 130,
      duration: 3.2,
      ease: 'power2.inOut',
      onComplete: () => {
        this.isMaglevLaunching = false;
      }
    });
  }

  public toggleDroneMode(): boolean {
    this.isDroneMode = !this.isDroneMode;
    this.controls.enabled = !this.isDroneMode;
    return this.isDroneMode;
  }

  private onResize() {
    if (!this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private onMouseMove(e: MouseEvent) {
    this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    const delta = 0.016; // approx 60fps delta
    const now = performance.now();

    // FPS calculation
    this.frameCount++;
    if (now - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
    }

    // Parallax smoothing
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;

    // Drone Fly-Through Camera Mode
    if (this.isDroneMode) {
      this.droneSplineProgress = (this.droneSplineProgress + delta * 0.018) % 1;
      const pt = this.droneCurve.getPointAt(this.droneSplineProgress);
      const lookAtPt = this.droneCurve.getPointAt((this.droneSplineProgress + 0.02) % 1);

      this.camera.position.lerp(pt, 0.08);
      this.camera.lookAt(lookAtPt);
    } else {
      // Subtle parallax tilt when in Orbit Controls
      this.controls.update();
      this.camera.position.x += this.mouse.x * 0.15;
      this.camera.position.y += -this.mouse.y * 0.15;
    }

    // Continuous Maglev Pod Cruiser (when not in manual launch)
    if (!this.isMaglevLaunching && this.cityData.maglevPod) {
      const pod = this.cityData.maglevPod;
      pod.position.z += this.podDirection * this.podSpeed * delta;
      if (pod.position.z > this.podMaxZ) {
        this.podDirection = -1;
      } else if (pod.position.z < this.podMinZ) {
        this.podDirection = 1;
      }
    }

    // Autonomous Drones Bobbing & Flashing
    const time = now * 0.002;
    this.cityData.drones.forEach((drone, index) => {
      drone.position.y += Math.sin(time + index) * 0.04;
      drone.rotation.y += 0.015;
    });

    // Trojena Snow Particles Falling
    if (this.cityData.snowParticles) {
      const pos = this.cityData.snowParticles.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) - 0.35;
        if (y < 0) y = 80;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  };
}
