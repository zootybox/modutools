# Final verification - check for false positives
import re

files = [
    ('text/ocr.html', 'OCR'),
    ('convert/pdf-merge.html', 'PDF Merge')
]

base = 'c:/Users/user/Documents/GitHub/modutools/'

for fp, name in files:
    path = base + fp
    c = open(path, 'r', encoding='utf-8').read()
    print(f'=== {name} ({fp}) ===')
    
    # OCR specific checks
    if 'ocr' in fp:
        # Count \bst( using regex word boundary
        st_calls = len(re.findall(r'\bst\(', c))
        print(f'  \\bst( regex count: {st_calls} (0 = clean)')
        
        # Count st(" substring (may be inside showToast)
        st_sub = c.count('st("')
        print(f'  st(" substring count: {st_sub} (false positive from showToast)')
        
        # Verify specific corruption patterns
        for bad in ['showToashowToast', 'closeshowToast']:
            if bad in c:
                print(f'  CORRUPTION: {bad} found!')
            else:
                print(f'  No {bad} corruption - OK')
        
        # Check for local function
        has_st_func = 'function st(m)' in c
        has_tt_var = 'tt=document.getElementById("toast")' in c
        print(f'  Has function st(m): {has_st_func}')
        print(f'  Has tt=document.getElementById("toast"): {has_tt_var}')
    
    # PDF merge specific checks
    if 'pdf-merge' in fp:
        # Check if onclick is JS .onclick= (not HTML onclick=")
        js_onclick = len(re.findall(r'\.onclick\s*=', c))
        html_onclick = len(re.findall(r'onclick\s*=\s*"', c))
        print(f'  JS .onclick= assignments: {js_onclick} (acceptable)')
        print(f'  HTML onclick=" attributes: {html_onclick} (0 = clean)')
        
        # Check no local showToast remains
        local_toast_count = len(re.findall(r'(?:\n|^)\s*(?:var\s+\w+\s*=\s*null;)?\s*function\s+showToast\s*\(', c))
        print(f'  Local showToast definitions: {local_toast_count}')
    
    # Common checks
    has_ui_common = '/js/ui-common.js' in c
    has_toast = 'id="toast"' in c
    print(f'  References ui-common.js: {has_ui_common}')
    print(f'  Has toast element: {has_toast}')
    print()
