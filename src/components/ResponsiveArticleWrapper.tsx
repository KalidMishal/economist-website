'use client';

import React, { useEffect, useRef } from 'react';

interface Props {
  htmlContent: string;
  className?: string;
}

export default function ResponsiveArticleWrapper({ htmlContent, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const images = containerRef.current.querySelectorAll('img');
    
    // First pass: save original styles so we don't destroy desktop layout
    images.forEach(img => {
      if (!img.hasAttribute('data-orig-style')) {
        img.setAttribute('data-orig-style', img.getAttribute('style') || '');
      }
      let parent = img.parentElement;
      while (parent && parent !== containerRef.current) {
        if (!parent.hasAttribute('data-orig-style')) {
          parent.setAttribute('data-orig-style', parent.getAttribute('style') || '');
        }
        parent = parent.parentElement;
      }
    });

    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      
      images.forEach(img => {
        let parent = img.parentElement;
        const parents = [];
        while (parent && parent !== containerRef.current) {
          parents.push(parent);
          parent = parent.parentElement;
        }

        if (isMobile) {
          // Force mobile layout
          img.style.setProperty('width', '100%', 'important');
          img.style.setProperty('max-width', '100%', 'important');
          img.style.setProperty('height', 'auto', 'important');
          img.style.setProperty('float', 'none', 'important');
          img.style.setProperty('display', 'block', 'important');
          img.style.setProperty('margin', '2rem auto', 'important');
          
          parents.forEach(p => {
            p.style.setProperty('width', '100%', 'important');
            p.style.setProperty('max-width', '100%', 'important');
            p.style.setProperty('float', 'none', 'important');
            p.style.setProperty('display', 'block', 'important');
          });
        } else {
          // Restore exact original styles for Desktop
          const origImgStyle = img.getAttribute('data-orig-style');
          if (origImgStyle !== null && origImgStyle !== img.getAttribute('style')) {
            img.setAttribute('style', origImgStyle);
          }
          parents.forEach(p => {
            const origPStyle = p.getAttribute('data-orig-style');
            if (origPStyle !== null && origPStyle !== p.getAttribute('style')) {
              p.setAttribute('style', origPStyle);
            }
          });
        }
      });
    };

    handleResize();
    // Delayed execution to ensure DOM is fully ready
    setTimeout(handleResize, 100);
    setTimeout(handleResize, 500);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [htmlContent]);

  return (
    <div 
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
      className={className}
    />
  );
}
