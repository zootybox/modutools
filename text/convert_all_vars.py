import re

def convert_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    
    changes = []
    for m in re.finditer(r'\bvar\s+(\w+)', c):
        name = m.group(1)
        pos = m.start()
        
        # Look for reassignment in the remaining code (after end of this var decl)
        # Find end of this var statement - look for ; or var (whichever comes first)
        rest_start = m.end()
        # Quick check: find semicolon or next var keyword
        search_end = c.find(';', rest_start)
        if search_end == -1:
            search_end = rest_start + 100
        
        rest = c[search_end:]
        
        # Check for reassignment: = (but not ==), +=, -=, ++, --
        reassign = re.search(
            r'\b' + re.escape(name) + r'\s*(?:=(?!=)|[\+\-]\=|\+\+|--)',
            rest
        )
        
        if reassign:
            changes.append((pos, 'let'))
        else:
            changes.append((pos, 'const'))
    
    # Apply in reverse
    if changes:
        arr = list(c)
        for pos, kw in reversed(changes):
            arr[pos:pos+3] = kw
        c = ''.join(arr)
        
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
    
    remaining = len(re.findall(r'\bvar\s+(\w+)', c))
    return len(changes), remaining

base = 'c:/Users/user/Documents/GitHub/modutools/'
files = [
    'image/crop.html','image/id-photo.html','image/resize.html',
    'image/watermark.html','image/format.html','convert/image-to-pdf.html',
    'calc/income-tax.html','calc/insurance.html','calc/minimum-wage.html',
    'calc/rent.html','calc/savings.html','calc/severance.html'
]

for fp in files:
    try:
        converted, remaining = convert_file(base + fp)
        if converted > 0 or remaining > 0:
            print(f'{fp}: {converted} converted, {remaining} remaining')
    except Exception as e:
        print(f'{fp}: ERROR - {e}')

print('Done')
