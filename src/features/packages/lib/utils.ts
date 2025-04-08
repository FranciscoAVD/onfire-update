export function getDaysValid(numPrivates: number): number {
  const MINIMUM_DAYS = 7 as const;
  const NUM_OF_CLASSES_PER_PADDING = 5 as const;

  const minDays = MINIMUM_DAYS * numPrivates;
  let padding = Math.floor(numPrivates / NUM_OF_CLASSES_PER_PADDING); //every 5 classes add 7 days of padding
  return minDays + padding * MINIMUM_DAYS;
}
