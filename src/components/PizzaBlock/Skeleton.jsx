import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="283" rx="10" ry="10" width="280" height="30" />
    <rect x="0" y="346" rx="17" ry="17" width="280" height="95" />
    <rect x="0" y="462" rx="10" ry="10" width="95" height="30" />
    <rect x="120" y="450" rx="20" ry="20" width="155" height="50" />
  </ContentLoader>
);

export default Skeleton;
