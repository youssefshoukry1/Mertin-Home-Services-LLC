"use client";
import { Check, GripHorizontal, GripVertical, Sparkles, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BeforeAfter.module.css";
const Badge = ({ children }) => <span className="inline-flex items-center rounded-full border border-transparent bg-neutral-200 px-2.5 py-0.5 text-xs font-semibold text-neutral-700">{children}</span>;
const cn = (...classes) => classes.filter(Boolean).join(" ");
export const reveal2Demo = {
    badge: { label: "Compare", variant: "secondary" },
    heading: "See the difference",
    description: "Drag the slider to compare the before and after states. Our solution delivers measurable improvements.",
    highlights: [
        {
            id: "highlight-1",
            icon: <Check className="size-5"/>,
            title: "Performance boost",
            description: "Up to 3x faster load times with optimized rendering.",
        },
        {
            id: "highlight-2",
            icon: <Sparkles className="size-5"/>,
            title: "Better clarity",
            description: "Enhanced visuals with improved contrast and sharpness.",
        },
        {
            id: "highlight-3",
            icon: <Zap className="size-5"/>,
            title: "Reduced noise",
            description: "Cleaner output with advanced noise reduction algorithms.",
        },
    ],
    beforeImage: {
        src: "/images/before-after/before.webp",
        alt: "Before",
    },
    afterImage: {
        src: "/images/before-after/after.webp",
        alt: "After",
    },
    beforeLabel: "Before",
    afterLabel: "After",
    showLabels: true,
    orientation: "horizontal",
    initialPosition: 50,
    dividerWidth: 4,
};
export function Reveal2({ badge, heading, description, highlights = [], beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After", showLabels = true, orientation = "horizontal", initialPosition = 50, dividerWidth = 4, className, }) {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const isHorizontal = orientation === "horizontal";
    const handleMove = useCallback((clientX, clientY) => {
        if (!containerRef.current)
            return;
        const rect = containerRef.current.getBoundingClientRect();
        if (isHorizontal) {
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setPosition(percentage);
        }
        else {
            const y = clientY - rect.top;
            const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
            setPosition(percentage);
        }
    }, [isHorizontal]);
    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
        handleMove(e.clientX, e.clientY);
    }, [handleMove]);
    const handleTouchStart = useCallback((e) => {
        setIsDragging(true);
        const touch = e.touches[0];
        if (touch) {
            handleMove(touch.clientX, touch.clientY);
        }
    }, [handleMove]);
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                handleMove(e.clientX, e.clientY);
            }
        };
        const handleTouchMove = (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                if (touch) {
                    handleMove(touch.clientX, touch.clientY);
                }
            }
        };
        const handleEnd = () => {
            setIsDragging(false);
        };
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("mouseup", handleEnd);
            document.addEventListener("touchend", handleEnd);
        }
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("mouseup", handleEnd);
            document.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging, handleMove]);
    return (<section className={cn(styles.comparison, "py-16 md:py-24 w-full", className)}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
          {/* Content */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {badge && (<div>
                <Badge variant={badge.variant ?? "default"}>{badge.label}</Badge>
              </div>)}

            {heading && <h2 className="text-2xl font-semibold md:text-4xl">{heading}</h2>}

            {description && (<p className="max-w-xl text-base md:text-lg text-muted-foreground">{description}</p>)}

            {highlights.length > 0 && (<div className="mt-2 grid gap-3">
                {highlights.slice(0, 6).map((h) => (<div key={h.id} className="rounded-lg bg-muted p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-muted-foreground">
                        {h.icon || <Check className="size-5"/>}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{h.title}</p>
                        {h.description && (<p className="mt-1 text-sm text-muted-foreground">{h.description}</p>)}
                      </div>
                    </div>
                  </div>))}
              </div>)}
          </div>

          {/* Slider */}
          <div className="rounded-lg bg-muted lg:col-span-7 md:mt-4">
            <div ref={containerRef} role="slider" aria-label="Before/After comparison slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)} aria-orientation={orientation} onKeyDown={(e) => { if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        setPosition((v) => e.key === "Home" ? 0 : e.key === "End" ? 100 : Math.max(0, Math.min(100, v + (["ArrowRight", "ArrowUp"].includes(e.key) ? 2 : -2))));
    } }} tabIndex={0} className={cn("relative rounded-lg overflow-hidden border select-none", "aspect-[16/10] cursor-ew-resize", !isHorizontal && "cursor-ns-resize")} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} style={{ touchAction: isHorizontal ? "pan-y" : "none" }}>
              {/* After Image (Bottom layer - full) */}
              <div className="absolute inset-0">
                {afterImage?.src ? (<img loading="lazy" decoding="async" draggable={false} className="absolute inset-0 size-full object-cover" src={afterImage.src} alt={afterImage.alt}/>) : (<div className="w-full h-full bg-muted/50 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">{afterLabel} image</span>
                  </div>)}
              </div>

              {/* Before Image (Top layer - clipped) */}
              <div className="absolute inset-0" style={{
            clipPath: isHorizontal
                ? `inset(0 ${100 - position}% 0 0)`
                : `inset(0 0 ${100 - position}% 0)`,
        }}>
                {beforeImage?.src ? (<img loading="lazy" decoding="async" draggable={false} className="absolute inset-0 size-full object-cover" src={beforeImage.src} alt={beforeImage.alt}/>) : (<div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">{beforeLabel} image</span>
                  </div>)}
              </div>

              {/* Divider Line */}
              <div className={cn("absolute bg-white shadow-lg z-10", isHorizontal
            ? "top-0 bottom-0 transform -translate-x-1/2"
            : "left-0 right-0 transform -translate-y-1/2")} style={{
            [isHorizontal ? "left" : "top"]: `${position}%`,
            [isHorizontal ? "width" : "height"]: `${dividerWidth}px`,
        }}>
                {/* Handle */}
                <div className={cn("absolute bg-white rounded-full shadow-xl", "flex items-center justify-center", "w-10 h-10 border-3 border-black", "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", isDragging && "scale-110")}>
                  {isHorizontal ? (<GripVertical className="w-5 h-5 text-black"/>) : (<GripHorizontal className="w-5 h-5 text-black"/>)}
                </div>
              </div>

              {/* Labels */}
              {showLabels && (<>
                  <div className={cn("absolute z-20 px-3 py-1.5 rounded-full", "bg-black/70 text-white text-sm font-medium backdrop-blur-sm", "top-4 left-4")}>
                    {beforeLabel}
                  </div>
                  <div className={cn("absolute z-20 px-3 py-1.5 rounded-full", "bg-black/70 text-white text-sm font-medium backdrop-blur-sm", isHorizontal ? "top-4 right-4" : "bottom-4 left-4")}>
                    {afterLabel}
                  </div>
                </>)}
            </div>
          </div>
        </div>
      </div>
    </section>);
}
const transformations = {
  "handyman-services": ["Small fixes, everyday comfort", "A sagging closet shelf and loose rail restored to a useful storage space.", "Level shelving", "Secure fittings", "Practical storage"],
  "home-repairs": ["Give your home a fresh finish", "Damaged drywall and chipped trim repaired for a smooth, consistent finish.", "Patched drywall", "Restored trim", "Matching paint"],
  "assembly-installation": ["From parts to ready to use", "Flat-pack panels become a neatly assembled cabinet in the same space.", "Careful assembly", "Aligned doors", "Ready for everyday use"],
  "cleaning-services": ["A cleaner space to come home to", "Everyday kitchen buildup removed from the cooktop, counters, and sink.", "Clean cooking surfaces", "Fresh countertops", "Polished sink"],
  "home-renovation": ["A fresh start for your space", "Worn walls, flooring, and trim refreshed while keeping the room familiar.", "Freshly painted walls", "Updated flooring", "Finished trim"],
};
export default function BeforeAfter({ serviceSlug = "handyman-services" }) {
  const [heading, description, ...details] = transformations[serviceSlug] || transformations["handyman-services"];
  return <Reveal2 {...reveal2Demo} heading={heading} description={description + " Drag to compare this illustrative transformation."} badge={{ label: "Illustrative transformation" }} highlights={details.map((title, i) => ({ id: String(i), title }))} beforeImage={{ src: `/images/before-after/${serviceSlug}-before.webp`, alt: `${heading}: before work (generated illustration)` }} afterImage={{ src: `/images/before-after/${serviceSlug}-after.webp`, alt: `${heading}: after work (generated illustration)` }} />;
}
