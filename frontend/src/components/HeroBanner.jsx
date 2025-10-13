"use client";

import Image from "next/image";

export default function HeroBanner({ hero }) {
  if (!hero) return null;

  const { title, subtitle, image } = hero;
  const imageUrl = image?.url ? `http://localhost:1337${image.url}` : "";

  return (
    <section className="relative w-full h-150 flex flex-col items-center justify-center text-center text-white">
      <Image
        src={imageUrl}
        priority
        fill={true}
        alt="hero image"
        style={{ objectFit: "cover", zIndex: -1 }} // to put in background
      />
      <div className="p-6 rounded">
        <h1 className="text-sm  font-bold mb-4">{title}</h1>
        <p className="text-sm ">{subtitle}</p>
      </div>
    </section>
  );
}
