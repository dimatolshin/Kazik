import { InventoryType } from "../types/InventoryType";
import { v4 as uuidv4 } from "uuid";

export const createEmptySlots = (
  filledItems: InventoryType[],
  totalSlots: number,
  minEmptySlots: number
) => {
  const emptySlotsCount = Math.max(
    minEmptySlots,
    totalSlots - filledItems.length
  );
  const emptySlots= Array(emptySlotsCount)
    .fill(null)
    .map(() => ({ id: uuidv4(), filled: true }));
  return [...filledItems, ...emptySlots];
};
