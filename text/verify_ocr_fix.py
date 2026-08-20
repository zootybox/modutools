c = open('c:/Users/user/Documents/GitHub/modutools/text/ocr.html', 'r', encoding='utf-8').read()

print('=== Final Verification ===')
print('File size:', len(c), 'bytes')
print()

head_cnt = c.count('<head>')
head_close_cnt = c.count('</head>')
print('head count:', head_cnt)
print('/head count:', head_close_cnt)
print('head balanced:', head_cnt == head_close_cnt == 1)

body_cnt = c.count('<body>')
body_close_cnt = c.count('</body>')
print('body count (may include JS strings):', body_cnt)
print('/body count:', body_close_cnt)

style_cnt = c.count('<style>')
style_close_cnt = c.count('</style>')
print('style open:', style_cnt)
print('style close:', style_close_cnt)
print('style balanced:', style_cnt == style_close_cnt)

print()
print('Residue checks:')
print('  Ad Slot:', 'Ad Slot' in c, '(want False)')
print('  .ad-slot,:', '.ad-slot,' in c, '(want False)')
print('  .guide-card li:', '.guide-card li' in c, '(want False)')
print('  raw CSS outside:', '</style>/*' in c, '(want False)')

print()
head_end = c.find('</head>')
print('head-body junction:', repr(c[head_end:head_end+15]))
