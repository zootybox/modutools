import glob

ok = 0
total = 0
for cat in ['calc','image','text','convert','generate','life','sports']:
    for fp in glob.glob(cat + '/*.html'):
        total += 1
        c = open(fp, 'r', encoding='utf-8').read()
        has_ext_js = '/js/ui-common.js' in c
        has_toast = 'id="toast"' in c
        has_guide = '<div class="guide-section"' in c
        has_badge = '<div class="security-badge"' in c
        issues = []
        if not has_ext_js: issues.append('NO_EXT_JS')
        if not has_toast: issues.append('NO_TOAST')
        if not has_guide: issues.append('NO_GUIDE')
        if not has_badge: issues.append('NO_BADGE')
        if issues:
            print(f'[FAIL] {fp}: {", ".join(issues)}')
        else:
            ok += 1

print(f'\nTotal: {total}, Pass: {ok}, Fail: {total-ok}')