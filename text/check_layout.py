c = open('c:/Users/user/Documents/GitHub/modutools/index.html', 'r', encoding='utf-8').read()
print('header-inner count:', c.count('class="mt-header-inner"'))
print('main-content count:', c.count('class="main-content"'))
print('Has header-inner padding:', 'padding:0 28px' in c)
print('Has main-content padding:', 'padding:24px 28px' in c)
print()

# Find the header structure
idx = c.find('<header class="mt-header"')
if idx >= 0:
    end = c.find('</header>', idx)
    print('header block:')
    print(c[idx:end+9][:300])
    print('...')
print()

# Find main-content
idx = c.find('main-content')
if idx >= 0:
    print('main-content context:', c[idx-50:idx+100])