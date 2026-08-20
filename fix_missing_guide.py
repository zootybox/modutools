import glob
GUIDE = '\n<div class="guide-section"><div class="guide-card"><h2>클라이언트 브라우저 로컬 처리 안내</h2>\n<p>본 도구는 100% 클라이언트 사이드(브라우저)에서만 동작합니다. 입력한 데이터는 외부 서버로 전혀 전송되지 않으며, 사용자의 브라우저 메모리에서만 일시적으로 처리됩니다. 모든 JavaScript 코드와 CSS 스타일은 브라우저 내에서 로컬 실행되므로, 개인정보, 금융 정보, 문서 등 민감한 데이터도 안심하고 사용할 수 있습니다.</p>\n</div>\n<div class="faq-item"><div class="faq-q">이 도구는 어떻게 작동하나요?</div><div class="faq-a">모든 처리는 사용자의 브라우저에서만 이루어집니다. 서버로 데이터를 전송하지 않기 때문에 업로드 속도가 빠르고, 개인정보가 외부로 유출될 위험이 없습니다. 회원가입이나 로그인도 필요하지 않습니다.</div></div>\n<div class="faq-item"><div class="faq-q">입력한 데이터는 안전한가요?</div><div class="faq-a">네, 입력한 모든 데이터는 사용자의 브라우저 메모리에서만 처리됩니다. 서버로 전송되거나 저장되지 않으며, 브라우저 탭을 닫으면 완전히 삭제됩니다. 금융 정보, 개인 문서, 민감한 파일도 안심하고 사용할 수 있습니다.</div></div>\n<div class="faq-item"><div class="faq-q">이용 횟수나 용량 제한이 있나요?</div><div class="faq-a">서버 기반 도구가 아니므로 횟수나 용량에 제한이 없습니다. 사용자의 브라우저 메모리가 허용하는 범위 내에서 무제한으로 사용할 수 있습니다. 회원가입이나 결제가 필요하지 않은 완전 무료 도구입니다.</div></div>\n<div class="faq-item"><div class="faq-q">모바일에서도 사용할 수 있나요?</div><div class="faq-a">네, 모든 도구는 반응형으로 설계되어 스마트폰, 태블릿, PC 등 모든 기기에서 사용할 수 있습니다. 모바일 브라우저에서도 동일한 기능을 제약 없이 사용할 수 있습니다.</div></div>\n</div>\n'

for fp in ['calc/salary.html', 'image/compress.html']:
    c = open(fp, 'r', encoding='utf-8').read()
    count_before = c.count('<div class="guide-section"')
    if count_before == 0:
        c = c.replace('</main>', GUIDE + '\n</main>')
        open(fp, 'w', encoding='utf-8').write(c)
        count_after = c.count('<div class="guide-section"')
        print(f'Fixed: {fp} (guide-section: {count_before} -> {count_after + 1})')
    else:
        print(f'Skipped: {fp} (already has {count_before} guide-section elements)')

print('Done')