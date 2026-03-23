'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

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
      src: '/hero-01-main.avif',
      alt: 'main',
      width: 1440,
      height: 720,
    },
    sub: {
      src: '/hero-01-sub.avif',
      alt: 'sub',
      width: 460,
      height: 260,
    },
  },
  {
    main: {
      src: '/hero-02-main.avif',
      alt: 'main',
      width: 1440,
      height: 720,
    },
    sub: {
      src: '/hero-02-sub.avif',
      alt: 'sub',
      width: 460,
      height: 260,
    },
  },
];

export default function Hero() {
  // z-index の積み順を循環させるための「前後関係」(背面 -> 手前) を保持する
  const [order, setOrder] = useState<number[]>(() => assets.map((_, i) => i));

  const zIndexByAssetIndex = useMemo(() => {
    const map = new Map<number, number>();
    order.forEach((assetIndex, position) => {
      map.set(assetIndex, position + 1);
    });
    return map;
  }, [order]);

  useEffect(() => {
    const intervalMs = 5000; // 5秒ごとに循環
    if (order.length <= 1) return;

    const id = window.setInterval(() => {
      setOrder((prev) => {
        if (prev.length <= 1) return prev;
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [order.length]);

  return (
    <>
      <div className={cn('relative w-full h-screen overflow-x-hidden')}>
        <h1
          className={cn(
            'absolute top-[4vw] inset-x-0 mx-auto w-[94vw] lg:top-[1vw] lg:w-[98vw] h-fit z-20',
          )}
        >
          <Image
            src="/ARCHETYPE.svg"
            alt="ARCHETYPE"
            width={1440}
            height={720}
            priority
            className={cn(
              'w-full h-fit object-contain select-none pointer-events-none',
            )}
          />
        </h1>
        <p
          className={cn(
            'absolute bottom-[54vw] text-white left-0 text-[clamp(1.4rem,8px+4vw,6rem)] lg:text-[clamp(1.4rem,8px+1.6vw,2.8rem)] font-light tracking-wide right-0 mx-auto w-[92vw] lg:w-[34vw] lg:leading-[1.2] lg:ml-[1vw] lg:bottom-32 h-fit z-20',
          )}
        >
          Our architecture studio designs one-of-a-kind residences in rare
          locations across Japan and around the world.
        </p>
        {assets.map((asset, i) => {
          const zIndex = zIndexByAssetIndex.get(i) ?? 1;
          return (
            <>
              <Image
                key={i}
                src={asset.main.src}
                alt={asset.main.alt}
                width={asset.main.width}
                height={asset.main.height}
                style={{ zIndex }}
                className={cn(
                  'absolute inset-0 w-full object-cover h-[92vh] lg:h-[88vh] select-none pointer-events-none',
                )}
              />
              <div
                className={cn(
                  'absolute inset-0 h-[92vh] lg:h-[88vh] w-full bg-black/30 select-none pointer-events-none z-10',
                )}
              />
            </>
          );
        })}
        {assets.map((asset, i) => {
          const zIndex = (zIndexByAssetIndex.get(i) ?? 1) + 20;
          return (
            <Image
              key={i}
              src={asset.sub.src}
              alt={asset.sub.alt}
              width={asset.main.width}
              height={asset.main.height}
              style={{ zIndex }}
              className={cn(
                'absolute z-20 bottom-0 left-0 right-0 mx-auto select-none pointer-events-none lg:w-4/12 w-11/12 h-fit object-cover lg:mr-[9vw]',
              )}
            />
          );
        })}
      </div>
    </>
  );
}
