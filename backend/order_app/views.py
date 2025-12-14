from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderCreateSerializer
from django.shortcuts import get_object_or_404


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=OrderCreateSerializer,
        responses={201: openapi.Response("Order created successfully")}
    )
    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        items = serializer.validated_data["items"]

        order = Order.objects.create(
            user=request.user,
            total_price=0
        )

        total = 0
        for item in items:
            product = Product.objects.get(id=item["product_id"])
            quantity = item["quantity"]

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )

            total += product.price * quantity

        order.total_price = total
        order.save()

        return Response(
            {
                "message": "Order created successfully",
                "order_id": order.id
            },
            status=status.HTTP_201_CREATED
        )


class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user)

        data = []
        for order in orders:
            data.append({
                "order_id": order.id,
                "total_price": order.total_price,
                "status": order.status,
                "created_at": order.created_at
            })

        return Response(data)


class MockPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)

        if order.status == "PAID":
            return Response({"message": "Order already paid"}, status=400)

        order.status = "PAID"
        order.save()

        return Response({
            "message": "Payment successful (mock)",
            "order_id": order.id,
            "status": order.status
        })
