from django.db.migrations import serializer
from rest_framework import serializers

from .models import *


class ClothSerializer(serializers.ModelSerializer):
    photos = serializers.StringRelatedField(many=True)

    class Meta:
        model = Cloth
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CartProductSerializer(serializers.ModelSerializer):
    product = ClothSerializer()

    class Meta:
        model = CartProduct
        fields = '__all__'


class OrderProductSerializer(serializers.ModelSerializer):
    product = ClothSerializer()

    class Meta:
        model = OrderProduct
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    products = CartProductSerializer(many=True)

    class Meta:
        model = Cart
        fields = '__all__'


class UserOrderSerializer(serializers.ModelSerializer):
    products = OrderProductSerializer(many=True)

    class Meta:
        model = UserOrder
        fields = '__all__'
