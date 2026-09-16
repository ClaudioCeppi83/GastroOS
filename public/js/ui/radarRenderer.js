/*
 * GastroSense AI - Dynamic Sensory Radar Renderer (SVG)
 *
 * Renders the 6-axis organoleptic hexagon radar directly onto an SVG canvas.
 */

import {
	SENSORY_AXES,
	generateRadarPolygonPoints
} from '../core/sensoryRadar.js';

export class RadarRenderer {
	constructor(containerElement, size = 260) {
		this.container = containerElement;
		this.size = size;
		this.center = size / 2;
		this.radius = (size / 2) - 35;
	}

	render(sensory) {
		if (!this.container) return;
		const points = generateRadarPolygonPoints(
			sensory,
			this.center,
			this.center,
			this.radius
		);
		const gridCircles = [0.25, 0.5, 0.75, 1.0].map(r => `
			<circle cx="${this.center}" cy="${this.center}"
				r="${this.radius * r}" fill="none"
				stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
		`).join('');

		const count = SENSORY_AXES.length;
		const step = (Math.PI * 2) / count;
		const axisLines = SENSORY_AXES.map((axis, i) => {
			const angle = i * step - Math.PI / 2;
			const x = this.center + this.radius * Math.cos(angle);
			const y = this.center + this.radius * Math.sin(angle);
			const lx = this.center + (this.radius + 18) * Math.cos(angle);
			const ly = this.center + (this.radius + 18) * Math.sin(angle);
			return `
				<line x1="${this.center}" y1="${this.center}"
					x2="${x}" y2="${y}" stroke="rgba(255, 255, 255, 0.12)" />
				<text x="${lx}" y="${ly}" fill="#8e95a5" font-size="10"
					text-anchor="middle" dominant-baseline="middle"
					font-family="JetBrains Mono, monospace">
					${axis.toUpperCase()}
				</text>
			`;
		}).join('');

		this.container.innerHTML = `
			<svg width="${this.size}" height="${this.size}"
				viewBox="0 0 ${this.size} ${this.size}">
				<defs>
					<radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stop-color="#e5a950" stop-opacity="0.45" />
						<stop offset="100%" stop-color="#9b5de5" stop-opacity="0.15" />
					</radialGradient>
				</defs>
				${gridCircles}
				${axisLines}
				<polygon points="${points}" fill="url(#radarGrad)"
					stroke="#e5a950" stroke-width="2" />
			</svg>
		`;
	}
}
