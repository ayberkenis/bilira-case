/**
 * `DecreasingSvg` is a React component that renders an SVG icon representing a decreasing trend (arrow pointing downwards).
 * The icon is styled with a red color and rotated to indicate a decrease.
 *
 * @component
 * @returns {JSX.Element} The rendered SVG icon for decreasing trend.
 */
export const DecreasingSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-4 w-4 text-red-500 rotate-[135deg]"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				fillRule="evenodd"
				d="M12 20.25a.75.75 0 01-.75-.75V4.31l-5.22 5.22a.75.75 0 11-1.06-1.06l6.5-6.5a.75.75 0 011.06 0l6.5 6.5a.75.75 0 01-1.06 1.06l-5.22-5.22v15.19a.75.75 0 01-.75.75z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

/**
 * `IncreasingSvg` is a React component that renders an SVG icon representing an increasing trend (arrow pointing upwards).
 * The icon is styled with a green color and rotated to indicate an increase.
 *
 * @component
 * @returns {JSX.Element} The rendered SVG icon for increasing trend.
 */
export const IncreasingSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-4 w-4 text-green-500 -rotate-[135deg]"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				fillRule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v15.19l5.22-5.22a.75.75 0 111.06 1.06l-6.5 6.5a.75.75 0 01-1.06 0l-6.5-6.5a.75.75 0 111.06-1.06l5.22 5.22V4.5a.75.75 0 01.75-.75z"
				clipRule="evenodd"
			/>
		</svg>
	);
};

/**
 * `StableSvg` is a React component that renders an SVG icon representing a stable trend (a horizontal line).
 * The icon is styled with a black color and rotated to indicate stability.
 *
 * @component
 * @returns {JSX.Element} The rendered SVG icon for stable trend.
 */
export const StableSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-4 w-4 text-black rotate-90"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				fillRule="evenodd"
				d="M12 3.75a.75.75 0 01.75.75v15.19a.75.75 0 01-1.5 0V4.5a.75.75 0 01.75-.75z"
				clipRule="evenodd"
			/>
		</svg>
	);
};
