import Image from "next/image";

export default function MissedMomentsRow({
  eventSrc,
  eventAlt,
  title,
  description,
  volume,
  percentage,
  timeAgo,
}: {
  eventSrc: string;
  eventAlt: string;
  title: string;
  description: string;
  volume: string;
  percentage: string;
  timeAgo: string;
}) {
  return (
    <div className="flex flex-row border-b border-light-gray p-5 gap-5 h-fit shrink-0">
      <Image
        src={eventSrc}
        alt={eventAlt}
        width={100}
        height={65}
        className="min-h-[65px] rounded-lg object-cover object-center"
      />
      <div className="flex flex-col gap-2.5 min-w-0">
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-[14px] leading-[140%] tracking-[-2%] text-main truncate max-w-[220px] sm:max-w-[443px]">
            {title}
          </p>
          <p className="text-[12px] leading-[140%] tracking-[-1%] text-soft-400 truncate whitespace-nowrap overflow-hidden max-w-[220px] sm:max-w-[443px]">
            {description}
          </p>
        </div>
        <div className="flex flex-row gap-2.5 items-center min-w-0">
          <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-main truncate max-w-[120px] sm:max-w-[180px]">
            {volume}
          </p>
          <p className="text-soft-400 text-[12px] font-medium">•</p>
          <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-main truncate max-w-[120px] sm:max-w-[180px]">
            {percentage}
          </p>
        </div>
      </div>
      <div className="flex flex-row">
        <p className="text-[11px] leading-[100%] tracking-[-1%] text-soft-400 text-nowrap truncate max-w-[80px]">
          {timeAgo}
        </p>
      </div>
    </div>
  );
}
