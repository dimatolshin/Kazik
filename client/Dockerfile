# Используем официальный образ Node.js версии 20.14.0
FROM node:20.14.0
# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости проекта RUN npm install
RUN npm install
# Копируем остальные файлы проекта в рабочую директорию
COPY . .

# Сборка проекта для продакшена RUN npm run build
RUN npm run build