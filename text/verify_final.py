# Final verification of all modified files
import re

files = [
    'text/count.html',
    'text/dedupe.html', 
    'text/space.html',
    'convert/pdf-merge.html',
    'text/ocr.html'
]

base = 'c:/Users/user/Documents/GitHub/modutools/'

for fp in files:
    path = base + fp
    c = open(path, 'r', encoding='utf-8').read()
    issues = []
    
    # Check for inline onclick
    onclick_count = len(re.findall(r'onclick\s*=', c))
    if onclick_count > 0:
        # Find which lines
        lines = c.split('\n')
        onclick_lines = [(i+1, l.strip()[:80]) for i,l in enumerate(lines) if 'onclick=' in l]
        issues.append(f'onclick={onclick_count}회 (라인: {[l[0] for l in onclick_lines]})')
    
    # Check for local showToast or st() function
    if 'function showToast(' in c and 'function showToast(msg)' not in c:
        # ui-common.js version uses "var toastTimer" not "function showToast(msg)" at top level
        pass
    
    # Check for function st( pattern
    st_func = re.findall(r'function\s+st\s*\(', c)
    if st_func:
        issues.append(f'로컬 st() 함수 존재')
    
    # Check for showToast definition that isn't from ui-common
    local_toast = re.findall(r'(?:^|\n)\s*function\s+showToast\s*\(', c)
    if local_toast:
        issues.append(f'로컬 showToast() 함수 정의 존재')
    
    # Check ui-common.js reference
    if '/js/ui-common.js' not in c:
        issues.append('ui-common.js 참조 없음')
    
    # Check toast element
    if 'id="toast"' not in c:
        issues.append('toast element 없음')
    
    # Check for st(" pattern (should be 0 in ocr.html)
    st_string = c.count('st("')
    if st_string > 0 and 'ocr' in fp:
        issues.append(f'st(" 잔여 {st_string}회')
    
    if issues:
        print(f'[FAIL] {fp}:')
        for iss in issues:
            print(f'  - {iss}')
    else:
        print(f'[PASS] {fp}')
