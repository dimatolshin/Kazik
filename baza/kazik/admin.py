from django.contrib import admin

from .models import *


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ['created_at']
    list_display = ['tg_name', 'last_visit', 'can_get_daly_bonus', 'tg_id', 'utm_label', 'key_wheel_of_fortune',
                    'key_free_case']


@admin.register(Casino)
class CasinoAdmin(admin.ModelAdmin):
    fields = ['name', 'rating', 'logo', 'banner', 'free_spin', 'dep', 'money', 'url', 'count_of_visit_people',
              'promo_code', 'number_of_casino']

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if not change:
            logo_image_url = obj.logo.picture.url
            if obj.banner is not None:
                obj.banner_url = obj.banner.picture.url
            obj.logo_url = logo_image_url

        if change:
            if obj.banner:
                obj.banner_url = obj.banner.picture.url
            else:
                obj.banner_url = None

            if obj.logo:
                obj.logo_url = obj.logo.picture.url

        obj.save()


@admin.register(Daly_Bonus)
class Daly_Bonus_Admin(admin.ModelAdmin):
    pass


@admin.register(Prize)
class PrizeAdmin(admin.ModelAdmin):
    fields = ['text', 'number', 'picture', 'picture_without_background', 'promo_code', 'count', 'chance', 'url_product',
              'wheel_of_fortune', 'free_case']

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        if not change:
            image_url = obj.picture.picture.url
            obj.image = image_url
            try:
                image_without_background = obj.picture_without_background.picture.url
                obj.image_without_background_url = image_without_background
            except AttributeError:
                pass
        if change:

            if obj.picture:
                obj.image = obj.picture.picture.url

            if obj.picture_without_background:
                obj.image_without_background_url = obj.picture_without_background.picture.url

        obj.save()


@admin.register(My_Bag)
class My_Bag_Admin(admin.ModelAdmin):
    pass


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass
