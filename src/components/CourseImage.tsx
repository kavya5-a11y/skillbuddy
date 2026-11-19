import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface CourseImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
}

export function CourseImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
}: CourseImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${aspectClass} w-full bg-gradient-to-br from-emerald-50 via-slate-100 to-emerald-100 flex flex-col items-center justify-center p-6 text-center border-b border-slate-200 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-xl bg-emerald-600/10 text-emerald-700 flex items-center justify-center mb-3">
          <BookOpen className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-slate-700 max-w-[22ch] line-clamp-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`${aspectClass} w-full overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
  );
}
