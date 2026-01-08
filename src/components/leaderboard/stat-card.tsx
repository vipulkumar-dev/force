import Image from "next/image";

export default function StatCard({
  title,
  value,
  percent,
}: {
  title: string;
  value: string;
  percent: string;
}) {
  return (
    <div className="flex h-[100px] w-full flex-col justify-between rounded-[10px] bg-white p-4">
      <p className="text-soft-400 text-[12px] leading-[100%] font-medium tracking-[-1%]">
        {title}
      </p>
      <div className="flex w-full flex-row items-center justify-between">
        <p className="font-nohemi text-text-primary text-[20px] leading-[100%] font-medium tracking-[-1%]">
          {value}
        </p>
        <div className="flex w-fit flex-row items-center gap-px">
          <Image
            src="/icons/leaderboard/arrow-up.svg"
            alt="arrow-up"
            width={14}
            height={14}
          />
          <p className="text-light-green text-[14px] leading-[100%] font-medium tracking-[-1%]">
            {percent}%
          </p>
        </div>
      </div>
    </div>
  );
}
