# FROM: https://medium.com/mlreview/a-simple-deep-learning-model-for-stock-price-prediction-using-tensorflow-30505541d877

import pandas as pd
from pprint import pprint as pp
import matplotlib.pyplot as pyplot

data = pd.read_csv('data_stocks.csv')
data = data.drop(['DATE'], 1)
n = data.shape[0]
p = data.shape[1]
data = data.values

train_start = 0
train_end = int(np.floor(0.8*n))
test_start = train_end
test_end = n
data_train = data[np.arange(train_start, train_end), :]
data_test = data[np.arange(test_start, test_end), :]

# global DATA

# DATA = pd.read_csv('data_stocks.csv')

# def prepData(data):
#   DATA = data.drop(['DATE'], 1)

#   n = DATA.shape[0]
#   d = DATA.shape[1]

#   DATA = DATA.values

# if __name__ == '__main__':
#   prepData(DATA)
#   # pp(DATA['SP500'])
#   pyplot.plot(DATA['SP500'])
#   pyplot.show()


