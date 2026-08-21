# -*- coding: utf-8 -*-
c = open('c:/Users/user/Documents/GitHub/modutools/index.html', encoding='utf-8').read()
checks = {
  'head에 categories.js 스크립트': c.count('<script src="js/categories.js"></script>') == 1,
  'categoryRoot 존재': c.count('id="categoryRoot"') == 1,
  '렌더 스크립트 존재': 'CATEGORIES 기반 동적 렌더링' in c,
  '사이드바 빈 컨테이너': '<aside class="sidebar"></aside>' in c,
  '네비 빈 컨테이너': '<nav class="mt-nav"></nav>' in c,
  '하드코딩 섹션 없음(JS 문자열 1개만 존재)': c.count('<section class="category"') == 1,
  '3대 운영 원칙 보존': c.count('3대 운영 원칙') >= 1,
  '임시 디버그 스크립트 제거': '임시 디버그' not in c,
  'render스크립트가 section 생성 코드 포함': 'class="category" data-cat="\'' in c,
  '하단 직접 </script></body> 정상': c.rstrip().endswith('</html>'),
}
print('=== index.html 검증 ===')
for k, v in checks.items():
    print(('✅' if v else '❌'), k, '' if v else '  << 불일치')
print()
# 하드코딩 잔여 카드 확인 (HTML만, JS 문자열 제외하려면 앞부분 주의)
import re
hard = re.findall(r'<a href="/[^"]+" class="tool-card"', c)
print('index.html 소스의 순수 HTML tool-card <a> 개수:', len(hard), '(0이어야 함 - 이제 JS로 생성)')
