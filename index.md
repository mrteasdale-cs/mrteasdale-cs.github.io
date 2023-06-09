---
layout: default
---
{% include head-custom.html %}
<div class="stuff">
  <h1>Welcome to my Github Page</h1>
  <img src="https://github.githubassets.com/images/icons/emoji/octocat.png"/>
</div>
My main resource site is here: [Check it out!](https://mrteasdale.com).
<div class="stuff">
<div class="homegrid">
  <div class="column">
    <a href="./cyber-security.html">
      <div class="box">
          <img src="./images/cysec-bg.png" height=120px width=260px/>
          <p>Sec+ Cybersecurity</p>
      </div>
    </a>
    <a href="./year-8.html">
      <div class="box">
        <p>Year 8</p>
      </div>
    </a>
    <div class="box"></div>
  </div>
  <div class="column">
    <a href="./gcse-cs.html">
      <div class="box">
        <img src="./images/cpu-bg.png" height=120px width=260px/>
        <p>GCSE CS</p>
      </div>
    </a>
    <div class="box"></div>
    <div class="box"></div>
  </div>
</div>
</div>

### Example Python Script

```python
# Code to check if a string or number is a Palindrome.
class Solution:
    def isPalindrome(self, x: int):

        new_X = str(x)
        if new_X == new_X[::-1]:
            return True
        else:
            return False

check = 1223221
output = Solution()
print(output.isPalindrome(check))
```

## Want to play a game?

<div class="stuff">
  <iframe height = "450" width = "660" src="https://editor.p5js.org/mrteasdale-cs/full/e9IQnrqdU"></iframe>
</div>
