import Image from 'next/image';
import Link from 'next/link';

export type ArticleVariant = 'hero' | 'standard' | 'compact' | 'text-only' | 'list-item';

export interface ArticleProps {
  category: string;
  title: string;
  description?: string;
  imageUrl?: string;
  variant?: ArticleVariant;
  href?: string;
}

export default function ArticleCard({
  category,
  title,
  description,
  imageUrl,
  variant = 'standard',
  href = '#'
}: ArticleProps) {
  
  if (variant === 'hero') {
    return (
      <Link href={href} className="group block flex-1">
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] mb-4">
            <img src={imageUrl} alt={title} className="object-cover w-full h-full group-hover:opacity-90 transition-opacity" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-[var(--color-economist-red)] font-semibold text-xs uppercase tracking-wider mb-2">
            {category}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-3 group-hover:text-[var(--color-economist-gray)] transition-colors leading-tight">
            {title}
          </h2>
          {description && (
            <p className="text-[var(--color-economist-gray)] text-base md:text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === 'standard') {
    return (
      <Link href={href} className="group block flex-1 border-t border-[var(--color-economist-light)] pt-4">
        {imageUrl && (
          <div className="relative w-full aspect-[3/2] mb-3">
            <img src={imageUrl} alt={title} className="object-cover w-full h-full group-hover:opacity-90 transition-opacity" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-[var(--color-economist-red)] font-semibold text-xs uppercase tracking-wider mb-2">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-black mb-2 group-hover:text-[var(--color-economist-gray)] transition-colors leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-[var(--color-economist-gray)] text-sm md:text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex gap-4 border-t border-[var(--color-economist-light)] pt-4">
        <div className="flex-1 flex flex-col">
          <span className="text-[var(--color-economist-red)] font-semibold text-xs uppercase tracking-wider mb-1">
            {category}
          </span>
          <h3 className="text-lg font-serif font-bold text-black group-hover:text-[var(--color-economist-gray)] transition-colors leading-tight">
            {title}
          </h3>
        </div>
        {imageUrl && (
          <div className="relative w-24 h-24 shrink-0">
            <img src={imageUrl} alt={title} className="object-cover w-full h-full group-hover:opacity-90 transition-opacity" />
          </div>
        )}
      </Link>
    );
  }

  if (variant === 'list-item') {
    return (
      <Link href={href} className="group block border-t border-[var(--color-economist-light)] py-3">
        <div className="flex flex-col">
          <span className="text-[var(--color-economist-red)] font-semibold text-xs uppercase tracking-wider mb-1">
            {category}
          </span>
          <h4 className="text-base font-serif font-bold text-black group-hover:text-[var(--color-economist-gray)] transition-colors leading-tight">
            {title}
          </h4>
        </div>
      </Link>
    );
  }

  // text-only
  return (
    <Link href={href} className="group block border-t border-[var(--color-economist-light)] pt-4">
      <div className="flex flex-col">
        <span className="text-[var(--color-economist-red)] font-semibold text-xs uppercase tracking-wider mb-2">
          {category}
        </span>
        <h3 className="text-xl md:text-2xl font-serif font-bold text-black mb-2 group-hover:text-[var(--color-economist-gray)] transition-colors leading-tight">
          {title}
        </h3>
        {description && (
          <p className="text-[var(--color-economist-gray)] text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
