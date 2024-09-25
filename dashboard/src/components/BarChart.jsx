import { mockBarData as data } from "../constants/mockData";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ isDashboard}) => {

    return (
        <ResponsiveBar
            data={data}
            theme={{
                // added
                axis: {
                    domain: {
                        line: {
                            stroke: "#000000",
                        },
                    },
                    legend: {
                        text: {
                            fill: "#000000",
                        },
                    },
                    ticks: {
                        line: {
                            stroke: "#000000",
                            strokeWidth: 1,
                        },
                        text: {
                            fill: "#000000",
                        },
                    },
                },
                legends: {
                    text: {
                        fill: "#000000",
                    },
                },
            }}
            keys={["doctor", "appointment", "message", "patient"]}
            indexBy="month"
            padding={0.4}
            colors={{ scheme: "dark2" }}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            margin={{ top: 50, right: 130, bottom: 50, left: 50 }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            borderColor={{
                from: "color",
                modifiers: [["darker", "1.6"]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "mois", // changed
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 40,
                legend: isDashboard ? undefined : "patient", // changed
                legendPosition: "middle",
                legendOffset: -40,
            }}
            enableLabel={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            tooltip={({ id, value, color }) => (
                <div
                    style={{
                        padding: '12px 16px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        borderRadius: '4px',
                    }}
                >
                    <strong style={{ color }}>{id}</strong>: {value}
                </div>
            )}
            role="application"
            barAriaLabel={function (e) {
                return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
            }}
        />
    );
};

export default BarChart;