from rest_framework import serializers

class UserCreateOrGetSerializer(serializers.Serializer):
    tg_name = serializers.CharField(max_length=100)
    tg_id = serializers.IntegerField()


class CustomTokenForAPP(serializers.Serializer):
    tg_id = serializers.IntegerField()


class AddPrizeIntoBag(CustomTokenForAPP):
    prize_id=serializers.IntegerField()