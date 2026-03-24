import Image from "next/image";
import Link from "next/link";

interface HorseCardProps {
  image: string;
  name: string;
  parentage?: string;
  badge?: string;
  price?: string;
  detailLink?: string;
}

export function HorseCard({
  image,
  name,
  parentage,
  badge,
  price,
  detailLink,
}: HorseCardProps) {
  const content = (
    <>
      <div className="w-full aspect-4/3 overflow-hidden relative">
        <Image
          src={image}
          alt={name}
          fill
          className="w-full h-full object-cover block transition-transform duration-400 ease-in-out hover:scale-[1.04]"
        />
        {badge && (
          <div className="absolute top-2.5 right-2.5 bg-(--sage) text-white font-['Raleway',sans-serif] text-[0.58rem] tracking-[0.12em] px-2 py-0.5">
            {badge}
          </div>
        )}
      </div>
      <div className="pt-3.5 text-center">
        <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333] tracking-[0.02em] mb-1">
          {name}
        </div>
        {parentage && (
          <div className="font-['Raleway',sans-serif] text-[0.58rem] text-[#5b9aaf] tracking-[0.12em] uppercase">
            {parentage}
          </div>
        )}
        {price && (
          <div className="font-['Raleway',sans-serif] text-xs text-(--text-light) mt-1.5 tracking-[0.06em]">
            {price}
          </div>
        )}
      </div>
    </>
  );

  if (detailLink) {
    return (
      <Link
        href={detailLink}
        className="flex flex-col items-center cursor-pointer no-underline"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center cursor-pointer">{content}</div>
  );
}
