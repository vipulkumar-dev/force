"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function SplashScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-neutral-50">
      <motion.div
        className="relative h-9 w-[167px] mix-blend-multiply"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <Image
          src="/logo.png"
          alt="Vibranium Logo"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>
      <div className="flex items-center gap-0 font-sans text-xs font-normal leading-none tracking-[-0.12px] text-[#868c98]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
        >
          Plotting Data
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 1.4,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 1.6,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 1.8,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: 2.0,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          .
        </motion.span>
      </div>
    </div>
  );
}
