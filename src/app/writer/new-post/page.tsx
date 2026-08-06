'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ShareDropdown from '@/components/ShareDropdown';

export default function NewPost() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'SEO'>('DETAILS');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [title, setTitle] = useState('');
  const [profileData, setProfileData] = useState({ fullName: 'Mishal', linkedin: '#', photo: '/profile-mishal.jpg' });
  const [subtitle, setSubtitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [previewContent, setPreviewContent] = useState('');
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const [mainCategory, setMainCategory] = useState('World');
  const [readDuration, setReadDuration] = useState('5');

  // SEO State
  const [cardSummary, setCardSummary] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Image Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageCaption, setImageCaption] = useState('');
  const [imageCredit, setImageCredit] = useState('');
  const [imageSize, setImageSize] = useState('Medium (Width: 450px)');
  const [imageAlignment, setImageAlignment] = useState('Center (No Wrap)');
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<HTMLElement | null>(null);
  const [figurePosition, setFigurePosition] = useState({ top: 0, left: 0 });
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    ul: false,
    ol: false,
    blockquote: false,
    pre: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  const autoGenerateSEO = (force = false) => {
    let text = '';
    if (editorRef.current) {
      // Get text without the initial placeholder <p><br></p> if it's empty
      text = editorRef.current.innerText.trim();
    }
    const snippet = text.length > 155 ? text.substring(0, 155) + '…' : text;
    
    // Generate keyword from title (first two words, ignore 's)
    let generatedKeyword = '';
    if (title) {
      const words = title.split(' ').filter(w => w.trim() !== '');
      generatedKeyword = words.slice(0, 2).join(' ').replace(/'s/g, '').replace(/[^a-zA-Z0-9 ]/g, '');
    }

    if (force) {
      setCardSummary(snippet);
      setMetaDescription(snippet);
      setFocusKeyword(generatedKeyword);
    } else {
      if (!cardSummary && snippet) setCardSummary(snippet);
      if (!metaDescription && snippet) setMetaDescription(snippet);
      if (!focusKeyword && generatedKeyword) setFocusKeyword(generatedKeyword);
    }
  };

  const checkFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      ul: document.queryCommandState('insertUnorderedList'),
      ol: document.queryCommandState('insertOrderedList'),
      blockquote: document.queryCommandValue('formatBlock') === 'blockquote',
      pre: document.queryCommandValue('formatBlock') === 'pre',
    });
    if (editorRef.current) {
      setIsEditorEmpty(editorRef.current.innerText.trim().length === 0);
    }
    autoGenerateSEO(false);
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    checkFormats();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const getCurrentFontSizeIndex = () => {
    let baseSize = parseInt(document.queryCommandValue('fontSize')) || 3;
    if (baseSize === 7) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let parent = selection.anchorNode?.parentElement;
        while (parent && parent.tagName !== 'FONT' && parent.tagName !== 'DIV') {
          parent = parent.parentElement;
        }
        if (parent && parent.tagName === 'FONT') {
           const px = parent.style.fontSize;
           if (px === '64px') return 8;
           if (px === '80px') return 9;
           if (px === '96px') return 10;
           if (px === '112px') return 11;
           if (px === '128px') return 12;
        }
      }
    }
    return baseSize;
  };

  const applyDropCapStyling = (font: HTMLFontElement, newSize: number) => {
    if (newSize === 8) { font.style.fontSize = '64px'; font.style.float = 'left'; font.style.lineHeight = '0.85'; font.style.paddingRight = '8px'; font.style.marginTop = '4px'; }
    if (newSize === 9) { font.style.fontSize = '80px'; font.style.float = 'left'; font.style.lineHeight = '0.85'; font.style.paddingRight = '8px'; font.style.marginTop = '4px'; }
    if (newSize === 10) { font.style.fontSize = '96px'; font.style.float = 'left'; font.style.lineHeight = '0.85'; font.style.paddingRight = '8px'; font.style.marginTop = '4px'; }
    if (newSize === 11) { font.style.fontSize = '112px'; font.style.float = 'left'; font.style.lineHeight = '0.85'; font.style.paddingRight = '8px'; font.style.marginTop = '4px'; }
    if (newSize === 12) { font.style.fontSize = '128px'; font.style.float = 'left'; font.style.lineHeight = '0.85'; font.style.paddingRight = '10px'; font.style.marginTop = '6px'; }
  };

  const handleIncreaseFontSize = () => {
    let currentSize = getCurrentFontSizeIndex();
    if (currentSize < 12) {
      const newSize = currentSize + 1;
      execCommand('fontSize', newSize <= 7 ? newSize.toString() : '7');
      if (newSize > 7) {
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            let node = selection.anchorNode;
            let fontNode = null;
            while (node && node !== editorRef.current) {
              if (node.nodeName === 'FONT' && (node as HTMLFontElement).size === '7') {
                fontNode = node as HTMLFontElement;
                break;
              }
              node = node.parentNode;
            }
            if (fontNode) {
              applyDropCapStyling(fontNode, newSize);
            }
          }
        }, 10);
      }
    }
  };

  const handleDecreaseFontSize = () => {
    let currentSize = getCurrentFontSizeIndex();
    if (currentSize > 1) {
      const newSize = currentSize - 1;
      execCommand('fontSize', newSize <= 7 ? newSize.toString() : '7');
      if (newSize > 7) {
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            let node = selection.anchorNode;
            let fontNode = null;
            while (node && node !== editorRef.current) {
              if (node.nodeName === 'FONT' && (node as HTMLFontElement).size === '7') {
                fontNode = node as HTMLFontElement;
                break;
              }
              node = node.parentNode;
            }
            if (fontNode) {
              applyDropCapStyling(fontNode, newSize);
            }
          }
        }, 10);
      } else {
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            let node = selection.anchorNode;
            let fontNode = null;
            while (node && node !== editorRef.current) {
              if (node.nodeName === 'FONT') {
                fontNode = node as HTMLFontElement;
                break;
              }
              node = node.parentNode;
            }
            if (fontNode) {
              fontNode.style.float = '';
              fontNode.style.lineHeight = '';
              fontNode.style.paddingRight = '';
              fontNode.style.marginTop = '';
              fontNode.style.fontSize = '';
            }
          }
        }, 10);
      }
    }
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      const node = selection.anchorNode;
      if (!node) return;
      
      const figure = node.nodeType === 3 ? node.parentElement?.closest('figure') : (node as HTMLElement).closest?.('figure');
      
      if (figure) {
        e.preventDefault();
        const p = document.createElement('p');
        p.appendChild(document.createElement('br'));
        if (figure.nextSibling) {
          figure.parentNode?.insertBefore(p, figure.nextSibling);
        } else {
          figure.parentNode?.appendChild(p);
        }
        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        // Normal enter behavior, but let's ensure we are using paragraphs
        document.execCommand('defaultParagraphSeparator', false, 'p');
      }
    }
  };

  const handleEditorClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      const figure = target.closest('figure');
      if (figure && editorRef.current) {
        setSelectedFigure(figure);
        // Calculate position relative to editor container
        const container = editorRef.current.closest('.flex-1.px-10.pt-10.pb-10.flex.flex-col.relative') || editorRef.current;
        const containerRect = container.getBoundingClientRect();
        const figureRect = figure.getBoundingClientRect();
        setFigurePosition({
          top: figureRect.top - containerRect.top - 55,
          left: figureRect.left - containerRect.left + (figureRect.width / 2)
        });
      }
    } else {
      setSelectedFigure(null);
    }
  };

  const handleImageAction = (action: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedFigure) return;
    
    const img = selectedFigure.querySelector('img');
    if (!img) return;

    if (action === 'SIZE_S') {
      selectedFigure.style.width = '250px';
    } else if (action === 'SIZE_M') {
      selectedFigure.style.width = '450px';
    } else if (action === 'SIZE_FULL') {
      selectedFigure.style.width = '100%';
    } else if (action === 'ALIGN_LEFT') {
      selectedFigure.style.textAlign = 'left';
      selectedFigure.style.float = 'left';
      selectedFigure.style.margin = '5px 20px 20px 0';
    } else if (action === 'ALIGN_CENTER') {
      selectedFigure.style.textAlign = 'center';
      selectedFigure.style.float = 'none';
      selectedFigure.style.margin = '20px auto';
    } else if (action === 'ALIGN_RIGHT') {
      selectedFigure.style.textAlign = 'right';
      selectedFigure.style.float = 'right';
      selectedFigure.style.margin = '5px 0 20px 20px';
    } else if (action === 'MOVE_UP') {
      let block = selectedFigure;
      while (block.parentElement && block.parentElement !== editorRef.current) {
        block = block.parentElement as HTMLElement;
      }
      if (block !== selectedFigure) {
        editorRef.current?.insertBefore(selectedFigure, block);
      } else {
        const prevBlock = block.previousElementSibling;
        if (prevBlock) {
          editorRef.current?.insertBefore(selectedFigure, prevBlock);
        }
      }
    } else if (action === 'MOVE_DOWN') {
      let block = selectedFigure;
      while (block.parentElement && block.parentElement !== editorRef.current) {
        block = block.parentElement as HTMLElement;
      }
      if (block !== selectedFigure) {
        if (block.nextElementSibling) {
          editorRef.current?.insertBefore(selectedFigure, block.nextElementSibling);
        } else {
          editorRef.current?.appendChild(selectedFigure);
        }
      } else {
        const nextBlock = block.nextElementSibling;
        if (nextBlock) {
          if (nextBlock.nextElementSibling) {
            editorRef.current?.insertBefore(selectedFigure, nextBlock.nextElementSibling);
          } else {
            editorRef.current?.appendChild(selectedFigure);
          }
        }
      }
    } else if (action === 'EDIT') {
      const img = selectedFigure.querySelector('img');
      const figcaption = selectedFigure.querySelector('figcaption');
      
      let caption = '';
      let credit = '';
      
      if (figcaption) {
        const spans = figcaption.querySelectorAll('span');
        if (spans.length > 0) caption = spans[0].innerText;
        if (spans.length > 1) {
          credit = spans[1].innerText.replace(/^\(Photo:\s*/, '').replace(/\)$/, '');
        }
      }
      
      setImageUrl(img?.src || '');
      setImageCaption(caption);
      setImageCredit(credit);
      
      let width = selectedFigure.style.width || img?.style.maxWidth || '';
      if (width === '100%') setImageSize('Full-Width (100%)');
      else if (width === '450px') setImageSize('Medium (Width: 450px)');
      else setImageSize('Small (Width: 250px)');
      
      setIsEditingImage(true);
      setIsImageModalOpen(true);
      return;
    } else if (action === 'DELETE') {
      selectedFigure.remove();
      setSelectedFigure(null);
      return;
    }
    
    // update position
    setTimeout(() => {
      if (selectedFigure && editorRef.current) {
        const container = editorRef.current.closest('.flex-1.px-10.pt-10.pb-10.flex.flex-col.relative') || editorRef.current;
        const containerRect = container.getBoundingClientRect();
        const figureRect = selectedFigure.getBoundingClientRect();
        setFigurePosition({
          top: figureRect.top - containerRect.top - 55,
          left: figureRect.left - containerRect.left + (figureRect.width / 2)
        });
      }
    }, 50);
  };


  React.useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    if (editorRef.current && editorRef.current.innerHTML === '') {
      editorRef.current.innerHTML = '<p><br></p>';
    }
  }, []);

  // Effect to add blue border to selected image
  React.useEffect(() => {
    if (editorRef.current) {
      const figures = editorRef.current.querySelectorAll('figure');
      figures.forEach(f => {
        const img = f.querySelector('img');
        if (img) {
          if (f === selectedFigure) {
            img.style.outline = '2px solid #3b82f6';
            img.style.outlineOffset = '2px';
          } else {
            img.style.outline = 'none';
          }
        }
      });
    }
  }, [selectedFigure]);
     const handleSaveDraft = () => {
      const draftContent = editorRef.current?.innerHTML || previewContent || '';
      
      let firstImageSrc = '';
      if (editorRef.current) {
        const firstImg = editorRef.current.querySelector('img');
        if (firstImg) firstImageSrc = firstImg.src;
      }
  
      const draftData = {
        title,
        subtitle,
        content: draftContent,
        mainCategory,
        selectedSubCats,
        tags,
        cardSummary,
        focusKeyword,
        metaDescription,
        readDuration,
        imageUrl: firstImageSrc,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      };

      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      const idxParam = urlParams.get('idx');

      const savedDraftsRaw = localStorage.getItem('draftPost');
      let savedDrafts: any[] = [];
      if (savedDraftsRaw) {
        try {
          const parsed = JSON.parse(savedDraftsRaw);
          savedDrafts = Array.isArray(parsed) ? parsed : [parsed];
        } catch(e) {}
      }

      if (mode === 'edit' && idxParam !== null && savedDrafts[parseInt(idxParam)]) {
        savedDrafts[parseInt(idxParam)] = draftData;
      } else {
        savedDrafts.push(draftData);
      }

      if (mode === 'edit_pending' && idxParam !== null) {
        const savedPendingRaw = localStorage.getItem('pendingPost');
        if (savedPendingRaw) {
          try {
            let parsed = JSON.parse(savedPendingRaw);
            let savedPending = Array.isArray(parsed) ? parsed : [parsed];
            savedPending = savedPending.filter((_, i) => i !== parseInt(idxParam));
            if (savedPending.length > 0) {
              localStorage.setItem('pendingPost', JSON.stringify(savedPending));
            } else {
              localStorage.removeItem('pendingPost');
            }
          } catch(e) {}
        }
      }

      localStorage.setItem('draftPost', JSON.stringify(savedDrafts));
      sessionStorage.setItem('toastMessage', 'Article Added to Draft Successfully');
      router.push('/writer/dashboard?tab=drafts');
    };

    const handleSubmitForReview = () => {
      const draftContent = editorRef.current?.innerHTML || previewContent || '';
      
      let firstImageSrc = '';
      if (editorRef.current) {
        const firstImg = editorRef.current.querySelector('img');
        if (firstImg) firstImageSrc = firstImg.src;
      }
  
      const draftData = {
        title,
        subtitle,
        content: draftContent,
        mainCategory,
        selectedSubCats,
        tags,
        cardSummary,
        focusKeyword,
        metaDescription,
        readDuration,
        imageUrl: firstImageSrc,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      };

      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      const idxParam = urlParams.get('idx');

      if (mode === 'edit' && idxParam !== null) {
        const savedDraftsRaw = localStorage.getItem('draftPost');
        if (savedDraftsRaw) {
          try {
            let parsed = JSON.parse(savedDraftsRaw);
            let savedDrafts = Array.isArray(parsed) ? parsed : [parsed];
            savedDrafts = savedDrafts.filter((_, i) => i !== parseInt(idxParam));
            if (savedDrafts.length > 0) {
              localStorage.setItem('draftPost', JSON.stringify(savedDrafts));
            } else {
              localStorage.removeItem('draftPost');
            }
          } catch(e) {}
        }
      }

      const savedPendingRaw = localStorage.getItem('pendingPost');
      let savedPending: any[] = [];
      if (savedPendingRaw) {
        try {
          const parsed = JSON.parse(savedPendingRaw);
          savedPending = Array.isArray(parsed) ? parsed : [parsed];
        } catch(e) {}
      }

      if (mode === 'edit_pending' && idxParam !== null && savedPending[parseInt(idxParam)]) {
        savedPending[parseInt(idxParam)] = draftData;
      } else {
        savedPending.push(draftData);
      }

      localStorage.setItem('pendingPost', JSON.stringify(savedPending));
      sessionStorage.setItem('toastMessage', 'Article Submitted for Review');
      router.push('/writer/dashboard?tab=pending');
    };

  const handleInsertImage = () => {
    if (!imageUrl && !imageFile) return;

    const performInsertion = (finalUrl: string) => {
      if (!editorRef.current) return;
      editorRef.current.focus();
      const selection = window.getSelection();
      let range;

      if (savedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
        range = savedRange;
      } else {
        range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }

      // 1. Force focus and selection
      if (savedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      } else {
        const r = document.createRange();
        r.selectNodeContents(editorRef.current);
        r.collapse(false);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(r);
        }
      }

      // 2. Pure DOM insertion using <figure> wrapper for toolbar selection
      const figure = document.createElement('figure');
      figure.style.width = imageSize.includes('450') ? '450px' : imageSize.includes('Full') ? '100%' : '250px';
      figure.style.maxWidth = '100%';
      figure.style.borderBottom = '1px solid #e6e6e6';
      figure.style.paddingBottom = '16px';

      if (imageAlignment.includes('Center')) {
        figure.style.textAlign = 'center';
        figure.style.float = 'none';
        figure.style.margin = '20px auto';
      } else if (imageAlignment.startsWith('Right')) {
        if (imageAlignment.includes('Wrap')) {
          figure.style.display = 'block';
          figure.style.float = 'right';
          figure.style.margin = '5px 0 20px 20px';
        } else {
          figure.style.textAlign = 'right';
          figure.style.float = 'none';
          figure.style.margin = '20px 0';
        }
      } else {
        if (imageAlignment.includes('Wrap')) {
          figure.style.display = 'block';
          figure.style.float = 'left';
          figure.style.margin = '5px 20px 20px 0';
        } else {
          figure.style.textAlign = 'left';
          figure.style.float = 'none';
          figure.style.margin = '20px 0';
        }
      }

      const img = document.createElement('img');
      img.src = finalUrl;
      img.alt = imageCaption || 'Article image';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.borderRadius = '8px';
      img.style.display = 'block';

      figure.appendChild(img);

      if (imageCaption || imageCredit) {
        const cap = document.createElement('figcaption');
        cap.style.display = 'flex';
        cap.style.justifyContent = 'space-between';
        cap.style.alignItems = 'flex-start';
        cap.style.fontSize = '14px';
        cap.style.color = '#767676';
        cap.style.marginTop = '8px';
        cap.style.fontFamily = 'serif';

        const capText = document.createElement('span');
        capText.innerText = imageCaption || '';
        capText.style.textAlign = 'left';
        capText.style.fontStyle = 'italic';

        const creditText = document.createElement('span');
        let formattedCredit = '';
        if (imageCredit) {
          const trimmed = imageCredit.trim();
          const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
          formattedCredit = `(Photo: ${capitalized})`;
        }
        creditText.innerText = formattedCredit;
        creditText.style.textAlign = 'right';
        creditText.style.fontSize = '12px';
        creditText.style.fontWeight = 'normal';
        creditText.style.color = '#a0a0a0';
        creditText.style.marginLeft = '16px';

        cap.appendChild(capText);
        cap.appendChild(creditText);
        figure.appendChild(cap);
      }

      try {
        if (isEditingImage && selectedFigure) {
          selectedFigure.replaceWith(figure);
          setSelectedFigure(figure);
        } else {
          const currentRange = selection?.getRangeAt(0);
          if (currentRange) {
            currentRange.deleteContents();
            currentRange.insertNode(figure);

            const finalRange = document.createRange();
            finalRange.setStartAfter(figure);
            if (selection) {
              selection.removeAllRanges();
              selection.addRange(finalRange);
            }
          } else {
            editorRef.current.appendChild(figure);
          }
        }
      } catch (e) {
        editorRef.current.appendChild(figure);
      }
      checkFormats();
      // updatePreview(); // If updatePreview exists in scope
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          performInsertion(dataUrl);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(imageFile);
    } else {
      performInsertion(imageUrl);
    }

    setImageUrl('');
    setImageFile(null);
    setImageCaption('');
    setImageCredit('');
    setIsImageModalOpen(false);
    setIsEditingImage(false);
  };

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, '').toUpperCase();
      if (newTag && !tags.includes(newTag) && tags.length < 8) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleSubCat = (cat: string) => {
    if (selectedSubCats.includes(cat)) {
      setSelectedSubCats(selectedSubCats.filter(c => c !== cat));
    } else if (selectedSubCats.length < 5) {
      setSelectedSubCats([...selectedSubCats, cat]);
    }
  };

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = localStorage.getItem('userProfile');
      if (profile) {
        try { setProfileData(JSON.parse(profile)); } catch(e) {}
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      const idxParam = urlParams.get('idx');
      
      if (mode === 'new') {
        return;
      }

      const dataStoreKey = mode === 'edit_pending' ? 'pendingPost' : 'draftPost';
      const draft = localStorage.getItem(dataStoreKey);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          const draftsArray = Array.isArray(parsed) ? parsed : [parsed];
          let draftToLoad = null;

          if ((mode === 'edit' || mode === 'edit_pending') && idxParam !== null && draftsArray[parseInt(idxParam)]) {
            draftToLoad = draftsArray[parseInt(idxParam)];
          } else if (mode === 'edit' || mode === 'edit_pending') {
            draftToLoad = draftsArray[0];
          }

          if (draftToLoad) {
            setTitle(draftToLoad.title || '');
            setSubtitle(draftToLoad.subtitle || '');
            setMainCategory(draftToLoad.mainCategory || 'World');
            if (draftToLoad.selectedSubCats) setSelectedSubCats(draftToLoad.selectedSubCats);
            if (draftToLoad.tags) setTags(draftToLoad.tags);
            if (draftToLoad.cardSummary) setCardSummary(draftToLoad.cardSummary);
            if (draftToLoad.focusKeyword) setFocusKeyword(draftToLoad.focusKeyword);
            if (draftToLoad.metaDescription) setMetaDescription(draftToLoad.metaDescription);
            if (draftToLoad.readDuration) setReadDuration(draftToLoad.readDuration);
            
            if (draftToLoad.content && editorRef.current) {
              editorRef.current.innerHTML = draftToLoad.content;
            }
          }
        } catch(e) {}
      }
    }
  }, []);

  return (
    <>
    <div className={`min-h-screen flex flex-col bg-[#f8f9fa] font-sans overflow-x-hidden ${isPreviewMode ? 'hidden' : ''}`}>
      {/* Top Header Bar */}
      <div className="w-full bg-[#131a26] text-white flex items-center justify-between px-6 py-3 sticky top-0 z-[100]">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push('/writer/dashboard')} 
            className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Cancel
          </button>
          <div className="h-4 w-px bg-gray-600"></div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">
            {title ? `DRAFTING: ${title.length > 55 ? title.substring(0, 55) + '...' : title}` : "NEW POST"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => { if (editorRef.current) { setPreviewContent(editorRef.current.innerHTML); } setIsPreviewMode(true); }} className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider px-4 py-2 rounded transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Preview
            </button>
          <button onClick={handleSaveDraft} className="text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider px-4 py-2 border border-gray-600 rounded transition-colors hover:border-gray-400 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Draft
          </button>
            <button onClick={handleSubmitForReview} className="bg-[#e3120b] hover:bg-[#b80f09] text-white font-bold text-sm px-6 py-2 rounded transition-colors flex items-center gap-2 uppercase tracking-wider shadow-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Submit For Review
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 gap-8 ${isSidebarVisible ? 'lg:grid-cols-[1fr_360px]' : ''}`}>
        
        {/* Left Column: Editor Wrapper */}
        <div className={`relative flex flex-col ${!isSidebarVisible ? 'max-w-[950px]' : ''}`}>
          
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className={`absolute ${isSidebarVisible ? '-right-14' : '-right-12'} top-10 p-1.5 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm z-10 transition-colors`}
            title="Toggle Article Settings"
          >
            {isSidebarVisible ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <line x1="15" x2="15" y1="3" y2="21"/>
                <path d="m8 9 3 3-3 3"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <line x1="15" x2="15" y1="3" y2="21"/>
              </svg>
            )}
          </button>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col flex-1">
            
            {/* Toolbar */}
          <div className="mx-10 mt-10 p-1.5 flex items-center gap-1 overflow-x-auto bg-[#f8f9fa] border border-gray-200 rounded-xl">
            <button onClick={() => execCommand('undo')} className="p-2 text-gray-500 hover:bg-gray-200/50 rounded"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg></button>
            <button onClick={() => execCommand('redo')} className="p-2 text-gray-500 hover:bg-gray-200/50 rounded"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 3.7"/></svg></button>
            <div className="w-px h-5 bg-gray-200 mx-2"></div>
            <button onClick={() => execCommand('bold')} className={`p-2 font-serif text-lg font-bold rounded w-8 text-center transition-colors ${activeFormats.bold ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}>B</button>
            <button onClick={() => execCommand('italic')} className={`p-2 font-serif text-lg italic rounded w-8 text-center transition-colors ${activeFormats.italic ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}>I</button>
            <button onClick={() => execCommand('underline')} className={`p-2 font-serif text-lg underline rounded w-8 text-center transition-colors ${activeFormats.underline ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}>U</button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <button onClick={handleIncreaseFontSize} className="p-1.5 text-gray-700 hover:bg-gray-50 rounded flex items-start" title="Increase Font Size">
              <span className="font-serif text-[19px] leading-none">A</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6" className="ml-0.5 mt-0.5">
                <polygon points="12 6 20 18 4 18"></polygon>
              </svg>
            </button>
            <button onClick={handleDecreaseFontSize} className="p-1.5 text-gray-700 hover:bg-gray-50 rounded flex items-start" title="Decrease Font Size">
              <span className="font-serif text-[16px] leading-none mt-[3px]">A</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6" className="ml-0.5 mt-0.5">
                <polygon points="12 18 20 6 4 6"></polygon>
              </svg>
            </button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <button onClick={() => { const url = prompt('Enter link URL'); if (url) execCommand('createLink', url); }} className="p-2 text-gray-500 hover:bg-gray-50 rounded"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <button onClick={() => execCommand('insertUnorderedList')} className={`p-2 rounded transition-colors ${activeFormats.ul ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></button>
            <button onClick={() => execCommand('insertOrderedList')} className={`p-2 rounded transition-colors ${activeFormats.ol ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg></button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <button onClick={() => execCommand('formatBlock', 'BLOCKQUOTE')} className={`p-2 rounded transition-colors ${activeFormats.blockquote ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg></button>
            <button onClick={() => execCommand('formatBlock', 'PRE')} className={`p-2 rounded transition-colors ${activeFormats.pre ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            
            <button 
              onMouseDown={(e) => {
                e.preventDefault(); // Prevents focus from leaving the editor
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0 && editorRef.current?.contains(selection.anchorNode)) {
                  setSavedRange(selection.getRangeAt(0).cloneRange());
                } else {
                  setSavedRange(null);
                }
              }}
              onClick={() => setIsImageModalOpen(true)} className="text-[#1a65d6] bg-[#f0f5ff] hover:bg-orange-100 font-bold text-[11px] uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5 ml-2 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Insert Image
            </button>
          </div>

          {/* Editor Area */}
          <div className="flex-1 px-10 pt-10 pb-10 flex flex-col relative">
            <input 
              type="text" 
              placeholder="Add Title..." 
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value && !focusKeyword) {
                  const words = e.target.value.split(' ').filter(w => w.trim() !== '');
                  setFocusKeyword(words.slice(0, 2).join(' ').replace(/'s/g, '').replace(/[^a-zA-Z0-9 ]/g, ''));
                }
              }}
              className="w-full text-4xl font-serif font-bold text-[#131a26] placeholder:text-gray-300 border-none outline-none focus:ring-0 mb-10 bg-transparent"
            />
            
            <textarea 
                placeholder="Add Subheading / Deck..." 
                rows={2}
                value={subtitle}
                onChange={(e) => {
                  setSubtitle(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="w-full text-xl font-serif text-gray-700 placeholder:text-gray-300 border-none outline-none focus:ring-0 mb-12 resize-none bg-transparent overflow-hidden"
              />
            
            {selectedFigure && (
              <div 
                className="absolute z-[50] bg-[#1a1b26] text-white rounded-xl shadow-xl flex items-center px-6 py-3 gap-6"
                style={{ top: `${figurePosition.top}px`, left: `${figurePosition.left}px`, transform: 'translateX(-50%)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Size</span>
                  <button onClick={(e) => handleImageAction('SIZE_S', e)} className="text-sm font-bold hover:text-white text-gray-300">S</button>
                  <button onClick={(e) => handleImageAction('SIZE_M', e)} className="text-sm font-bold hover:text-white text-gray-300">M</button>
                  <button onClick={(e) => handleImageAction('SIZE_FULL', e)} className="text-sm font-bold hover:text-white text-gray-300">FULL</button>
                </div>
                <div className="w-px h-5 bg-gray-600"></div>
                <div className="flex items-center gap-3">
                  <button onClick={(e) => handleImageAction('ALIGN_LEFT', e)} className="text-gray-300 hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="15" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('ALIGN_CENTER', e)} className="text-gray-300 hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="6" y1="12" x2="18" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('ALIGN_RIGHT', e)} className="text-gray-300 hover:text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="9" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </button>
                </div>
                <div className="w-px h-5 bg-gray-600"></div>
                <div className="flex items-center gap-3">
                  <button onClick={(e) => handleImageAction('MOVE_UP', e)} className="text-gray-300 hover:text-white" title="Move Up">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </button>
                  <button onClick={(e) => handleImageAction('MOVE_DOWN', e)} className="text-gray-300 hover:text-white" title="Move Down">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  
                </div>
                <div className="w-px h-5 bg-gray-600"></div>
                <button onClick={(e) => handleImageAction('EDIT', e)} className="text-gray-300 hover:text-white mr-1" title="Edit Image">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button onClick={(e) => handleImageAction('DELETE', e)} className="text-[#fca5a5] hover:text-red-400" title="Delete">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            )}
            
            <div className="relative">
              {isEditorEmpty && (
                <div className="absolute left-8 top-8 text-gray-300 pointer-events-none text-lg bg-transparent">
                  Start writing or type / for plugins
                </div>
              )}
              <div ref={editorRef} contentEditable onClick={handleEditorClick}
                  onKeyDown={handleEditorKeyDown}
                suppressContentEditableWarning
                onKeyUp={checkFormats}
                onMouseUp={checkFormats}
                onFocus={checkFormats}
                onInput={checkFormats}
                className="w-full min-h-[400px] text-lg text-gray-800 p-8 focus:ring-0 outline-none bg-transparent transition-colors break-words break-all whitespace-pre-wrap [&_a]:text-[#e3120b] [&_a]:underline [&_a]:font-bold [&_a]:transition-all [&_a:hover]:text-[#ff3333] [&_a:hover]:[text-shadow:0_0_8px_rgba(227,18,11,0.5)] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e3120b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:font-mono [&_pre]:text-sm"
              />
            </div>
            {tags.length > 0 && (
              <div className="mt-8 mb-4 border-t border-gray-200 pt-6 flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mr-2">TAGS:</span>
                {tags.map(tag => (
                  <span key={tag} className="text-[12px] font-bold text-[#1a65d6] bg-[#f0f5ff] px-3 py-1.5 rounded uppercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Settings Sidebar */}
        {isSidebarVisible && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-[calc(100vh-140px)] sticky top-[140px]">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <svg className="text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <h3 className="font-bold text-sm uppercase tracking-widest text-[#131a26]">Article Settings</h3>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {/* Tabs */}
            <div className="flex w-full bg-gray-50 rounded border border-gray-200 p-1 mb-8">
              <button 
                onClick={() => setActiveTab('DETAILS')}
                className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded ${activeTab === 'DETAILS' ? 'bg-white shadow-sm text-[#131a26]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Details
              </button>
              <button 
                onClick={() => setActiveTab('SEO')}
                className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded ${activeTab === 'SEO' ? 'bg-white shadow-sm text-[#131a26]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                SEO
              </button>
            </div>

            {activeTab === 'DETAILS' && (
              <div className="space-y-6">
                
                {/* Main Category */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Select Category (Main)</label>
                  <div className="relative">
                    <select 
                      value={mainCategory}
                      onChange={(e) => setMainCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] bg-white appearance-none cursor-pointer pr-10"
                    >
                      <option>World</option>
                      <option>Finance & Economics</option>
                      <option>Politics</option>
                      <option>Technology</option>
                      <option>Industries</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Sub-categories */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Select Sub-categories (Optional, Max 5)</label>
                  <div className="border border-gray-300 rounded overflow-hidden">
                    <div className="max-h-[160px] overflow-y-auto p-3 grid grid-cols-2 gap-y-3 gap-x-2 bg-white">
                      {['United States', 'China', 'Europe', 'Britain', 'Middle East', 'Africa', 'Asia', 'Business', 'Opinions', 'Cost of Living', 'Stock Markets', 'Cryptocurrency', 'Leadership', 'Elections', 'The White House', 'Congress', 'International Relations', 'Human Rights', 'Law & Justice', 'Artificial intelligence', 'Innovations', 'Banking', 'Investment', 'Energy', 'Real Estate', 'Agriculture', 'Healthcare', 'Entertainment', 'Tourism & Hospitality', 'Culture', 'Sports'].map(cat => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={selectedSubCats.includes(cat)}
                            onChange={() => toggleSubCat(cat)}
                            disabled={!selectedSubCats.includes(cat) && selectedSubCats.length >= 5}
                            className="w-4 h-4 text-[#1a65d6] border-gray-300 rounded focus:ring-0 cursor-pointer disabled:opacity-50" 
                          />
                          <span className={`text-sm truncate ${selectedSubCats.includes(cat) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Selected: {selectedSubCats.length} / 5</p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Tags</label>
                  <div className="border border-gray-300 rounded px-2 py-1.5 focus-within:border-[#1a65d6] bg-white flex flex-wrap gap-1.5 mb-1">
                    {tags.map(tag => (
                      <span key={tag} onClick={() => removeTag(tag)} className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded cursor-pointer hover:bg-blue-100 transition-colors flex items-center gap-1">
                        {tag}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </span>
                    ))}
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder={tags.length === 0 ? "e.g. BreakingNews, Football" : ""} 
                      className="flex-1 min-w-[120px] text-sm text-gray-800 focus:outline-none bg-transparent py-1 px-1" 
                      disabled={tags.length >= 8}
                    />

              </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Press enter or comma to add • Click tag to remove • 8 tags max</p>
                </div>

                {/* Read Duration */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Read Duration</label>
                  <input 
                    type="text" 
                    value={readDuration}
                    onChange={(e) => setReadDuration(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#1a65d6]" 
                  />
                </div>

              </div>
            )}
            
            {activeTab === 'SEO' && (
              <div className="space-y-6">
                
                {/* Auto-Generate Button */}
                <div>
                  <button onClick={() => autoGenerateSEO(true)} className="w-full bg-[#e3120b] hover:bg-[#b80f09] text-white font-bold text-xs uppercase tracking-widest py-3 rounded flex items-center justify-center gap-2 transition-colors shadow-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                    Auto-Generate SEO
                  </button>
                  <p className="text-[10px] text-gray-500 font-mono mt-3 leading-relaxed">
                    Keyword & meta description fill in automatically from your title and content. Edit any field to override.
                  </p>
                </div>

                {/* Card Summary */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Card Summary (SEO Lead)</label>
                  <textarea 
                    rows={3} 
                    value={cardSummary}
                    onChange={(e) => setCardSummary(e.target.value)}
                    placeholder="Concise 1-2 sentence preview details." 
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] resize-none"
                  ></textarea>
                </div>

                {/* Focus Keyword */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Focus Keyword</label>
                  <input 
                    type="text" 
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    placeholder="e.g. Vexillum Minerals" 
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]" 
                  />
                  {focusKeyword && (
                    <div className="mt-2 space-y-1">
                      <div className={`flex items-center gap-1.5 text-[10px] font-bold ${title.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'text-green-600' : 'text-gray-400'}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"></path></svg>
                        The title includes the focus keyword.
                      </div>
                      <div className={`flex items-center gap-1.5 text-[10px] font-bold ${metaDescription.toLowerCase().includes(focusKeyword.toLowerCase()) ? 'text-green-600' : 'text-gray-400'}`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"></path></svg>
                        The meta description includes the focus keyword.
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Meta Description</label>
                    <span className="text-[10px] font-bold text-gray-400">{metaDescription.length}/160</span>
                  </div>
                  <textarea 
                    rows={3} 
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Discover why... — the sentence shown under the title in Google." 
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] resize-none"
                  ></textarea>
                </div>

                {/* Search Preview */}
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Preview in Search Results
                  </label>
                  <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm mt-3">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-7 h-7 bg-[#131a26] rounded-full flex items-center justify-center text-white text-[10px] font-serif font-bold">
                        WT
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-[#202124] font-medium leading-tight">Washington Times</span>
                        <span className="text-xs text-[#4d5156] leading-tight truncate max-w-[200px]">www.washington-times.com › article...</span>
                      </div>
                    </div>
                    <div className="text-[18px] text-[#1a0dab] font-medium hover:underline cursor-pointer mb-1 truncate">
                      {title || "Your Article Title |..."}
                    </div>

                    <div className="text-[13px] text-[#4d5156] leading-snug line-clamp-2">
                      {metaDescription || "Add a meta description to control the snippet shown in search results."}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono mt-3 leading-relaxed">
                    This is how the article can appear on Google. Meta description drives the snippet under the link.
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>
      )}
      </div>
      </div>
      {isPreviewMode && (
        <div className="min-h-screen flex flex-col bg-white overflow-x-hidden pb-16">
          {/* Top Banner */}
          <div className="w-full bg-[#131a26] text-white flex items-center justify-between px-6 py-3 sticky top-0 z-[100]">
            <div className="flex items-center gap-4">
              <span className="bg-[#e3120b] text-black font-bold text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm">
                PREVIEW MODE
              </span>
              <span className="text-gray-300 text-sm">This is how your article with inline images will render on the live feed.</span>
            </div>
            <button onClick={() => setIsPreviewMode(false)} className="text-white hover:text-gray-300 flex items-center gap-2 text-sm font-bold border border-gray-700 px-4 py-2 rounded transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              EXIT PREVIEW
            </button>
          </div>

          <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 lg:px-12 mt-8">
            <div className="flex items-center justify-between w-full pb-4 mb-8 border-b border-[#e6e6e6]">
              <button onClick={() => setIsPreviewMode(false)} className="text-[11px] font-bold text-[#767676] tracking-wider uppercase hover:text-[#0f0f0f] transition-colors flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                BACK TO NEWSFEED
              </button>
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 rounded-full border border-[#e6e6e6] text-gray-500 hover:text-[#E3120B] hover:border-[#E3120B] flex items-center justify-center transition-colors bg-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                </button>
                <ShareDropdown title={title}>
                  <div className="w-9 h-9 rounded-full border border-[#fbd5d5] flex items-center justify-center text-[#E3120B] bg-[#fffcfc] hover:bg-[#fcf0f0] transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                  </div>
                </ShareDropdown>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="w-full lg:col-span-9 flex flex-col">
                <div className="w-full mb-6">
                  <p className="text-[13px] font-sans font-bold mb-3">
                    <span className="text-[#E3120B]">{mainCategory || 'Category'}</span>
                    {selectedSubCats.length > 0 && (
                      <>
                        <span className="text-[#0f0f0f] mx-1.5 font-normal">|</span>
                        <span className="text-[#0f0f0f]">{selectedSubCats.join(' | ')}</span>
                      </>
                    )}
                  </p>
                  <h1 className="text-[34px] md:text-[40px] lg:text-[44px] font-serif font-bold leading-[1.1] text-[#0f0f0f] mb-4 tracking-tight">
                    {title || 'Article Headline'}
                  </h1>
                  {subtitle && (
                    <h2 className="text-[20px] md:text-[24px] font-serif text-[#3b3b3b] mb-6 leading-snug">
                      {subtitle}
                    </h2>
                  )}

                  <div className="flex items-center gap-3 mb-6 border-y border-[#e6e6e6] py-6">
                    <img src={profileData.photo} alt={profileData.fullName} className="w-10 h-10 rounded-full object-cover" onError={(e) => { e.currentTarget.src = "/profile-mishal.jpg" }} />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-bold text-[#0f0f0f]">By</span>
                        <span className="text-[14px] font-bold text-[#0f0f0f] cursor-pointer hover:underline">{profileData.fullName}</span>
                          <a href={profileData.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] ml-0.5 -mt-[2px]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                      </div>
                      <div className="text-[11px] text-[#767676] font-sans flex items-center gap-1.5 mt-0.5 tracking-wider">
                        <span className="uppercase">Published {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} AT {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}</span>
                        <span>•</span>
                        <span>{readDuration || '5'} min read</span>
                      </div>
                    </div>
                  </div>
                </div>

                {imageUrl && (
                  <div className="w-full mb-8">
                    <img src={imageUrl} alt="Article Image" className="w-full h-auto object-cover max-h-[600px]" />
                    {imageCredit && (
                      <div className="mt-2 text-[11px] font-sans text-[#767676] uppercase tracking-widest">
                        {imageCredit}
                      </div>
                    )}
                    {imageCaption && (
                      <p className="mt-2 text-[14px] font-serif text-gray-700 italic">
                        {imageCaption}
                      </p>
                    )}
                  </div>
                )}

                <div 
                  className="article-content prose prose-lg max-w-none flow-root text-[18px] md:text-[20px] font-serif leading-[1.6] text-[#0f0f0f] pt-4 preview-content [&_a]:text-[#e3120b] [&_a]:underline [&_a]:font-bold [&_a]:transition-all [&_a:hover]:text-[#ff3333] [&_a:hover]:[text-shadow:0_0_8px_rgba(227,18,11,0.5)] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e3120b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:font-mono [&_pre]:text-sm"
                  dangerouslySetInnerHTML={{ __html: previewContent || '<p>Start writing your article...</p>' }}
                />

                {tags.length > 0 && (
                  <div className="mt-10 mb-2 pb-2">
                    <div className="flex flex-wrap gap-1.5 text-[13px] font-bold text-[#888] uppercase tracking-wider">
                      {tags.map((tag, idx) => (
                        <span key={idx}>
                          <span className="hover:text-[#00508f] transition-colors cursor-pointer">#{tag.toUpperCase()}</span>
                          {idx < tags.length - 1 && <span className="text-gray-300 ml-1">,</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>

              {/* Sidebar Placeholders */}
              <div className="w-full lg:col-span-3 flex flex-col pt-1">
                <h3 className="text-[13px] font-bold font-serif uppercase tracking-widest text-black mb-6 border-b border-gray-900 pb-2">
                  Recent in {mainCategory || 'Category'}
                </h3>
                <div className="flex flex-col gap-6">
                  {/* Fake items for preview */}
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer border-b border-gray-100 pb-6 last:border-b-0 items-stretch opacity-50">
                      <div className="w-[100px] h-[70px] flex-shrink-0 bg-gray-200"></div>
                      <div className="flex flex-col flex-1 gap-2">
                        <div className="w-full h-3 bg-gray-200 rounded"></div>
                        <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                        <div className="w-1/2 h-2 bg-gray-100 rounded mt-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Share Button Section */}
            <div className="w-full lg:w-[75%] mt-6 border-t border-gray-300 pt-8 mb-16">
              <div className="flex">
                <ShareDropdown title={title}>
                  <button className="flex items-center gap-3 border border-gray-300 rounded-full px-8 py-3 hover:bg-gray-50 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span className="text-[16px] font-bold">Share</span>
                  </button>
                </ShareDropdown>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[500px] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <svg className="text-[#e3120b]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <h3 className="font-bold text-[#131a26] text-[13px] uppercase tracking-wider">Insert Article Image</h3>
              </div>
              <button onClick={() => { setIsImageModalOpen(false); setIsEditingImage(false); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              
              {/* Paste Image URL */}
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Paste Image URL</label>
                <input 
                  type="text" 
                  value={imageUrl}
                  onChange={(e) => { setImageUrl(e.target.value); setImageFile(null); }}
                  placeholder="https://images.unsplash.com/photo-..." 
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]"
                />
                <p className="text-[10px] text-gray-400 mt-1.5 font-sans leading-tight">Must be a direct link to an image file (e.g. ends in .jpg). For Unsplash, right-click the image and select "Copy Image Address".</p>
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or Upload File</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Choose File */}
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Choose Computer File</label>
                <div className="border border-dashed border-gray-400 rounded p-4 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                        setImageUrl(''); // clear url if file chosen
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <span className="text-sm font-mono text-gray-700">{imageFile ? imageFile.name : "Choose file No file chosen"}</span>
                </div>
              </div>

              {/* Caption */}
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Image Caption / Alt Text</label>
                <input 
                  type="text" 
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Describe this image..." 
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]"
                />
              </div>

              {/* Credit */}
              <div className="mb-6">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Image Credit / Source (Optional)</label>
                <input 
                  type="text" 
                  value={imageCredit}
                  onChange={(e) => setImageCredit(e.target.value)}
                  placeholder="e.g. Getty Images, AP Photo" 
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6]"
                />
              </div>

              {/* Size & Position */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Image Size</label>
                  <div className="relative">
                    <select 
                      value={imageSize}
                      onChange={(e) => setImageSize(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#e3120b] focus:ring-1 focus:ring-[#e3120b] bg-white appearance-none cursor-pointer pr-10"
                    >
                      <option>Small (Width: 250px)</option>
                      <option>Medium (Width: 450px)</option>
                      <option>Full-Width (100%)</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Position Alignment</label>
                  <div className="relative">
                    <select 
                      value={imageAlignment}
                      onChange={(e) => setImageAlignment(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#e3120b] focus:ring-1 focus:ring-[#e3120b] bg-white appearance-none cursor-pointer pr-10"
                    >
                      <option>Left (Wrap Text Right)</option>
                      <option>Center (No Wrap)</option>
                      <option>Right (Wrap Text Left)</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button 
                onClick={() => { setIsImageModalOpen(false); setIsEditingImage(false); }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] uppercase tracking-widest px-6 py-2.5 rounded transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleInsertImage}
                className="bg-[#e3120b] hover:bg-[#b80f09] text-white font-bold text-[11px] uppercase tracking-widest px-8 py-2.5 rounded transition-colors shadow-sm"
              >
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
