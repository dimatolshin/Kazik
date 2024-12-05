from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'created_at','age')

admin.site.register(User, UserAdmin)
