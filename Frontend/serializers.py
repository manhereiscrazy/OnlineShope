from rest_framework import serializers, filters
from Products.models import Product



class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "is_enabled",
            "price",
            "image_uri",
            "date",
        )