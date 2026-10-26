"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { GridPhoto } from "./PhotoGrid";

const SPRING_TRANSITION_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const cellVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 24 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

// Same default as PhotoGrid: faces in standing group shots sit above centre.
const DEFAULT_FOCUS = "center 42%";

export default function GalleryStaggerGrid({ photos }: { photos: GridPhoto[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* The entry animation ships from the server as opacity:0 on every
          figure, so without JavaScript the photographs would never appear.
          This restores them for that case. */}
      <noscript>
        <style>{`.stagger-grid figure { opacity: 1 !important; filter: none !important; transform: none !important; }`}</style>
      </noscript>
      <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
      className="stagger-grid grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2"
    >
        {photos.map((photo, index) => (
        <motion.figure
          key={photo.src}
          variants={reduceMotion ? undefined : cellVariants}
          transition={SPRING_TRANSITION_CONFIG}
          // Right-hand column drops a step, so the two columns interlock
          // instead of lining up — the stagger from the reference layout.
          className={index % 2 === 1 ? "sm:mt-12" : undefined}
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-slate-100 shadow-lg">
            <Image
              src={photo.src}
              alt={photo.alt ?? photo.caption}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              style={{ objectPosition: photo.focus ?? DEFAULT_FOCUS }}
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">
            {photo.caption}
          </figcaption>
        </motion.figure>
        ))}
      </motion.div>
    </>
  );
}
