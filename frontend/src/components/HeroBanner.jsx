"use client";

export default function HeroBanner({ hero }) {
  if (!hero) return null;

  const { title, subtitle, image } = hero;
  const imageUrl = image?.url ? `http://localhost:1337${image.url}` : "";

  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black bg-opacity-70 p-6 rounded">
        <h1 className="text-sm  font-bold mb-4">{title}</h1>
        <p className="text-sm ">{subtitle}</p>
      </div>
    </section>
  );
}
