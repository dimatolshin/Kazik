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
import django

load_dotenv()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'baza.settings')
django.setup()
from kazik.models import *

bot = Bot(token=os.getenv('TOKEN'), default=DefaultBotProperties(parse_mode=ParseMode.HTML))

dp = Dispatcher()


@dp.message(CommandStart())
async def handle_start(message: types.Message):
    web_app_url = os.getenv('URL_WEBSITE')

    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🥇 1WIN - 500 % к депозиту  ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=ff1ce163844ce90bfefa')],
        [InlineKeyboardButton(text="🥈 RAMENBET -🎮 Gates of Olympus 30 фриспинов 🎰", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=c093456c6bc2271baa4d')],
        [InlineKeyboardButton(text="🥉 CASINOX -🎮 Gates of Olympus 30 фриспинов 🎰 ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=0e2f70c460d4a6375bf3')],
        [InlineKeyboardButton(text="4️⃣ VULKAN - 100% (15k💵) + 20 фриспинов 🎰 в FruitCocktail 🎮 ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=376aceaa9a698c3d9e23')],
        [InlineKeyboardButton(text="5️⃣ MELBET - 30% к велком бонусу ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=abf339e5a88de2f4d366')],
        [InlineKeyboardButton(text="6️⃣ PINCO - 150% на деп и до 250 фриспинов 🎰 ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=f41cb00c2cec8761b32c')],
        [InlineKeyboardButton(text="7️⃣ R7 - 100% + 100 фриспинов 🎰 на первый депозит ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=66cf96678f0af7fe2dcb')],
        [InlineKeyboardButton(text="8️⃣ KENT - 100% + 100 фриспинов 🎰 на первый депозит ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=5005332e8e6a7279b94a')],
        [InlineKeyboardButton(text="9️⃣ CAT - 100% + 100 фриспинов 🎰 на первый депозит ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=30f437656a94de1155da')],
        [InlineKeyboardButton(text="🔟 KOMETA - 100% + 100 фриспинов 🎰 на первый депозит ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=bcdea3c7f7d865827596')],

        [InlineKeyboardButton(text="✅ Рейтинг онлайн-казино", web_app=WebAppInfo(url=web_app_url))],
        [InlineKeyboardButton(text="💼 Получить промокод", web_app=WebAppInfo(url=web_app_url))],

    ])
    # async for item in Casino.objects.all().order_by('number_of_casino')[:10]:
    #     keyboard.inline_keyboard.append([
    #         InlineKeyboardButton(text=f"{item.name} - {item.descriptions}", web_app=WebAppInfo(url=item.url))
    #     ])

    gif_url = 'https://api.zerkalogm.online/media/casino.gif'
    await bot.send_animation(
        chat_id=message.chat.id,
        animation=gif_url,
        caption=(
            "🏆 Рейтинг и рабочие ссылки 24/7\n"
        ),
        reply_markup=keyboard
    )


async def main() -> None:
    # And the run events dispatching
    await dp.start_polling(bot)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
