import asyncio
import logging
import sys
from aiogram import Bot, Dispatcher, types
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardButton, WebAppInfo, InlineKeyboardMarkup
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
    # command_parts = message.text.split()
    # if len(command_parts) > 1:
    #     referrer_id = command_parts[1].replace('id_', '')  # Удаляем префикс 'id_'
    #     web_app_url = f'id={referrer_id}' #
    #     keyboard = InlineKeyboardMarkup(inline_keyboard=[
    #         [InlineKeyboardButton(text="Запуск", web_app=WebAppInfo(url=web_app_url))]
    #     ])
    #     await message.answer("Начни сейчас и догони своего друга", reply_markup=keyboard)
    # else:
        web_app_url = os.getenv('URL_WEBSITE')
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Запуск", web_app=WebAppInfo(url=web_app_url))]
        ])
        await message.answer("Попробуй свои силы и одолей всех врагов у себя на пути", reply_markup=keyboard)


async def main() -> None:
    # And the run events dispatching
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())