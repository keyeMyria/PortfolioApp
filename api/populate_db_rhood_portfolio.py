# TODO move scripts to directory
#   will require changing how app is imported and models used

import sys
from Robinhood import Robinhood
import collections
import os
from pprint import pprint

import pprint as pp

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pfl.settings")
import django
django.setup()

from portfolio.models import StockModel
from portfolio.models import PortfolioModel
from portfolio.models import TradeModel


class PortfolioDataFetcher():
  pass


class RobinhoodDataFetcher(PortfolioDataFetcher):
  """

  """

  def __init__(self, username, password):
    self.username = username

    self.password = password

    self.robinhood = Robinhood()

    self.loggedin  = self.robinhood.login(username=username, password=password)

    self.trades = self.prep_data()

  def prep_data(self):

    if not self.loggedin:
      return None

    orders = self.robinhood.get_endpoint('orders')

    trade_count = 0
    queued_count = 0
    trades = collections.defaultdict(dict)

    # do/while for pagination
    paginated = True
    page = 0
    while paginated:
      for i, order in enumerate(orders['results']):
        executions = order['executions']
        instrument = self.robinhood.get_custom_endpoint(order['instrument'])
        trades[i + (page * 100)]['symbol'] = instrument['symbol']
        for key, value in enumerate(order):
          if value != "executions":
            trades[i + (page * 100)][value] = order[value]
        if order['state'] == "filled":
          trade_count += 1
          for key, value in enumerate(executions[0]):
            trades[i + (page * 100)][value] = executions[0][value]
        elif order['state'] == "queued":
          queued_count += 1
      # paginate
      if orders['next'] is not None:
        page = page + 1
        orders = self.robinhood.get_custom_endpoint(str(orders['next']))
      else:
        paginated = False

    return trades


  def add_trades_to_app(self):
    if self.trades:
      for t in self.trades:
        ticker = self.trades[t]['symbol']
        trade_id = self.trades[t]['id']
        price = self.trades[t]['price']
        quantity = self.trades[t]['quantity']
        side = self.trades[t]['side']
        state = self.trades[t]['state']
        created_at = self.trades[t]['created_at']
        updated_at = self.trades[t]['updated_at']

        # trade = TradeModel.objects.all()

        # print(ticker, trade_id, price, quantity, side, state, ticker)

        trade = TradeModel.objects.filter(uuid=trade_id)
        stock = StockModel.objects.filter(ticker=ticker)

        if not stock:
          stock = StockModel( ticker=ticker )
          stock.save()

        if not trade:
          try:
            stock = StockModel.objects.filter(ticker=ticker)[0]
            trade = TradeModel(
              stock=stock,
              quantity=quantity,
              price=price,
              uuid=trade_id,
              side=side,
              state=state,
            )
            trade.save()
          except Exception as e:
            sys.stderr.write('error in add_trades_to_app')

  def addCurrentPositionsToPortfolio(trades, portfolio_name):

    p = PortfolioModel.objects.filter(name=portfolio_name)

    portfolio = {}
    portfolio_keys = ['current shares', 'exit profit', 'avg cost', 'total cost', 'unrealized profit', 'realized profits']

    if not p:
      return

    for entry in trades:
      if entry['average_price'] == 'None':
        trades.remove(entry)
      portfolio[entry]['symbol'] = {}


    for company in portfolio:
      for k in portfolio_keys:
        portfolio[company][k] = 0

      portfolio[company]['profits on sale'] = []

    test_stock = None

    for entry in trades:

      stock = portfolio[entry['symbol']]

      if test_stock and entry['symbol'] == test_stock:
        print('testing')
        return

      if entry['side'] == 'buy':
        stock['current shares'] += float(entry['quantity'])
        stock['total cost'] += ( float(entry['quantity']) * float(entry['price']) )
        stock['avg cost'] = stock['total cost'] / stock['current shares']

      if entry['side'] == 'sell':
        stock['current shares'] -= float(entry['quantity'])
        # total cost - (current total avg cots * quantity selling)
        stock['total cost'] = stock['total cost'] - (stock['avg cost'] * float(entry['quantity']))

        profit_on_sale = ( float(entry['price']) - stock['avg cost'] ) * float(entry['quantity'])
        stock['profits on sale'].append(profit_on_sale)

        #profit?
        # stock['total cost'] = stock['total cost'] - (float(entry['quantity']) * float(entry['price']))
        # stock['avg cost'] = stock['total cost'] / stock['current shares']

    for stock in portfolio:
      portfolio[stock]['realized profits'] = sum(portfolio[stock]['profits on sale'])

    portfolio.pop('YANG', None)

    current_stocks = []

    for stock in portfolio:
      if portfolio[stock]['quantity'] is not 0:
        current_stocks.append(stock)

    p = PortfolioModel.objects.filter(name=portfolio_name)
    p.stocks = stocks
    p.save()

    return portfolio


# TODO:
# current portfolio

# TODO:
# historical portfolio

# TODO:
# postgresql, each time this is run it writes to the database, run daily

def portfolioProfits(portfolio):
  profits = 0
  for i in portfolio:
    profits += portfolio['realized profits']

# Unrealized Profits
# for s in portfolio:
  # print(type(s))

#   # print(stock['LastTradePriceOnly'])

if __name__ == "__main__":

  # TODO: uncomment
  # username = str(input('Please enter your Robinhood username: '))
  # password = str(input('Please enter your Robinhood password: '))
  username = 'thestickybandit'
  password = 'Ovechkin81*1'
  rdf = RobinhoodDataFetcher(username=username, password=password)

  if rdf.loggedin:
    print(True)
    trades = rdf.prep_data()
    print(trades)
    rdf.add_trades_to_app()




  # rdf.addTradesToApp()



  # import pprint as pp
  # pp.pprint(trades)

  # addTradesToApp(trades)
  # addCurrentPositionsToPortfolio(trades, 'Robinhood')
