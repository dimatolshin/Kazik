from django.urls import path
from .views import *

urlpatterns = [
                        #основная
    path('main_page/<str:tg_id>/<str:tg_name>/',main_page),
    path('my_profile/<str:tg_id>/',get_my_profile),

                        #Ежедневная награда
    path('get_info_daly_bonus/<str:tg_id>/',get_info_daly_bonus),
    path('get_daly_bonus/',add_daly_pize_into_user),

                        #Колесо фортуны
    path('get_info_wheel_of_fortune/<str:tg_id>/',get_info_wheel_of_fortune),
    path('add_wheel_of_fortune_bonus/',add_wheel_of_fortune_bonus),

                        #Фри кейсы
    path('get_info_free_case/<str:tg_id>/',get_info_free_case),
    path('add_free_case_bonus/',add_free_case_bonus),


]