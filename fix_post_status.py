import re

with open('src/app/admin/review-post/[id]/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("  const [isProcessing, setIsProcessing] = useState(false);", "  const [postStatus, setPostStatus] = useState('pending');\n  const [isProcessing, setIsProcessing] = useState(false);")
content = content.replace("setTitle(data.post.title || '');", "setTitle(data.post.title || '');\n            setPostStatus(data.post.status || 'pending');")
content = content.replace("postData?.status || 'pending'", "postStatus")

with open('src/app/admin/review-post/[id]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
