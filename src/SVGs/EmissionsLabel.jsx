import React, { useMemo } from "react";

const colours = [
  "rgb(103, 155, 118)",
  "rgb(128, 165, 122)",
  "rgb(176, 194, 140)",
  "rgb(201, 196, 141)",
  "rgb(226, 195, 145)",
  "rgb(204, 147, 118)",
  "rgb(176, 80, 80)",
];

const ranges = [
  {
    min: 0,
    max: 100,
    label: "A",
    color: colours[0],
    points:
      "298.47 0 298.47 .02 277.47 12.14 298.47 24.27 298.47 24.29 350.67 24.29 350.67 0 298.47 0",
    textPosition: "translate(303.7 17.59)",
  },
  {
    min: 101,
    max: 110,
    label: "B",
    color: colours[1],
    points:
      "298.47 29.75 298.47 29.77 277.47 41.89 298.47 54.02 298.47 54.04 350.67 54.04 350.67 29.75 298.47 29.75",
    textPosition: "translate(303.7 47.34)",
  },
  {
    min: 111,
    max: 120,
    label: "C",
    color: colours[1],
    points:
      "298.47 29.75 298.47 29.77 277.47 41.89 298.47 54.02 298.47 54.04 350.67 54.04 350.67 29.75 298.47 29.75",
    textPosition: "translate(303.7 47.34)",
  },
  {
    min: 121,
    max: 130,
    label: "D",
    color: colours[2],
    points:
      "298.47 59.5 298.47 59.52 277.47 71.64 298.47 83.77 298.47 83.79 350.67 83.79 350.67 59.5 298.47 59.5",
    textPosition: "translate(303.7 77.09)",
  },
  {
    min: 131,
    max: 140,
    label: "E",
    color: colours[2],
    points:
      "298.47 59.5 298.47 59.52 277.47 71.64 298.47 83.77 298.47 83.79 350.67 83.79 350.67 59.5 298.47 59.5",
    textPosition: "translate(303.7 77.09)",
  },
  {
    min: 141,
    max: 155,
    label: "F",
    color: colours[3],
    points:
      "298.47 89.25 298.47 89.27 277.47 101.39 298.47 113.52 298.47 113.54 350.67 113.54 350.67 89.25 298.47 89.25",
    textPosition: "translate(303.7 106.84)",
  },
  {
    min: 156,
    max: 165,
    label: "G",
    color: colours[3],
    points:
      "298.47 89.25 298.47 89.27 277.47 101.39 298.47 113.52 298.47 113.54 350.67 113.54 350.67 89.25 298.47 89.25",
    textPosition: "translate(303.7 106.84)",
  },
  {
    min: 166,
    max: 175,
    label: "H",
    color: colours[4],
    points:
      "298.47 119 298.47 119.02 277.47 131.14 298.47 143.27 298.47 143.29 350.67 143.29 350.67 119 298.47 119",
    textPosition: "translate(303.7 136.59)",
  },
  {
    min: 176,
    max: 185,
    label: "I",
    color: colours[4],
    points:
      "298.47 119 298.47 119.02 277.47 131.14 298.47 143.27 298.47 143.29 350.67 143.29 350.67 119 298.47 119",
    textPosition: "translate(303.7 136.59)",
  },
  {
    min: 186,
    max: 205,
    label: "J",
    color: colours[5],
    points:
      "298.47 148.75 298.47 148.77 277.14 160.89 298.47 173.02 298.47 173.04 350.34 173.04 350.34 148.75 298.47 148.75",
    textPosition: "translate(303.7 166.34)",
  },
  {
    min: 206,
    max: 225,
    label: "K",
    color: colours[5],
    points:
      "298.47 148.75 298.47 148.77 277.14 160.89 298.47 173.02 298.47 173.04 350.34 173.04 350.34 148.75 298.47 148.75",
    textPosition: "translate(303.7 166.34)",
  },
  {
    min: 226,
    max: 235,
    label: "L",
    color: colours[6],
    points:
      "298.47 178.5 298.47 178.52 277.14 190.64 298.47 202.77 298.47 202.79 350.34 202.79 350.34 178.5 298.47 178.5",
    textPosition: "translate(303.7 196.09)",
  },
  {
    min: 236,
    label: "M",
    color: colours[6],
    points:
      "298.47 178.5 298.47 178.52 277.14 190.64 298.47 202.77 298.47 202.79 350.34 202.79 350.34 178.5 298.47 178.5",
    textPosition: "translate(303.7 196.09)",
  },
];

function EmissionsLabel({ emission }) {
  const { color, label, points, textPosition } = useMemo(() => {
    for (let range of ranges) {
      if (
        emission >= range.min &&
        (range.max === undefined || emission <= range.max)
      ) {
        return {
          color: range.color,
          label: range.label,
          points: range.points,
          textPosition: range.textPosition,
        };
      }
    }
    return { color: "transparent", label: "", points: "", textPosition: "" };
  }, [emission]);

  var emissionsLabel = {
    width: "250.34px",
  };

  return (
    <div>
      <svg
        style={emissionsLabel}
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
      >
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
          points={`${points}`}
          style={{
            fill: `${color}`,
          }}
        />
        <text
          transform={`${textPosition}`}
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
    </div>
  );
}

export default EmissionsLabel;
