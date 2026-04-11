import { useEffect, useRef } from "react";

const SCRIPT_ID = "mapmyvisitors";
const SCRIPT_SRC =
  "//mapmyvisitors.com/map.js?d=1xr8e4EPdYNwHsyA3l_-sW3eAj4r1mi85oN5Tvey9Os&cl=ffffff&w=a";

export function MapVisitorsWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      container.appendChild(existing);
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    container.appendChild(script);

    return () => {
      if (script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, []);

  return <div className="map-widget" ref={containerRef} />;
}
