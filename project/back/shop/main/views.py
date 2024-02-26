from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils import *

from .models import *
from .serializers import *

serial = ClothSerializer


class MainAPIView(ListAPIView):
    queryset = Cloth.objects.all()
    serializer_class = serial


class SaleApiView(ListAPIView):
    queryset = sale_func(Cloth.objects.all(), True)
    serializer_class = serial


@api_view(('GET', 'POST'))
def func(request):
    # return Response(request.data)
    queryset = Cloth.objects.all()
    key_str = request.data['key_str']
    sale = request.data['sale']
    sort_type = request.data['sort_type']
    min = request.data['min']
    max = request.data['max']
    key_words_query = search_function(key_str, queryset)
    if len(key_words_query) == 0:
        serializer = ClothSerializer(key_words_query, many=True)
        return Response(serializer.data)
    sale_query = sale_func(key_words_query, sale)
    sort_query = sort_func(sale_query, sort_type)
    price_min_max_query = price_min_max(sort_query, min, max)
    serializer = ClothSerializer(price_min_max_query, many=True)
    return Response(serializer.data)


def category_query_maker(models, field, value, serializer_class):
    lst = []
    for model in models:
        for obj in model.objects.all():
            if getattr(obj, field).name == value:
                lst.append(obj)

    @api_view(('GET',))
    def function(request):
        return Response(serializer_class(lst, many=True).data)

    return function


@api_view(('GET', 'POST'))
def cart_creater(request):
    id_str = request.data['id_arr'].split()
    queryset = []
    for s in id_str:
        id = int(s)
        queryset.append(Cloth.objects.get(id=id))
    serializer = ClothSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(('POST',))
def create_rec(request):
    id_lst = request.data['product_id'].split()
    search_str = ''
    for id in id_lst:
        id_int = int(id)
        product = Cloth.objects.get(id=id_int)
        search_str += ' ' + product.name + f' {product.collection.name}'
    queryset = search_function(search_str, Cloth.objects.all())
    fin_query = []
    for i in range(len(queryset)):
        if i > 5:
            break
        fin_query.append(queryset[i])
    serial = ClothSerializer(fin_query, many=True)
    return Response(serial.data)


@api_view(('POST',))
def email_validator_view(request):
    email = request.data['email']
    return Response(email_validator(email))


@api_view(('POST',))
def order_creator(request):
    data = request.data

    id_lst = data['ids'].split()
    size_lst = data['sizes'].split()
    qty_lst = data['qtys'].split()
    nominal_lst = data['nominals'].split()
    cert_qty_lst = data['cert_qtys'].split()

    old_total = data['old_total']
    promo_code = data['promo']
    certificate_code = data['certificate']
    try:
        promo = Promo.objects.get(code=promo_code)
        promo_percent = promo.percent
    except:
        promo_percent = 0
    try:
        certificate = Certificate.objects.get(code=certificate_code)
        certificate_nominal = certificate.nominal
    except:
        certificate_nominal = 0

    dct = recalc_func(old_total, certificate_nominal, promo_percent)
    new_nominal = dct['certificate']
    if certificate_nominal != 0:
        certificate.nominal = new_nominal
        certificate.save()
        if certificate.nominal == 0:
            certificate.delete()
    if promo_percent != 0:
        promo.delete()

    order = Order.objects.create(
        email=data['email'],
        country=data['country'],
        name=data['name'],
        number=data['number'],
        address=data['address'],
        city=data['city'],
        index=data['index'],
        delivery_type=data['delivery_type'],
        delivery_method=data['delivery_method'],
        total=data['total'],
        certificate_nominal=certificate_nominal
    )
    for i in range(len(id_lst)):
        product = Cloth.objects.get(id=int(id_lst[i]))
        size = size_lst[i]
        qty = int(qty_lst[i])
        if size == 's':
            product.s = product.s - qty
        if size == 'm':
            product.m = product.m - qty
        if size == 'l':
            product.l = product.l - qty
        if size == 'xl':
            product.xl = product.xl - qty
        if size == 'xxl':
            product.xxl = product.xxl - qty
        product.save()
        order_prod = OrderProduct.objects.create(
            product=product,
            qty=qty,
            size=size,
        )
        order_prod.save()
        order.products.add(order_prod)
    for i in range(len(nominal_lst)):
        nominal = int(nominal_lst[i])
        qty = int(cert_qty_lst[i])
        for j in range(qty):
            cert = Certificate.objects.create(
                nominal=nominal,
            )
            cert.save()
            order.certificates.add(cert)
    order.save()

    return Response('s')


@api_view(('POST',))
def certificate_and_promo_validator(request):
    promo_code = request.data['promo']
    certificate_code = request.data['certificate']
    certificate = 0
    promo = 0
    total_cart = request.data['total']
    for c in Certificate.objects.all():
        if c.code == certificate_code:
            certificate = c.nominal
    for p in Promo.objects.all():
        if p.code == promo_code:
            promo = p.percent
    dct = recalc_func(total_cart, certificate, promo)

    fin_dct = {
        'total': dct['total'],
        'promo': promo,
        'certificate': dct['certificate']
    }
    return Response(fin_dct)


class UserAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)


class AddToCartAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        id = request.data['id']
        size = request.data['size']
        user = request.user
        cart = Cart.objects.get(user=user)
        product = Cloth.objects.get(id=id)
        flag = False
        for prod in cart.products.all():
            if prod.product == product and prod.size == size:
                prod.qty += 1
                ############
                prod.save()
                flag = True
        if not flag:
            cart_product = CartProduct.objects.create(
                product=product,
                size=size,
                qty=1,
            )
            cart_product.save()
            cart.products.add(cart_product)
            cart.save()
        return Response(CartProductSerializer(cart.products, many=True).data)


class RemoveFromCartAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        id = request.data['id']
        size = request.data['size']
        user = request.user
        cart = Cart.objects.get(user=user)
        for c_prod in cart.products.all():
            if c_prod.product.id == int(id) and c_prod.size == size:
                c_prod.delete()
                cart.save()
                return Response(CartProductSerializer(cart.products, many=True).data)
        return Response('err')


class IsProductInCartAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        id = request.data['id']
        size = request.data['size']
        cart = Cart.objects.get(user=request.user)
        for c_prod in cart.products.all():
            if c_prod.product.id == id and c_prod.size == size:
                return Response(True)
        return Response(False)


class AddCertificateAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        certificate_code = request.data['certificate_code']
        cart = Cart.objects.get(user=request.user)
        for cert in Certificate.objects.all():
            if cert.code == certificate_code:
                for cart in Cart.objects.all():
                    if cart.certificate_model == cert:
                        return Response('U can`t add certificate. It already used')
                cart.certificate_model = cert
                cart.save()
                return Response('Certificate successfully added')
        return Response('There is no certificate with this code')


class AddPromoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        promo_code = request.data['promo_code']
        cart = Cart.objects.get(user=request.user)
        for promo in Promo.objects.all():
            if promo.code == promo_code:
                for cart in Cart.objects.all():
                    if cart.promo_model == promo:
                        return Response('U can`t add promo. It already used')
                cart.promo_model = promo
                cart.save()
                return Response('Promo successfully added')
        return Response('There is no promo with this code')


class GetCartInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        cart = Cart.objects.get(user=request.user)
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data)


class GetUserOrderInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_order = UserOrder.objects.get(user=request.user, is_confirmed=False)
        user_order_serializer = UserOrderSerializer(user_order)
        return Response(user_order_serializer.data)


class DeletePromoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        code = request.data['promo_code']
        for cart in Cart.objects.all():
            if cart.promo == code:
                cart.promo_model = None
                cart.save()
                return Response('successfully deleted')
        return Response('error. promo was not found')


class DeleteCertificateAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        code = request.data['certificate_code']
        for cart in Cart.objects.all():
            if cart.certificate == code:
                cart.certificate_model = None
                cart.save()
                return Response('successfully deleted')
        return Response('error. certificate was not found')


class CreateUserOrderAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        email = user.email
        for u_order in UserOrder.objects.all():
            if u_order.user == user and not u_order.is_confirmed:
                return Response('order already created')
        order = UserOrder.objects.create(
            user=user,
            email=email,
            certificate_nominal=cart.certValue,
            promo_percent=cart.promoValue,
            total=cart.total,
            old_total=cart.oldTotal,
            middle_total=cart.midValue,
        )
        order.save()
        return Response('order successfully saved')


class UpdateUserOrderFieldAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        field_name = request.data['field_name']
        field_value = request.data['field_value']
        if field_name == 'country':
            UserOrder.objects.filter(user=request.user).update(country=field_value)
        if field_name == 'name':
            UserOrder.objects.filter(user=request.user).update(name=field_value)
        if field_name == 'number':
            UserOrder.objects.filter(user=request.user).update(number=field_value)
        if field_name == 'address':
            UserOrder.objects.filter(user=request.user).update(address=field_value)
        if field_name == 'city':
            UserOrder.objects.filter(user=request.user).update(city=field_value)
        if field_name == 'index':
            UserOrder.objects.filter(user=request.user).update(index=field_value)
        if field_name == 'deliveryType':
            UserOrder.objects.filter(user=request.user).update(deliveryType=field_value)
        if field_name == 'deliveryMethod':
            UserOrder.objects.filter(user=request.user).update(deliveryMethod=field_value)
        return Response('order successfully updated')


class ConfirmUserOrderAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        cart = Cart.objects.get(user=user)
        order = UserOrder.objects.filter(user=user, is_confirmed=False)[0]
        if cart.certificate != '':
            certificate = Certificate.objects.get(code=cart.certificate)
            certificate.nominal -= order.certificate_nominal
            certificate.save()
            if certificate.nominal == 0:
                certificate.delete()
        for c_prod in cart.products.all():
            product = c_prod.product
            size = c_prod.size
            qty = c_prod.qty
            o_prod = OrderProduct.objects.create(
                product=product,
                qty=qty,
                price=product.price_with_sale,
                size=size
            )
            if size == 's':
                product.s = product.s - qty
            if size == 'm':
                product.m = product.m - qty
            if size == 'l':
                product.l = product.l - qty
            if size == 'xl':
                product.xl = product.xl - qty
            if size == 'xxl':
                product.xxl = product.xxl - qty
            product.save()
            o_prod.save()
            order.products.add(o_prod)
            c_prod.delete()
        order.is_confirmed = True
        order.save()
        cart.delete()
        cart = Cart.objects.create(user=user)
        cart.save()
        return Response('order successfully confirmed')


class UserOrderListAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        orders = UserOrder.objects.filter(user=user, is_confirmed=True)
        return Response(UserOrderSerializer(orders, many=True).data)


class UpdateUSerInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        new_username = request.data['username']
        new_email = request.data['email']
        user.username = new_username
        user.email = new_email
        user.save()
        return Response('user successfully updated')








