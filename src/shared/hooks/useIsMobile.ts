import { useMediaQuery } from "./useMediaQuery";

export function useIsMobile(size: number = 768) {
  const isDesktop = useMediaQuery(`(min-width: ${size}px)`);
  const isMobile = !isDesktop;
  return isMobile;
}
