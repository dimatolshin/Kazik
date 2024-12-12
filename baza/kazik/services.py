from .models import Prize


async def find_next_available_prize(prize_name, start_number, my_bag):
    while True:
        prize = await Prize.objects.filter(name=prize_name, number=start_number).afirst()
        if not await my_bag.prizes.filter(id=prize.id).aexists():
            return prize
        start_number += 1

