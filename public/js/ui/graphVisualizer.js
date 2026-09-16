/*
 * GastroSense AI - Interactive Volatile Aroma Network Graph
 *
 * Implements a lightweight spring-force simulation visualizing chemical
 * affinity bonds between selected culinary ingredients.
 */

import { calculateCosineAffinity } from '../core/flavorMatrix.js';

export class FlavorGraphVisualizer {
	constructor(canvasElement) {
		this.canvas = canvasElement;
		this.ctx = canvasElement.getContext('2d');
		this.nodes = [];
		this.edges = [];
		this.isRunning = false;
		this.draggedNode = null;
		this.initEvents();
	}

	setIngredients(ingredients) {
		const width = this.canvas.width;
		const height = this.canvas.height;
		this.nodes = ingredients.map((ing, i) => {
			const angle = (i / ingredients.length) * Math.PI * 2;
			const radius = Math.min(width, height) * 0.32;
			return {
				id: ing.id,
				name: ing.name,
				category: ing.category,
				data: ing,
				x: (width / 2) + Math.cos(angle) * radius,
				y: (height / 2) + Math.sin(angle) * radius,
				vx: 0,
				vy: 0,
				radius: 20
			};
		});

		this.computeEdges();
		if (!this.isRunning) {
			this.isRunning = true;
			this.loop();
		}
	}

	computeEdges() {
		this.edges = [];
		for (let i = 0; i < this.nodes.length; i++) {
			for (let j = i + 1; j < this.nodes.length; j++) {
				const nodeA = this.nodes[i];
				const nodeB = this.nodes[j];
				const affinity = calculateCosineAffinity(nodeA.data, nodeB.data);
				if (affinity > 0.3) {
					this.edges.push({
						source: nodeA,
						target: nodeB,
						weight: affinity
					});
				}
			}
		}
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
		for (const node of this.nodes) {
			const dist = Math.hypot(node.x - pos.x, node.y - pos.y);
			if (dist <= node.radius) {
				this.draggedNode = node;
				break;
			}
		}
	}

	handleMouseMove(e) {
		if (!this.draggedNode) return;
		const pos = this.getMousePos(e);
		this.draggedNode.x = pos.x;
		this.draggedNode.y = pos.y;
	}

	handleMouseUp() {
		this.draggedNode = null;
	}

	updatePhysics() {
		const cx = this.canvas.width / 2;
		const cy = this.canvas.height / 2;

		for (const node of this.nodes) {
			if (node === this.draggedNode) continue;
			// Centering force
			node.vx += (cx - node.x) * 0.005;
			node.vy += (cy - node.y) * 0.005;

			// Node repulsion
			for (const other of this.nodes) {
				if (node === other) continue;
				const dx = node.x - other.x;
				const dy = node.y - other.y;
				const dist = Math.hypot(dx, dy) || 1;
				if (dist < 100) {
					const force = (100 - dist) / 100;
					node.vx += (dx / dist) * force * 0.6;
					node.vy += (dy / dist) * force * 0.6;
				}
			}

			// Edge spring contraction
			for (const edge of this.edges) {
				if (edge.source === node || edge.target === node) {
					const other = edge.source === node ? edge.target : edge.source;
					const dx = other.x - node.x;
					const dy = other.y - node.y;
					const dist = Math.hypot(dx, dy) || 1;
					const desired = 140 * (1 - edge.weight * 0.5);
					const delta = dist - desired;
					node.vx += (dx / dist) * delta * 0.015;
					node.vy += (dy / dist) * delta * 0.015;
				}
			}

			node.x += node.vx;
			node.y += node.vy;
			node.vx *= 0.85;
			node.vy *= 0.85;
		}
	}

	draw() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw affinity edges
		for (const edge of this.edges) {
			ctx.beginPath();
			ctx.moveTo(edge.source.x, edge.source.y);
			ctx.lineTo(edge.target.x, edge.target.y);
			ctx.strokeStyle = `rgba(229, 169, 80, ${edge.weight * 0.7})`;
			ctx.lineWidth = Math.max(1, edge.weight * 4);
			ctx.stroke();
		}

		// Draw nodes
		for (const node of this.nodes) {
			ctx.beginPath();
			ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
			ctx.fillStyle = '#161922';
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#e5a950';
			ctx.stroke();

			ctx.fillStyle = '#f7f8f9';
			ctx.font = '11px Inter, sans-serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(node.name, node.x, node.y + 28);
		}
	}

	loop() {
		this.updatePhysics();
		this.draw();
		requestAnimationFrame(() => this.loop());
	}
}
