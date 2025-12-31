// Pill component for metadata display
const Pill = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-[#ceceea] border-solid box-border flex gap-[10px] items-center justify-center px-[10px] py-[2px] rounded-[8px] text-[18px] whitespace-nowrap">
    <span className="text-[#8085a0] font-jakarta font-medium leading-[24px]">
      {label}
    </span>
    <span className="text-[#3d4466] font-jakarta font-medium leading-[24px]">
      {value}
    </span>
  </div>
);

export default function TypographyPage() {
  return (
    <div className="bg-white relative min-h-screen w-full">
      {/* Design System Header */}
      <div className="bg-white box-border flex flex-col gap-[10px] items-start justify-center px-[88px] py-[32px] w-full">
        <div className="bg-white border border-[rgba(0,0,0,0.2)] border-solid box-border flex gap-[10px] items-center justify-center px-[14px] py-[10px] relative">
          <p className="font-mono font-normal leading-[20px] text-[14px] text-black whitespace-nowrap tracking-[-0.084px] uppercase">
            typography
          </p>
          {/* Corner borders */}
          <div className="absolute border-[1px_0px_0px_1px] border-black border-solid left-0 size-px top-0" />
          <div className="absolute border-[0px_0px_1px_1px] border-black border-solid bottom-0 left-0 size-px" />
          <div className="absolute border-[0px_1px_1px_0px] border-black border-solid bottom-0 right-0 size-px" />
          <div className="absolute border-[1px_1px_0px_0px] border-black border-solid right-0 size-px top-0" />
        </div>
      </div>

      {/* Typeface Section with Vertical Divider */}
      <div className="flex items-start w-full mt-[48px]">
        {/* Typeface Grid */}
        <div className="flex-1 box-border flex flex-col gap-[32px] px-[88px] py-[120px]">
          <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[18px] w-full">
            Typeface
          </p>

          <div className="flex gap-[32px] items-start w-full">
            {/* Inter Display - Semibold */}
            <div className="flex-1 flex flex-col gap-[32px] items-start">
              <p className="font-display font-semibold leading-none text-[#090c1d] text-[40px] text-center whitespace-nowrap tracking-[-0.4px]">
                Inter Display
              </p>
              <p className="font-display font-normal leading-[24px] text-[18px] text-[#71717b] w-full">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                <br />
                {`0123456789 !@#$%^&*()`}
              </p>
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="bg-white flex gap-[16px] items-center w-full rounded-[12px]">
                  <p className="font-lexend-deca font-medium leading-[72px] text-[#101828] text-[60px] tracking-[-1.2px] w-[80px]">
                    Aa
                  </p>
                  <div className="flex-1 flex flex-col gap-[2px] items-start">
                    <p className="font-jakarta font-semibold leading-[30px] text-[#101828] text-[20px] tracking-[-0.25px] w-full">
                      Semibold
                    </p>
                    <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[16px] w-full">
                      Font weight: 600
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inter Display - Medium */}
            <div className="flex-1 flex flex-col gap-[32px] items-start">
              <p className="font-display font-medium leading-none text-[#090c1d] text-[40px] text-center whitespace-nowrap tracking-[-0.4px]">
                Inter Display
              </p>
              <p className="font-display font-normal leading-[24px] text-[18px] text-[#71717b] w-full">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                <br />
                {`0123456789 !@#$%^&*()`}
              </p>
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="bg-white flex gap-[16px] items-center w-full rounded-[12px]">
                  <p className="font-lexend-deca font-bold leading-[72px] text-[#101828] text-[60px] tracking-[-1.2px] w-[80px]">
                    Aa
                  </p>
                  <div className="flex-1 flex flex-col gap-[2px] items-start">
                    <p className="font-jakarta font-semibold leading-[30px] text-[#101828] text-[20px] tracking-[-0.25px] w-full">
                      Medium
                    </p>
                    <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[16px] w-full">
                      Font weight: 500
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inter - Medium */}
            <div className="flex-1 flex flex-col gap-[32px] items-start">
              <p className="font-inter font-medium leading-none text-[#090c1d] text-[40px] text-center whitespace-nowrap tracking-[-0.8px]">
                Inter
              </p>
              <p className="font-inter font-medium leading-[24px] text-[18px] text-[#71717b] w-full">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                <br />
                {`0123456789 !@#$%^&*()`}
              </p>
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="bg-white flex gap-[16px] items-center w-full rounded-[12px]">
                  <p className="font-lexend-deca font-normal leading-[72px] text-[#101828] text-[60px] tracking-[-1.2px] w-[80px]">
                    Aa
                  </p>
                  <div className="flex-1 flex flex-col gap-[2px] items-start">
                    <p className="font-jakarta font-semibold leading-[30px] text-[#101828] text-[20px] tracking-[-0.25px] w-full">
                      Medium
                    </p>
                    <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[16px] w-full">
                      Font weight: 500
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inter - Regular */}
            <div className="flex-1 flex flex-col gap-[32px] items-start">
              <p className="font-inter font-normal leading-none text-[#090c1d] text-[40px] text-center whitespace-nowrap tracking-[-0.8px]">
                Inter
              </p>
              <p className="font-inter font-normal leading-[24px] text-[18px] text-[#71717b] w-full">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
                <br />
                {`0123456789 !@#$%^&*()`}
              </p>
              <div className="flex flex-col gap-[24px] items-start w-full">
                <div className="bg-white flex gap-[16px] items-center w-full rounded-[12px]">
                  <p className="font-lexend-deca font-normal leading-[72px] text-[#101828] text-[60px] tracking-[-1.2px] w-[80px]">
                    Aa
                  </p>
                  <div className="flex-1 flex flex-col gap-[2px] items-start">
                    <p className="font-jakarta font-semibold leading-[30px] text-[#101828] text-[20px] tracking-[-0.25px] w-full">
                      Regular
                    </p>
                    <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[16px] w-full">
                      Font weight: 400
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="box-border flex flex-col gap-[128px] items-start pb-[96px] pt-[64px] px-[88px] w-full">
        {/* Title Section */}
        <div className="flex gap-[128px] items-start w-full">
          <div className="flex-1 flex flex-col gap-[32px] items-start">
            <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[18px] whitespace-nowrap">
              Title
            </p>

            <div className="flex flex-col gap-[32px] items-start w-full">
              {/* Title 1 */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <p className="font-display font-medium leading-[64px] text-[#090c1d] text-[56px] tracking-[-0.4px] w-full">
                  This is a Title1
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Medium" />
                  <Pill label="LINE HEIGHT:" value="50/58" />
                  <Pill label="LETTER SPACING:" value="-0.4px" />
                </div>
              </div>

              {/* Title 2 */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <p className="font-display font-medium leading-[56px] text-[#090c1d] text-[48px] tracking-[-0.4px] w-full">
                  This is a Title2
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Medium" />
                  <Pill label="LINE HEIGHT:" value="42/48" />
                  <Pill label="LETTER SPACING:" value="-0.4px" />
                </div>
              </div>

              {/* Title 3 */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <p className="font-display font-medium leading-[48px] text-[#090c1d] text-[40px] tracking-[-0.4px] w-full">
                  This is a Title3
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Medium" />
                  <Pill label="LINE HEIGHT:" value="34/40" />
                  <Pill label="LETTER SPACING:" value="-0.4px" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heading Section */}
        <div className="flex gap-[128px] items-start w-full">
          <div className="flex-1 flex flex-col gap-[32px] items-start">
            <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[18px] whitespace-nowrap">
              Heading
            </p>

            <div className="flex flex-col gap-[32px] items-start w-full">
              {/* Heading h1 */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <p className="font-display font-semibold leading-[32px] text-[#090c1d] text-[28px] tracking-[0px] w-full">
                  This is a Heading h1
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Semibold" />
                  <Pill label="LINE HEIGHT:" value="28/32" />
                  <Pill label="LETTER SPACING:" value="0px" />
                </div>
              </div>

              {/* Heading h2 */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <p className="font-display font-semibold leading-[30px] text-[#090c1d] text-[24px] tracking-[0px] w-full">
                  This is a Heading h2
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Semibold" />
                  <Pill label="LINE HEIGHT:" value="24/30" />
                  <Pill label="LETTER SPACING:" value="0px" />
                </div>
              </div>

              {/* Heading h3 */}
              <div className="flex flex-col gap-[32px] items-start w-full">
                <p className="font-display font-semibold leading-[28px] text-[#090c1d] text-[20px] tracking-[0px] w-full">
                  This is a Heading h3
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Semibold" />
                  <Pill label="LINE HEIGHT:" value="20/28" />
                  <Pill label="LETTER SPACING:" value="0px" />
                </div>
              </div>

              {/* Heading h4 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-display font-semibold leading-[24px] text-[#090c1d] text-[18px] tracking-[0px] w-full">
                  This is a Heading h4
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Semibold" />
                  <Pill label="LINE HEIGHT:" value="18/24" />
                  <Pill label="LETTER SPACING:" value="0px" />
                </div>
              </div>

              {/* Heading h5 */}
              <div className="flex flex-col gap-[24px] items-start w-full">
                <p className="font-display font-semibold leading-[22px] text-[#090c1d] text-[16px] tracking-[0px] w-full">
                  This is a Heading h5
                </p>
                <div className="flex flex-wrap gap-[8px] items-start w-full">
                  <Pill label="WEIGHT:" value="Semibold" />
                  <Pill label="LINE HEIGHT:" value="16/22" />
                  <Pill label="LETTER SPACING:" value="0px" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="flex flex-col gap-[32px] items-start w-full">
          <p className="font-jakarta font-medium leading-[24px] text-[#3d4466] text-[18px] whitespace-nowrap">
            Body
          </p>

          {/* Body 1 */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex gap-[40px] items-center leading-[24px] text-[#090c1d] text-[18px] whitespace-nowrap tracking-[-0.15px] w-full">
              <p className="font-inter font-normal">Body 1</p>
              <p className="font-inter font-medium">Body 1</p>
            </div>
            <div className="flex gap-[8px] items-start">
              <Pill label="WEIGHTS:" value="Regular & Medium" />
              <Pill label="LINE HEIGHT:" value="18/24" />
              <Pill label="LETTER SPACING:" value="-0.4px" />
            </div>
          </div>

          {/* Body 2 */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex gap-[40px] items-center leading-[22px] text-[#090c1d] text-[16px] whitespace-nowrap tracking-[-0.15px] w-full">
              <p className="font-inter font-normal">Body 2</p>
              <p className="font-inter font-medium">Body 2</p>
            </div>
            <div className="flex gap-[8px] items-start">
              <Pill label="WEIGHTS:" value="Regular & Medium" />
              <Pill label="LINE HEIGHT:" value="16/22" />
              <Pill label="LETTER SPACING:" value="-0.4px" />
            </div>
          </div>

          {/* Body 3 */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex gap-[40px] items-center leading-[20px] text-[#090c1d] text-[14px] whitespace-nowrap tracking-[-0.15px] w-full">
              <p className="font-inter font-normal">Body 3</p>
              <p className="font-inter font-medium">Body 3</p>
            </div>
            <div className="flex gap-[8px] items-start">
              <Pill label="WEIGHTS:" value="Regular & Medium" />
              <Pill label="LINE HEIGHT:" value="14/20" />
              <Pill label="LETTER SPACING:" value="-0.4px" />
            </div>
          </div>

          {/* Body 4 */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex gap-[40px] items-center leading-[16px] text-[#090c1d] text-[12px] whitespace-nowrap tracking-[-0.15px] w-full">
              <p className="font-inter font-normal">Body 4</p>
              <p className="font-inter font-medium">Body 4</p>
            </div>
            <div className="flex gap-[8px] items-start">
              <Pill label="WEIGHTS:" value="Regular & Medium" />
              <Pill label="LINE HEIGHT:" value="12/16" />
              <Pill label="LETTER SPACING:" value="-0.4px" />
            </div>
          </div>

          {/* Body 5 */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex gap-[40px] items-center leading-[16px] text-[#090c1d] text-[10px] whitespace-nowrap tracking-[-0.15px] w-full">
              <p className="font-inter font-normal">Body 5</p>
              <p className="font-inter font-medium">Body 5</p>
            </div>
            <div className="flex gap-[8px] items-start">
              <Pill label="WEIGHTS:" value="Regular & Medium" />
              <Pill label="LINE HEIGHT:" value="10/16" />
              <Pill label="LETTER SPACING:" value="-0.4px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
