import { FreeCaseType } from "../types/FreeCase";

export const reproductionArray = (array: FreeCaseType[] = [], length = 0) => [
  ...Array(length)
    .fill("_")
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

export const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;
