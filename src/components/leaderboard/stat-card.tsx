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
    <div className="flex flex-col w-full h-[100px] justify-between p-4 bg-white rounded-[10px]">
      <p className="font-medium text-[12px] leading-[100%] tracking-[-1%] text-soft-400">
        {title}
      </p>
      <div className="flex flex-row w-full items-center justify-between">
        <p className="font-nohemi font-medium text-[20px] leading-[100%] tracking-[-1%] text-main">
          {value}
        </p>
        <div className="flex flex-row w-fit gap-px items-center">
          <Image
            src="/icons/leaderboard/arrow-up.svg"
            alt="arrow-up"
            width={14}
            height={14}
          />
          <p className="text-light-green font-medium text-[14px] leading-[100%] tracking-[-1%]">
            {percent}%
          </p>
        </div>
      </div>
    </div>
  );
}
