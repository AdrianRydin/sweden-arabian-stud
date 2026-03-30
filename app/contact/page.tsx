"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", comment: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div>
      <div className="bg-linear-to-br from-[#3d7a8a] via-[#2e6070] to-[#1e4a58] px-[clamp(20px,6vw,72px)] py-[clamp(28px,5vw,48px)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.04)_0%,transparent_60%)]" />
        <h1 className="font-['Cormorant_SC',serif] text-[clamp(1.6rem,4vw,2.6rem)] text-white tracking-[0.25em] m-0 font-normal relative">
          CONTACT
        </h1>
      </div>

      <div className="bg-white px-[clamp(20px,6vw,72px)] py-[clamp(32px,5vw,5px)]">
        <div className="contact-main-grid">
          <div>
            <div className="text-[clamp(0.85rem,1.5vw,1rem)] tracking-[0.18em] text-[#333] mb-5 font-semibold">
              REACH OUT TO US
            </div>

            <div className="contact-details-row">
              <div className="flex items-center gap-2">
                <MapPin size={14} color="#5b9aaf" className="shrink-0" />
                <span className="text-[0.72rem] text-[#555]">
                  Gustavsberg, Sweden
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} color="#5b9aaf" className="shrink-0" />
                <a
                  href="tel:+46762235910"
                  className="text-[0.72rem] text-[#555] no-underline"
                >
                  +46 76 223 5910
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={14} color="#5b9aaf" className="shrink-0" />
                <a
                  href="mailto:kathleen@swedenarabianstud.com"
                  className="text-[0.72rem] text-[#555] no-underline"
                >
                  kathleen@swedenarabianstud.com
                </a>
              </div>
            </div>

            <div className="border-t border-[#e8e8e8] my-5.5" />

            <p className="text-[0.73rem] text-[#888] mb-5 leading-[1.7]">
              Drop us a line and we will get back to you.
            </p>

            {sent ? (
              <div className="p-6 bg-[#f0f8f5] border border-[#b8d8cc] text-center">
                <div className="font-['Cormorant_Garamond',serif] italic text-[1.1rem] text-[#4a8a7a] mb-1.5">
                  Thank you for reaching out.
                </div>
                <div className="text-[0.7rem] text-[#888]">
                  We will respond to your enquiry as soon as possible.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                {/* Name */}
                <div className="relative mb-3.5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-2.5 pr-8 py-2.5 border-0 border-b border-[#ccc] bg-transparent font-['Raleway',sans-serif] text-xs text-[#333] outline-none box-border transition-[border-color] duration-200 focus:border-[#5b9aaf]"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5b9aaf] text-[0.9rem] pointer-events-none">
                    ✦
                  </span>
                </div>

                {/* Email */}
                <div className="relative mb-3.5">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-2.5 pr-8 py-2.5 border-0 border-b border-[#ccc] bg-transparent font-['Raleway',sans-serif] text-xs text-[#333] outline-none box-border transition-[border-color] duration-200 focus:border-[#5b9aaf]"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5b9aaf] text-[0.9rem] pointer-events-none">
                    ✦
                  </span>
                </div>

                {/* Comment */}
                <div className="mb-5.5">
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    value={form.comment}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-2.5 border border-[#ccc] bg-transparent font-['Raleway',sans-serif] text-xs text-[#333] outline-none box-border resize-y transition-[border-color] duration-200 focus:border-[#5b9aaf]"
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="bg-[#3d7a8a] border-0 text-white font-['Raleway',sans-serif] text-[0.68rem] tracking-[0.14em] uppercase px-7 py-2.5 cursor-pointer transition-[background] duration-200 hover:bg-[#2e6070]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>

          <div>
            <div className="text-[clamp(0.85rem,1.5vw,1rem)] tracking-[0.18em] text-[#333] mb-5 font-semibold">
              LOCATION
            </div>

            <div className="w-full aspect-4/3 border border-[#e0e0e0] overflow-hidden relative">
              <iframe
                title="Sweden Arabian Stud Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39861.036481362404!2d11.859449391606912!3d58.32698077643538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46451029838e01f9%3A0x172494ac7fe9bcfc!2sGustavsberg+250%2C+451+91+Uddevalla%2C+Sweden!5e0!3m2!1sen!2sus!4v1562890865099!5m2!1sen!2sus"
                width="100%"
                height="100%"
                className="border-0 block"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-3.5 text-[0.7rem] text-[#777] leading-[1.8] flex items-start gap-2">
              <MapPin size={13} color="#5b9aaf" className="shrink-0 mt-0.75" />
              <div>
                <div className="text-[#444] mb-0.5">Sweden Arabian Stud</div>
                <div>Gustavsberg 250, 451 96 Uddevalla, Sweden</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: start;
        }
        .contact-details-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px 32px;
          margin-bottom: 4px;
        }
        @media (max-width: 768px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }
          .contact-details-row {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
