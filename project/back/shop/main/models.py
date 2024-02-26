from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from .utils import *


class Size(models.Model):
    name = models.CharField(max_length=10)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Photo(models.Model):
    url = models.CharField(max_length=200)

    def __str__(self):
        return self.url


class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Collection(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Cloth(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()
    price_with_sale = models.IntegerField(default=0)
    description = models.TextField()
    care_recommendations = models.TextField(default='none')
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    sale = models.IntegerField(default=0)
    s = models.IntegerField(default=0)
    m = models.IntegerField(default=0)
    l = models.IntegerField(default=0)
    xl = models.IntegerField(default=0)
    xxl = models.IntegerField(default=0)
    photos = models.ManyToManyField(Photo)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.stock == 0:
            self.stock = sum([self.s, self.m, self.l, self.xl, self.xxl])
        self.price_with_sale = self.price - (self.price * self.sale / 100)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Cloth'
        verbose_name_plural = 'Clothes'


class Certificate(models.Model):
    nominal = models.IntegerField()
    code = models.CharField(max_length=100, default='code')

    def save(self, *args, **kwargs):
        self.code = random_str(20)
        super().save(*args, **kwargs)


class OrderProduct(models.Model):
    product = models.ForeignKey(Cloth, on_delete=models.CASCADE)
    qty = models.IntegerField()
    size = models.CharField(max_length=10)
    price = models.IntegerField(default=0)
    total = models.IntegerField(default=0)

    def __str__(self):
        return f'order_{self.product.name}'

    def save(self, *args, **kwargs):
        self.price = self.product.price_with_sale
        self.total = self.qty * self.price
        super().save(*args, **kwargs)


class Order(models.Model):  # anon
    email = models.EmailField()
    country = models.CharField(max_length=100, blank=True)
    number = models.CharField(max_length=20)
    name = models.CharField(max_length=200, default='')
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    index = models.CharField(max_length=100, blank=True)
    delivery_type = models.CharField(max_length=100)
    delivery_method = models.CharField(max_length=100)
    total = models.IntegerField(default=0)
    status = models.CharField(max_length=100, blank=True)
    products = models.ManyToManyField(OrderProduct)
    certificates = models.ManyToManyField(Certificate)
    promo_percent = models.IntegerField(default=0)
    certificate_nominal = models.IntegerField(default=0)
    date = models.DateField(auto_now=True)


class UserOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()

    country = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=200, blank=True)
    number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    index = models.CharField(max_length=100, blank=True)
    deliveryType = models.CharField(max_length=100, blank=True)
    deliveryMethod = models.CharField(max_length=100, blank=True)


    status = models.CharField(max_length=100, blank=True)
    products = models.ManyToManyField(OrderProduct)
    certificates = models.ManyToManyField(Certificate, blank=True)

    date = models.DateField(auto_now=True)
    total = models.IntegerField(default=0, blank=True)
    promo_percent = models.IntegerField(default=0)
    certificate_nominal = models.IntegerField(default=0)
    old_total = models.IntegerField(default=0)
    middle_total = models.IntegerField(default=0)

    is_confirmed = models.BooleanField(default=False)


class CartProduct(
    models.Model):  # отличие КартПродукт от ОрдерПродукт в том что при создание карт продукта значение кол ва продукта не уменьшается
    product = models.ForeignKey(Cloth, on_delete=models.CASCADE)
    qty = models.IntegerField()
    size = models.CharField(max_length=10)
    price = models.IntegerField(default=0)
    total = models.IntegerField(default=0)

    def __str__(self):
        return f'order_{self.product.name}'

    def save(self, *args, **kwargs):
        self.price = self.product.price_with_sale
        self.total = self.qty * self.price
        super().save(*args, **kwargs)


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(CartProduct)
    promo_model = models.ForeignKey('Promo', on_delete=models.PROTECT, blank=True, null=True)
    promo = models.CharField(max_length=100, default='', blank=True)
    promoValue = models.IntegerField(default=0)
    certificate_model = models.ForeignKey(Certificate, on_delete=models.PROTECT, blank=True, null=True)
    certificate = models.CharField(max_length=100, default='', blank=True)
    certValue = models.IntegerField(default=0)
    oldTotal = models.IntegerField(default=0)
    midValue = models.IntegerField(default=0)
    total = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.promo_model is not None:
            self.promo = self.promo_model.code
            self.promoValue = self.promo_model.percent
        else:
            self.promo = ''
            self.promoValue = 0
        if self.certificate_model is not None:
            self.certificate = self.certificate_model.code
        else:
            self.certificate = ''

        super().save(*args, **kwargs)


class Promo(models.Model):
    percent = models.IntegerField()
    code = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        self.code = random_str(20)
        super().save(*args, **kwargs)


@receiver(post_save, sender=User)
def user_listener(sender, instance, **kwargs):
    for cart in Cart.objects.all():
        if cart.user == instance:
            return ''
    cart = Cart.objects.create(
        user=instance,
    )
    cart.save()


@receiver(post_save, sender=Cart)
def cart_product_listener(sender, instance, **kwargs):
    total = 0
    if instance.certificate_model is None:
        certificate_nominal = 0
    else:
        certificate_nominal = instance.certificate_model.nominal
    if instance.promo_model is None:
        promo_percent = 0
    else:
        promo_percent = instance.promo_model.percent
    for c_prod in instance.products.all():
        total += c_prod.total

    dct = recalc_func(total, certificate_nominal, promo_percent)

    Cart.objects.filter(user=instance.user).update(
        oldTotal=total,
        midValue=total - ((total / 100) * promo_percent),
        total=dct['total'],
        certValue=certificate_nominal - dct['certificate']
    )
    UserOrder.objects.filter(user=instance.user, is_confirmed=False).update(
        certificate_nominal=instance.certValue,
        promo_percent=instance.promoValue,
        total=instance.total,
        old_total=instance.oldTotal,
        middle_total=instance.midValue,
    )
