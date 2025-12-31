"use client";

interface ArticleContentProps {
  category: string;
  title: string;
  children: React.ReactNode;
}

export default function ArticleContent({
  category,
  title,
  children,
}: ArticleContentProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Category and Title */}
      <div className="flex flex-col gap-[16px] md:gap-[22px]">
        <span className="text-[11px] md:text-[13px] leading-[11px] md:leading-[13px] tracking-[0.66px] md:tracking-[0.78px] font-semibold text-black/20 uppercase font-inter">
          {category}
        </span>
        <h1 className="text-[24px] md:text-[32px] tracking-[0.48px] md:tracking-[0.64px] leading-[24px] md:leading-[32px] font-normal font-nohemi text-main">
          {title}
        </h1>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 md:gap-8">{children}</div>
    </div>
  );
}

interface ArticleSectionProps {
  title?: string;
  children: React.ReactNode;
}

export function ArticleSection({ title, children }: ArticleSectionProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {title && (
        <h2 className="text-[18px] md:text-[20px] leading-[18px] md:leading-5 font-normal font-nohemi tracking-[0.36px] md:tracking-[0.4px] text-main">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-3 md:gap-4">{children}</div>
    </div>
  );
}

interface ArticleParagraphProps {
  children: React.ReactNode;
}

export function ArticleParagraph({ children }: ArticleParagraphProps) {
  return (
    <p className="text-[15px] leading-[150%] font-inter text-soft-400 tracking-[-0.15px]">
      {children}
    </p>
  );
}

interface ArticleExampleProps {
  children: React.ReactNode;
}

export function ArticleExample({ children }: ArticleExampleProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[15px] leading-[150%] font-inter text-soft-400 tracking-[-0.15px]">
        Example:
      </span>
      <p className="text-[15px] leading-[150%] font-inter text-soft-400 tracking-[-0.15px]">
        {children}
      </p>
    </div>
  );
}
