/*
 * GastroSense AI - Interactive Plating Studio Canvas Renderer
 *
 * Renders culinary components onto ceramic/slate substrates with an optional
 * Golden Ratio logarithmic spiral overlay to evaluate plating balance.
 */

import {
	SUBSTRATES,
	PLATING_ELEMENT_TYPES,
	getGoldenSpiralCoordinates
} from '../core/platingStudio.js';

export class PlatingRenderer {
	constructor(canvasElement) {
		this.canvas = canvasElement;
		this.ctx = canvasElement.getContext('2d');
		this.currentSubstrate = SUBSTRATES[0];
		this.elements = [];
		this.showSpiral = true;
		this.draggedIndex = -1;
		this.initEvents();
	}

	setComposition(composition) {
		const sub = SUBSTRATES.find(s => s.id === composition.substrateId);
		if (sub) this.currentSubstrate = sub;
		this.elements = composition.elements.map(el => ({ ...el }));
		this.draw();
	}

	setSubstrate(substrateId) {
		const sub = SUBSTRATES.find(s => s.id === substrateId);
		if (sub) {
			this.currentSubstrate = sub;
			this.draw();
		}
	}

	toggleSpiral() {
		this.showSpiral = !this.showSpiral;
		this.draw();
		return this.showSpiral;
	}

	initEvents() {
		this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
		window.addEventListener('mousemove', e => this.handleMouseMove(e));
		window.addEventListener('mouseup', () => this.handleMouseUp());
	}

	getMousePos(e) {
		const rect = this.canvas.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) * (this.canvas.width / rect.width),
			y: (e.clientY - rect.top) * (this.canvas.height / rect.height)
		};
	}

	handleMouseDown(e) {
		const pos = this.getMousePos(e);
		for (let i = this.elements.length - 1; i >= 0; i--) {
			const el = this.elements[i];
			const def = PLATING_ELEMENT_TYPES.find(t => t.id === el.type);
			const radius = (def ? def.size : 40) / 2;
			if (Math.hypot(el.x - pos.x, el.y - pos.y) <= radius) {
				this.draggedIndex = i;
				break;
			}
		}
	}

	handleMouseMove(e) {
		if (this.draggedIndex === -1) return;
		const pos = this.getMousePos(e);
		this.elements[this.draggedIndex].x = pos.x;
		this.elements[this.draggedIndex].y = pos.y;
		this.draw();
	}

	handleMouseUp() {
		this.draggedIndex = -1;
	}

	draw() {
		const ctx = this.ctx;
		const w = this.canvas.width;
		const h = this.canvas.height;

		// Draw substrate dish base
		ctx.fillStyle = this.currentSubstrate.color;
		ctx.fillRect(0, 0, w, h);

		// Circular plate rim guide
		ctx.beginPath();
		ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.44, 0, Math.PI * 2);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
		ctx.lineWidth = 3;
		ctx.stroke();

		// Draw plating elements
		for (const el of this.elements) {
			this.drawElement(el);
		}

		// Draw Golden Ratio spiral overlay if active
		if (this.showSpiral) {
			this.drawGoldenSpiral(w, h);
		}
	}

	drawElement(el) {
		const ctx = this.ctx;
		const def = PLATING_ELEMENT_TYPES.find(t => t.id === el.type);
		const color = def ? def.color : '#e5a950';

		ctx.save();
		ctx.translate(el.x, el.y);
		ctx.rotate((el.rotation || 0) * (Math.PI / 180));
		ctx.scale(el.scale || 1, el.scale || 1);

		if (el.type === 'gel_swipe') {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.ellipse(0, 0, 50, 18, -0.3, 0, Math.PI * 2);
			ctx.fill();
		} else if (el.type === 'protein_sphere') {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(0, 0, 24, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 1.5;
			ctx.stroke();
		} else {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(0, 0, 10, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	}

	drawGoldenSpiral(w, h) {
		const points = getGoldenSpiralCoordinates(w, h);
		if (points.length < 2) return;

		const ctx = this.ctx;
		ctx.save();
		ctx.strokeStyle = 'rgba(229, 169, 80, 0.35)';
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			ctx.lineTo(points[i].x, points[i].y);
		}
		ctx.stroke();
		ctx.restore();
	}
}
