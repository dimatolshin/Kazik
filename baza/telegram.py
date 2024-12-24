import asyncio
import logging
import sys
from aiogram import Bot, Dispatcher, types, F
from aiogram.enums import ParseMode
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardButton, WebAppInfo, InlineKeyboardMarkup, ChatJoinRequest, CallbackQuery
from aiogram.client.default import DefaultBotProperties
import os
from dotenv import load_dotenv
import django

load_dotenv()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'baza.settings')
django.setup()

channel_id = os.getenv('channel_id')
bot = Bot(token=os.getenv('TOKEN'), default=DefaultBotProperties(parse_mode=ParseMode.HTML))
dp = Dispatcher()


async def approve_request(chat_join: ChatJoinRequest):
    msg = (
        'Привет 👋 нажми на кнопку "Старт"\n'
        'Тебя ждут лучшие условия, честный рейтинг, множество бонусов и фри спинов в любимых играх!'
    )

    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🔄 Старт", callback_data="start_action")],
    ])

    await bot.send_message(chat_id=chat_join.from_user.id, text=msg, reply_markup=keyboard)

    # Одобряем запрос на вступление
    await chat_join.approve()


@dp.message(CommandStart())
async def handle_start(message: types.Message):
    web_app_url = os.getenv('URL_WEBSITE')

    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🥇 1WIN - 500 % к депозиту  ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=ff1ce163844ce90bfefa')],
        [InlineKeyboardButton(text="🥈 RAMENBET -🎮 30 FS Gates of Olympus 🎰", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=c093456c6bc2271baa4d')],
        [InlineKeyboardButton(text="🥉 CASINOX -🎮 30 FS Gates of Olympus 🎰 ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=0e2f70c460d4a6375bf3')],
        [InlineKeyboardButton(text="4️⃣ VULKAN - 100% к депозиту ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=376aceaa9a698c3d9e23')],
        [InlineKeyboardButton(text="5️⃣ MELBET - 30% бонус ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=abf339e5a88de2f4d366')],
        [InlineKeyboardButton(text="6️⃣ PINCO - 150% + 250 FS 🎰 ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=f41cb00c2cec8761b32c')],
        [InlineKeyboardButton(text="7️⃣ R7 - 100% + 100 FS 🎰  ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=66cf96678f0af7fe2dcb')],
        [InlineKeyboardButton(text="8️⃣ KENT - 100% + 100 FS 🎰", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=5005332e8e6a7279b94a')],
        [InlineKeyboardButton(text="9️⃣ CAT - 100% + 100 FS 🎰 ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=30f437656a94de1155da')],
        [InlineKeyboardButton(text="🔟 KOMETA -100% + 100 FS🎰  ", callback_data='big_button_1',
                              url='https://igtrack.xyz/click?key=bcdea3c7f7d865827596')],
        [InlineKeyboardButton(text="✅ Рейтинг онлайн-казино", web_app=WebAppInfo(url=web_app_url))],
        [InlineKeyboardButton(text="💼 Получить промокод", web_app=WebAppInfo(url=web_app_url))],
    ])

    gif_url = os.getenv('gif_url')
    await bot.send_animation(
        chat_id=message.chat.id,
        animation=gif_url,
        caption="🏆 Рейтинг и рабочие ссылки 24/7:\n",
        reply_markup=keyboard
    )


@dp.callback_query(F.data == "start_action")
async def handle_start_button(callback: CallbackQuery):
    await handle_start(callback.message)  # Вызываем функцию handle_start
    await callback.answer()


async def main() -> None:
    dp.chat_join_request.register(approve_request)
    dp.message.register(handle_start, CommandStart())
    dp.callback_query.register(handle_start_button)

    await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, stream=sys.stdout)
    asyncio.run(main())
