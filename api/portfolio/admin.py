# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import StockModel
from .models import PortfolioModel
from .models import TradeModel

class TradeModelAdmin(admin.ModelAdmin):
  list_display = ['stock', 'quantity', 'price', 'side', 'state', 'date']
  list_per_page = 200
  # readonly_fields=('first',)


admin.site.register(StockModel)
admin.site.register(PortfolioModel)
admin.site.register(TradeModel, TradeModelAdmin)
# admin.site.register(TradeModel)


