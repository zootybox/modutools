import glob
for cat in ['calc','image','text','convert','generate','life','sports']:
    for fp in glob.glob(cat+'/*.html'):
        c = open(fp,'r',encoding='utf-8').read()
        has_html_guide = '<div class="guide-section"' in c
        has_css_guide = 'guide-section' in c
        has_faqpage = 'FAQPage' in c
        has_badge = '<div class="security-badge"' in c
        print(f'{fp}: guide_html={has_html_guide}, guide_css={has_css_guide}, faqpage={has_faqpage}, badge={has_badge}')