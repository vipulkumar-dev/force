"use client";

interface RelatedTopic {
  id: string;
  title: string;
  category: string;
  svgUrl: string;
}

const relatedTopicsData: RelatedTopic[] = [
  {
    id: "how-prices-move",
    title: "How Index Prices Move",
    category: "PERFORMANCE INDEXES",
    svgUrl: "/images/learn/how-index-moves.svg",
  },
  {
    id: "long-vs-short",
    title: "Long vs. Short Positions",
    category: "TRADING MECHANICS",
    svgUrl: "/images/learn/long-vs-short.svg",
  },
];

interface RelatedTopicsProps {
  topics?: RelatedTopic[];
  onTopicClick?: (topicId: string) => void;
}

export default function RelatedTopics({
  topics = relatedTopicsData,
  onTopicClick,
}: RelatedTopicsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-[16px] leading-5 font-medium font-nohemi tracking-[0.4px] text-main">
        Related Topics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {topics.map((topic) => {
          return (
            <button
              key={topic.id}
              onClick={() => onTopicClick?.(topic.id)}
              className="bg-white rounded-[10px] border border-black/7 hover:border-base-purple hover:shadow-sm transition-all text-left overflow-hidden flex flex-col p-1"
            >
              {/* Content area */}
              <div
                className="h-[120px] md:h-[150px] rounded-[10px] w-full bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${topic.svgUrl})` }}
              />

              {/* Footer */}
              <div className="flex flex-col gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-white">
                <span className="text-[11px] leading-[11px] font-semibold font-inter text-disabled-300 uppercase tracking-[0.66px]">
                  {topic.category}
                </span>
                <span className="text-[13px] md:text-[14px] leading-[14px] font-medium font-inter text-main">
                  {topic.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
