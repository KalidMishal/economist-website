import re

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any corrupted bullets with proper html entity
content = re.sub(r'add .*? Click', 'add &bull; Click', content)
content = re.sub(r'remove .*? 8 tags max', 'remove &bull; 8 tags max', content)

with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
