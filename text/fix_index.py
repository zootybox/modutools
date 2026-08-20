import re

path = 'c:/Users/user/Documents/GitHub/modutools/index.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Add .main-content wrapper around content after header
# Find: <!-- Hero -->
# Insert: <div class="main-content"> right before it
# Find: </main> close of main-area
# Insert: </div> right after </main>

old = '<!-- Hero -->'
new = '<div class="main-content">\n\n<!-- Hero -->'
c = c.replace(old, new, 1)

# Close main-content before footer
old = '<!-- Footer (inside main-area) -->'
new = '</div><!-- /.main-content -->\n\n<!-- Footer (inside main-area) -->'
c = c.replace(old, new, 1)

# 2. Fix sidebar footer to use the new toggle class
# Add theme button in header nav for mobile
old = '          <a href="#sports" class="sidebar-item"><span class="emoji">🏋️</span> 운동</a>\n        </nav>\n        <div class="sidebar-footer">\n          <button class="sidebar-toggle" data-theme-toggle>'
new = '          <a href="#sports" class="sidebar-item"><span class="emoji">🏋️</span> 운동</a>\n        </nav>\n        <div class="sidebar-footer">\n          <button class="sidebar-toggle" data-theme-toggle>'
c = c.replace(old, new, 1)

# 3. Add theme toggle button to header nav for mobile
old = '        </nav>\n      </div>\n    </header>'
new = '          <button class="theme-btn" data-theme-toggle><span class="theme-icon">🌙</span></button>\n        </nav>\n      </div>\n    </header>'
c = c.replace(old, new, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Done!')
print('main-content added:', c.count('main-content'))
print('theme-btn added:', c.count('theme-btn'))