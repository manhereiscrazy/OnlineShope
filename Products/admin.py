from django.contrib import admin
from Products.models import Product


class ProductsAdmin(admin.ModelAdmin):
    model = Product
    list_display = ('id','name','description','price','is_enabled')
    empty_value_display = 'N/a'




admin.site.register(Product, ProductsAdmin)


#V1.28OCT20212120