from django.urls import path
from .views import PlaceOrderView, OrderListView

urlpatterns = [
    path('orders/place/', PlaceOrderView.as_view(), name='place-order'),
    path('orders/', OrderListView.as_view(), name='orders'),
]
