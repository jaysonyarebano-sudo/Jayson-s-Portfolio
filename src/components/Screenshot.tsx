"use client";

import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { Shot } from "@/data/portfolio";

/** A real, redacted screenshot that opens full size in a modal dialog. */
export function Screenshot({ shot, sizes = "(min-width: 1024px) 800px, 100vw" }: { shot: Shot; sizes?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-white">
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="group relative block w-full cursor-zoom-in"
        aria-label={`Enlarge screenshot: ${shot.caption}`}
      >
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} className="h-auto w-full" />
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md bg-navy-950/75 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>
      <figcaption className="border-t border-line px-4 py-2.5 text-xs leading-relaxed text-muted">{shot.caption}</figcaption>

      <dialog
        ref={dialogRef}
        aria-label={shot.caption}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        className="m-auto max-h-[92vh] w-[min(96vw,1600px)] max-w-none overflow-auto rounded-xl bg-white p-0 backdrop:bg-navy-950/80"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-white px-4 py-2.5">
          <p className="text-sm text-muted">{shot.caption}</p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-ink hover:bg-paper-2"
            aria-label="Close"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="96vw" className="h-auto w-full" />
      </dialog>
    </figure>
  );
}
