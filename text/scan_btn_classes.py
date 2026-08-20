import glob, re

# Find all button classes used in HTML files
all_btn_classes = set()
for fp in glob.glob('**/*.html', recursive=True):
    if 'node_modules' in fp or 'orig_' in fp: 
        continue
    c = open(fp, 'r', encoding='utf-8').read()
    for m in re.finditer(r'class="([^"]*)"', c):
        classes = m.group(1).split()
        for cls in classes:
            if 'btn' in cls.lower() or 'button' in cls.lower():
                all_btn_classes.add(cls)

for cls in sorted(all_btn_classes):
    print(cls)
