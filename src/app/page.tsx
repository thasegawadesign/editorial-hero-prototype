import Image from 'next/image';

export default function Home() {
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
  return (
    <main>
      {assets.map((asset, i) => (
        <div key={i}>
          <Image
            src={asset.main.src}
            alt={asset.main.alt}
            width={asset.main.width}
            height={asset.main.height}
          />
          <Image
            src={asset.sub.src}
            alt={asset.sub.alt}
            width={asset.sub.width}
            height={asset.sub.height}
          />
        </div>
      ))}
    </main>
  );
}
