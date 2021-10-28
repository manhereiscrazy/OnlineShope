from django.conf.urls import url
from Frontend.views import ProductsUpdateDeleteView, ProductsRetrieveCreateView


urlpatterns = [
    url(r'^products/$', ProductsRetrieveCreateView, name='list products'), # get/add products
    url(r'^product/(?P<req_id>[0-9]+)$', ProductsUpdateDeleteView, name='list products'), # delete/edit product with id
]

#V1.28OCT20212120