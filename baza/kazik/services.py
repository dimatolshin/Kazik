from django.db import transaction
from .models import Prize

def add_prize_sync(my_bag, prize):
    with transaction.atomic():
        my_bag.prizes.add(prize)
        my_bag.save()


async def find_next_available_prize(prize_name, start_number, my_bag):
    while True:
        prize = await Prize.objects.filter(name=prize_name, number=start_number).afirst()
        if not await my_bag.prizes.filter(id=prize.id).aexists():
            return prize
        start_number += 1

