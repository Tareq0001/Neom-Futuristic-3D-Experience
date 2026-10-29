/**
 * 100% Renewable Energy Grid Simulation Engine
 * Conceived & Engineered by Tareq Abuashi
 */

export interface EnergyMetrics {
  solarGW: number;
  windGW: number;
  hydrogenGW: number;
  totalGenerationGW: number;
  gridDemandGW: number;
  batteryStorageMWh: number;
  carbonOffsetTonsPerHour: number;
  cleanEnergyRatio: number;
  isSurplus: boolean;
  netBalanceGW: number;
}

export class EnergyGridSimulator {
  // Peak theoretical capacities
  private readonly MAX_SOLAR_GW = 22.0; // Tabuk Desert Solar Arrays
  private readonly MAX_WIND_GW = 11.5;  // Red Sea / Gulf of Aqaba Turbines
  private readonly MAX_HYDROGEN_GW = 9.0; // Helios Green Hydrogen Plant

  // City baseline dynamic load demand
  private baseDemandGW = 16.2;
  private batteryMaxMWh = 50000;
  private batteryCurrentMWh = 42800;

  public computeMetrics(
    solarSlider: number, // 0 - 100
    windSlider: number,  // 0 - 100
    hydrogenSlider: number // 0 - 100
  ): EnergyMetrics {
    const solarGW = Math.round(((solarSlider / 100) * this.MAX_SOLAR_GW) * 10) / 10;
    const windGW = Math.round(((windSlider / 100) * this.MAX_WIND_GW) * 10) / 10;
    const hydrogenGW = Math.round(((hydrogenSlider / 100) * this.MAX_HYDROGEN_GW) * 10) / 10;

    const totalGenerationGW = Math.round((solarGW + windGW + hydrogenGW) * 10) / 10;
    const netBalanceGW = Math.round((totalGenerationGW - this.baseDemandGW) * 10) / 10;

    // Battery buffer dynamics
    if (netBalanceGW > 0) {
      this.batteryCurrentMWh = Math.min(this.batteryMaxMWh, this.batteryCurrentMWh + netBalanceGW * 15);
    } else {
      this.batteryCurrentMWh = Math.max(12000, this.batteryCurrentMWh + netBalanceGW * 15);
    }

    // CO2 offset relative to conventional fossil grid (approx 450 metric tons CO2 per GW/h)
    const carbonOffsetTonsPerHour = Math.round(totalGenerationGW * 450);

    return {
      solarGW,
      windGW,
      hydrogenGW,
      totalGenerationGW,
      gridDemandGW: this.baseDemandGW,
      batteryStorageMWh: Math.round(this.batteryCurrentMWh),
      carbonOffsetTonsPerHour,
      cleanEnergyRatio: 100, // NEOM operates on 100% clean energy
      isSurplus: netBalanceGW >= 0,
      netBalanceGW
    };
  }
}

export const energySimulator = new EnergyGridSimulator();
