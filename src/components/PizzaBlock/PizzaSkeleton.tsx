import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={495}
    viewBox="0 0 280 495"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="130" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="50" />
    <rect x="0" y="340" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="451" rx="10" ry="10" width="120" height="35" />
    <rect x="141" y="445" rx="20" ry="20" width="140" height="48" />
  </ContentLoader>
);

export default PizzaSkeleton;
