import re

files = [
    'text/count.html','text/dedupe.html','text/space.html','text/ocr.html',
    'convert/pdf-merge.html','convert/image-to-pdf.html',
    'index.html','js/ui-common.js','css/common.css',
    'image/crop.html','image/id-photo.html','image/resize.html',
    'image/watermark.html','image/format.html'
]
for fp in files:
    c = open('c:/Users/user/Documents/GitHub/modutools/'+fp,'r',encoding='utf-8').read()
    vars_left = re.findall(r'\bvar\s+(\w+)', c)
    imgs_total = len(re.findall(r'<img\s', c))
    imgs_with_alt = len(re.findall(r'<img\s[^>]*alt\s*=', c))
    imgs_no_alt = imgs_total - imgs_with_alt
    
    status_parts = []
    if vars_left:
        status_parts.append('var:' + ','.join(vars_left))
    if imgs_no_alt > 0:
        status_parts.append('img_no_alt:' + str(imgs_no_alt))
    if not status_parts:
        status_parts.append('OK')
    print(fp + ': ' + ' | '.join(status_parts))
