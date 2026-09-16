/*
 * GastroSense AI - Plating Studio & Avant-Garde Composition Engine
 *
 * Implements aesthetic plating mathematics: Golden Ratio spiral overlays,
 * chromatic contrast checking, and culinary substrate positioning.
 */

export const SUBSTRATES = [
	{
		id: 'slate',
		name: 'Volcanic Basalt Slate',
		color: '#16181d',
		textColor: '#fff'
	},
	{
		id: 'porcelain',
		name: 'Limoges Bone Porcelain',
		color: '#f5f3eb',
		textColor: '#1a1a1a'
	},
	{
		id: 'smoked_glass',
		name: 'Smoked Obsidian Glass',
		color: '#0d0e12',
		textColor: '#e5a950'
	}
];

export const PLATING_ELEMENT_TYPES = [
	{
		id: 'gel_swipe',
		name: 'Fluid Gel Brushstroke',
		color: '#e5a950',
		size: 120
	},
	{
		id: 'protein_sphere',
		name: 'Spherified Centerpiece',
		color: '#4ecdc4',
		size: 60
	},
	{
		id: 'herb_oil',
		name: 'Chlorophyll Oil Drops',
		color: '#2ec4b6',
		size: 24
	},
	{
		id: 'crisp_shard',
		name: 'Isomalt Glass Shard',
		color: '#9b5de5',
		size: 45
	},
	{
		id: 'botanical',
		name: 'Foraged Microgreens',
		color: '#70e000',
		size: 30
	}
];

/*
 * Generates initial canvas composition conforming to the Golden Spiral.
 */
export function createBalancedComposition(dishName) {
	return {
		substrateId: 'slate',
		dishName: dishName || 'Avant-Garde Tasting Course',
		elements: [
			{
				id: 'el_1',
				type: 'gel_swipe',
				x: 200,
				y: 190,
				scale: 1.2,
				rotation: -25
			},
			{
				id: 'el_2',
				type: 'protein_sphere',
				x: 260,
				y: 220,
				scale: 1.0,
				rotation: 0
			},
			{
				id: 'el_3',
				type: 'crisp_shard',
				x: 280,
				y: 195,
				scale: 0.9,
				rotation: 45
			},
			{
				id: 'el_4',
				type: 'herb_oil',
				x: 170,
				y: 260,
				scale: 0.8,
				rotation: 0
			},
			{
				id: 'el_5',
				type: 'botanical',
				x: 245,
				y: 240,
				scale: 0.7,
				rotation: 15
			}
		]
	};
}

/*
 * Calculates Golden Ratio spiral guide coordinates for 500x500 canvas.
 */
export function getGoldenSpiralCoordinates(width = 500, height = 500) {
	const cx = width * 0.618;
	const cy = height * 0.618;
	const points = [];
	const turns = 2.5;

	for (let theta = 0; theta < Math.PI * 2 * turns; theta += 0.1) {
		const r = 4 * Math.exp(0.306 * theta);
		const x = cx + r * Math.cos(theta);
		const y = cy + r * Math.sin(theta);
		if (x >= 0 && x <= width && y >= 0 && y <= height) {
			points.push({ x: Math.round(x), y: Math.round(y) });
		}
	}
	return points;
}
