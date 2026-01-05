import React from 'react'
import Image from 'next/image'
interface GameCardProps {
  image?: string
  team1: {
    score: number
    icon: string
    name: string
    price: string
    change: number
  }
  team2: {
    score: number
    icon: string
    name: string
    price: string
    change: number
  }
  status: string
  volume: string
}

export default function GameCard({
  image = '/images/moments/basketball-moment.png',
  team1,
  team2,
  status,
  volume,
}: GameCardProps) {
  return (
    <div className='relative w-[356px] h-auto rounded-lg overflow-hidden bg-white mr-4'>
      <div className='relative'>
        <Image src={image} className='w-full h-auto' alt='NBA Game' width={356} height={200} />
        <div className='absolute flex flex-row items-center justify-center gap-2 top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-lg text-xs'>
          <div className='w-2 h-2 bg-green-500 rounded-full'></div>
          Live
        </div>
      </div>
      <div className='flex flex-row items-center justify-between gap-2 px-4 py-2'>
        <p className='text-md font-bold text-main'>{team1.score}</p>
        <div className='flex flex-row items-center justify-start gap-2'>
          <Image src={team1.icon} alt={team1.name} width={20} height={20} />
          <p className='text-xs font-bold text-muted-foreground'>{team1.name}</p>
        </div>
        <span className='flex flex-row items-center font-medium gap-2 text-xs'>
          {team1.price} <p className={team1.change >= 0 ? 'text-light-green' : 'text-neon-pink'}>{team1.change >= 0 ? '+' : ''}{team1.change}%</p>
        </span>
        <div className='flex flex-row items-center justify-end gap-2'>
          <button className='bg-page-background rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/long.svg' alt='Long' width={10} height={10} /></button>
          <button className='bg-page-background rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/short.svg' alt='Short' width={10} height={10} /></button>
        </div>
      </div>
      <div className='flex flex-row items-center justify-between gap-2 px-4'>
        <p className='text-md font-bold text-main'>{team2.score}</p>
        <div className='flex flex-row items-center justify-start gap-1'>
          <Image src={team2.icon} alt={team2.name} width={20} height={20} />
          <p className='text-xs font-bold text-muted-foreground'>{team2.name}</p>
        </div>
        <span className='flex flex-row items-center font-medium gap-2 text-xs'>
          {team2.price} <p className={team2.change >= 0 ? 'text-light-green' : 'text-neon-pink'}>{team2.change >= 0 ? '+' : ''}{team2.change}%</p>
        </span>
        <div className='flex flex-row items-center justify-end gap-2'>
          <button className='bg-page-background rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/long.svg' alt='Long' width={10} height={10} /></button>
          <button className='bg-page-background rounded-lg hover:cursor-pointer p-3'><Image src='/icons/game/short.svg' alt='Short' width={10} height={10} /></button>
        </div>
      </div>

      <div className='flex flex-row items-center justify-between gap-2 px-4 pt-2 pb-4'>
        <h6 className='text-xs font-500 text-muted-foreground'>{status}</h6>
        <h6 className='text-xs font-500 text-muted-foreground'>{volume}</h6>
      </div>
    </div>
  )
}