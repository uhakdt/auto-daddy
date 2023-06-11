import React, { useState } from "react";

function EmissionsLabel() {
  const [level, setLevel] = useState(3);

  const levels = ["green", "lime", "yellow", "orange", "red"];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="340"
      viewBox="0 0 200 340"
    >
      {levels.map((color, index) => (
        <polygon
          key={index}
          points="50,50 150,50 175,75 150,100 50,100"
          transform={`translate(0, ${index * 60})`}
          style={{ fill: color, stroke: "black", strokeWidth: 1 }}
        />
      ))}
      <polygon
        points="50,50 150,50 175,75 150,100 50,100"
        transform={`translate(-25, ${level * 60}) scale(-1, 1)`}
        style={{ fill: "gray", stroke: "black", strokeWidth: 1 }}
      />
    </svg>
  );
}

export default EmissionsLabel;
