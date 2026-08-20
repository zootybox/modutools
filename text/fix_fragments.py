import glob, re

# Fix remaining .faq-item.open fragments in all tool pages
fixed = 0
for cat in ['calc','image','text','convert','generate','life','sports']:
    for fp in glob.glob(cat + '/*.html'):
        with open(fp, 'r', encoding='utf-8') as f:
            h = f.read()
        o = h
        # Remove orphaned ".faq-item.open" fragments left after CSS extraction
        h = re.sub(r'\n\s*\.faq-item\.open\s*\n', '\n', h)
        h = re.sub(r'\n{4,}', '\n\n\n', h)
        if h != o:
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(h)
            print(f'  [FIX] {fp}')
            fixed += 1

print(f'Done. Fixed {fixed} files.')