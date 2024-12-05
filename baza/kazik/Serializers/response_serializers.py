from rest_framework import serializers

class InfoUserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    age = serializers.IntegerField(default=18)
    id = serializers.IntegerField()

class InfoPlusErrorUserSerializer(serializers.Serializer):
    error = serializers.BooleanField(default=False)
    info = InfoUserSerializer()