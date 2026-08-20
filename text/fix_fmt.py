
try:
    with open('c:/Users/user/Documents/GitHub/modutools/image/format.html', 'r', encoding='utf-8') as f:
        c = f.read()
    # The exact template string in the file
    old = 'class=\\x22file-thumb\\x22><div'
    new = 'class=\\x22file-thumb\\x22 alt=\\x22'+newName+'\\x22><div'
    c = c.replace(old, new)
    with open('c:/Users/user/Documents/GitHub/modutools/image/format.html', 'w', encoding='utf-8') as f:
        f.write(c)
    print('OK')
except Exception as e:
    print(f'ERROR: {e}')

