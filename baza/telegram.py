import asyncio
import logging
import sys
from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardButton, WebAppInfo, InlineKeyboardMarkup, InputFile, BufferedInputFile
from aiogram.client.default import DefaultBotProperties
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Bot instance with default bot properties which will be passed to all API calls
bot = Bot(token=os.getenv('TOKEN'), default=DefaultBotProperties(parse_mode=ParseMode.HTML))

# All handlers should be attached to the Dispatcher
dp = Dispatcher()


@dp.message(CommandStart())
async def handle_start(message: types.Message):
    # URL веб-приложения
    web_app_url = os.getenv('URL_WEBSITE')

    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Запуск", web_app=WebAppInfo(url=web_app_url))]
    ])

    # try:
    #     with open("media/casino.gif", "rb") as file:
    #         gif = InputFile(file, filename="casino.gif")
    #         await bot.send_animation(chat_id=message.chat.id, animation=gif)
    # except FileNotFoundError:
    #     await message.answer("Ошибка: GIF файл не найден.")
    #     return

    await message.answer(
        text=(
            "🏆 Рейтинг и рабочие ссылки 24/7\n"
            "💸 Эксклюзивные бонусы и промокоды\n"
            "🎁 Ежедневные награды: колесо фортуны и бесплатные кейсы\n"
            "🛡 Только лицензионные бренды\n\n"
            "Смотри лучшие предложения! 👇🏻"
        ),
        reply_markup=keyboard
    )


async def main() -> None:
    # And the run events dispatching
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
