'use client';
import { useEffect, useRef } from 'react';

export default function ViewTracker({ id, initialViews, updatedAt }: { id: string, initialViews?: number, updatedAt?: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!id || tracked.current) return;
    
    try {
      // Retrieve previously viewed articles from localStorage
      let viewedArticles = JSON.parse(localStorage.getItem('viewed_articles') || '[]');
      const sessionUpdatedKey = 'viewed_session_updated_' + id;
      const lastViewedUpdatedAt = sessionStorage.getItem(sessionUpdatedKey);
      
      // If backend views are 0, this is a newly published or republished article.
      // We should remove it from local history to count this completely new view.
      // But we ONLY do this if the article's updatedAt is DIFFERENT from what we last processed in this session!
      // This prevents the Next.js client-side router cache from causing infinite view loops.
      if (initialViews === 0 && viewedArticles.includes(id)) {
        if (!lastViewedUpdatedAt || lastViewedUpdatedAt !== String(updatedAt)) {
          viewedArticles = viewedArticles.filter((vId: string) => vId !== id);
          localStorage.setItem('viewed_articles', JSON.stringify(viewedArticles));
        }
      }

      if (viewedArticles.includes(id)) {
        tracked.current = true; // Already viewed by this visitor
        return;
      }
      
      // If not viewed, increment the view count
      tracked.current = true;
      if (updatedAt) {
        sessionStorage.setItem(sessionUpdatedKey, String(updatedAt));
      }
      
      const apiUrl = `http://${window.location.hostname}:5000/api/posts/${id}/view`;
      
      // Add immediately to prevent Strict Mode / double-render duplicate requests
      viewedArticles.push(id);
      localStorage.setItem('viewed_articles', JSON.stringify(viewedArticles));
      
      fetch(apiUrl, { method: 'POST' }).catch(() => {});
    } catch (e) {
      // Fallback in case localStorage is restricted
      tracked.current = true;
      const fallbackUrl = `http://${window.location.hostname}:5000/api/posts/${id}/view`;
      fetch(fallbackUrl, { method: 'POST' }).catch(() => {});
    }
  }, [id, initialViews]);
  
  return null;
}
