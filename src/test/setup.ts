import "@testing-library/jest-dom/vitest";

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
	value: () => ({
		clearRect: () => {},
		fillRect: () => {},
		beginPath: () => {},
		arc: () => {},
		fill: () => {},
		createRadialGradient: () => ({
			addColorStop: () => {},
		}),
		shadowBlur: 0,
		shadowColor: "",
		fillStyle: "",
	}),
	configurable: true,
});