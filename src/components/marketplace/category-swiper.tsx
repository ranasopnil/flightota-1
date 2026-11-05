"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Autoplay } from "swiper/modules";
import { CategoryCard } from "@/components/marketplace/category-card";
import { Button } from "@/components/ui/button";
import type { ApiCategory } from "@/types/catalog";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export function CategorySwiper({
  categories,
}: {
  categories: ApiCategory[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative group/swiper max-sm:[&_p]:hidden">
      {/* Navigation Buttons (No shadow) */}
      <div className="mb-3 hidden items-center justify-end gap-2 lg:flex">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => swiperRef.current?.slidePrev()}
          className="size-8 rounded-lg border border-border bg-card hover:bg-muted text-foreground cursor-pointer"
          aria-label="Previous categories"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => swiperRef.current?.slideNext()}
          className="size-8 rounded-lg border border-border bg-card hover:bg-muted text-foreground cursor-pointer"
          aria-label="Next categories"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, FreeMode, Autoplay]}
        spaceBetween={10}
        slidesPerView={2.3}
        freeMode={{ enabled: true, sticky: false }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 3.2,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3.4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 18,
          },
        }}
        className="pb-1"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.slug} className="h-auto">
            <CategoryCard
              category={cat}
              href={`/apis?category=${cat.slug}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
