
import Image from "next/image";

import { event } from "@/config/event";
import { clsx } from "@/lib/utils/clsx";

interface OrganiserLogosProps {
  boxClassName?: string;
  onDark?: boolean;
  showDivider?: boolean;
  className?: string;
}

const ORGANISER_WEBSITES: Record<string, string> = {
  "Futurex Trade Fair & Events Pvt. Ltd.":
    "https://www.futurextrade.com/",
  "ASK Trade & Exhibitions Pvt. Ltd.":
    "https://www.asktradex.com/",
};

export function OrganiserLogos({
  boxClassName,
  onDark = false,
  showDivider = true,
  className,
}: OrganiserLogosProps) {
  return (
    <div
      className={clsx(
        "mx-auto grid w-full min-w-0 max-w-[600px]",
        "grid-flow-col auto-cols-fr items-center",
        "gap-3 sm:gap-6",
        className
      )}
    >
      {event.organisers.map((org, index) => {
        const websiteUrl = ORGANISER_WEBSITES[org.name];

        const logo = (
          <div
            className={clsx(
              "group relative flex h-[78px] w-full min-w-0",
              "items-center justify-center rounded-lg",
              "px-3 py-2 sm:h-[96px] sm:px-5",
              "transition-colors duration-300",
              onDark
                ? "bg-white"
                : "bg-white hover:bg-brand-primary-soft/20",
              boxClassName
            )}
          >
            <div className="relative h-[52px] w-full max-w-[210px] sm:h-[66px]">
              <Image
                src={org.logo}
                alt={org.name}
                fill
                sizes="(max-width: 640px) 42vw, 210px"
                className="
                  object-contain object-center
                  transition-transform duration-300
                  group-hover:scale-[1.025]
                  motion-reduce:transform-none
                "
              />
            </div>
          </div>
        );

        return (
          <div
            key={org.name}
            className={clsx(
              "relative min-w-0",
              showDivider &&
                index > 0 &&
                "before:absolute before:-left-1.5 before:top-1/2 before:h-10 before:w-px before:-translate-y-1/2 sm:before:-left-3 sm:before:h-12",
              showDivider &&
                index > 0 &&
                (onDark
                  ? "before:bg-white/20"
                  : "before:bg-brand-border")
            )}
          >
            {websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${org.name}`}
                aria-label={`Visit ${org.name} website`}
                className="block w-full min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                {logo}
              </a>
            ) : (
              logo
            )}
          </div>
        );
      })}
    </div>
  );
}
