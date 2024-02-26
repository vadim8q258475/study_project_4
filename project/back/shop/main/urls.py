from django.urls import path, include, re_path
from .views import *

cmh = category_query_maker([Cloth], 'collection', 'CMH', ClothSerializer)
booker = category_query_maker([Cloth], 'collection', 'BOOKER', ClothSerializer)
vsrap = category_query_maker([Cloth], 'collection', 'VSRAP', ClothSerializer)
snailkick = category_query_maker([Cloth], 'collection', 'SNAILKICK', ClothSerializer)
gspd = category_query_maker([Cloth], 'collection', 'GSPD', ClothSerializer)
hoodie = category_query_maker([Cloth], 'type', 'Худи', ClothSerializer)
tshirts = category_query_maker([Cloth], 'type', 'Футболка', ClothSerializer)
out_cloth = category_query_maker([Cloth], 'type', 'Верхняя одежда', ClothSerializer)
sweaters = category_query_maker([Cloth], 'type', 'Свитшот', ClothSerializer)
scarves = category_query_maker([Cloth], 'type', 'Шарф', ClothSerializer)


urlpatterns = [
    path('main', MainAPIView.as_view()),
    path('search', func),
    path('cmh', cmh),
    path('booker', booker),
    path('vsrap', vsrap),
    path('snailkick', snailkick),
    path('gspd', gspd),
    path('hoodie', hoodie),
    path('tshirts', tshirts),
    path('out_cloth', out_cloth),
    path('sweaters', sweaters),
    path('scarves', scarves),
    path('cart_product', cart_creater),
    path('create_rec', create_rec),
    path('sale', SaleApiView.as_view()),
    path('email_validator', email_validator_view),
    path('order_creation', order_creator),
    path('cert_and_promo_validate', certificate_and_promo_validator),
    path('profile', UserAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('add_to_cart', AddToCartAPIView.as_view()),
    path('remove_from_cart', RemoveFromCartAPIView.as_view()),
    path('is_in_cart', IsProductInCartAPIView.as_view()),
    path('get_user_order_info', GetUserOrderInfoAPIView.as_view()),
    path('get_cart_info', GetCartInfoAPIView.as_view()),
    path('add_promo', AddPromoAPIView.as_view()),
    path('add_certificate', AddCertificateAPIView.as_view()),
    path('delete_promo', DeletePromoAPIView.as_view()),
    path('delete_certificate', DeleteCertificateAPIView.as_view()),
    path('update_order', UpdateUserOrderFieldAPIView.as_view()),
    path('create_order', CreateUserOrderAPIView.as_view()),
    path('confirm_order', ConfirmUserOrderAPIView.as_view()),
    path('get_orders', UserOrderListAPIView.as_view()),
    path('update_user', UpdateUSerInfoAPIView.as_view())
]