from django.contrib.auth import get_user_model
from graphene_django.types import DjangoObjectType
from nucleus.models import Person
from portfolio.models import StockModel, PortfolioModel, TradeModel


User = get_user_model()


class UserType(DjangoObjectType):
  class Meta:
    model = User

class PersonType(DjangoObjectType):
  class Meta:
    model = Person

class StockType(DjangoObjectType):
  class Meta:
    model = StockModel

class PortfolioType(DjangoObjectType):
  class Meta:
    model = PortfolioModel

class TradeType(DjangoObjectType):
  class Meta:
    model = TradeModel
