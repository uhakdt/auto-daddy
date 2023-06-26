import React, { useMemo } from "react";

const colours = [
  "#679b76",
  "#80a57a",
  "#cc9376",
  "#e2c391",
  "#c9c48d",
  "#b0c28c",
  "#b05050",
];

const ranges = [
  { min: 0, max: 100, label: "A", color: colours[0] },
  { min: 101, max: 110, label: "B", color: colours[1] },
  { min: 111, max: 120, label: "C", color: colours[1] },
  { min: 121, max: 130, label: "D", color: colours[2] },
  { min: 131, max: 140, label: "E", color: colours[2] },
  { min: 141, max: 155, label: "F", color: colours[3] },
  { min: 156, max: 165, label: "G", color: colours[3] },
  { min: 166, max: 175, label: "H", color: colours[4] },
  { min: 176, max: 185, label: "I", color: colours[4] },
  { min: 186, max: 205, label: "J", color: colours[5] },
  { min: 206, max: 225, label: "K", color: colours[5] },
  { min: 226, max: 235, label: "L", color: colours[6] },
  { min: 236, label: "M", color: colours[6] },
];

function EmissionsLabel({ emission }) {
  const { color, label } = useMemo(() => {
    for (let range of ranges) {
      if (
        emission >= range.min &&
        (range.max === undefined || emission <= range.max)
      ) {
        return { color: range.color, label: range.label };
      }
    }
    return { color: "transparent", label: "" };
  }, [emission]);

  return (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
      <rect
        y={0}
        width={350.34}
        height={202.79}
        style={{
          fill: "#fff",
        }}
      />
      <polygon
        points="89.86 0 .3 0 .3 24.29 89.86 24.29 110.89 12.14 89.86 0"
        style={{
          fill: "#679b76",
        }}
      />
      <polygon
        points="113.49 29.75 .3 29.75 .3 54.04 113.49 54.04 134.53 41.89 113.49 29.75"
        style={{
          fill: "#80a57a",
        }}
      />
      <polygon
        points="221.61 148.75 .3 148.75 .3 173.04 221.61 173.04 242.64 160.89 221.61 148.75"
        style={{
          fill: "#cc9376",
        }}
      />
      <polygon
        points="197.57 119 197.57 119 .3 119 .3 143.29 197.57 143.29 218.61 131.14 197.57 119"
        style={{
          fill: "#e2c391",
        }}
      />
      <polygon
        points="168.3 89.25 .3 89.25 .3 113.54 168.3 113.54 189.33 101.39 168.3 89.25"
        style={{
          fill: "#c9c48d",
        }}
      />
      <polygon
        points="143.82 59.5 .3 59.5 .3 83.79 143.82 83.79 164.86 71.64 143.82 59.5"
        style={{
          fill: "#b0c28c",
        }}
      />
      <polygon
        points="248.74 178.5 .3 178.5 .3 202.79 248.74 202.79 269.77 190.64 248.74 178.5"
        style={{
          fill: "#b05050",
        }}
      />
      <text
        transform="translate(13.05 17.58)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"0 < 101"}
        </tspan>
      </text>
      <text
        transform="translate(9.49 47.33)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"101 - 120"}
        </tspan>
      </text>
      <text
        transform="translate(9.49 77.09)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"121 - 140"}
        </tspan>
      </text>
      <text
        transform="translate(9.49 106.84)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"141 - 165"}
        </tspan>
      </text>
      <text
        transform="translate(9.49 136.59)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"166 - 185"}
        </tspan>
      </text>
      <text
        transform="translate(9.49 166.34)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"186 - 225"}
        </tspan>
      </text>
      <text
        transform="translate(20.54 196.09)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"225+"}
        </tspan>
      </text>
      <text
        transform="translate(77.6 15.98)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "9.07px",
        }}
      >
        <tspan x={0} y={0}>
          {"A"}
        </tspan>
      </text>
      <text
        transform="translate(102.22 40.29)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "9.07px",
        }}
      >
        <tspan x={0} y={0}>
          {"B"}
        </tspan>
        <tspan x={0.13} y={10.88}>
          {"C"}
        </tspan>
      </text>
      <text
        transform="translate(131.77 70.04)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "9.07px",
        }}
      >
        <tspan x={0} y={0}>
          {"D"}
        </tspan>
        <tspan x={0.57} y={10.88}>
          {"E"}
        </tspan>
      </text>
      <text
        transform="translate(157.31 99.79)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "9.07px",
        }}
      >
        <tspan x={0} y={0}>
          {"F"}
        </tspan>
        <tspan x={-0.44} y={10.88}>
          {"G"}
        </tspan>
      </text>
      <text
        transform="translate(186.12 129.54)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "9.07px",
        }}
      >
        <tspan x={0} y={0}>
          {"H"}
        </tspan>
        <tspan x={1.95} y={10.89}>
          {"I"}
        </tspan>
      </text>
      <text
        transform="translate(211.51 159.29)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "9.07px",
        }}
      >
        <tspan x={0} y={0}>
          {"J"}
        </tspan>
        <tspan x={-1.01} y={10.88}>
          {"K"}
        </tspan>
      </text>
      <text
        transform="translate(237.48 189.04)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "9.07px",
        }}
      >
        <tspan x={0} y={0}>
          {"L"}
        </tspan>
        <tspan x={-1.51} y={10.88}>
          {"M"}
        </tspan>
      </text>
      <polygon
        points="298.14 0 298.14 .02 277.14 12.14 298.14 24.27 298.14 24.29 350.34 24.29 350.34 0 298.14 0"
        style={{
          fill: `${color}`,
        }}
      />
      <text
        transform="translate(303.37 17.58)"
        style={{
          fill: "#fff",
          fontFamily: "CMUSansSerif, &apos",
          fontSize: "12.85px",
        }}
      >
        <tspan x={0} y={0}>
          {"La"}
        </tspan>
        <tspan
          x={13.13}
          y={0}
          style={{
            letterSpacing: ".03em",
          }}
        >
          {"b"}
        </tspan>
        <tspan x={20.13} y={0}>
          {`el ${label}`}
        </tspan>
      </text>
    </svg>
  );
}

export default EmissionsLabel;
