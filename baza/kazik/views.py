from datetime import date, timedelta
from django.http import JsonResponse
from .Serializers import request_serializers, response_serializers
from adrf.decorators import api_view
from django.http import HttpRequest
from .models import *
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Subquery, OuterRef

from .services import find_next_available_prize
from .my_example import get_response_examples


# request_body=request_serializers.UserCreateSerializer,  FOR POST   (query_serializer=MainPageBody, FOR GET)


@swagger_auto_schema(
    methods=['GET'],
    query_serializer=request_serializers.UserCreateOrGetSerializer,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректные. '}),
        '200': get_response_examples(schema=response_serializers.MainPage)
    },
    tags=['Пользователь'],
    operation_summary='Cоздать пользователя',
    operation_description='Получает или создает пользователя по уникальному '
                          'идентификатору в Telegram и имени пользователя.',
)
@api_view(["GET"])
async def main_page(request: HttpRequest, tg_id: str, tg_name: str):
    if tg_id is None or tg_name is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})
    user = await User.objects.filter(tg_id=tg_id, tg_name=tg_name).afirst()

    if user is None:
        user = await User.objects.acreate(tg_id=tg_id, tg_name=tg_name,key_free_case=0)
        await  My_Bag.objects.acreate(user=user)
        await Daly_Bonus.objects.acreate(user=user)

    peoples_top = [item async for item in Casino.objects.all().order_by('peoples_top')]
    top_10_casino = [item async for item in Casino.objects.all().order_by('number_of_casino')][:10]
    offers_of_week = [item async for item in Casino.objects.exclude(banner_url__isnull=True).
    order_by('numer_offers_of_week').all()]
    banners = [item async for item in Banners.objects.all().order_by('name')]

    serialized_data = response_serializers.MainPage({
        'user': user,
        'banners': banners,
        'peoples_top': peoples_top,
        'top_10_casino': top_10_casino,
        'offers_of_week': offers_of_week

    }).data

    today = date.today()
    bonus = await Daly_Bonus.objects.filter(user=user).afirst()

    if today > user.last_visit:
        user.can_get_daly_bonus = True
        if user.last_visit < today - timedelta(days=1):
            bonus.day = 1
            bonus.count_prizes = 1

        user.last_visit = today

        if bonus.day == 8:
            bonus.day = 1
        if bonus.count_prizes >= 5:
            bonus.count_prizes = 5

    await bonus.asave()
    await user.asave()
    return JsonResponse(serialized_data, status=200)


@swagger_auto_schema(
    methods=['GET'],
    query_serializer=request_serializers.CustomTokenForAPP,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректные.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '200': get_response_examples(schema=response_serializers.MyBagSerializers)
    },
    tags=['Пользователь'],
    operation_summary='Получение моего профиля',
    operation_description='Получение моего профиля по уникальному идентификатору в Telegram .',
)
@api_view(["GET"])
async def get_my_profile(request: HttpRequest, tg_id: str):
    if tg_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()
    my_bag = await My_Bag.objects.filter(user=user).afirst()
    if my_bag is None:
        return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

    prizes = [item async for item in my_bag.prizes.all().order_by('id')]

    serializer_data = response_serializers.MyBagSerializers({
        'prizes': prizes
    }).data

    return JsonResponse(serializer_data, status=200)


@swagger_auto_schema(
    methods=['GET'],
    query_serializer=request_serializers.CustomTokenForAPP,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректные.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '200': get_response_examples(schema=response_serializers.DalySerializer)
    },
    tags=['Ежедневная награда'],
    operation_summary='Инфа о дневных наградах',
    operation_description='Получение инфы о дневных наградах по уникальному идентификатору в Telegram .',
)
@api_view(["GET"])
async def get_info_daly_bonus(request: HttpRequest, tg_id: str):
    if tg_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()
    bonus = await Daly_Bonus.objects.filter(user=user).afirst()

    if bonus is None:
        return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

    serializer_data = response_serializers.DalySerializer({
        'user': user,
        'bonus': bonus
    }).data

    return JsonResponse(serializer_data, status=200)


@swagger_auto_schema(
    methods=['POST'],
    request_body=request_serializers.CustomTokenForAPP,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректны.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '404  ': get_response_examples({'error': True, 'info': 'Вы уже получали бонусы сегодня.'}),
        '200': get_response_examples({'info': 'Бонусы успешно начислены'}),
    },
    tags=['Ежедневная награда'],
    operation_summary='Получение ежедневного награда',
    operation_description='Начисления бонусов на бэк',
)
@api_view(["POST"])
async def add_daly_pize_into_user(request: HttpRequest):
    tg_id = request.data['tg_id']
    if tg_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()
    bonus = await Daly_Bonus.objects.filter(user=user).afirst()

    if bonus is None:
        return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

    if user.can_get_daly_bonus == True:
        user.key_free_case += bonus.count_prizes
        user.can_get_daly_bonus = False

    else:
        return JsonResponse({'error': True, 'detail': 'Вы уже получали бонусы сегодня'})

    bonus.day += 1
    bonus.count_prizes += 1
    await user.asave()
    await bonus.asave()

    return JsonResponse({'title': 'Бонусы успешно начислены'})


@swagger_auto_schema(
    methods=['GET'],
    query_serializer=request_serializers.CustomTokenForAPP,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректны.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '200': get_response_examples(schema=response_serializers.GetWheelOfFortune)
    },
    tags=['Колесо фортуны'],
    operation_summary='Инфа о колесе фортуны',
    operation_description='Получение инфы о колесе фортуны по уникальному идентификатору в Telegram .',
)
@api_view(["GET"])
async def get_info_wheel_of_fortune(request: HttpRequest, tg_id: str):
    if tg_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()

    subquery = Prize.objects.filter(
        text=OuterRef('text'),
        wheel_of_fortune=True
    ).order_by('number_of_choice').values('pk')[:1]

    unique_prizes = Prize.objects.filter(
        pk__in=Subquery(subquery)
    ).order_by('number_of_choice')

    prizes = [prize async for prize in unique_prizes]

    if user is None:
        return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

    serializer_data = response_serializers.GetWheelOfFortune({
        'user': user,
        'prizes': prizes,
    }).data

    return JsonResponse(serializer_data, status=200)


@swagger_auto_schema(
    methods=['POST'],
    request_body=request_serializers.AddPrizeIntoBag,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректны.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '404  ': get_response_examples({'error': True, 'info': 'Данного приза не существует.'}),
        '404   ': get_response_examples({'error': True, 'info': 'У вас недостаточно ключей.'}),
        '200': get_response_examples({'info': 'Бонусы успешно начислены в ваш рюкзак'})
    },
    tags=['Колесо фортуны'],
    operation_summary='Принимаем бонусы и заносим в рюкзак',
    operation_description='Получаем бонусы колеса фортуны по уникальному идентификатору в Telegram .',
)
@api_view(["POST"])
async def add_wheel_of_fortune_bonus(request: HttpRequest):
    tg_id = request.data.get('tg_id')
    prize_id = request.data.get('prize_id')

    if tg_id is None or prize_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()
    if user.key_wheel_of_fortune > 0:
        my_bag = await My_Bag.objects.filter(user=user).afirst()
        prize = await Prize.objects.filter(id=prize_id).afirst()
        prize_name = prize.text
        prize_number = prize.number
        if user is None:
            return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

        if prize is None:
            return JsonResponse({'error': True, 'detail': 'Данного приза не существует.'})

        prize_exists = False
        async for item in my_bag.prizes.all():
            if item == prize:
                prize_exists = True
                break

        if not prize_exists:
            await my_bag.prizes.aadd(prize)

        else:
            try:
                next_prize = await find_next_available_prize(prize_name, start_number=prize_number + 1, my_bag=my_bag)
                await my_bag.prizes.aadd(next_prize)
            except AttributeError:
                pass

        user.key_wheel_of_fortune -= 1
        await user.asave()
        await my_bag.asave()
        return JsonResponse({'info': 'Бонусы успешно начислены в ваш рюкзак'}, status=200)
    else:
        return JsonResponse({'error': True, 'info': 'У вас недостаточно ключей.'}, status=404)


@swagger_auto_schema(
    methods=['GET'],
    query_serializer=request_serializers.CustomTokenForAPP,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректны.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '200': get_response_examples(schema=response_serializers.GetFreeCaseKeys)
    },
    tags=['Фри кейс'],
    operation_summary='Инфа о фри кейсе',
    operation_description='Получение инфы о фри кейсах по уникальному идентификатору в Telegram .',
)
@api_view(["GET"])
async def get_info_free_case(request: HttpRequest, tg_id: str):
    if tg_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()

    subquery = Prize.objects.filter(
        text=OuterRef('text'),
        free_case=True
    ).order_by('number_of_choice').values('pk')[:1]

    unique_prizes = Prize.objects.filter(
        pk__in=Subquery(subquery)
    ).order_by('number_of_choice')

    prizes = [prize async for prize in unique_prizes]

    if user is None:
        return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

    serializer_data = response_serializers.GetFreeCaseKeys({
        'user': user,
        'prizes': prizes,
    }).data

    return JsonResponse(serializer_data, status=200)


@swagger_auto_schema(
    methods=['POST'],
    request_body=request_serializers.AddPrizeIntoBag,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректны.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '404  ': get_response_examples({'error': True, 'info': 'Данного приза не существует.'}),
        '404   ': get_response_examples({'error': True, 'info': 'У вас недостаточно ключей.'}),
        '200': get_response_examples({'info': 'Бонусы успешно начислены в ваш рюкзак'})
    },
    tags=['Фри кейс'],
    operation_summary='Принимаем бонусы и заносим в рюкзак',
    operation_description='Получаем бонусы колеса фортуны по уникальному идентификатору в Telegram .',
)
@api_view(["POST"])
async def add_free_case_bonus(request: HttpRequest):
    tg_id = request.data.get('tg_id')
    prize_id = request.data.get('prize_id')

    if tg_id is None or prize_id is None:
        return JsonResponse({'error': True, 'штащ': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()
    if user.key_free_case > 0:
        my_bag = await My_Bag.objects.filter(user=user).afirst()
        prize = await Prize.objects.filter(id=prize_id).afirst()
        prize_name = prize.text
        prize_number = prize.number
        if user is None:
            return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

        if prize is None:
            return JsonResponse({'error': True, 'detail': 'Данного приза не существует.'})

        if prize.text == 'Oops':
            return JsonResponse({'info': 'Повезёт в другой раз'}, status=200)

        prize_exists = False
        async for item in my_bag.prizes.all():
            if item == prize:
                prize_exists = True
                break

        if not prize_exists:
            await  my_bag.prizes.aadd(prize)

        else:
            try:
                next_prize = await find_next_available_prize(prize_name, start_number=prize_number + 1, my_bag=my_bag)
                await my_bag.prizes.aadd(next_prize)
            except AttributeError:
                pass

        user.key_free_case -= 1
        await user.asave()
        await my_bag.asave()
        return JsonResponse({'info': 'Бонусы успешно начислены в ваш рюкзак'}, status=200)

    else:
        return JsonResponse({'error': True, 'info': 'У вас недостаточно ключей'}, status=404)


@swagger_auto_schema(
    methods=['GET'],
    query_serializer=request_serializers.CustomTokenForAPP,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректные.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '200': get_response_examples(schema=response_serializers.CategoryCasinos)
    },
    tags=['Категории казино'],
    operation_summary='Отфильтрованный список по категориям ',
    operation_description='Получение инфы по уникальному идентификатору в Telegram .',
)
@api_view(['GET'])
async def filter_category_list(request: HttpRequest, tg_id: str):
    if tg_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()

    if user is None:
        return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

    data = []

    casino = [item async for item in Casino.objects.filter(category__name='casino').all().order_by('number_of_casino')]
    data.append(response_serializers.CategoryCasinos({'title': 'Казино','id':1, 'items': casino}).data)

    betting = [item async for item in
               Casino.objects.filter(category__name='betting').all().order_by('number_of_casino')]
    data.append(response_serializers.CategoryCasinos({'title': 'Ставки','id':2, 'items': betting}).data)

    poker = [item async for item in Casino.objects.filter(category__name='poker').all().order_by('number_of_casino')]
    data.append(response_serializers.CategoryCasinos({'title': 'Покер','id':3, 'items': poker}).data)

    telegram = [item async for item in
                Casino.objects.filter(category__name='telegram').all().order_by('number_of_casino')]
    data.append(response_serializers.CategoryCasinos({'title': 'Телеграм','id':4, 'items': telegram}).data)

    new = [item async for item in Casino.objects.filter(category__name='new').all().order_by('number_of_casino')]
    data.append(response_serializers.CategoryCasinos({'title': 'Новые','id':5, 'items': new}).data)

    licenses = [item async for item in
                Casino.objects.filter(category__name='license').all().order_by('number_of_casino')]
    data.append(response_serializers.CategoryCasinos({'title': 'Лицензионные', 'id':6, 'items': licenses}).data)

    return JsonResponse(data, safe=False, status=200)


@swagger_auto_schema(
    methods=['POST'],
    request_body=request_serializers.CustomTokenForAPP,
    responses={
        '404': get_response_examples({'error': True, 'info': 'Данные переданы некорректны.'}),
        '404 ': get_response_examples({'error': True, 'info': 'Данного пользователя не существует.'}),
        '404  ': get_response_examples({'error': True, 'info': 'Вы уже получали бонусы сегодня.'}),
        '200': get_response_examples({'info': 'Бонусы успешно начислены'}),
    },
    tags=['Добавление иконки'],
    operation_description='Начисления бонусов на бэк',
)
@api_view(["POST"])
async def set_sign(request: HttpRequest):
    tg_id = request.data['tg_id']
    if tg_id is None:
        return JsonResponse({'error': True, 'detail': 'Некорректные данные'})

    user = await User.objects.filter(tg_id=tg_id).afirst()

    if user is None:
        return JsonResponse({'error': True, 'detail': 'Данного пользователя не существует.'})

    if user.set_sign == True:
        return JsonResponse({'error': True, 'detail': 'Бонусы получены'})

    else:
        user.set_sign = True
        user.key_wheel_of_fortune += 1
        await user.asave()
    return JsonResponse({'title': 'Бонусы успешно начислены'},status=200)
