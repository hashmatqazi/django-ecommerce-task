from django.urls import path
from .views import OrderCreateView, MyOrdersView, MockPaymentView

urlpatterns = [
    path("orders/", OrderCreateView.as_view(), name="create-order"),
    path("orders/my/", MyOrdersView.as_view(), name="my-orders"),
    path("orders/<int:order_id>/pay/", MockPaymentView.as_view(), name="pay-order"),
]
