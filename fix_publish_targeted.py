import re

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I need to add targetedEmails: recipientEmails to updateData in handleUpdateStatus
target_block = '''        const updateData = {
          title,
          subtitle,
          content: postContent,
          mainCategory,
          selectedSubCats,
          tags,
          cardSummary,
          focusKeyword,
          metaDescription,
          readDuration,
          imageUrl: firstImageSrc,
          status: newStatus,
          placement,
          rejectionReason: overrideRejectReason || null
        };'''

replacement_block = '''        const updateData = {
          title,
          subtitle,
          content: postContent,
          mainCategory,
          selectedSubCats,
          tags,
          cardSummary,
          focusKeyword,
          metaDescription,
          readDuration,
          imageUrl: firstImageSrc,
          status: newStatus,
          placement,
          rejectionReason: overrideRejectReason || null,
          targetedEmails: recipientEmails
        };'''

new_content = content.replace(target_block, replacement_block)

if new_content != content:
    with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully patched handleUpdateStatus to include targetedEmails.")
else:
    print("Could not find the target block.")
