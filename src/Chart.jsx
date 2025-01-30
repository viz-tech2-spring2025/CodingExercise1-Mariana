import * as d3 from "d3";

export function Chart({ data }) {
  const clean = data
    .map((d, i) => ({
      country: d["Country Name"],
      area: d["2022"],
    }))
    .sort((a, b) => b.area - a.area)
    .slice(0, 20);

  const countries = clean.map((d) => d.country);

  console.log(clean);

  // const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const width = 800;
  const height = 600;
  const marginRight = 40;
  const marginTop = 20;
  const marginBottom = 50;
  const marginLeft = 200;

  const x = d3
    .scaleLinear()
    .domain([0, 100])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleBand()
    .domain(countries)
    .range([marginTop, height - marginBottom])
    .padding(0.5);

  // Filter and process the data

  return (
    <div>
      <h2>
        Top 20 Countries with Largest Terrestrial and Marine Protected Areas
      </h2>
      <svg width={width} height={height}>
        {/* Protected Area Bars */}
        {clean.map((d) => (
          <g key={d}>
            <rect
              key={d}
              x={x(0)}
              y={y(d.country)}
              height={20}
              width={width - x(0) - marginRight}
              fill="#e8f1e4"
              rx="5"
              ry="5"
            />
            <rect
              x={x(0)}
              y={y(d.country)}
              height={20}
              width={x(d.area) - x(0)}
              fill="#53c79e"
              rx="5"
              ry="5"
            />
          </g>
        ))}
        {/* Y Axis (Left) */}
        <g>
          {y.domain().map((tick) => (
            <text
              textAnchor="end"
              dominantBaseline="middle"
              fill="black"
              y={y(tick) - y.bandwidth() / 2}
              x={-10}
              key={tick}
              transform={`translate(${marginLeft}, ${marginTop})`}
            >
              {tick}
            </text>
          ))}
        </g>
        {/* X Axis (Bottom) */}
        <g transform={`translate(0, ${height - marginBottom})`}>
          {x.ticks().map((tick, i) => {
            if (i % 2 != 0) {
              return (
                <g key={tick}>
                  <line
                    x1={x(tick)}
                    x2={x(tick)}
                    y1={-height - marginTop - marginBottom}
                    y2={10}
                    stroke="#49af8b"
                    strokeDasharray="4 8"
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="black"
                    x={x(tick)}
                    y={30}
                    key={tick}
                  >
                    {tick}%
                  </text>
                </g>
              );
            }
          })}
        </g>
      </svg>
      <p>Percentage of total area</p>
    </div>
  );
}
