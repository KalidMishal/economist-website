import re

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(
    r'(status: newStatus,\s*placement,\s*rejectionReason: overrideRejectReason \|\| null)\s*\}',
    r'\1,\n          targetedEmails: recipientEmails\n        }',
    content
)

if new_content != content:
    with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully patched handleUpdateStatus with regex.")
else:
    print("Could not find the target block.")
