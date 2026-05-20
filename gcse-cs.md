---
layout: default
---

# Cambridge GCSE Computer Science

Here are a list of Repls used in my class.

## How to code in Python Solutions
**Examples**
  - [Open](https://replit.com/@MrTeasdaleCS/How-to-code-in-Python-Examples){:target='_blank'}

**Programming Challenges**
  - [Open](https://replit.com/@MrTeasdaleCS/Programming-Challenges){:target='_blank'}

# Edexcel GCSE CS

## Pearson's Revision Workbook Python Files
- [Open](https://replit.com/@MrTeasdaleCS/Pearson-Revision-Workbook-Python-Files?v=1){:target='_blank'}


# Topic 1 Computational Thinking

## Searching Algorithms

***Simple Linear Search***
```python
numbers = [5,7,19,21,25,82]
searchNum = int(input("Enter number: "))
numFound = False
i = 0
while i < len(numbers) and not numFound:
  if searchNum == numbers[i]:
    print("found")
    numFound = True
  i = i + 1
```
***Binary Search***
```python
# Standard Algorithm
# Binary Search
def binarysearch(nameList,target):
    lower = 0
    upper = len(nameList)-1

    while lower<=upper:
        mid = int((lower+upper)/2)
        if nameList[mid] == target:
            return mid
        elif nameList[mid] < target:
            lower = mid + 1
        else:
            upper = mid - 1

    return -1

names = ["Aaron","Beth","Clive","Dennis","Egbert","Francis",
        "Gillian","Hugh","Icarus","Jeremy","Kyle","Lachina"]
ages = [33,56,34,56,75,34,24,87,34,44,50,40]
toFind = str(input("Enter a name"))
position = binarysearch(names,toFind)
if position>=0:
    print(names[position],"is",ages[position],"years old")
else:
    print("Name not found")
```
## Sorting Algorithms

***Bubble Sort***
```python
# Program to perform a bubble sort
# Define the list of names
userName = ["Carl","Tamsin","Eric","Zoe","Alan","Mark"]
numItems = 6
while numItems>1:
    for count in range(5):
        if userName[count] > userName[count+1]:
            temp = userName[count] 
            userName[count] = userName[count+1] 
            userName[count+1] = temp
    numItems = numItems-1
#endwhile
print(userName)
```

## Validation

```python
# Standard Algorithm
# Input Validation
# Range Check
number = int(input("Enter a value between 0 and 10"))
while number < 0 or number > 10:
    print("Your value was not between 0 and 10")
    number = int(input("Enter value again"))

print("Number =",number)

#  Presence Check
response = input("Do you agree with the terms and conditions?")
confirm = False
while not True:
  response = input("Do you agree with the terms and conditions?")
  if response == "y":
    confirm = True

print("Thank you for confirming")


```

[Go Home](./)