# fix ocr.html - replace st(" with showToast(" and remove function st(m)
import re

with open('c:/Users/user/Documents/GitHub/modutools/text/ocr.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Replace st(" with showToast("
c = c.replace('st("', 'showToast("')

print('st(" count after replace:', c.count('st("'))

# 2. Remove function st(m){...} 
old_func = 'function st(m){tt.textContent=m;tt.classList.add("show");clearTimeout(tmr);tmr=setTimeout(function(){tt.classList.remove("show");},2500);}'
if old_func in c:
    c = c.replace(old_func, '')
    print('Removed local st() function')
else:
    print('WARNING: local st() function not found!')

# 3. Check for remaining st( or st(" occurrences
import re
st_calls = [(m.start(), m.group()) for m in re.finditer(r'\bst\(', c)]
if st_calls:
    print(f'WARNING: remaining st( calls at positions: {st_calls}')
else:
    print('No remaining st( calls - good!')

with open('c:/Users/user/Documents/GitHub/modutools/text/ocr.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Done!')
