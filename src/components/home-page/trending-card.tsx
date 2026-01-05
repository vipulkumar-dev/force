import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '../ui/dialog'
import TradeDialog from '../trade/trade_dialog'
interface TrendingCardProps {
  id: string
  image?: string
  name: string
  abbreviation: string
  price: string
  change: number
  percentage?: number
}

export default function TrendingCard({
  image = '/icons/athletes/lebron-james.png',
  name,
  abbreviation,
  price,
  change,
  percentage = 80,
}: TrendingCardProps) {
  const [openTradeDialog, setOpenTradeDialog] = useState(false);
  const [tradeType, setTradeType] = useState<string>("long");
    return (
    <div className='relative items-center justify-center flex flex-col w-[170px] h-auto rounded-[14px] overflow-hidden bg-white mr-4 pt-[24px] pr-[20px] pb-[20px] pl-[20px]'>
      <div className='absolute flex flex-row items-center justify-center gap-2 top-2 right-2 bg-league-card text-soft-400 px-2 py-1 rounded-full text-xs font-medium'>
        <Image src='/icons/game/f.svg' alt='Long' width={8} height={10} />{percentage}%
      </div>
      <Image src={image} className='rounded-full object-cover object-top' alt={name} width={40} height={40} />
      <span className='text-sm font-semibold text-main truncate max-w-[100%]'>{name}</span>
      <p className='text-xs text-soft-400 font-medium'>{abbreviation}</p>
      <span className='flex flex-row items-center justify-center gap-2'>
        <p className='text-xs text-main'>{price}</p>
        <p className={`text-xs ${change >= 0 ? 'text-light-green' : 'text-neon-pink'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </p>
      </span>
      <div className='flex flex-row items-center justify-between gap-2 p-2'>
        <button onClick={() => {setOpenTradeDialog(true); setTradeType("long")}} className='bg-page-background rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/long.svg' alt='Long' width={10} height={10} /></button>
        <button onClick={() => {setOpenTradeDialog(true); setTradeType("short")}} className='bg-page-background rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/short.svg' alt='Short' width={10} height={10} /></button>
      </div>
      <Dialog open={openTradeDialog} onOpenChange={setOpenTradeDialog}>
                <DialogContent showCloseButton={false} className="p-0">
                    <TradeDialog type={tradeType} />
                </DialogContent>
            </Dialog>
    </div>
  )
}