from rest_framework import serializers
from ..models import *


class UserMainPageSerializer(serializers.Serializer):
    tg_id = serializers.CharField()
    tg_name = serializers.CharField(max_length=100)


class CasinoMainPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casino
        fields = ['id', 'name', 'rating', 'free_spin', 'dep', 'money', 'url', 'count_of_visit_people', 'promo_code',
                  'logo_url']


class Top10CasinoSerializer(CasinoMainPageSerializer):
    descriptions = serializers.CharField()

    class Meta(CasinoMainPageSerializer.Meta):
        fields = CasinoMainPageSerializer.Meta.fields + ['descriptions']


class Offers_Of_Week(CasinoMainPageSerializer):
    banner_url = serializers.URLField()

    class Meta(CasinoMainPageSerializer.Meta):
        fields = CasinoMainPageSerializer.Meta.fields + ['banner_url']


class MainPage(serializers.Serializer):
    user = UserMainPageSerializer()
    peoples_top = CasinoMainPageSerializer(many=True)
    top_10_casino = Top10CasinoSerializer(many=True)
    offers_of_week = Offers_Of_Week(many=True)


class PrizeSerializers(serializers.Serializer):
    id = serializers.IntegerField()
    text = serializers.CharField()
    promo_code = serializers.CharField()
    count = serializers.IntegerField()
    image = serializers.URLField()
    image_without_background_url=serializers.URLField()
    url_product = serializers.URLField()
    chance = serializers.FloatField()


class MyBagSerializers(serializers.Serializer):
    prizes = PrizeSerializers(many=True)


class UserDalyBonusSerializer(serializers.Serializer):
    can_get_daly_bonus = serializers.BooleanField(default=True)


class DalyBonusSerializer(serializers.Serializer):
    day = serializers.IntegerField()
    count_prizes = serializers.IntegerField()


class DalySerializer(serializers.Serializer):
    user = UserDalyBonusSerializer()
    bonus = DalyBonusSerializer()
