# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

from django.core.validators import MinLengthValidator

#TODO: change model names to remove model

class StockModel(models.Model):
  """
  .. todo: ticker check format (i.e no tickers > length 6 or whatever)
  """
  ticker = models.CharField(editable=False, max_length=5, primary_key=True)
  close = models.FloatField(editable=False, null=True)
  date = models.DateField(editable=False, null=True)
  # portfolio = models.ForeignKey(PortfolioModel, null=True)

  def __str__(self):
    return self.ticker

  def __repr__(self):
    return '<Stock %r>' % (self.ticker)

  class Meta:
    ordering = ['ticker']


class PortfolioModel(models.Model):
  """
 .. todo: exit_profits = []
 """
  name = models.CharField(max_length=20, default='')

  stocks = models.ManyToManyField(StockModel)

  # value = models.IntegerField(null=True)

  # positions = models.ManyToManyField(StockModel)

  def __str__(self):
    return self.name

  def __repr__(self):
    return '<Portfolio %r>' % (self.name)


class TradeModel(models.Model):
  """
  .. todo:
  """

  stock = models.ForeignKey(StockModel, editable=False, on_delete=models.CASCADE, null=True)
  quantity = models.FloatField(editable=False, null=True)
  price = models.FloatField(null=True, editable=False)
  #TODO: Change this?
  uuid = models.CharField(max_length=45, validators=[MinLengthValidator(35)], null=True, editable=False)
  side = models.CharField(max_length=4, validators=[MinLengthValidator(1)], editable=False)
  state = models.CharField(max_length=20, editable=False)
  date = models.DateField(editable=False, null=True)
  created_at = models.DateField(editable=False, null=True)
  updated_at = models.DateField(editable=False, null=True)

  def __str__(self):
    return "{0},{1},{2}".format(self.stock.ticker, self.price, self.side)

  def __repr__(self):
    return '<Stock %r>' % (self.stock.ticker)

  class Meta:
    ordering = ['stock']
    # ordering = ['date']



