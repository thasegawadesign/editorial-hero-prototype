"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type Asset = {
  main: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  sub: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};
const assets: Asset[] = [
  {
    main: {
      src: "/hero-01-main.avif",
      alt: "main",
      width: 1440,
      height: 720,
    },
    sub: {
      src: "/hero-01-sub.avif",
      alt: "sub",
      width: 460,
      height: 260,
    },
  },
  {
    main: {
      src: "/hero-02-main.avif",
      alt: "main",
      width: 1440,
      height: 720,
    },
    sub: {
      src: "/hero-02-sub.avif",
      alt: "sub",
      width: 460,
      height: 260,
    },
  },
];

export default function Hero() {
  // z-index の積み順を循環させるための「前後関係」(背面 -> 手前) を保持する
  const [order, setOrder] = useState<number[]>(() => assets.map((_, i) => i));
  const frontAssetIndex = order[order.length - 1] ?? 0;
  const [isPlaying, setIsPlaying] = useState(false);

  const zIndexByAssetIndex = new Map<number, number>();
  order.forEach((assetIndex, position) => {
    zIndexByAssetIndex.set(assetIndex, position + 1);
  });

  useEffect(() => {
    const intervalMs = 6000; // 6秒ごとに循環
    const initialDelayMs = 3000; // 最初だけ +3秒待つ
    if (order.length <= 1) return;

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      setIsPlaying(true);
      // 最初の切り替えを initialDelayMs 後に1回だけ先行させる
      setOrder((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
      intervalId = window.setInterval(() => {
        setOrder((prev) => {
          if (prev.length <= 1) return prev;
          const [first, ...rest] = prev;
          return [...rest, first];
        });
      }, intervalMs);
    }, initialDelayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [order.length]);

  return (
    <>
      <div
        className={cn("relative flex h-screen w-full flex-col overflow-hidden")}
      >
        <h1
          className={cn(
            "relative top-[4vw] z-20 mx-auto h-fit w-[94vw] lg:top-[1vw] lg:w-[98vw]",
          )}
        >
          <Image
            src="/ARCHETYPE.svg"
            alt="ARCHETYPE"
            width={1440}
            height={720}
            priority
            className={cn(
              "pointer-events-none h-fit w-full object-contain select-none",
            )}
          />
        </h1>
        <p
          className={cn(
            "relative z-20 mx-auto mt-auto mb-[54vw] h-fit w-[92vw] text-[clamp(1.4rem,8px+4vw,6rem)] font-light tracking-tight text-white lg:mb-[clamp(4rem,14vh,10rem)] lg:ml-[1vw] lg:w-[34vw] lg:text-[clamp(1.4rem,8px+1.6vw,2.8rem)] lg:leading-[1.2]",
          )}
        >
          Our architecture studio designs one-of-a-kind residences in rare
          locations across Japan and around the world.
        </p>
        {assets.map((asset, i) => {
          const zIndex = zIndexByAssetIndex.get(i) ?? 1;
          const isFront = i === frontAssetIndex;
          return (
            <div
              key={i}
              style={{ zIndex }}
              className="absolute inset-0 h-[92vh] overflow-hidden lg:h-[88vh]"
            >
              <Image
                key={i}
                src={asset.main.src}
                alt={asset.main.alt}
                width={asset.main.width}
                height={asset.main.height}
                priority={i === 0}
                className={cn(
                  "pointer-events-none h-full w-full scale-110 object-cover select-none",
                  isFront && isPlaying && "hero-curtain-reveal-main",
                )}
              />
            </div>
          );
        })}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 h-[92vh] w-full bg-black/30 select-none lg:h-[88vh]",
          )}
        />
        {assets.map((asset, i) => {
          const zIndex = (zIndexByAssetIndex.get(i) ?? 1) + 20;
          const isFront = i === frontAssetIndex;
          return (
            <div
              key={i}
              style={{ zIndex }}
              className="absolute right-0 bottom-0 left-0 z-20 mx-auto h-fit w-11/12 overflow-hidden lg:mr-[9vw] lg:w-4/12"
            >
              <Image
                src={asset.sub.src}
                alt={asset.sub.alt}
                width={asset.sub.width}
                height={asset.sub.height}
                className={cn(
                  "pointer-events-none h-full w-full scale-110 object-cover select-none",
                  isFront && isPlaying && "hero-curtain-reveal-sub",
                )}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
