from rest_framework import serializers
from ..models import *

class UserMainPageSerializer(serializers.Serializer):
    tg_id=serializers.CharField()
    tg_name = serializers.CharField(max_length=100)


class CasinoMainPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casino
        fields = ['name', 'rating','free_spin', 'dep', 'money', 'url', 'count_of_visit_people', 'promo_code','logo_url']



class Offers_Of_Week(CasinoMainPageSerializer):
    banner_url=serializers.URLField()

    class Meta(CasinoMainPageSerializer.Meta):
        fields = CasinoMainPageSerializer.Meta.fields + ['banner_url']



class MainPage(serializers.Serializer):
    user=UserMainPageSerializer()
    peoples_top=CasinoMainPageSerializer(many=True)
    top_10_casino=CasinoMainPageSerializer(many=True)
    offers_of_week=Offers_Of_Week(many=True)


class PrizeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Prize
        fields = ['name','promo_code','count','image_url','url_product','id']



class MyBagSerializers(serializers.Serializer):
    prizes=PrizeSerializers(many=True)


class UserDalyBonusSerializer(serializers.Serializer):
    can_get_daly_bonus=serializers.BooleanField(default=True)

class DalyBonusSerializer(serializers.Serializer):
    day=serializers.IntegerField()
    count_prizes=serializers.IntegerField()


class DalySerializer(serializers.Serializer):
    user=UserDalyBonusSerializer()
    bonus=DalyBonusSerializer()
