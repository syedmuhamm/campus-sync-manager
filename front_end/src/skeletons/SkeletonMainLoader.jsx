// ** SkeletonLoader.jsx
import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonMainLoader = () => (
  <ContentLoader 
    speed={2}
    width={'100%'} // Set width to '100%' to take full page width
    height={'100vh'} // Set height to '100vh' to take full page height
    viewBox="0 0 1920 1080" // Adjust viewBox to match full page size
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Placeholder for sidebar */}
    <rect x="32" y="32" rx="3" ry="3" width="240" height="calc(100% - 64)" />

    {/* Placeholder for header */}
    <rect x="272" y="32" rx="3" ry="3" width="calc(100% - 304px)" height="80" />

    {/* Placeholder for main content */}
    <rect x="272" y="128" rx="3" ry="3" width="calc(100% - 304px)" height="calc(100% - 160px)" />

    {/* Additional placeholders to mimic loading */}
    <rect x="272" y="264" rx="3" ry="3" width="calc(100% - 304px)" height="20" />
    <rect x="272" y="296" rx="3" ry="3" width="calc(100% - 304px)" height="20" />
    <rect x="272" y="328" rx="3" ry="3" width="calc(100% - 304px)" height="20" />
    {/* Add more placeholders as needed */}
  </ContentLoader>
);

export default SkeletonMainLoader;
