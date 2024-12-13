import { FreeCaseType } from "../types/FreeCase";

// Функция для выбора случайного приза на основе шансов
export const getRandomPrize = (data: FreeCaseType[]): FreeCaseType => {
  const totalChance = data.reduce((acc, item) => acc + item.chance, 0);
  const randomChance = Math.random() * totalChance;
  let currentChance = 0;

  for (let i = 0; i < data.length; i++) {
    currentChance += data[i].chance;
    if (randomChance < currentChance) {
      return data[i];
    }
  }

  return data[0];
};
