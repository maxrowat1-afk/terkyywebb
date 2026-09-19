"use client";

import Image from "next/image";
import {
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactLenis } from "lenis/react";

const ease = [0.22, 1, 0.36, 1] as const;

const programs = [
  {
    index: "01",
    title: "Otevření",
    duration: "90 minut",
    price: "Úvodní rozhovor",
    text: "První setkání bez výkonu a bez slibů. Společně zjistíme, jestli je prostor mezi námi ten pravý — a co si žádá tvůj další pohyb.",
  },
  {
    index: "02",
    title: "Hloubka",
    duration: "12 týdnů",
    price: "Na míru",
    text: "Intimní 1:1 doprovázení. Týdenní sezení, ticho mezi nimi a práce, která se neděje na povrchu. Pro ženy, které už nechtějí další metodu — chtějí se vrátit k sobě.",
  },
  {
    index: "03",
    title: "Privátní doprovod",
    duration: "Dlouhodobě",
    price: "Retainer",
    text: "Trvalá přítomnost vedle tvých rozhodnutí. Méně sezení, více kontinuity. Pro ty, kdo nesou odpovědnost a potřebují místo, kde nemusí nic držet.",
  },
];

const testimonials = [
  {
    quote:
      "Poprvé jsem neměla pocit, že mě někdo opravuje. Terka mi vrátila ticho, ve kterém jsem znovu slyšela vlastní hlas.",
    name: "Klára",
    role: "Zakladatelka",
  },
  {
    quote:
      "Žádné fráze, žádný tlak na výsledek. Jen přesnost, která mi po měsících zrychlování vrátila gravitu.",
    name: "Markéta",
    role: "Kreativní ředitelka",
  },
  {
    quote:
      "Odešla jsem s méně otázkami, ne s dalším seznamem. To jsem u koučinku ještě nezažila.",
    name: "Anna",
    role: "Lékařka",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reduceMotion ? 1 : 0.12,
        wheelMultiplier: 1,
        smoothWheel: !reduceMotion,
      }}
    >
      <div className="relative min-h-full bg-ivory text-charcoal">
        <Nav />
        <main>
          <Hero />
          <Philosophy />
          <Programs />
          <Testimonials />
          <Reservation />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-charcoal/8 bg-ivory/80 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <a
          href="#top"
          className="font-serif text-[1.35rem] font-medium tracking-[0.28em] text-charcoal"
        >
          TERKA
        </a>
        <MagneticButton href="#rezervace" variant="solid">
          Rezervovat konzultaci
        </MagneticButton>
      </div>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:min-h-svh lg:px-16 lg:pb-28 lg:pt-40"
    >
      <div className="mx-auto grid max-w-[1440px] items-end gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7 lg:pb-8">
          <motion.p
            className="mb-8 text-[11px] font-medium uppercase tracking-[0.32em] text-sage"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, ease, delay: 0.05 }}
          >
            Koučink · Praha
          </motion.p>
          <motion.h1
            className="max-w-[14ch] font-serif text-[3.15rem] font-medium leading-[0.96] tracking-[-0.02em] text-charcoal sm:text-6xl lg:text-[5.25rem]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, ease, delay: 0.16 }}
          >
            Změna nezačíná výkonem.{" "}
            <em className="italic text-bronze">Začíná návratem k sobě.</em>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-md text-[15px] leading-7 text-charcoal/70 sm:text-base"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, ease, delay: 0.3 }}
          >
            Tiché, soustředěné 1:1 doprovázení pro ženy, které už nemají potřebu
            zrychlovat — ale chtějí žít z vlastního středu.
          </motion.p>
          <motion.div
            className="mt-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.9, ease, delay: 0.42 }}
          >
            <MagneticButton href="#rezervace" variant="solid">
              Rezervovat konzultaci
            </MagneticButton>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <PortraitFrame reduceMotion={!!reduceMotion} />
        </div>
      </div>
    </section>
  );
}

function PortraitFrame({ reduceMotion }: { reduceMotion: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [portraitSrc, setPortraitSrc] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-36, 36]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.08, 1],
  );

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setPortraitSrc("/terka.jpg");
    };
    probe.src = "/terka.jpg";
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure ref={frameRef} className="mx-auto w-full max-w-[460px] lg:ml-auto">
      <div className="relative aspect-[4/5] overflow-hidden border border-bronze/55 p-3 sm:p-4">
        <div className="absolute inset-3 overflow-hidden bg-ivory-deep sm:inset-4">
          <motion.div
            className="absolute inset-[-8%] will-change-transform"
            style={{ y, scale }}
          >
            {portraitSrc ? (
              <Image
                src={portraitSrc}
                alt="Portrét Terky"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_28%_18%,#e7e0d2,transparent_52%),linear-gradient(165deg,#f3efe6_0%,#e4ddd1_42%,#cfc6b6_100%)]">
                <span
                  aria-hidden
                  className="absolute inset-x-8 top-8 border-t border-bronze/20"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-8 bottom-8 border-b border-bronze/20"
                />
                <span className="font-serif text-[8.5rem] font-medium leading-none text-bronze/40 sm:text-[11rem]">
                  T
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <figcaption className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-sage">
        <span>Terka</span>
        <span>Praha</span>
      </figcaption>
    </figure>
  );
}

function Philosophy() {
  return (
    <section
      id="pristup"
      className="border-t border-charcoal/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-12 text-[11px] font-medium uppercase tracking-[0.32em] text-sage">
          01 — Přístup
        </p>
        <blockquote className="max-w-5xl font-serif text-[2.15rem] font-medium leading-[1.12] tracking-[-0.02em] text-charcoal sm:text-5xl lg:text-[4.15rem]">
          Nepřidávám další vrstvu.{" "}
          <em className="italic text-bronze">Snímám to, co už dávno není tvoje.</em>
        </blockquote>
        <p className="mt-12 max-w-xl text-[15px] leading-7 text-charcoal/68">
          Pracuji pomalu, přesně a bez teatrálních slibů. Koučink je u mě prostor,
          kde se vrací autorita k tobě — ne ke mně, ne k metodě, ne k dalšímu
          výkonu. Mluvíme málo. Slyšíme víc.
        </p>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section
      id="programy"
      className="border-t border-charcoal/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-sage">
            02 — Spolupráce
          </p>
          <h2 className="max-w-md font-serif text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
            Tři způsoby, jak začít.
          </h2>
        </div>
        <div className="grid gap-px bg-charcoal/8 lg:grid-cols-3">
          {programs.map((program) => (
            <motion.article
              key={program.title}
              className="group flex min-h-[420px] flex-col bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-deep sm:p-10"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <div className="mb-16 flex items-start justify-between">
                <span className="font-serif text-sm tracking-[0.2em] text-bronze">
                  {program.index}
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-sage">
                  {program.duration}
                </span>
              </div>
              <h3 className="font-serif text-4xl font-medium tracking-[-0.02em] text-charcoal">
                {program.title}
              </h3>
              <p className="mt-5 flex-1 text-[15px] leading-7 text-charcoal/65">
                {program.text}
              </p>
              <div className="mt-10 flex items-center justify-between border-t border-bronze/30 pt-5 text-[11px] uppercase tracking-[0.2em] text-bronze">
                <span>{program.price}</span>
                <span className="translate-x-0 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section
      id="slova"
      className="border-t border-charcoal/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-16 text-[11px] font-medium uppercase tracking-[0.32em] text-sage">
          03 — Slova klientek
        </p>
        <div className="grid gap-16 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((item) => (
            <figure key={item.name} className="flex flex-col">
              <span
                aria-hidden
                className="mb-6 font-serif text-6xl leading-none text-sage-soft/70"
              >
                “
              </span>
              <blockquote className="font-serif text-[1.65rem] font-medium leading-snug tracking-[-0.01em] text-charcoal">
                {item.quote}
              </blockquote>
              <figcaption className="mt-8 text-[12px] uppercase tracking-[0.22em] text-sage">
                {item.name}
                <span className="mx-2 text-bronze/50">—</span>
                {item.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent("Rezervace konzultace");
    const body = encodeURIComponent(
      `Jméno: ${name}\nE-mail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:ahoj@terka.studio?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="rezervace"
      className="border-t border-charcoal/8 px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <p className="mb-10 text-[11px] font-medium uppercase tracking-[0.32em] text-sage">
            04 — Rezervace
          </p>
          <h2 className="max-w-[12ch] font-serif text-5xl font-medium leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]">
            První rozhovor je tichý. A stačí.
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-7 text-charcoal/65">
            Napiš pár vět o tom, kde právě jsi. Ozvu se osobně — bez automatických
            potvrzení a bez nátlaku na další krok.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-10 lg:col-span-6 lg:pt-16"
        >
          <Field
            id="name"
            label="Jméno"
            value={name}
            onChange={setName}
            autoComplete="name"
          />
          <Field
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <label className="block">
            <span className="mb-3 block text-[11px] uppercase tracking-[0.22em] text-sage">
              Zpráva
            </span>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full resize-none border-0 border-b border-charcoal/15 bg-transparent py-3 text-[15px] leading-7 text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-bronze"
              placeholder="Kde se právě nacházíš?"
            />
          </label>
          <div className="pt-2">
            <MagneticButton type="submit" variant="solid">
              Odeslat rezervaci
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-[11px] uppercase tracking-[0.22em] text-sage">
        {label}
      </span>
      <input
        id={id}
        required
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border-0 border-b border-charcoal/15 bg-transparent py-3 text-[15px] text-charcoal outline-none transition-colors placeholder:text-charcoal/30 focus:border-bronze"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-charcoal/8 px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 text-[11px] uppercase tracking-[0.22em] text-sage sm:flex-row sm:items-center sm:justify-between">
        <p>© Terka {new Date().getFullYear()}</p>
        <p>Praha</p>
        <div className="flex gap-8">
          <a
            href="https://instagram.com"
            className="transition-colors hover:text-bronze"
          >
            Instagram
          </a>
          <a
            href="mailto:ahoj@terka.studio"
            className="transition-colors hover:text-bronze"
          >
            ahoj@terka.studio
          </a>
        </div>
      </div>
    </footer>
  );
}

function MagneticButton({
  children,
  href,
  type = "button",
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "solid" | "outline";
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 16, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 16, mass: 0.35 });

  function onMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.32);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.32);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const classes =
    variant === "solid"
      ? "inline-flex items-center justify-center border border-charcoal bg-charcoal px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors duration-300 hover:border-bronze hover:bg-bronze sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.22em]"
      : "inline-flex items-center justify-center border border-bronze/50 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:border-bronze hover:text-bronze sm:px-6 sm:py-3 sm:text-[11px] sm:tracking-[0.22em]";

  const motionStyle = { x: springX, y: springY };

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={motionStyle}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={motionStyle}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
