import "../../assets/css/common.css";
/**
 * `Loading` is a React component that displays a loading spinner.
 * It is typically used to indicate that data or a component is in the process of loading.
 *
 * @component
 * @returns {JSX.Element} The rendered loading spinner.
 */
export default function Loading(): JSX.Element {
	return (
		<div className="loading-container">
			<div className="loading-spinner"></div>
		</div>
	);
}
