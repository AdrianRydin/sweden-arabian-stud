/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

async function getHorses() {
  const res = await fetch("http://localhost:3000/api/horses", {
    cache: "no-store",
  });

  return res.json();
}

export default async function HorsesPage() {
  const horses = await getHorses();

  return (
    <section>
      <h1>Our Horses</h1>

      {horses.map((horse: any) => (
        <div key={horse._id}>
          <Image
            src={horse.image}
            width={300}
            height={300}
            alt="Image of a Horse"
          />
          <h2>{horse.name}</h2>
          <p>{horse.birthYear}</p>
        </div>
      ))}
    </section>
  );
}
