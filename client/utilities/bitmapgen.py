import sys
import random
import string
filepath = sys.argv[1];
file = open(filepath,"w");
for i in range(0,1024):
    for j in range(0,1024):
        for z in range(0,4):
            file.write(random.choice(string.ascii_letters))