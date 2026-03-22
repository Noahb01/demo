import type { PowerSupply } from "@/types/listing";

export function formatPowerSupply(p: PowerSupply): string {
  if (p === "three_phase") return "Three-phase";
  return p;
}

export function formatMeters(n: number): string {
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })} m`;
}
