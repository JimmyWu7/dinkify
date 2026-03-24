import { useEffect, useState } from "react";

export function useScrollIndex(
  length: number,
  animationDuration = 800,
  disabled = false,
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (disabled) return;

    let isScrolling = false;
    let touchStartY = 0;

    const handleScrollChange = (direction: "up" | "down") => {
      if (isScrolling) return;

      isScrolling = true;

      if (direction === "down") {
        setIndex((prev) => Math.min(prev + 1, length - 1));
      } else {
        setIndex((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        isScrolling = false;
      }, animationDuration);
    };

    // 🖱 Desktop scroll
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) handleScrollChange("down");
      else handleScrollChange("up");
    };

    // 📱 Touch start
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    // 📱 Touch end
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // ignore tiny swipes
      if (Math.abs(deltaY) < 80) return;
      handleScrollChange(deltaY > 0 ? "down" : "up");
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [length, animationDuration, disabled]);

  return [index, setIndex] as const;
}
