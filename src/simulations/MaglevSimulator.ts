/**
 * High-Speed Maglev Transit Simulation Engine
 * Conceived & Engineered by Tareq Abuashi
 */

export interface StationRoute {
  origin: string;
  destination: string;
  distanceKm: number;
  durationMin: number;
  speedKmh: number;
  gForce: number;
  energyKwh: number;
}

export class MaglevSimulator {
  // Pre-calculated matrix between the 4 major NEOM Megasectors
  private distanceMatrix: Record<string, Record<string, number>> = {
    theline: {
      theline: 0,
      oxagon: 62.5,
      trojena: 84.0,
      sindalah: 118.2
    },
    oxagon: {
      theline: 62.5,
      oxagon: 0,
      trojena: 136.4,
      sindalah: 46.8
    },
    trojena: {
      theline: 84.0,
      oxagon: 136.4,
      trojena: 0,
      sindalah: 158.0
    },
    sindalah: {
      theline: 118.2,
      oxagon: 46.8,
      trojena: 158.0,
      sindalah: 0
    }
  };

  private cruiseSpeedKmh = 510; // Nominal cruising velocity of NEOM Maglev

  public calculateRoute(origin: string, destination: string): StationRoute {
    if (origin === destination) {
      return {
        origin,
        destination,
        distanceKm: 0,
        durationMin: 0,
        speedKmh: 0,
        gForce: 0,
        energyKwh: 0
      };
    }

    const dist = this.distanceMatrix[origin]?.[destination] || 75.0;
    // T = (Distance / Speed) * 60 + 1.8 mins for smooth 0.42g acceleration/deceleration curve
    const duration = Math.max(2.5, Math.round(((dist / this.cruiseSpeedKmh) * 60 + 1.8) * 10) / 10);
    // Passenger cabin G-force capped at comfortable 0.42G
    const gForce = 0.42;
    // Energy in kWh (approx 18.5 kWh per km of superconducting maglev pod)
    const energy = Math.round(dist * 18.5);

    return {
      origin,
      destination,
      distanceKm: dist,
      durationMin: duration,
      speedKmh: this.cruiseSpeedKmh,
      gForce,
      energyKwh: energy
    };
  }
}

export const maglevSimulator = new MaglevSimulator();
