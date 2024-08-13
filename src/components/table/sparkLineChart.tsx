import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

/**
 * `SparkLineChart` renders a sparkline chart using the provided data.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {number[] | undefined} props.data - The array of numbers representing the data points for the sparkline.
 * @param {string} [props.color] - Optional. The color of the sparkline line.
 * @returns {JSX.Element} The rendered sparkline chart.
 */
export default function SparkLineChart({ data, color }: { data: number[] | undefined; color?: string }): JSX.Element {
	return (
		<Sparklines data={data} limit={10} width={100} height={20} margin={5}>
			<SparklinesLine color={color} />
		</Sparklines>
	);
}
