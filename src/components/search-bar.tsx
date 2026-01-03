"use client";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ teamImageUrl, name }: { teamImageUrl: string, name: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button variant="outline" className="text-[12px] sm:text-[14px] h-[32px] sm:h-[36px] px-[12px] sm:px-[16px]">
        <Image src={teamImageUrl} alt="Team" width={16} height={16} className="sm:w-5 sm:h-5 mr-1" />
        {name}
        <ChevronDown className="w-4 h-4 ml-1" />
      </Button>
    </DialogTrigger>
    <DialogContent className="w-[90vw] max-w-[500px]">
    </DialogContent>
  </Dialog>
    </>
  );
}