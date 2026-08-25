# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def transform(s):
    s = s.replace('class="page-title"', 'class="tool-title"')
    s = s.replace('class="page-sub"', 'class="tool-sub"')
    s = s.replace('class="card-title"', 'class="tool-card-title"')
    s = s.replace('class="input-group"', 'class="tool-input-group"')
    s = s.replace('class="input-field "', 'class="tool-field "')
    s = s.replace('class="input-field"', 'class="tool-field"')
    s = s.replace('class="input-label"', 'class="tool-label"')
    s = s.replace('class="input-row"', 'class="tool-input-row"')
    s = s.replace('class="input-unit"', 'class="tool-unit"')
    s = s.replace('class="toggle-row"', 'class="tool-toggle-row"')
    s = s.replace('class="toggle-btn ', 'class="tool-toggle-btn ')
    s = s.replace('class="toggle-btn"', 'class="tool-toggle-btn"')
    s = s.replace('class="card"', 'class="tool-card"')
    s = s.replace('class="page"', 'class="tool-page"')
    # JS 셀렉터
    s = s.replace('#familyToggle .toggle-btn', '#familyToggle .tool-toggle-btn')
    s = s.replace('#modeRow .toggle-btn', '#modeRow .tool-toggle-btn')
    return s

for f in ['salary.html', 'salary-preview.html']:
    p = 'calc/' + f
    s = io.open(p, encoding='utf-8').read()
    new = transform(s)
    io.open(p, 'w', encoding='utf-8', newline='').write(new)
    print(f, len(s), '->', len(new))
