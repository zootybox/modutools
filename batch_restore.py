import os
import subprocess
import glob

categories = ['calc', 'image', 'text', 'convert', 'generate', 'life', 'sports']
target_commit = '07b6a22'
success_count = 0
skip_count = 0

for cat in categories:
    if not os.path.exists(cat):
        continue
    files = glob.glob(f"{cat}/*.html")
    for file_path in files:
        norm_path = file_path.replace('\\', '/')
        try:
            cmd = ['git', 'show', f'{target_commit}:{norm_path}']
            raw_orig = subprocess.check_output(cmd)
            
            if raw_orig.startswith(b'\xff\xfe'):
                orig = raw_orig.decode('utf-16-le')
            else:
                orig = raw_orig.decode('utf-8')

            start = orig.find('<p class="page-sub"')
            if start == -1:
                start = orig.find('<div class="page-title"')
            if start == -1:
                print(f"[SKIP] Start tag not found: {norm_path}")
                skip_count += 1
                continue
                
            sub_end = orig.find('</p>', start) + 4
            
            end = orig.find('<div class="mt-guide"')
            if end < 0: end = orig.find('<div class="guide-section"')
            if end < 0: end = orig.find('<div class="security-badge"')
            if end < 0: end = orig.find('<script>', 1000)
            if end < 0: end = orig.find('</main>')

            form_html = orig[sub_end:end].strip()
            if not form_html:
                print(f"[SKIP] Empty form: {norm_path}")
                skip_count += 1
                continue

            with open(norm_path, 'r', encoding='utf-8') as f:
                cur = f.read()

            if cur.find('<div class="card"') > 0:
                print(f"[SKIP] Already has card: {norm_path}")
                skip_count += 1
                continue

            badge_idx = cur.find('class="security-badge"')
            if badge_idx != -1:
                badge_end = cur.find('</div>', badge_idx) + 6
                cur_updated = cur[:badge_end] + '\n\n' + form_html + '\n' + cur[badge_end:]
            else:
                p_sub_end = cur.find('</p>', cur.find('class="page-sub"')) + 4
                cur_updated = cur[:p_sub_end] + '\n\n' + form_html + '\n' + cur[p_sub_end:]

            with open(norm_path, 'w', encoding='utf-8') as f:
                f.write(cur_updated)

            print(f"[OK] Restored: {norm_path}")
            success_count += 1

        except subprocess.CalledProcessError:
            print(f"[SKIP] Git show failed: {norm_path}")
            skip_count += 1
        except Exception as e:
            print(f"[ERROR] {norm_path}: {str(e)}")
            skip_count += 1

print(f"\nDone: {success_count} restored, {skip_count} skipped")
