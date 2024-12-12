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
        return f"tg_name:{self.tg_name},  tg_id:{self.tg_id},   utm_label:{self.utm_label}"


class Casino(models.Model):
    name = models.CharField(max_length=50)
    descriptions = models.CharField(max_length=200, null=True, blank=True)
    rating = models.FloatField()
    logo = models.ForeignKey('Image', related_name='casino_logo', on_delete=models.CASCADE)
    banner = models.ForeignKey('Image', related_name='casino_banner', on_delete=models.CASCADE, null=True, blank=True)
    free_spin = models.IntegerField(null=True, blank=True)
    dep = models.IntegerField(null=True, blank=True, verbose_name='Процент к депозиту')
    money = models.IntegerField(null=True, blank=True, verbose_name='+ Деньги при пополнении баланса')
    url = models.URLField()
    count_of_visit_people = models.IntegerField(default=0, verbose_name='Количество переходов в казино ')
    promo_code = models.TextField(null=True, blank=True)
    number_of_casino = models.IntegerField(verbose_name="Порядок (нумерация) для фильтров", null=True, blank=True)
    logo_url = models.URLField(null=True, blank=True, verbose_name='Путь к фото')
    banner_url = models.URLField(null=True, blank=True, verbose_name='Путь к банеру')

    def __str__(self):
        return (f"name:{self.name}, порядок в котором будут идти продукты:{self.number_of_casino}, "
                f"Количество переходов{self.count_of_visit_people} ")


class Personal_Visit_on_Casino(models.Model):
    user = models.ForeignKey(User, related_name='personal_visit_on_casino', on_delete=models.CASCADE)
    casino = models.ForeignKey(Casino, related_name='personal_visit_on_casino', on_delete=models.CASCADE)
    count_of_visit = models.IntegerField(default=0, verbose_name='Количество переходов ')

    def __str__(self):
        return f"user_name:{self.user.tg_name},   casino_name:{self.casino.name},   count_of_visit:{self.count_of_visit}"


class Daly_Bonus(models.Model):
    user = models.ForeignKey(User, related_name='daly_bonus', on_delete=models.CASCADE)
    day = models.IntegerField(default=0, verbose_name='Количество ежедневных входов')
    count_prizes = models.IntegerField(default=0)

    def __str__(self):
        return f"tg_name:{self.user.tg_name},   day:{self.day}"


class Prize(models.Model):
    text = models.CharField(max_length=40, verbose_name='Название')
    number = models.IntegerField(null=True, blank=True, verbose_name='Номер приза (если несколько ваучеров)')
    picture = models.ForeignKey('Image', related_name='prize', on_delete=models.CASCADE)
    picture_without_background=models.ForeignKey('Image', related_name='prizes_without',on_delete=models.CASCADE,
                                                 verbose_name='Картинка без фона',null=True,blank=True)
    promo_code = models.TextField(null=True, blank=True)
    count = models.IntegerField(null=True, blank=True, verbose_name='количество призов (ключи,деньги)')
    image_without_background_url=models.URLField(null=True, blank=True, verbose_name='Путь к фото без фона')
    image_url = models.URLField(null=True, blank=True, verbose_name='Путь к фото')
    chance = models.FloatField(default=0, verbose_name='Шанс выпадения приза')
    image = models.URLField(null=True, blank=True, verbose_name='Юрл для перехода на продукт')
    url_product = models.URLField(null=True, blank=True, verbose_name='Юрл для перехода на продукт')
    wheel_of_fortune = models.BooleanField(null=True, blank=True, verbose_name='Приз для колеса фортуны')
    free_case = models.BooleanField(null=True, blank=True, verbose_name='Приз для Бесплатного кейса')

    def __str__(self):
        return f"name:{self.text},id:{self.pk},колесо фортуны:{self.wheel_of_fortune},бесплатный кейс:{self.free_case}"


class My_Bag(models.Model):
    user = models.OneToOneField(User, related_name='my_bag', on_delete=models.CASCADE)
    prizes = models.ManyToManyField(Prize, related_name='my_bag', null=True, blank=True)

    def __str__(self):
        return f"tg_name:{self.user.tg_name}"


class Image(models.Model):
    name = models.TextField()
    picture = models.ImageField(upload_to='')

    def __str__(self):
        return f"name:{self.name}"
