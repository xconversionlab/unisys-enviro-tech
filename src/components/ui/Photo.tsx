import Image from "next/image";

interface PhotoProps {
  src: string;
  alt: string;
  className?: string;
  /** CSS aspect-ratio, e.g. "3840 / 2336". Use the source ratio to avoid cropping. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** CSS object-position for the focal point when the frame crops the photo */
  position?: string;
  quality?: number;
}

/** Responsive, non-distorting photograph. Fills its frame; the frame sets the ratio. */
export function Photo({
  src,
  alt,
  className = "",
  ratio,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  position = "center",
  quality = 85,
}: PhotoProps) {
  return (
    <div
      className={`relative overflow-hidden bg-navy-900 ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className="object-cover"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
