"""Move guide-section block inside </main>"""
import re

with open('c:/Users/user/Documents/GitHub/modutools/text/ocr.html', 'r', encoding='utf-8') as f:
    c = f.read()

start = c.find('<div class="guide-section">')
print('start:', start)

# Track depth to find matching close
depth = 1
pos = start + len('<div class="guide-section">')
while depth > 0:
    o = c.find('<div', pos)
    cl = c.find('</div>', pos)
    if cl == -1:
        break
    if o != -1 and o < cl:
        depth += 1
        pos = o + 5
    else:
        depth -= 1
        pos = cl + 6

end = pos
print('end:', end)
block = c[start:end]
print('block:', len(block))

mc = c.find('</main>')
print('</main> at:', mc)
print('block after main:', start > mc)

# Fix 1: Insert inside main
c = c[:mc] + '\n' + block + '\n' + c[mc:]

# Fix 2: Remove duplicate (shifted by len(block)+2)
dup = start + len(block) + 2
c = c[:dup] + c[dup + len(block):]

with open('c:/Users/user/Documents/GitHub/modutools/text/ocr.html', 'w', encoding='utf-8') as f:
    f.write(c)

v = c.find('guide-section')
print('guide now at:', v)
print('main close at:', c.find('</main>'))
print('before main:', v < c.find('</main>'))
print('count:', c.count('guide-section'), '(want 1)')
print('OK!')
