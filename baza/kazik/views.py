from django.http import JsonResponse
from .Serializers import request_serializers,response_serializers
from rest_framework import status
from adrf.decorators import api_view
from django.http import HttpRequest
from .models import *
from django.db import IntegrityError
from drf_yasg.utils import swagger_auto_schema
from .my_example import get_response_examples


from collections import defaultdict

def transform_errors(errors):
    transformed = defaultdict(list)
    transformed['error'] = True
    for field, error_list in errors.items():
        if isinstance(error_list, list):
            transformed[field] = error_list[0].__str__()
        else:
            transformed[field] = error_list.__str__()
    return dict(transformed)



@swagger_auto_schema(
    methods=['POST'],
    request_body=request_serializers.UserCreateSerializer, # FOR POST   (query_serializer=MainPageBody, FOR GET)
    responses={
        '404': get_response_examples({'error': True, 'info': 'User with this username or email already exists.'}),
        '404 ': get_response_examples({'error': True, 'info': 'name not received'}),
        '200':get_response_examples(schema=response_serializers.InfoUserSerializer)
    },
    tags=['Создание пользователя'],
    operation_summary= 'Cоздать пользователя',
    operation_description= 'Получает или создает пользователя по уникальному '
                 'идентификатору в Telegram и имени пользователя.',
)
@api_view(["POST"])
async def user_create(request: HttpRequest):
    serializer = request_serializers.UserCreateSerializer(data=request.data)
    if serializer.is_valid():
        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        age = serializer.validated_data['age']

        try:
            user = await User.objects.acreate(name=name, email=email, age=age)
            serialized_data = response_serializers.InfoUserSerializer(user).data
            return JsonResponse(serialized_data,
                            status=status.HTTP_201_CREATED,safe=False)
        except IntegrityError:
            return JsonResponse({'error':'True',
                                 'info': 'User with this username or email already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)
    else:
        transformed_errors = transform_errors(serializer.errors)
        return JsonResponse(transformed_errors, status=status.HTTP_400_BAD_REQUEST)
