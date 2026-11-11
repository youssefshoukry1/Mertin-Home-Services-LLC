// EdgeBannerCard · Built with Systra Tools: https://systra.tools
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* A closing banner: one wide dark card, a sentence, and a figure fading out of
   the right edge.

   The picture is not framed and not cropped to a shape. It is masked so that
   it thins out towards the middle of the card and disappears entirely before
   it reaches the text. Nothing overlaps, nothing needs a scrim, and the
   sentence sits on plain dark the whole way across.

   Above the sentence run five small pills. They are the reason the card does
   not read as an advert: five concrete things beat one adjective, and they are
   short enough to be taken in without reading them one by one.

   The pills come in from the left one after another, the sentence rises out of
   its window, and the button arrives last. Nothing loops afterwards. This is
   the last thing on the page; a banner that keeps moving is a banner that
   keeps asking.

   The club, the schedule and every line are invented. */

const IMAGE = "/heros/editorial-sprinter-crimson-motion.webp";

const ease = [0.22, 1, 0.36, 1] as const;

const PILLS = ["Track Tuesdays", "Long Saturdays", "Video gait check", "Race pacing", "One coach"];

export function EdgeBannerCard() {
  const reduce = useReducedMotion();
  const reduced = !!reduce;

  return (
    <section className="w-full bg-[#0c0a0b] px-4 py-14 md:px-8 md:py-20">
      <motion.div
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl bg-[#14100f] md:rounded-3xl"
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.3 : 0.9, ease }}
      >
        {/* A warm glow behind the figure, so the right half does not stand as a
            second rectangle beside the text. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] md:block"
          style={{
            background:
              "radial-gradient(64% 74% at 74% 52%, rgba(200,52,32,0.55) 0%, rgba(140,24,28,0.28) 46%, rgba(20,16,15,0) 76%)",
          }}
        />

        {/* The figure runs out to the left. The mask ends before it reaches
            the type, so the text needs no scrim. */}
        <img
          aria-hidden
          src={IMAGE}
          alt=""
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[58%] object-cover object-[56%_40%] opacity-85 mix-blend-luminosity md:block"
          style={{
            maskImage:
              "linear-gradient(to left, #000 0%, #000 34%, rgba(0,0,0,0.35) 62%, transparent 88%)",
            WebkitMaskImage:
              "linear-gradient(to left, #000 0%, #000 34%, rgba(0,0,0,0.35) 62%, transparent 88%)",
          }}
          draggable={false}
        />

        <div className="relative flex flex-col gap-8 px-6 py-12 md:max-w-[56%] md:px-12 md:py-20">
          <div className="flex flex-wrap gap-2">
            {PILLS.map((p, i) => (
              <motion.span
                key={p}
                className="rounded-lg border border-white/20 px-3 py-1.5 font-kicker text-[10px] tracking-[0.1em] text-white/75 uppercase"
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduced ? 0.3 : 0.6,
                  ease,
                  delay: reduced ? 0 : 0.2 + i * 0.07,
                }}
              >
                {p}
              </motion.span>
            ))}
          </div>

          <h2 className="font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] tracking-[-0.03em] text-white uppercase">
            {["Start your", "second half"].map((line, i) => (
              // Each line rises from its own window.
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block font-light"
                  initial={reduced ? { opacity: 0 } : { y: "110%" }}
                  whileInView={reduced ? { opacity: 1 } : { y: "0%" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: reduced ? 0.3 : 0.95,
                    ease,
                    delay: reduced ? 0 : 0.34 + i * 0.09,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            className="max-w-md font-body text-[14.5px] leading-[1.7] text-white/65"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease, delay: 0.56 }}
          >
            Trials run on the first Tuesday of the month. Bring shoes you have already put two
            hundred kilometres into, nothing else.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease, delay: 0.66 }}
          >
            <a
              href="#"
              className="group/k inline-flex items-center rounded-lg bg-white px-6 py-3.5 font-kicker text-[11px] tracking-[0.14em] text-[#14100f] uppercase transition-colors duration-200 hover:bg-white/85"
            >
              {/* Two copies of the same line in a window one line high. On hover
                  the pair moves on by one line. */}
              <span className="relative block h-[14px] overflow-hidden">
                <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/k:-translate-y-[14px]">
                  <span className="flex h-[14px] items-center whitespace-nowrap">
                    Take the trial
                  </span>
                  <span aria-hidden className="flex h-[14px] items-center whitespace-nowrap">
                    Take the trial
                  </span>
                </span>
              </span>
              <ArrowRight
                aria-hidden
                className="ml-2.5 h-[15px] w-[15px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/k:translate-x-1"
                strokeWidth={1.9}
              />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default EdgeBannerCard;
