import Image from "next/image";
import {
  howItWorksImages,
  howItWorksSteps,
} from "@/features/landing/data/landing-content";

export function HowItWorksSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Your Path to the Perfect Venue
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
            Planning an event, production, or gathering shouldn’t feel complicated. Our
            streamlined process connects you with the right venues and trusted professionals,
            taking the stress out of logistics so you can focus on what matters most making
            it a success.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-lg">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {howItWorksImages.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 45vw, 240px"
                  />
                </div>
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg sm:h-20 sm:w-20">
              <Image
                src="/images/sec-5-vector.svg"
                alt=""
                width={40}
                height={37}
                className="h-8 w-auto sm:h-10"
              />
            </div>
          </div>

          <ol className="relative space-y-8">
            {howItWorksSteps.map((item, index) => (
              <li key={item.step} className="relative flex gap-4">
                {index < howItWorksSteps.length - 1 ? (
                  <span className="absolute left-5 top-12 h-[calc(100%-0.5rem)] w-px border-l-2 border-dashed border-[var(--color-brand)]/40" />
                ) : null}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-bold text-white">
                  {item.step}
                </span>
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-[var(--color-ink)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
