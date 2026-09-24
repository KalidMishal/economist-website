'use client';

import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ShareDropdown from '@/components/ShareDropdown';
import { Spinner } from '@/components/Skeletons';
import AuthorProfile from '@/components/AuthorProfile';

const WORLD_COUNTRIES = ["United States", "China", "Europe", "Britain", "Middle East", "Africa", "Asia"];
const PARENT_CATS = ["World", "Finance & Economics", "Politics", "Technology", "Industries"];
const OTHER_CATS = ["Business", "Opinions", "Cost of Living", "Stock Markets", "Cryptocurrency", "Leadership", "Elections", "The White House", "Congress", "International Relations", "Human Rights", "Law & Justice", "Artificial intelligence", "Innovations", "Banking", "Investment", "Energy", "Real Estate", "Agriculture", "Healthcare", "Entertainment", "Tourism & Hospitality", "Culture", "Sports"];
const MAIN_DROPDOWN = ["World", "Finance & Economics", "Politics", "Technology", "Industries", ...OTHER_CATS];
const SUB_CATS_LIST = ["Finance & Economics", "Politics", "Technology", "Industries", ...OTHER_CATS];


export default function ReviewPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'SEO'>('DETAILS');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [title, setTitle] = useState('');
  // Auto-resize title on load
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }
  }, [title]);

  const [authorName, setAuthorName] = useState('Mishal');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorPhoto, setAuthorPhoto] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [previewContent, setPreviewContent] = useState('');
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);
  const [mainCategory, setMainCategory] = useState('United States');
  
  useEffect(() => {
    if (selectedSubCats.includes(mainCategory)) {
      setSelectedSubCats(prev => prev.filter(c => c !== mainCategory));
    }
  }, [mainCategory]);
  const [isWorldModalOpen, setIsWorldModalOpen] = useState(false);
  const [isWorldSubMenuOpen, setIsWorldSubMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWorldModalOpen(false);
      }
    }
    if (isWorldModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWorldModalOpen]);

  const [readDuration, setReadDuration] = useState('5');
  const [placement, setPlacement] = useState('None(Category Only)');
  const [isPlacementDropdownOpen, setIsPlacementDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.post) {
            setTitle(data.post.title || '');
            setSubtitle(data.post.subtitle || '');
            
            const parsedSubCats = Array.isArray(data.post.sub_categories) 
              ? data.post.sub_categories 
              : (typeof data.post.sub_categories === 'string' && data.post.sub_categories !== '' && data.post.sub_categories !== 'null' ? JSON.parse(data.post.sub_categories || '[]') : []);
            
            const parsedTags = Array.isArray(data.post.tags)
              ? data.post.tags
              : (typeof data.post.tags === 'string' && data.post.tags !== '' && data.post.tags !== 'null' ? JSON.parse(data.post.tags || '[]') : []);
            
            setMainCategory(data.post.mainCategory || 'United States');
            setAuthorName(data.post.author_name || 'Mishal');
            setAuthorEmail(data.post.author_email || '');
            setAuthorPhoto(data.post.author_profile_picture || '');
            setSelectedSubCats(parsedSubCats);
            setTags(parsedTags);
            setCardSummary(data.post.cardSummary || '');
            setFocusKeyword(data.post.focusKeyword || '');
            setMetaDescription(data.post.metaDescription || '');
            setReadDuration(data.post.readDuration?.toString() || '5');
            setPlacement(data.post.placement || 'None(Category & Search Only)');
            
            if (editorRef.current) {
              editorRef.current.innerHTML = (data.post.content || '').replace(/pointer-events:\s*(none|auto);?/gi, '');
              setIsEditorEmpty(!data.post.content);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch post', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (postId) fetchPost();
  }, [postId]);

  // SEO State
  const [cardSummary, setCardSummary] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [editedCardSummary, setEditedCardSummary] = useState(false);
  const [editedFocusKeyword, setEditedFocusKeyword] = useState(false);
  const [editedMetaDescription, setEditedMetaDescription] = useState(false);

  // Image Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isInsertingImage, setIsInsertingImage] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageCaption, setImageCaption] = useState('');
  const [imageKeywords, setImageKeywords] = useState<string[]>([]);
  const [imageKeywordInput, setImageKeywordInput] = useState('');
    const [imageCredit, setImageCredit] = useState('');
  const [isUploadingCloud, setIsUploadingCloud] = useState(false);
  const [uploadedCloudSuccessMsg, setUploadedCloudSuccessMsg] = useState('');
  const [imageSize, setImageSize] = useState('Medium (Width: 450px)');
  const [imageAlignment, setImageAlignment] = useState('Center (No Wrap)');
  const [savedRange, setSavedRange] = useState<Range | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<HTMLElement | null>(null);
  const [figurePosition, setFigurePosition] = useState({ top: 0, left: 0 });
  
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  // Hide sidebar by default on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarVisible(false);
    }
  }, []);

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
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const autoGenerateSEO = (force = false) => {
    let text = '';
    if (editorRef.current) {
      // Clone node to safely remove image captions for summary extraction
      const tempNode = editorRef.current.cloneNode(true) as HTMLElement;
      tempNode.querySelectorAll('figcaption').forEach(el => el.remove());
      
      const editorText = tempNode.innerText?.trim() || tempNode.textContent?.trim() || '';
      if (editorText) {
        text = editorText;
      }
    }
    const snippet = text.length > 155 ? text.substring(0, 155) + '...' : text;
    
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
      setEditedCardSummary(false);
      setEditedMetaDescription(false);
      setEditedFocusKeyword(false);
    } else {
      if (!editedCardSummary) setCardSummary(snippet);
      if (!editedMetaDescription) setMetaDescription(snippet);
      if (!editedFocusKeyword) setFocusKeyword(generatedKeyword);
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
      setIsEditorEmpty(editorRef.current.innerText.trim().length === 0 && editorRef.current.querySelectorAll('img').length === 0);
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

  const handleCreateLink = () => {
    const url = prompt('Enter link URL');
    if (!url) return;
    
    // Generate a unique dummy URL to find the newly created link
    const dummyUrl = 'http://temp-dummy-url-' + Date.now();
    execCommand('createLink', dummyUrl);
    
    // Find the link and modify it
    if (editorRef.current) {
      const links = editorRef.current.querySelectorAll(`a[href="${dummyUrl}"]`);
      links.forEach(a => {
        (a as HTMLAnchorElement).href = url;
        (a as HTMLAnchorElement).target = '_blank';
        (a as HTMLAnchorElement).rel = 'noopener noreferrer';
      });
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
        // Use viewport-based coords for fixed positioning
        const figureRect = figure.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        let centerLeft = figureRect.left + (figureRect.width / 2);
        const toolbarHalfWidth = 200;
        const minLeft = editorRect.left + toolbarHalfWidth;
        const maxLeft = editorRect.right - toolbarHalfWidth;
        centerLeft = Math.max(minLeft, Math.min(centerLeft, maxLeft));

        setFigurePosition({ top: figureRect.top - 55, left: centerLeft });
      }
    } else {
      if (!isImageModalOpen) {
        setSelectedFigure(null);
      }
    }
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setIsEditingImage(false);
              setIsInsertingImage(false);
    setImageUrl('');
    setImageFile(null);
    setImageCaption('');
    setImageCredit('');
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
        const figureRect = selectedFigure.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        let centerLeft = figureRect.left + (figureRect.width / 2);
        const toolbarHalfWidth = 200;
        const minLeft = editorRect.left + toolbarHalfWidth;
        const maxLeft = editorRect.right - toolbarHalfWidth;
        centerLeft = Math.max(minLeft, Math.min(centerLeft, maxLeft));

        setFigurePosition({ top: figureRect.top - 55, left: centerLeft });
      }
    }, 50);
  };


  React.useEffect(() => {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    if (editorRef.current && editorRef.current.innerHTML === '') {
      editorRef.current.innerHTML = '<p><br></p>';
    }
  }, []);

  
  
  // Fixed sidebar & toggle: reposition on scroll/resize
  React.useEffect(() => {
    const updateSidebarPosition = () => {
      if (editorRef.current) {
        const editorRect = editorRef.current.getBoundingClientRect();
        // Position toggle button just to the right of the editor column
        if (toggleBtnRef.current) {
          toggleBtnRef.current.style.top = '120px';
          toggleBtnRef.current.style.left = (editorRect.right + 8) + 'px';
        }
                // Position sidebar panel aligned to right of editor (Desktop only)
        if (sidebarRef.current) {
          if (window.innerWidth >= 768 && isSidebarVisible) {
            sidebarRef.current.style.left = (editorRect.right + 50) + 'px';
            sidebarRef.current.style.top = '65px';
            sidebarRef.current.style.height = (window.innerHeight - 65) + 'px';
          } else {
            sidebarRef.current.style.left = '';
            sidebarRef.current.style.top = '';
            sidebarRef.current.style.height = '';
          }
        }
      }
    };
    updateSidebarPosition();
    window.addEventListener('scroll', updateSidebarPosition, { passive: true });
    window.addEventListener('resize', updateSidebarPosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateSidebarPosition);
      window.removeEventListener('resize', updateSidebarPosition);
    };
  }, [isSidebarVisible]);

// Update image toolbar position on scroll (keeps toolbar above the image as page scrolls)
  React.useEffect(() => {
    const updateToolbarOnScroll = () => {
      if (selectedFigure && editorRef.current) {
        const figureRect = selectedFigure.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        // Hide image toolbar immediately on scroll to prevent overlapping text toolbar
        setSelectedFigure(null);
      }
    };
    window.addEventListener('scroll', updateToolbarOnScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateToolbarOnScroll);
  }, [selectedFigure]);


  // Fixed toolbar: reposition on scroll/resize to stay aligned with editor column
  React.useEffect(() => {
    const updateToolbarPosition = () => {
      if (toolbarRef.current && editorRef.current) {
        const editorRect = editorRef.current.getBoundingClientRect();
        // Only show fixed toolbar when scrolled past its natural position
        const toolbar = toolbarRef.current;
        toolbar.style.left = editorRect.left + 'px';
        toolbar.style.width = editorRect.width + 'px';
      }
    };
    updateToolbarPosition();
    window.addEventListener('scroll', updateToolbarPosition, { passive: true });
    window.addEventListener('resize', updateToolbarPosition, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateToolbarPosition);
      window.removeEventListener('resize', updateToolbarPosition);
    };
  }, [isSidebarVisible]);

// Effect to add blue border and disable clicks on selected image
  React.useEffect(() => {
    if (editorRef.current) {
      const figures = editorRef.current.querySelectorAll('figure');
      figures.forEach(f => {
        const img = f.querySelector('img');
        if (img) {
          if (f === selectedFigure) {
            img.style.outline = '2px solid #3b82f6';
            img.style.outlineOffset = '2px';
            // Prevent re-triggering click on image while toolbar is open
            (f as HTMLElement).style.pointerEvents = 'none';
          } else {
            img.style.outline = 'none';
            (f as HTMLElement).style.pointerEvents = 'auto';
          }
        }
      });
    }
    // Restore pointer events on cleanup / deselect
    return () => {
      if (editorRef.current) {
        const figures = editorRef.current.querySelectorAll('figure');
        figures.forEach(f => {
          (f as HTMLElement).style.pointerEvents = 'auto';
        });
      }
    };
  }, [selectedFigure]);


  const getCleanEditorContent = () => {
    if (!editorRef.current) return '';
    const imgs = editorRef.current.querySelectorAll('img');
    const oldStyles = Array.from(imgs).map(img => ({ outline: img.style.outline, outlineOffset: img.style.outlineOffset }));
    
    imgs.forEach(img => {
      img.style.outline = '';
      img.style.outlineOffset = '';
    });
    
    const content = editorRef.current.innerHTML.replace(/pointer-events:\s*(none|auto);?/gi, '');
    
    imgs.forEach((img, i) => {
      if (oldStyles[i].outline) {
        img.style.outline = oldStyles[i].outline;
        img.style.outlineOffset = oldStyles[i].outlineOffset;
      }
    });
    
    return content;
  };

    const getAuthorId = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.id;
        } catch (e) {}
      }
      return null;
    };

    const handleUpdateStatus = async (newStatus: 'published' | 'trash' | 'rejected', overrideRejectReason?: string) => {
      setIsProcessing(true);
      const postContent = getCleanEditorContent() || previewContent || '';
      
      let firstImageSrc = '';
      if (editorRef.current) {
        const firstImg = editorRef.current.querySelector('img');
        if (firstImg) firstImageSrc = firstImg.src;
      }
  
      if (newStatus === 'published' && !firstImageSrc) {
        window.alert("Every article must contain at least one image before it can be published.");
        setIsProcessing(false);
        return;
      }

      const updateData = {
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
      };
      
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${postId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData)
        });

        if (res.ok) {
          sessionStorage.setItem('toastMessage', newStatus === 'published' ? 'Article Approved & Published Successfully' : 'Article Moved to Trash');
          router.refresh();
          router.push('/admin/dashboard');
        } else {
          window.alert('Failed to update post.');
        }
      } catch (e) {
        window.alert('Network error while updating post.');
      } finally {
        setIsProcessing(false);
      }
    };
  const handleFileUpload = (file: File) => {
    setImageFile(file);
    setIsUploadingCloud(true);
    setUploadedCloudSuccessMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const formData = new FormData();
          formData.append('folder', 'articles');
          formData.append('file', blob, file.name.replace(/\.[^/.]+$/, "") + ".webp");
          try {
            const res = await fetch('http://localhost:5000/api/upload', {
              method: 'POST',
              body: formData
            });
            const data = await res.json();
            if (data.success) {
              setImageUrl(data.url);
              setUploadedCloudSuccessMsg(`✓ FILE "${file.name.toUpperCase()}" COMPRESSED & UPLOADED TO CLOUD!`);
            } else {
              alert('Upload failed: ' + data.message);
            }
          } catch (err) {
            console.error('Upload error', err);
            alert('Network error during upload');
          } finally {
            setIsUploadingCloud(false);
          }
        }, 'image/webp', 0.8);
      };
      if (event.target) img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleInsertImage = () => { setIsInsertingImage(true);
    if (!imageUrl) { setIsInsertingImage(false); return; }

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
      figure.contentEditable = 'false';
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

            // Ensure there is a paragraph after the figure to allow typing
            if (!figure.nextSibling) {
              const p = document.createElement('p');
              p.innerHTML = '<br>';
              figure.parentNode?.appendChild(p);
            }

            const finalRange = document.createRange();
            finalRange.setStartAfter(figure);
            if (selection) {
              selection.removeAllRanges();
              selection.addRange(finalRange);
            }
          } else {
            editorRef.current.appendChild(figure);
            const p = document.createElement('p');
            p.innerHTML = '<br>';
            editorRef.current.appendChild(p);
          }
        }
      } catch (e) {
        editorRef.current.appendChild(figure);
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        editorRef.current.appendChild(p);
      }
      checkFormats();
      // updatePreview(); // If updatePreview exists in scope
    };

    performInsertion(imageUrl);
      setImageUrl('');
      setImageFile(null);
      setImageCaption('');
      setImageCredit('');
      setUploadedCloudSuccessMsg('');
      setIsImageModalOpen(false);
      setIsEditingImage(false);
      setIsInsertingImage(false);
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
  
  
    const handleImageKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
        e.preventDefault();
        const newKw = imageKeywordInput.trim().replace(/,$/, '');
        if (newKw && !imageKeywords.includes(newKw) && imageKeywords.length < 4) {
          setImageKeywords([...imageKeywords, newKw]);
          setImageKeywordInput('');
        }
      }
    };
    const removeImageKeyword = (kwToRemove: string) => {
      setImageKeywords(imageKeywords.filter(kw => kw !== kwToRemove));
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
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (user.name) setAuthorName(user.name);
          if (user.email) setAuthorEmail(user.email);
        } catch(e) {}
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      const postId = urlParams.get('id') || urlParams.get('idx');
      
      if (mode === 'new') {
        return;
      }

      if ((mode === 'edit' || mode === 'edit_pending') && postId) {
        fetch(`http://localhost:5000/api/posts/${postId}`)
          .then(res => res.json())
          .then(data => {
            if (data.success && data.post) {
              const draftToLoad = data.post;
              setTitle(draftToLoad.title || '');
              setSubtitle(draftToLoad.subtitle || '');
              const draftSubCats = Array.isArray(draftToLoad.sub_categories) 
                ? draftToLoad.sub_categories 
                : (typeof draftToLoad.sub_categories === 'string' ? JSON.parse(draftToLoad.sub_categories || '[]') : []);
              
              const extractedDraftMain = draftSubCats.length > 0 ? draftSubCats[0] : 'United States';
              setMainCategory(extractedDraftMain);
              setSelectedSubCats(draftSubCats.slice(1));
              if (draftToLoad.tags) setTags(draftToLoad.tags);
              if (draftToLoad.card_summary) setCardSummary(draftToLoad.card_summary);
              if (draftToLoad.focus_keyword) setFocusKeyword(draftToLoad.focus_keyword);
              if (draftToLoad.meta_description) setMetaDescription(draftToLoad.meta_description);
              if (draftToLoad.read_duration) setReadDuration(draftToLoad.read_duration);
              
              if (draftToLoad.content && editorRef.current) {
                editorRef.current.innerHTML = draftToLoad.content;
              }
            }
          })
          .catch(e => console.error("Failed to load post data", e));
      }
    }
  }, []);

  useEffect(() => {
    autoGenerateSEO(false);
  }, [title, subtitle]);

  return (
    <>
    <div className={`min-h-screen flex flex-col bg-[#f8f9fa] font-sans  ${isPreviewMode ? 'hidden' : ''}`}>
      {/* Top Header Bar */}
      <div className="w-full bg-[#131a26] text-white sticky top-0 z-[100] overflow-hidden">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 overflow-x-auto custom-scrollbar-hide gap-4 w-full">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Cancel
          </button>
          <div className="h-4 w-px bg-gray-600"></div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300 max-w-[180px] md:max-w-none truncate inline-block align-middle">
            {title ? `REVIEWING: ${title.length > 55 ? title.substring(0, 55) + '...' : title}` : "REVIEW POST"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => { if (editorRef.current) { setPreviewContent(getCleanEditorContent()); } setIsPreviewMode(true); }} className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white uppercase tracking-wider px-4 py-2 rounded transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Preview
            </button>
          <button onClick={() => setIsRejectModalOpen(true)} disabled={isProcessing} className="text-sm font-bold text-white uppercase tracking-wider px-4 py-2 bg-[#e3120b] hover:bg-[#b80f09] rounded transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {isProcessing ? <Spinner /> : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            )}
              REJECT
            </button>
            <button onClick={() => handleUpdateStatus('published')} disabled={isProcessing} className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-bold text-sm px-6 py-2 rounded transition-colors flex items-center gap-2 uppercase tracking-wider shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
            {isProcessing ? <Spinner /> : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}
              APPROVE & PUBLISH
            </button>
        </div>
      </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 gap-8 items-start lg:grid-cols-[1fr_auto]`}>
        
        {/* Left Column: Editor Wrapper */}
        <div className={`relative flex flex-col w-full max-w-[950px]`}>
          
          <div className="absolute -right-10 md:-right-14 top-0 h-full w-10 md:w-14 pointer-events-none z-[130]">
            <button
              ref={toggleBtnRef}
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className="fixed hidden md:block p-1.5 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-colors z-[130] pointer-events-auto"
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
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 relative z-10">
            
            {/* Toolbar */}
          <div ref={toolbarRef} className="fixed top-[65px] z-[90] p-1.5 flex items-center gap-1 overflow-x-auto custom-scrollbar-hide bg-[#f8f9fa] border border-gray-200 rounded-xl shadow-sm mx-0">
              
              <div className="w-px h-6 bg-gray-300 mx-1 md:hidden flex-shrink-0"></div>
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
            <button onClick={handleCreateLink} className="p-2 text-gray-500 hover:bg-gray-50 rounded"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <button onClick={() => execCommand('insertUnorderedList')} className={`p-2 rounded transition-colors ${activeFormats.ul ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></button>
            <button onClick={() => execCommand('insertOrderedList')} className={`p-2 rounded transition-colors ${activeFormats.ol ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg></button>
            <div className="w-px h-5 bg-gray-200 mx-1"></div>
            <button onClick={() => execCommand('formatBlock', activeFormats.blockquote ? 'P' : 'BLOCKQUOTE')} className={`p-2 rounded transition-colors ${activeFormats.blockquote ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg></button>
            <button onClick={() => execCommand('formatBlock', activeFormats.pre ? 'P' : 'PRE')} className={`p-2 rounded transition-colors ${activeFormats.pre ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></button>
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
              onClick={() => {
                setIsImageModalOpen(true);
                setIsEditingImage(false);
              setIsInsertingImage(false);
                setImageUrl('');
                setImageFile(null);
                setImageCaption('');
                setImageCredit('');
              }} className="text-[#1a65d6] bg-[#f0f5ff] hover:bg-orange-100 font-bold text-[11px] uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5 ml-2 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Insert Image
            </button>
          </div>

          {/* Spacer for fixed toolbar height */}
          <div className="toolbar-spacer h-14"></div>

          {/* Editor Area */}
          <div className="flex-1 px-4 md:px-10 pt-4 pb-10 flex flex-col relative">
              <textarea 
                ref={titleRef}
                placeholder="Add Title..." 
                rows={1}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="w-full text-4xl font-serif font-bold text-[#131a26] placeholder:text-gray-300 border-none outline-none focus:ring-0 mb-10 bg-transparent resize-none overflow-x-auto whitespace-nowrap md:whitespace-pre-wrap md:overflow-hidden custom-scrollbar-hide"
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
                className="w-full text-xl font-serif text-gray-700 placeholder:text-gray-300 border-none outline-none focus:ring-0 mb-12 resize-none bg-transparent overflow-x-auto whitespace-nowrap md:whitespace-pre-wrap md:overflow-hidden custom-scrollbar-hide"
              />
            
            {selectedFigure && (
              <div 
                className="fixed z-[200] bg-[#1a1b26] text-white rounded-xl shadow-xl flex items-center px-6 py-3 gap-6"
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
                className="w-full min-h-[400px] text-lg text-gray-800 p-2 md:p-8 focus:ring-0 outline-none bg-transparent transition-colors break-words break-all whitespace-pre-wrap [&_a]:text-[#e3120b] [&_a]:underline [&_a]:font-bold [&_a]:transition-all [&_a:hover]:text-[#ff3333] [&_a:hover]:[text-shadow:0_0_8px_rgba(227,18,11,0.5)] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e3120b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 [&_blockquote]:bg-gray-50 [&_blockquote]:py-3 [&_blockquote]:pr-4 [&_blockquote]:flow-root [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:font-[inherit] [&_pre]:text-[inherit] [&_pre]:whitespace-pre-wrap [&_pre]:flow-root prose-editor"
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
        <div ref={sidebarRef} className={`w-full bg-white flex flex-col mt-8 md:mt-0 border-t md:border-t-0 md:border border-gray-200 md:rounded-xl md:shadow-sm md:fixed md:w-[360px] md:z-[120] md:overflow-y-auto ${!isSidebarVisible ? 'md:hidden' : ''}`}>
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <svg className="text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2-2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <h3 className="font-bold text-sm uppercase tracking-widest text-[#131a26]">Article Settings</h3>
          </div>

          <div className="p-6 flex-1">
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
                  <div className="relative z-50" ref={dropdownRef}>
                    <button 
                      type="button"
                      onClick={() => setIsWorldModalOpen(!isWorldModalOpen)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-[#1a65d6] bg-white text-sm flex justify-between items-center"
                    >
                      <span className="truncate text-gray-800">
                        {WORLD_COUNTRIES.includes(mainCategory) ? "World" : (mainCategory || "Select Category")}
                      </span>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform ${isWorldModalOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    
                    {isWorldModalOpen && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-xl rounded z-[100] py-1 overflow-visible">
                        
                        {/* World with cascading sub-menu at the TOP */}
                        <div className="relative group">
                          <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWorldSubMenuOpen(!isWorldSubMenuOpen); }} className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-[#1a65d6] transition-colors flex justify-start items-center gap-2 bg-blue-50/50 font-bold border-b border-gray-100">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            <span>World</span>
                          </button>
                          
                          {/* Sub-menu positioned to the left side */}
                          {isWorldSubMenuOpen && (<div className="absolute top-0 left-[10%] w-[90%] bg-white border border-gray-200 shadow-2xl rounded py-1 z-[110]">
                            {WORLD_COUNTRIES.map(country => (
                              <button
                                key={country}
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setMainCategory(country); setIsWorldModalOpen(false); setIsWorldSubMenuOpen(false); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-[#1a65d6] transition-colors"
                              >
                                {country}
                              </button>
                            ))}
                          </div>
                        )}
                        </div>

                        <div className="max-h-[220px] overflow-y-auto">
                          {MAIN_DROPDOWN.filter(c => c !== "World").map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => { setMainCategory(cat); setIsWorldModalOpen(false); }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-[#1a65d6] transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {WORLD_COUNTRIES.includes(mainCategory) && (
                    <div className="mt-2 text-[12px] text-[#3b4b9b] font-medium bg-blue-50 px-3 py-2 rounded border border-[#3b4b9b]/30 flex justify-between items-center relative">
                      <span>Selected Region: <b>{mainCategory}</b></span>
                      <button 
                        type="button" 
                        onClick={() => setIsWorldModalOpen(!isWorldModalOpen)} 
                        className="text-[11px] hover:underline uppercase tracking-wider font-bold"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>

                {/* Sub-categories */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Select Sub-categories (Optional, Max 5)</label>
                  <div className="border border-gray-300 rounded overflow-hidden">
                    <div className="max-h-[220px] overflow-y-auto p-3 bg-white">
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                        {SUB_CATS_LIST.filter(cat => cat !== mainCategory).map(cat => (
                          <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                            <input 
                              type="checkbox" 
                              checked={selectedSubCats.includes(cat)}
                              onChange={() => toggleSubCat(cat)}
                              disabled={!selectedSubCats.includes(cat) && selectedSubCats.length >= 5}
                              className="w-4 h-4 text-[#1a65d6] border-gray-300 rounded focus:ring-0 cursor-pointer disabled:opacity-50" 
                            />
                            <span className={`text-sm truncate ${selectedSubCats.includes(cat) ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>{cat}</span>
                          </label>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <span className="block text-[12px] font-bold text-gray-800 mb-2">World</span>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                          {WORLD_COUNTRIES.filter(cat => cat !== mainCategory).map(cat => (
                            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                checked={selectedSubCats.includes(cat)}
                                onChange={() => toggleSubCat(cat)}
                                disabled={!selectedSubCats.includes(cat) && selectedSubCats.length >= 5}
                                className="w-4 h-4 text-[#1a65d6] border-gray-300 rounded focus:ring-0 cursor-pointer disabled:opacity-50" 
                              />
                              <span className={`text-sm truncate ${selectedSubCats.includes(cat) ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900"}`}>{cat}</span>
                            </label>
                          ))}
                        </div>
                      </div>
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

                {/* Homepage Placement */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Homepage Placement</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsPlacementDropdownOpen(!isPlacementDropdownOpen)}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] bg-white flex justify-between items-center text-left"
                    >
                      <span className="truncate pr-4">{placement || 'None(Category & Search Only)'}</span>
                      <svg className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none transition-transform ${isPlacementDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {isPlacementDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-[190]" onClick={() => setIsPlacementDropdownOpen(false)}></div>
                        <div className="absolute left-0 w-full bg-white border border-gray-200 shadow-xl rounded-md z-[200] py-1 bottom-full mb-1 max-h-[250px] overflow-y-auto">
                          {[
                            "None(Category & Search Only)",
                            "Home Page A + Section",
                            "Latest News Section",
                            "More News Section",
                            "Top Highlight Section",
                            "Trending Stories Section",
                            "Data That Tells Stories Section"
                          ].map((option) => (
                            <div
                              key={option}
                              onClick={() => { setPlacement(option); setIsPlacementDropdownOpen(false); }}
                              className={`px-3 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${placement === option ? 'text-[#1a65d6] font-bold bg-blue-50/50' : 'text-gray-700'}`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
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
                    onChange={(e) => { setCardSummary(e.target.value); setEditedCardSummary(true); }}
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
                    onChange={(e) => { setFocusKeyword(e.target.value); setEditedFocusKeyword(true); }}
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
                    onChange={(e) => { setMetaDescription(e.target.value); setEditedMetaDescription(true); }}
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
      
      </div>
      </div>
      {isPreviewMode && (
        <div className="min-h-screen flex flex-col bg-white  pb-16">
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
              
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="w-full lg:col-span-9 flex flex-col">
                <div className="w-full mb-6">
                  <p className="text-[13px] font-sans font-bold mb-3">
                    {(() => {
                      let previewCategory = mainCategory || 'Uncategorized';
                      let subCat = selectedSubCats && selectedSubCats.length > 0 ? selectedSubCats[0] : '';
                      
                      if (mainCategory === 'World' && WORLD_COUNTRIES.includes(subCat)) {
                        previewCategory = `World | ${subCat}`;
                      } else if (WORLD_COUNTRIES.includes(mainCategory)) {
                        previewCategory = `World | ${mainCategory}`;
                      } else if (mainCategory === 'World') {
                        previewCategory = `World | ${subCat || 'News'}`;
                      } else if (subCat) {
                        previewCategory = `${mainCategory} | ${subCat}`;
                      }
                      
                      return (
                        <span className="flex items-center uppercase tracking-wider">
                          <span className="text-[#E3120B]">{previewCategory.includes('|') ? previewCategory.split('|')[0].trim() : previewCategory}</span>
                          {previewCategory.includes('|') && (
                            <>
                              <span className="text-[#0f0f0f] mx-1.5 font-normal">|</span>
                              <span className="text-[#0f0f0f]">{previewCategory.split('|')[1].trim()}</span>
                            </>
                          )}
                        </span>
                      );
                    })()}
                  </p>
                  <h1 className="text-[34px] md:text-[40px] lg:text-[44px] font-serif font-bold leading-[1.1] text-[#0f0f0f] mb-4 tracking-tight">
                    {title || 'Article Headline'}
                  </h1>
                  {subtitle && (
                    <h2 className="text-[20px] md:text-[24px] font-serif text-[#3b3b3b] mb-6 leading-snug">
                      {subtitle}
                    </h2>
                  )}

                  <AuthorProfile 
                    authorName={authorName} 
                    authorEmail={authorEmail} 
                    authorPhoto={authorPhoto}
                    publishDate={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + " AT " + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}
                    readTime={`${readDuration || '5'} min read`}
                    disableLinks={true}
                  />
                </div>

                {imageUrl && (
                  <div className="w-full mb-8">
                    <img src={imageUrl} alt="Article Image" className="w-full h-auto object-cover max-h-[400px] md:max-h-[600px]" />
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
                  className="article-content prose prose-lg max-w-none flow-root text-[18px] md:text-[20px] font-serif leading-[1.6] text-[#0f0f0f] pt-4 preview-content break-words break-all [&_a]:text-[#e3120b] [&_a]:underline [&_a]:font-bold [&_a]:transition-all [&_a:hover]:text-[#ff3333] [&_a:hover]:[text-shadow:0_0_8px_rgba(227,18,11,0.5)] [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#e3120b] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 [&_blockquote]:bg-gray-50 [&_blockquote]:py-3 [&_blockquote]:pr-4 [&_blockquote]:flow-root [&_pre]:bg-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:my-4 [&_pre]:font-[inherit] [&_pre]:text-[inherit] [&_pre]:whitespace-pre-wrap [&_pre]:flow-root"
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

              {/* Sidebar Placeholders (Ads) */}
              <div className="w-full lg:col-span-3 flex flex-col pt-1">
                {/* Ad 1 */}
                <div className="flex flex-col items-center w-full">
                  <span className="text-[10px] text-[#999] uppercase tracking-widest mb-1 font-sans">Advertisement</span>
                  <div className="w-full max-w-[300px] h-[600px] bg-gray-50 border border-gray-200 flex flex-col items-center justify-center">
                    <span className="text-gray-400 font-sans text-[15px] font-bold">300 x 600</span>
                  </div>
                </div>

                {/* Ad 2 */}
                <div className="flex flex-col items-center w-full mt-4">
                  <span className="text-[10px] text-[#999] uppercase tracking-widest mb-1 font-sans">Advertisement</span>
                  <div className="w-full max-w-[300px] h-[600px] bg-gray-50 border border-gray-200 flex flex-col items-center justify-center">
                    <span className="text-gray-400 font-sans text-[15px] font-bold">300 x 600</span>
                  </div>
                </div>
              </div>
            </div>

          {/* More from Category Mockup */}
          <div className="w-full mt-16 pt-8 border-t-[1px] border-black opacity-60">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-[20px] font-sans flex items-center">
                More from {mainCategory} 
                <span className="ml-1 text-xl">&rarr;</span>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-16">
              
              {/* Column 1: Article 1 */}
              <div className="md:col-span-5 flex flex-col">
                <div className="w-full aspect-[1.5] bg-gray-200 mb-4"></div>
                <div className="w-full h-6 bg-gray-200 mb-2"></div>
                <div className="w-2/3 h-6 bg-gray-200 mb-3"></div>
                <div className="w-full h-4 bg-gray-100 mb-1"></div>
                <div className="w-4/5 h-4 bg-gray-100 mb-3"></div>
                <div className="w-1/4 h-3 bg-gray-200"></div>
              </div>

              {/* Column 2: Article 2 & 3 */}
              <div className="md:col-span-4 flex flex-col gap-6">
                {[1,2].map(i => (
                  <div key={i} className={`flex flex-row gap-4 items-start pb-6 ${i === 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex-1 flex flex-col">
                      <div className="w-full h-5 bg-gray-200 mb-2"></div>
                      <div className="w-3/4 h-5 bg-gray-200 mb-3"></div>
                      <div className="w-full h-3 bg-gray-100 mb-1"></div>
                      <div className="w-5/6 h-3 bg-gray-100 mb-3"></div>
                      <div className="w-1/3 h-3 bg-gray-200"></div>
                    </div>
                    <div className="w-[130px] aspect-[1.5] bg-gray-200 flex-shrink-0"></div>
                  </div>
                ))}
              </div>

              {/* Column 3: Article 4, 5 & 6 */}
              <div className="md:col-span-3 flex flex-col gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className={`flex flex-row gap-4 items-start pb-6 ${i !== 3 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex-1 flex flex-col">
                      <div className="w-full h-4 bg-gray-200 mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-200 mb-3"></div>
                      <div className="w-1/3 h-3 bg-gray-200"></div>
                    </div>
                    <div className="w-[80px] aspect-[1.5] bg-gray-200 flex-shrink-0"></div>
                  </div>
                ))}
              </div>

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
              <button onClick={closeImageModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              
                            {/* Paste Image URL */}
              <div className="mb-4">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Paste Image URL</label>
                <input 
                  type="text" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..." 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1a65d6] transition-colors"
                />
              </div>

              <div className="flex items-center gap-4 my-4">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">OR UPLOAD FILE</span>
                <div className="h-px bg-gray-200 flex-1"></div>
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
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <span className="text-sm font-mono text-gray-700 flex items-center gap-2">
                    {isUploadingCloud ? (
                      <><svg className="animate-spin h-4 w-4 text-gray-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading...</>
                    ) : (
                      imageFile ? imageFile.name : (imageUrl ? "current_image.jpg" : "Choose File No file chosen")
                    )}
                  </span>
                </div>
                {uploadedCloudSuccessMsg && (
                  <div className="mt-2 text-[10px] font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                    {uploadedCloudSuccessMsg}
                  </div>
                )}
              </div>

              {/* Keywords */}
              <div className="mb-5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Image Keyword (Max 4)</label>
                <div className="w-full border border-gray-300 rounded px-2 py-1.5 flex flex-wrap gap-2 items-center focus-within:border-[#1a65d6] transition-colors bg-white">
                  {imageKeywords.map(kw => (
                    <span key={kw} onClick={() => removeImageKeyword(kw)} className="bg-[#f0f5ff] text-[#1a65d6] text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded cursor-pointer flex items-center gap-1 hover:bg-orange-100 transition-colors">
                      {kw}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    value={imageKeywordInput}
                    onChange={(e) => setImageKeywordInput(e.target.value)}
                    onKeyDown={handleImageKeywordKeyDown}
                    placeholder={imageKeywords.length === 0 ? "e.g. politics, space..." : ""} 
                    className="flex-1 min-w-[120px] text-sm text-gray-800 focus:outline-none bg-transparent py-1 px-1"
                    disabled={imageKeywords.length >= 4}
                  />
                </div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed mt-1">Press enter, space, or comma to add • Click tag to remove</p>
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
                onClick={closeImageModal}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] uppercase tracking-widest px-6 py-2.5 rounded transition-colors"
              >
                Cancel
              </button>
              <button disabled={isInsertingImage} onClick={handleInsertImage} className="bg-[#e3120b] hover:bg-[#b80f09] text-white font-bold text-[11px] uppercase tracking-widest px-8 py-2.5 rounded transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {isInsertingImage ? "INSERTING..." : (isEditingImage ? "Update Image" : "Insert Image")}
                </button>
            </div>
          </div>
        </div>
      )}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">
          <div className="bg-white p-6 max-w-md w-full mx-4 shadow-xl border-t-4 border-[#e3120b]">
            <h2 className="text-xl font-bold mb-2 font-serif uppercase tracking-widest text-[#e3120b]">Reject Post</h2>
            <p className="text-gray-600 mb-4 text-[13px]">Please provide a reason for rejecting this post (optional).</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full h-32 border border-gray-300 p-3 mb-5 focus:outline-none focus:border-[#e3120b] focus:ring-1 focus:ring-[#e3120b] text-[15px] resize-none"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsRejectModalOpen(false)} className="px-5 py-2 text-gray-700 font-bold border border-gray-300 hover:bg-gray-50 uppercase tracking-wider text-[13px] transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsRejectModalOpen(false);
                  handleUpdateStatus("rejected", rejectReason);
                }} 
                className="px-5 py-2 bg-[#e3120b] text-white font-bold hover:bg-red-800 uppercase tracking-wider text-[13px] transition-colors"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}



        </>

  );
}
