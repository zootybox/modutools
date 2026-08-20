import re

def convert_var_to_let_const(code):
    var_pattern = re.compile(r'\bvar\s+(\w+)(?:\s*=\s*([^;]+))?')
    reassign_pattern = re.compile(r'\b(\w+)\s*=(?!=)')
    
    vars_info = {}
    for m in var_pattern.finditer(code):
        name = m.group(1)
        vars_info[name] = {'start': m.start(), 'end': m.end(), 'is_const': True}
    
    for varname in list(vars_info.keys()):
        decl_end = vars_info[varname]['end']
        rest = code[decl_end:]
        for m in reassign_pattern.finditer(rest):
            if m.group(1) == varname:
                line_start = rest.rfind('\n', 0, m.start())
                line_start = max(line_start, 0)
                before = rest[line_start:m.start()].strip()
                if not before.endswith('var'):
                    vars_info[varname]['is_const'] = False
                    break
    
    result = list(code)
    for varname, info in reversed(sorted(vars_info.items(), key=lambda x: x[1]['start'])):
        result[info['start']:info['start']+3] = 'const' if info['is_const'] else 'let'
    
    return ''.join(result)

for fpath in [
    'c:/Users/user/Documents/GitHub/modutools/text/ocr.html',
    'c:/Users/user/Documents/GitHub/modutools/convert/pdf-merge.html'
]:
    with open(fpath, 'r', encoding='utf-8') as f:
        c = f.read()
    
    istart = c.find('(function(){')
    iend = c.find('})();', istart) + 5
    iife = c[istart:iend]
    
    converted = convert_var_to_let_const(iife)
    c = c[:istart] + converted + c[iend:]
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(c)
    
    remaining = re.findall(r'\bvar\s+\w+', converted)
    print(f'{fpath}: done, remaining vars: {len(remaining)}')
