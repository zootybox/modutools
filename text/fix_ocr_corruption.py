# Fix OCR file corruption from repeated replacements
import re

with open('c:/Users/user/Documents/GitHub/modutools/text/ocr.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix corruption: showToashowToast( -> showToast(
c = c.replace('showToashowToast(', 'showToast(')
c = c.replace('showToashowToast (', 'showToast(')

# Fix corruption: closeshowToast( -> closest(
c = c.replace('closeshowToast(', 'closest(')
c = c.replace('closeshowToast (', 'closest(')

# Check for any other corruption patterns
issues = []
# Look for any showToast that has extra prefix
for m in re.finditer(r'\w+showToast\(', c):
    full = m.group()
    if full != 'showToast(':
        issues.append(f'Unexpected: {full}')

# Check for any remaining st( function calls (not part of showToast or closest)
# count total st( occurrences
total_st = len(re.findall(r'\bst\(', c))
print(f'Total \\bst(: {total_st} (should be 0)')

# Count showToast(
st_count = c.count('showToast(')
print(f'showToast( count: {st_count}')

# Count closest(
cl_count = c.count('closest(')
print(f'closest( count: {cl_count}')

if issues:
    for iss in issues:
        print(f'ISSUE: {iss}')

# Check for onclick in HTML
onclick_html = re.findall(r'onclick\s*=\s*"[^"]*"', c)
print(f'HTML onclick= patterns: {len(onclick_html)}')

with open('c:/Users/user/Documents/GitHub/modutools/text/ocr.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fix applied!')
