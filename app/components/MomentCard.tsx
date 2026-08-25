import Image from "next/image";
import Link from "next/link";

interface MomentCardProps {
  image: string;
  title: string;
  detailLink?: string;
}

export function MomentCard({ image, title, detailLink }: MomentCardProps) {
  const content = (
    <>
      <div className="w-full aspect-4/3 overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover block transition-transform duration-400 ease-in-out hover:scale-[1.04]"
        />
      </div>
      <div className="pt-3.5 text-center">
        <div className="font-['Cormorant_Garamond',serif] text-xl text-[#333] tracking-[0.02em]">
          {title}
        </div>
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
