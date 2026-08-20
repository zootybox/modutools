import glob, re

# CSS patterns to remove — each is a (pattern, replacement) tuple
CSS_REMOVALS = [
    # Security badge
    (r'\.security-badge\{[^}]+\}', ''),
    (r'\.security-badge span\{[^}]+\}', ''),
    # Guide section
    (r'\.guide-section\{[^}]+\}', ''),
    (r'\.guide-card\{[^}]+\}', ''),
    (r'\.guide-card h2\{[^}]+\}', ''),
    (r'\.guide-card p\{[^}]+\}', ''),
    # FAQ items
    (r'\.faq-item\{[^}]+\}', ''),
    (r'\.faq-q\{[^}]+\}', ''),
    (r'\.faq-q::after\{[^}]+\}', ''),
    (r'\.faq-item\.open \.faq-q::after\{[^}]+\}', ''),
    (r'\.faq-a\{[^}]+\}', ''),
    (r'\.faq-item\.open \.faq-a\{[^}]+\}', ''),
    # Toast
    (r'\.toast\{[^}]+\}', ''),
    (r'\.toast\.show\{[^}]+\}', ''),
    # Leftover fragments
    (r'\n\s*\.faq-item\.open\s*', '\n'),
]

JS_PATTERNS = [
    r'document\.querySelectorAll\("\.faq-q"\)\.forEach\(function\(q\)\{q\.addEventListener\("click",function\(\)\{this\.parentElement\.classList\.toggle\("open"\);\}\);\}\);',
    r'var tt=document\.getElementById\("toast"\),tmr=null;function st\(m\)\{if\(!tt\)return;tt\.textContent=m;tt\.classList\.add\("show"\);clearTimeout\(tmr\);tmr=setTimeout\(function\(\)\{tt\.classList\.remove\("show"\);\},2500\);\}',
    r'var toastTimer=null;function showToast\(m\)\{var tt=document\.getElementById\("toast"\);if\(!tt\)return;tt\.textContent=m;tt\.classList\.add\("show"\);clearTimeout\(toastTimer\);toastTimer=setTimeout\(function\(\)\{tt\.classList\.remove\("show"\);\},2500\);\}',
]

updated = 0
removed_js = 0

for cat in ['calc', 'image', 'text', 'convert', 'generate', 'life', 'sports']:
    for fp in glob.glob(cat + '/*.html'):
        with open(fp, 'r', encoding='utf-8') as f:
            h = f.read()
        o = h

        # Remove CSS rules
        for pat, repl in CSS_REMOVALS:
            h = re.sub(pat, repl, h)

        # Remove empty <style> blocks
        h = re.sub(r'<style>\s*\n\s*</style>', '', h)

        # Remove inline JS
        jsc = 0
        for pat in JS_PATTERNS:
            before = h
            h = re.sub(pat, '', h)
            if h != before:
                jsc += 1

        # Add external script if not present
        if 'src="/js/ui-common.js"' not in h:
            h = h.replace('</body>', '<script src="/js/ui-common.js"></script>\n</body>')

        # Collapse 3+ newlines to 2
        h = re.sub(r'\n{3,}', '\n\n', h)

        if h != o:
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(h)
            updated += 1
            removed_js += jsc
            print(f'  [UPD] {fp} (JS removals: {jsc})')

print(f'\nDone. Updated {updated} files, removed {removed_js} inline JS blocks.')
