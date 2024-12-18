from django.utils.timezone import now

from django.db import models


class User(models.Model):
    tg_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    last_visit = models.DateField(default=now, verbose_name='Дата последнего захода в мини апп ')
    can_get_daly_bonus = models.BooleanField(default=True, verbose_name='можно ли получить бонус')
    tg_id = models.CharField(max_length=100)
    utm_label = models.CharField(null=True, blank=True)
    key_wheel_of_fortune = models.IntegerField(default=0, verbose_name='Количество ключей "Колесо фортуны"')
    key_free_case = models.IntegerField(default=0, verbose_name='Количество ключей "Бесплатный кейс"')

    def __str__(self):
        return f'tg_name:{self.tg_name}'


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'name:{self.name}'

class Casino(models.Model):
    name = models.CharField(max_length=50)
    descriptions = models.CharField(max_length=200, null=True, blank=True)
    rating = models.FloatField()
    logo = models.ForeignKey('Image', related_name='casino_logo', on_delete=models.CASCADE)
    banner = models.ForeignKey('Image', related_name='casino_banner', on_delete=models.CASCADE, null=True,
                               blank=True)
    free_spin = models.IntegerField(null=True, blank=True)
    dep = models.IntegerField(null=True, blank=True, verbose_name='Процент к депозиту')
    money = models.IntegerField(null=True, blank=True, verbose_name='+ Деньги при пополнении баланса')
    url = models.URLField()
    count_of_visit_people = models.IntegerField(default=0, verbose_name='Количество переходов в казино ')
    promo_code = models.TextField(null=True, blank=True)
    number_of_casino = models.IntegerField(verbose_name="Нумерация 'Топ 10 казино'", null=True, blank=True)
    peoples_top = models.IntegerField(verbose_name="Нумерация 'Топ людей' ", null=True, blank=True)
    numer_offers_of_week = models.IntegerField(verbose_name="Нумерация 'Предложение недели' ", null=True,
                                               blank=True)
    logo_url = models.URLField(null=True, blank=True, verbose_name='Путь к фото')
    banner_url = models.URLField(null=True, blank=True, verbose_name='Путь к банеру')
    category = models.ManyToManyField(Category, related_name='casinos', null=True, blank=True)

    def __str__(self):
        return f'name:{self.name}'


class Daly_Bonus(models.Model):
    user = models.ForeignKey(User, related_name='daly_bonus', on_delete=models.CASCADE)
    day = models.IntegerField(default=0, verbose_name='Количество ежедневных входов')
    count_prizes = models.IntegerField(default=0)

    def __str__(self):
        return f"tg_name:{self.user.tg_name},   day:{self.day}"


class Prize(models.Model):
    text = models.CharField(max_length=40, verbose_name='Название')
    number = models.IntegerField(null=True, blank=True, verbose_name='Номер приза (если несколько ваучеров)')
    picture = models.ForeignKey('Image', related_name='prize', on_delete=models.CASCADE, null=True, blank=True)
    picture_without_background = models.ForeignKey('Image', related_name='prizes_without', on_delete=models.CASCADE,
                                                   verbose_name='Картинка без фона', null=True, blank=True)
    promo_code = models.TextField(null=True, blank=True)
    count = models.IntegerField(null=True, blank=True, verbose_name='количество призов (ключи,деньги)')
    image_without_background_url = models.URLField(null=True, blank=True, verbose_name='Путь к фото без фона')
    image_url = models.URLField(null=True, blank=True, verbose_name='Путь к фото')
    description = models.CharField(max_length=100, null=True, blank=True)
    chance = models.FloatField(default=0, verbose_name='Шанс выпадения приза')
    image = models.URLField(null=True, blank=True, verbose_name='Юрл для перехода на продукт')
    url_product = models.URLField(null=True, blank=True, verbose_name='Юрл для перехода на продукт')
    wheel_of_fortune = models.BooleanField(null=True, blank=True, verbose_name='Приз для колеса фортуны')
    free_case = models.BooleanField(null=True, blank=True, verbose_name='Приз для Бесплатного кейса')
    number_of_choice = models.IntegerField(default=0, verbose_name='Порядок нумерации призов')

    def __str__(self):
        return f'name:{self.text}'


class My_Bag(models.Model):
    user = models.OneToOneField(User, related_name='my_bag', on_delete=models.CASCADE)
    prizes = models.ManyToManyField(Prize, related_name='my_bag', null=True, blank=True)

    def __str__(self):
        return f"tg_name:{self.user.tg_name}"


class Banners(models.Model):
    name = models.CharField(verbose_name='Имя', max_length=100)
    picture = models.ForeignKey('Image', on_delete=models.CASCADE, related_name='banner')
    numbers = models.IntegerField(verbose_name='Нумерация')
    image = models.URLField(null=True, blank=True)

    def __str__(self):
        return f" имя:{self.name}"


class Image(models.Model):
    name = models.TextField()
    picture = models.ImageField(upload_to='')

    def __str__(self):
        return f'name:{self.name}'
