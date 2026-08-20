for fp in ['text/count.html','text/dedupe.html','text/space.html']:
    c = open('c:/Users/user/Documents/GitHub/modutools/' + fp, 'r', encoding='utf-8').read()
    onclick_count = c.count('onclick=')
    has_ui = '/js/ui-common.js' in c
    has_toast = 'id="toast"' in c
    has_local_toast = 'function showToast(' in c
    print(f'{fp}: onclick={onclick_count} ui-common={has_ui} toast={has_toast} localToast={has_local_toast}')
