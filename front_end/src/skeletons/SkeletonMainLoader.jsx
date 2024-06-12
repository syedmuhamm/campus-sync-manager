import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";

const SkeletonMainLoader = () => {
  const [sidebarHeight, setSidebarHeight] = useState(0);

  useEffect(() => {
    // Update sidebar height once component mounts
    setSidebarHeight(window.innerHeight - 64);
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <ContentLoader 
      speed={2}
      width={'100%'}
      height={'100vh'}
      viewBox="0 0 1920 1080"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      uniqueKey="skeleton-main-loader"
    >
      {/* Placeholder for sidebar */}
      <rect x="32" y="32" rx="3" ry="3" width="240" height={sidebarHeight} id="sidebar-placeholder" />

      {/* Placeholder for header */}
      <rect x="272" y="32" rx="3" ry="3" width="calc(100% - 304px)" height="80" id="header-placeholder" />

      {/* Placeholder for main content */}
      <rect x="272" y="128" rx="3" ry="3" width="calc(100% - 304px)" height="calc(100% - 160px)" id="main-content-placeholder" />

      {/* Additional placeholders to mimic loading */}
      <rect x="272" y="264" rx="3" ry="3" width="calc(100% - 304px)" height="20" id="additional-placeholder-1" />
      <rect x="272" y="296" rx="3" ry="3" width="calc(100% - 304px)" height="20" id="additional-placeholder-2" />
      <rect x="272" y="328" rx="3" ry="3" width="calc(100% - 304px)" height="20" id="additional-placeholder-3" />
    </ContentLoader>
  );
}

export default SkeletonMainLoader;
