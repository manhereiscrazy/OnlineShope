from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, serializers, permissions
from Frontend.serializers import ProductSerializer
from Products.models import Product


@api_view(['GET', 'POST'])
def ProductsRetrieveCreateView(request):
    if request.method == "GET":
        serializer = ProductSerializer(Product.objects.all(), context={'request': request}, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK) if serializer.data else Response(data="No products found", status=status.HTTP_404_NOT_FOUND)
    elif request.method == "POST":
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:return Response(data=serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
    else:return Response(data="BAD_REQUEST", status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'PUT'])
def ProductsUpdateDeleteView(request, req_id):
    if request.method == "POST":
        p_q = Product.objects.get(id=req_id).delete() if Product.objects.filter(id=req_id) else None
        return Response(data="Successfully Deleted product", status=status.HTTP_200_OK) if p_q else Response(data="Cannot delete product/Product not found", status=status.HTTP_404_NOT_FOUND)
    elif request.method == "PUT":
        p_q = Product.objects.get(id=req_id) if Product.objects.filter(id=req_id) else None
        serializer = ProductSerializer(p_q, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:return Response(data=serializer.errors, status=status.HTTP_404_NOT_FOUND)
    else:return Response(data="BAD_REQUEST", status=status.HTTP_400_BAD_REQUEST)

#V1.28OCT20212120