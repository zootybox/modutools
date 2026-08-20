import glob, json

cats = ['calc','image','text','convert','generate','life','sports']
total = 0
added = 0

for cat in cats:
    for fp in glob.glob(cat+'/*.html'):
        total += 1
        with open(fp, 'r', encoding='utf-8') as f:
            html = f.read()

        if '"FAQPage"' in html:
            print(f'  [SKIP] {fp} (already has FAQPage)')
            continue

        # Find <div class="faq-item"> HTML elements (not CSS)
        # First find the guide-section which contains the FAQ items
        guide_start = html.find('<div class="guide-section"')
        if guide_start < 0:
            print(f'  [SKIP] {fp} (no guide-section)')
            continue

        # Find all faq-item within the guide section
        search_from = guide_start
        faq_items = []
        while True:
            item_start = html.find('<div class="faq-item">', search_from)
            if item_start < 0:
                break
            q_start = html.find('<div class="faq-q">', item_start)
            q_end = html.find('</div>', q_start) if q_start >= 0 else -1
            a_start = html.find('<div class="faq-a">', item_start)
            a_end = html.find('</div>', a_start) if a_start >= 0 else -1
            if q_start >= 0 and q_end >= 0 and a_start >= 0 and a_end >= 0:
                q = html[q_start+18:q_end].strip()
                a = html[a_start+18:a_end].strip()
                if len(a) > 500: a = a[:497] + '...'
                faq_items.append({'q': q, 'a': a})
            search_from = item_start + 1

        if not faq_items:
            print(f'  [SKIP] {fp} (no FAQ items found)')
            continue

        entities = []
        for item in faq_items:
            entities.append(json.dumps({
                '@type': 'Question',
                'name': item['q'],
                'acceptedAnswer': {'@type': 'Answer', 'text': item['a']}
            }, ensure_ascii=False))

        faq_json = '<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[\n'
        faq_json += ',\n'.join(entities)
        faq_json += '\n]}\n</script>\n'

        html = html.replace('</head>', faq_json + '\n</head>')
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(html)
        added += 1
        print(f'  [OK] {fp} ({len(faq_items)} FAQ items)')

print(f'\nTotal: {total}, Added FAQPage: {added}')
