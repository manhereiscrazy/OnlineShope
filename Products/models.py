from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=64, null=False, blank=False, unique=True)
    description = models.CharField(max_length=256, null=True, blank=True)
    is_enabled = models.BooleanField(default=True, null=False)
    price = models.IntegerField(null=False, blank=False)
    image_uri = models.CharField(max_length=1024, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name


        
#V1.28OCT20212120