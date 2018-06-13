import graphene

from django.contrib.auth import get_user_model

from django.contrib.auth import get_user_model

from schema import types

from portfolio.models import StockModel, PortfolioModel, TradeModel

User = get_user_model()

class UserQuery:
    all_users = graphene.List(types.UserType)
    self = graphene.Field(types.UserType)

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_self(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return info.context.user
        return None


class AuthenticationQuery:
    is_authenticated = graphene.Field(graphene.Boolean)

    def resolve_is_authenticated(self, info):
        return info.context.user.is_authenticated


class StockQuery:
    all_stocks = graphene.List(types.StockType)

    def resolve_all_stocks(self, info, **kwargs):
        return StockModel.objects.all()

class PortfolioQuery:
    all_portfolios = graphene.List(types.PortfolioType)
    portfolio = graphene.Field(types.PortfolioType, name=graphene.String())

    def resolve_portfolio(self, info, **kwargs):
        name = kwargs.get('name')
        if name:
            return PortfolioModel.objects.get(name=name)

    def resolve_all_portfolios(self, info, **kwargs):
        return PortfolioModel.objects.all()

class TradeQuery:
    all_trades = graphene.List(types.TradeType)

    def resolve_all_trades(self, info, **kwargs):
        return TradeModel.objects.all()


class Query(StockQuery,
            TradeQuery,
            PortfolioQuery,
            graphene.ObjectType,
            AuthenticationQuery):
    pass
