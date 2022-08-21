let hasTouchScreen = false;

if (typeof navigator !== "undefined") {
  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = (navigator as any).msMaxTouchPoints > 0;
  }
}

export default hasTouchScreen;
