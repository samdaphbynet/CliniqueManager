import { mockLineData as data } from "../constants/mockData";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({isDashboard}) => {

    return (
        <ResponsiveLine
            data={data}
            theme={{
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
                tooltip: {
                    container: {
                        color: "#000000",
                    },
                },
            }}
            colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
            margin={{ top: 50, right: 110, bottom: 50, left: 320 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: "bottom",
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "Department", // added
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5, // added
                tickSize: 4,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : "count", // added
                legendOffset: -40,
                legendPosition: "middle",
            }}
            enableGridX={true}
            enableGridY={true}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemBackground: "rgba(0, 0, 0, .03)",
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default LineChart;