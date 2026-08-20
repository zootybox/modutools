"""add_resource_hints.py — 모든 HTML 파일에 Preconnect/DNS-Prefetch 추가"""

import glob
import re
import os

BASE_DIR = "c:/Users/user/Documents/GitHub/modutools"
EXCLUDE_PATTERNS = ["node_modules", "orig_"]

# HTML 파일 스캔
html_files = glob.glob(os.path.join(BASE_DIR, "**", "*.html"), recursive=True)

# 추가할 리소스 힌트
HINTS = """<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
"""

count = 0
for fp in sorted(html_files):
    basename = os.path.basename(fp)
    if any(p in fp for p in EXCLUDE_PATTERNS):
        continue

    with open(fp, "r", encoding="utf-8") as f:
        c = f.read()

    # 이미 추가되어 있는지 확인
    if 'cdn.jsdelivr.net" crossorigin' in c:
        continue

    # <meta charset="UTF-8"> 다음 줄에 삽입
    # 다양한 변형 처리
    meta_charset_patterns = [
        '<meta charset="UTF-8">\n<meta name="viewport"',
        '<meta charset="UTF-8">\r\n<meta name="viewport"',
        '<meta charset="utf-8">\n<meta name="viewport"',
        '<meta charset=\\"UTF-8\\">\\n<meta name=\\"viewport\\"',
    ]
    
    replaced = False
    for pattern in meta_charset_patterns:
        if pattern in c:
            c = c.replace(pattern, HINTS.rstrip() + '\n<meta name="viewport"')
            replaced = True
            break
    
    if not replaced:
        # Fallback: meta charset 뒤에 삽입
        idx = c.find('<meta charset')
        if idx >= 0:
            end_of_line = c.find('\n', idx)
            if end_of_line >= 0:
                insert_pos = end_of_line + 1
                hint_block = '<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">\n<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>\n'
                c = c[:insert_pos] + '\n' + hint_block + c[insert_pos:]
                replaced = True

    if replaced:
        with open(fp, "w", encoding="utf-8") as f:
            f.write(c)
        rel = os.path.relpath(fp, BASE_DIR).replace("\\", "/")
        print(f"  [OK] {rel}")
        count += 1
    else:
        rel = os.path.relpath(fp, BASE_DIR).replace("\\", "/")
        print(f"  [SKIP] {rel} (no meta charset found)")

print(f"\n→ {count} files updated with resource hints")
