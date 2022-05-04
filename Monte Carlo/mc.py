%matplotlib inline
from scipy import random 
import numpy as np
import matplotlib.pyplot as plt

a = 0
b = np.pi #this is the limits of integration.
N = 100000


def func(x):
     return np.sin(x)

    
answer = (b-a)/float(N)*integral


areas = []

for i in range(N):
    xrand = np.zeros(N)
    
    for i in range(len(xrand)):    
        xrand[i] = random.uniform(a,b)     
        integral = 0.0
    
    for i in range(N):
        integral += func(xrand[i])
    
    answer = (b-a)/float(N)*integral
    areas.append(answer)
plt.title("Distribution of areas calculated")
plt.hist(areas,bins = 30, ec = 'green')
plt.xlabel("Areas")
