/**
 * NEOM Procedural Mega-City 3D Generator
 * The Line, Oxagon, Trojena, and Sindalah
 * Conceived & Engineered by Tareq Abuashi
 */

import * as THREE from 'three';

export interface GeneratedCity {
  group: THREE.Group;
  maglevPod: THREE.Group;
  drones: THREE.Group[];
  waterPlane?: THREE.Mesh;
  snowParticles?: THREE.Points;
  clouds?: THREE.Points;
  transitRails: THREE.Line[];
  observatoryBeam?: THREE.Line;
}

export class CityGenerator {
  public static generateWorld(): GeneratedCity {
    const worldGroup = new THREE.Group();
    const drones: THREE.Group[] = [];

    // 1. Cyber Desert Grid Ground
    const groundGrid = this.createCyberGround();
    worldGroup.add(groundGrid);

    // 2. THE LINE (Linear Monolithic Twin Mirror Mega-Structure)
    const lineGroup = this.createTheLine();
    worldGroup.add(lineGroup.group);
    const maglevPod = lineGroup.pod;
    drones.push(...lineGroup.drones);

    // 3. OXAGON (Floating Octagonal Industrial Port & Helios H2 Facility)
    const oxagonGroup = this.createOxagon();
    oxagonGroup.position.set(140, 0, -80);
    worldGroup.add(oxagonGroup);

    // 4. TROJENA (Alpine Mountain Peaks, Ski Slopes, The Vault & Observatory)
    const trojenaGroup = this.createTrojena();
    trojenaGroup.position.set(-140, 0, -80);
    worldGroup.add(trojenaGroup);

    // 5. SINDALAH (Red Sea Luxury Island, Marina, Organic Villas & Coral Reef)
    const sindalahGroup = this.createSindalah();
    sindalahGroup.position.set(130, 0, 110);
    worldGroup.add(sindalahGroup);

    // 6. Superconducting Transit Rails connecting the Megasectors
    const transit = this.createTransitNetwork();
    worldGroup.add(transit.group);

    // 7. Atmospheric Environmental Particles (Snow for Trojena, Dust/Mist for The Line)
    const particles = this.createAtmosphericParticles();
    worldGroup.add(particles.snow);
    worldGroup.add(particles.cyberSparks);

    return {
      group: worldGroup,
      maglevPod,
      drones,
      snowParticles: particles.snow,
      transitRails: transit.rails
    };
  }

  /**
   * Cyber Ground Grid with subtle dunes
   */
  private static createCyberGround(): THREE.Group {
    const group = new THREE.Group();

    // Base dark desert plane
    const groundGeo = new THREE.PlaneGeometry(1200, 1200, 64, 64);
    // Subtle undulation
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      if (dist > 150) {
        const z = Math.sin(x * 0.015) * Math.cos(y * 0.015) * 8;
        pos.setZ(i, z);
      }
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      roughness: 0.9,
      metalness: 0.2
    });

    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.1;
    groundMesh.receiveShadow = true;
    group.add(groundMesh);

    // Cyberpunk holographic grid overlay
    const gridHelper = new THREE.GridHelper(1200, 120, 0x00f0ff, 0x092b3a);
    gridHelper.position.y = 0.05;
    group.add(gridHelper);

    return group;
  }

  /**
   * THE LINE: Mirrored monolithic twin walls, vertical urban biophilic interior, skybridges, maglev tube
   */
  private static createTheLine(): { group: THREE.Group; pod: THREE.Group; drones: THREE.Group[] } {
    const group = new THREE.Group();
    const drones: THREE.Group[] = [];

    const lineLength = 280;
    const lineHeight = 48;
    const wallThickness = 1.2;
    const corridorWidth = 16;

    // Mirrored Glass Material
    const mirrorMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d1e2d,
      metalness: 0.95,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0
    });

    // Outer glow seam material
    const seamMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff
    });

    // Left Wall
    const wallGeo = new THREE.BoxGeometry(wallThickness, lineHeight, lineLength);
    const leftWall = new THREE.Mesh(wallGeo, mirrorMat);
    leftWall.position.set(-corridorWidth / 2, lineHeight / 2, 0);
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    group.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(wallGeo, mirrorMat);
    rightWall.position.set(corridorWidth / 2, lineHeight / 2, 0);
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    group.add(rightWall);

    // Luminous Edge Trims along the top of both walls
    const topGlowGeo = new THREE.BoxGeometry(wallThickness * 1.1, 0.4, lineLength);
    const leftGlow = new THREE.Mesh(topGlowGeo, seamMat);
    leftGlow.position.set(-corridorWidth / 2, lineHeight + 0.2, 0);
    group.add(leftGlow);

    const rightGlow = new THREE.Mesh(topGlowGeo, seamMat);
    rightGlow.position.set(corridorWidth / 2, lineHeight + 0.2, 0);
    group.add(rightGlow);

    // Multi-tier biophilic interior structures & hanging gardens
    const tierMat = new THREE.MeshStandardMaterial({
      color: 0x052e16,
      roughness: 0.8
    });
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.6,
      emissive: 0x064e3b,
      emissiveIntensity: 0.3
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.7,
      opacity: 0.8,
      transparent: true,
      roughness: 0.1
    });

    // Hanging tiers and suspended skybridges
    for (let z = -lineLength / 2 + 15; z < lineLength / 2 - 15; z += 18) {
      // Skybridge at varying heights
      const bridgeHeight = 10 + (Math.abs(z * 3) % 32);
      const bridgeGeo = new THREE.BoxGeometry(corridorWidth - wallThickness, 1.2, 5);
      const bridge = new THREE.Mesh(bridgeGeo, glassMat);
      bridge.position.set(0, bridgeHeight, z);
      group.add(bridge);

      // Biophilic vertical garden terrace attached to left or right wall
      const isLeft = (Math.floor(z) % 2 === 0);
      const gardenGeo = new THREE.BoxGeometry(4.5, 2.5, 9);
      const garden = new THREE.Mesh(gardenGeo, foliageMat);
      garden.position.set(isLeft ? -corridorWidth / 2 + 3 : corridorWidth / 2 - 3, bridgeHeight - 1.5, z);
      group.add(garden);

      // Warm interior ambient light beacon
      if (Math.abs(z) % 36 === 0) {
        const pointLight = new THREE.PointLight(0x00f0ff, 1.5, 25);
        pointLight.position.set(0, bridgeHeight + 2, z);
        group.add(pointLight);
      }
    }

    // Lower high-speed Maglev Vacuum Tube
    const tubeGeo = new THREE.CylinderGeometry(1.6, 1.6, lineLength, 16);
    tubeGeo.rotateX(Math.PI / 2);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transmission: 0.85,
      transparent: true,
      roughness: 0.15,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.15
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    tube.position.set(0, 5, 0);
    group.add(tube);

    // Glowing Maglev Pod
    const pod = new THREE.Group();
    const podBodyGeo = new THREE.CapsuleGeometry(0.85, 4.2, 8, 16);
    podBodyGeo.rotateX(Math.PI / 2);
    const podMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6
    });
    const podMesh = new THREE.Mesh(podBodyGeo, podMat);
    pod.add(podMesh);

    // Pod propulsion trail light
    const podLight = new THREE.PointLight(0x00f0ff, 4, 15);
    podLight.position.set(0, 0, 2);
    pod.add(podLight);

    pod.position.set(0, 5, 0);
    group.add(pod);

    // Floating Autonomous Drone Scouts hovering around The Line
    for (let d = 0; d < 4; d++) {
      const drone = this.createDrone();
      drone.position.set(
        (d % 2 === 0 ? 1 : -1) * (corridorWidth + 12 + d * 4),
        25 + d * 6,
        -80 + d * 50
      );
      group.add(drone);
      drones.push(drone);
    }

    return { group, pod, drones };
  }

  /**
   * OXAGON: Floating Octagonal Cyber-Port & Industrial Megastructure
   */
  private static createOxagon(): THREE.Group {
    const group = new THREE.Group();

    // Water basin around Oxagon
    const waterGeo = new THREE.CircleGeometry(85, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.8
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.2;
    group.add(water);

    // Octagonal Floating Base (Radius 48, 8 segments)
    const octGeo = new THREE.CylinderGeometry(48, 50, 4, 8);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25
    });
    const octBase = new THREE.Mesh(octGeo, octMat);
    octBase.position.y = 2;
    octBase.castShadow = true;
    octBase.receiveShadow = true;
    group.add(octBase);

    // Luminous Octagonal Perimeter Neon Border
    const octEdgeGeo = new THREE.RingGeometry(48, 50, 8);
    const octEdgeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide
    });
    const octEdge = new THREE.Mesh(octEdgeGeo, octEdgeMat);
    octEdge.rotation.x = -Math.PI / 2;
    octEdge.position.y = 4.05;
    group.add(octEdge);

    // Automated Central Logistics Hub Tower
    const hubGeo = new THREE.CylinderGeometry(12, 16, 26, 8);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.position.y = 15;
    group.add(hub);

    // Helios Green Hydrogen Spherical Mega-Tanks
    const tankGeo = new THREE.SphereGeometry(4.5, 16, 16);
    const tankMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x10b981,
      emissiveIntensity: 0.4,
      clearcoat: 0.8
    });

    for (let t = 0; t < 4; t++) {
      const angle = (t * Math.PI) / 2 + Math.PI / 4;
      const x = Math.cos(angle) * 28;
      const z = Math.sin(angle) * 28;
      const tank = new THREE.Mesh(tankGeo, tankMat);
      tank.position.set(x, 6.5, z);
      group.add(tank);

      // Light glow above each hydrogen tank
      const tankLight = new THREE.PointLight(0x10b981, 1.2, 18);
      tankLight.position.set(x, 12, z);
      group.add(tankLight);
    }

    // Automated smart container blocks & robotic docks
    const containerMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 });
    const goldContainerMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 });

    for (let i = 0; i < 16; i++) {
      const radius = 22 + (i % 3) * 6;
      const angle = (i * Math.PI * 2) / 16;
      const cGeo = new THREE.BoxGeometry(3, 2.5, 5);
      const cMesh = new THREE.Mesh(cGeo, i % 2 === 0 ? containerMat : goldContainerMat);
      cMesh.position.set(Math.cos(angle) * radius, 5.2, Math.sin(angle) * radius);
      cMesh.rotation.y = angle;
      group.add(cMesh);
    }

    return group;
  }

  /**
   * TROJENA: Alpine Mountain Peaks, The Vault, Ski Village & Observatory
   */
  private static createTrojena(): THREE.Group {
    const group = new THREE.Group();

    // Mountain Massif using stacked jagged geometric peaks
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9,
      metalness: 0.1
    });

    const snowPeakMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.2,
      metalness: 0.1
    });

    // 5 Major Mountain Peaks
    const peaks = [
      { x: 0, z: 0, height: 65, radius: 42 },
      { x: -32, z: 20, height: 50, radius: 30 },
      { x: 28, z: -25, height: 44, radius: 26 },
      { x: -25, z: -30, height: 38, radius: 24 },
      { x: 30, z: 28, height: 42, radius: 25 },
    ];

    peaks.forEach((peak) => {
      // Base Mountain Rock
      const mGeo = new THREE.ConeGeometry(peak.radius, peak.height, 7);
      const mMesh = new THREE.Mesh(mGeo, mountainMat);
      mMesh.position.set(peak.x, peak.height / 2, peak.z);
      mMesh.castShadow = true;
      group.add(mMesh);

      // Crystalline Snow Cap
      const sGeo = new THREE.ConeGeometry(peak.radius * 0.45, peak.height * 0.4, 7);
      const sMesh = new THREE.Mesh(sGeo, snowPeakMat);
      sMesh.position.set(peak.x, peak.height * 0.8, peak.z);
      group.add(sMesh);
    });

    // Freshwater Alpine Lake Basin in the center
    const lakeGeo = new THREE.CylinderGeometry(16, 16, 1.5, 16);
    const lakeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      roughness: 0.05,
      metalness: 0.8,
      transmission: 0.5,
      transparent: true
    });
    const lake = new THREE.Mesh(lakeGeo, lakeMat);
    lake.position.set(0, 18, 0);
    group.add(lake);

    // "The Vault" Vertical Alpine Village carved into the mountain
    const vaultMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
      metalness: 0.5,
      roughness: 0.2
    });
    for (let v = 0; v < 4; v++) {
      const vGeo = new THREE.BoxGeometry(16 - v * 2.5, 3.5, 8);
      const vMesh = new THREE.Mesh(vGeo, vaultMat);
      vMesh.position.set(0, 22 + v * 4.5, 12 - v * 2);
      group.add(vMesh);
    }

    // High-altitude Cyber Observatory Dome & Laser Beam pointing into the stars
    const obsGeo = new THREE.SphereGeometry(4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const obsMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.95,
      roughness: 0.1
    });
    const obs = new THREE.Mesh(obsGeo, obsMat);
    obs.position.set(0, 65, 0);
    group.add(obs);

    // Skyward Cosmic Laser Beam
    const beamGeo = new THREE.CylinderGeometry(0.2, 0.4, 120, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.set(0, 125, 0);
    group.add(beam);

    return group;
  }

  /**
   * SINDALAH: Luxury Island Archipelago, Crystalline Lagoon, Marina & Biomorphic Villas
   */
  private static createSindalah(): THREE.Group {
    const group = new THREE.Group();

    // Lagoon Coral Reef Turquoise Water
    const lagoonGeo = new THREE.CircleGeometry(65, 32);
    const lagoonMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      metalness: 0.6,
      roughness: 0.08,
      transmission: 0.65,
      transparent: true,
      emissive: 0x0891b2,
      emissiveIntensity: 0.2
    });
    const lagoon = new THREE.Mesh(lagoonGeo, lagoonMat);
    lagoon.rotation.x = -Math.PI / 2;
    lagoon.position.y = 0.3;
    group.add(lagoon);

    // Organic Island Landmass
    const islandGeo = new THREE.CylinderGeometry(36, 42, 3.5, 18);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0, // White sands / coral limestone
      roughness: 0.8,
      metalness: 0.1
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = 1.8;
    island.castShadow = true;
    group.add(island);

    // Biomorphic Seashell Luxury Villas
    const villaMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.7,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.15
    });

    for (let i = 0; i < 7; i++) {
      const angle = (i * Math.PI * 2) / 7;
      const x = Math.cos(angle) * 22;
      const z = Math.sin(angle) * 22;

      const domeGeo = new THREE.SphereGeometry(3.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
      domeGeo.scale(1.4, 0.8, 1);
      const villa = new THREE.Mesh(domeGeo, villaMat);
      villa.position.set(x, 3.5, z);
      villa.rotation.y = angle;
      group.add(villa);

      // Warm terrace lights
      const vLight = new THREE.PointLight(0xf59e0b, 0.8, 12);
      vLight.position.set(x, 6, z);
      group.add(vLight);
    }

    // Superyacht Marina with Wooden Pontoons & Docked Futuristic Mega-Yachts
    const pierMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
    const pierGeo = new THREE.BoxGeometry(4, 0.6, 32);
    const pier = new THREE.Mesh(pierGeo, pierMat);
    pier.position.set(38, 0.6, 0);
    group.add(pier);

    // Futuristic Mega-Yachts
    const yachtMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2
    });
    for (let y = -10; y <= 10; y += 10) {
      const yGeo = new THREE.ConeGeometry(2.2, 12, 4);
      yGeo.rotateX(Math.PI / 2);
      const yacht = new THREE.Mesh(yGeo, yachtMat);
      yacht.position.set(45, 0.8, y);
      group.add(yacht);
    }

    return group;
  }

  /**
   * Superconducting Neon Transit Network connecting the sectors
   */
  private static createTransitNetwork(): { group: THREE.Group; rails: THREE.Line[] } {
    const group = new THREE.Group();
    const rails: THREE.Line[] = [];

    const stations = [
      new THREE.Vector3(0, 5, 0),        // The Line
      new THREE.Vector3(140, 5, -80),    // Oxagon
      new THREE.Vector3(-140, 18, -80),  // Trojena
      new THREE.Vector3(130, 4, 110)     // Sindalah
    ];

    const connections = [
      [0, 1], // The Line <-> Oxagon
      [0, 2], // The Line <-> Trojena
      [0, 3], // The Line <-> Sindalah
      [1, 3]  // Oxagon <-> Sindalah
    ];

    const railMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.75,
      linewidth: 2
    });

    connections.forEach(([startIdx, endIdx]) => {
      const p1 = stations[startIdx];
      const p2 = stations[endIdx];

      // Curved elevated spline path
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      midPoint.y += 12; // Elevated transit arch

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
      const points = curve.getPoints(36);
      const railGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(railGeo, railMat);
      group.add(line);
      rails.push(line);
    });

    return { group, rails };
  }

  /**
   * Autonomous Drone Model
   */
  private static createDrone(): THREE.Group {
    const drone = new THREE.Group();

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.8, 1.0, 0.4, 6);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    drone.add(body);

    // Glowing LED Ring
    const ringGeo = new THREE.TorusGeometry(1.2, 0.1, 8, 16);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    drone.add(ring);

    // Beacon Light
    const beacon = new THREE.PointLight(0x00f0ff, 2.5, 8);
    beacon.position.y = 0.5;
    drone.add(beacon);

    return drone;
  }

  /**
   * Atmospheric Particles (Trojena Snow & Floating Cyber Dust)
   */
  private static createAtmosphericParticles(): { snow: THREE.Points; cyberSparks: THREE.Points } {
    // Snow around Trojena
    const snowCount = 1200;
    const snowGeo = new THREE.BufferGeometry();
    const snowPos = new Float32Array(snowCount * 3);

    for (let i = 0; i < snowCount; i++) {
      snowPos[i * 3] = -140 + (Math.random() - 0.5) * 120;
      snowPos[i * 3 + 1] = Math.random() * 80;
      snowPos[i * 3 + 2] = -80 + (Math.random() - 0.5) * 120;
    }
    snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPos, 3));
    const snowMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.9,
      transparent: true,
      opacity: 0.8
    });
    const snow = new THREE.Points(snowGeo, snowMat);

    // Cyber Dust across the whole world
    const sparkCount = 2000;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 500;
      sparkPos[i * 3 + 1] = Math.random() * 70;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.6,
      transparent: true,
      opacity: 0.45
    });
    const cyberSparks = new THREE.Points(sparkGeo, sparkMat);

    return { snow, cyberSparks };
  }
}
