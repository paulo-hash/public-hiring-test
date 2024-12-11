export function convertInKg(value: number, fromUnit: string): number {
  const weightUnits: { [key: string]: number } = {
    kg: 1,
    gr: 0.001,
    lbs: 0.453592,
    oz: 0.0283495,
  };

  if (!weightUnits[fromUnit]) {
    throw new Error("Unknown unit");
  }

  return value * weightUnits[fromUnit];
}
