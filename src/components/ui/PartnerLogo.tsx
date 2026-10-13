
import Image from "next/image";
import type { PartnerSummary } from "@/lib/data/partners";

export function PartnerLogo({
  partner,
}: {
  partner: PartnerSummary;
}) {
  const content = (
    <div
      className="
        group relative flex h-[78px] w-full min-w-0
        items-center justify-center overflow-hidden
        rounded-lg border border-brand-border
        bg-white px-5 py-3
        transition-[border-color,box-shadow] duration-300
        hover:border-brand-primary/30
        hover:shadow-[0_6px_20px_rgba(5,7,9,0.055)]
        sm:h-[90px]
      "
    >
      <span
        aria-hidden="true"
        className="
          absolute inset-x-5 bottom-0 h-[2px]
          origin-center scale-x-0 bg-brand-primary
          transition-transform duration-300
          group-hover:scale-x-100
          motion-reduce:transition-none
        "
      />

      {partner.logoUrl ? (
        <div className="relative h-[46px] w-full max-w-[150px] sm:h-[54px]">
          <Image
            src={partner.logoUrl}
            alt={partner.name}
            fill
            sizes="(max-width: 640px) 150px, 150px"
            className="
              object-contain object-center
              transition-transform duration-300
              group-hover:scale-[1.025]
              motion-reduce:transform-none
            "
          />
        </div>
      ) : (
        <span className="line-clamp-2 max-w-[170px] text-center font-heading text-[11px] font-bold leading-relaxed text-brand-dark sm:text-xs">
          {partner.name}
        </span>
      )}
    </div>
  );

  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${partner.name} website`}
      title={partner.name}
      className="block w-full min-w-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
    >
      {content}
    </a>
  ) : (
    <div className="w-full min-w-0" title={partner.name}>
      {content}
    </div>
  );
}
