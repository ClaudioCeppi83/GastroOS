/*
 * GastroSense AI - Sensory Radar & Organoleptic Equilibrium Engine
 *
 * Models taste receptor stimulation across the 6 foundational culinary axes:
 * Sweetness, Salinity, Acidity, Bitterness, Umami, and Kokumi.
 */

export const SENSORY_AXES = [
	'sweet',
	'salty',
	'sour',
	'bitter',
	'umami',
	'kokumi'
];

/*
 * Calculates weighted aggregate sensory values for a selection of ingredients.
 */
export function aggregateSensoryProfile(ingredients) {
	if (!ingredients || ingredients.length === 0) {
		return { sweet: 0, salty: 0, sour: 0, bitter: 0, umami: 0, kokumi: 0 };
	}

	const result = {};
	for (const axis of SENSORY_AXES) {
		let total = 0;
		for (const ing of ingredients) {
			total += (ing.sensory && ing.sensory[axis]) || 0;
		}
		result[axis] = Number((total / ingredients.length).toFixed(3));
	}
	return result;
}

/*
 * Computes Harmonic Balance Index (0 to 100) and Palate Fatigue indicators.
 * A high standard deviation means an overwhelming single taste sensation.
 */
export function calculateHarmonicBalance(sensory) {
	const values = SENSORY_AXES.map(axis => sensory[axis] || 0);
	const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
	const variance = values.reduce((sum, v) =>
		sum + Math.pow(v - mean, 2), 0) / values.length;
	const stdDev = Math.sqrt(variance);

	const balanceScore = Math.max(
		0,
		Math.min(100, Math.round((1 - stdDev) * 100))
	);
	const fatigueAxis = SENSORY_AXES.find(axis => (sensory[axis] || 0) >= 0.85);

	return {
		score: balanceScore,
		mean: Number(mean.toFixed(2)),
		isEquilibrated: balanceScore >= 60,
		fatigueRisk: Boolean(fatigueAxis),
		dominantAxis: fatigueAxis || null
	};
}

/*
 * Converts normalized sensory axes into 2D polygon SVG coordinate string.
 */
export function generateRadarPolygonPoints(sensory, centerX, centerY, radius) {
	const count = SENSORY_AXES.length;
	const step = (Math.PI * 2) / count;

	return SENSORY_AXES.map((axis, i) => {
		const intensity = sensory[axis] || 0;
		const angle = i * step - Math.PI / 2;
		const r = radius * Math.min(1.0, Math.max(0.05, intensity));
		const x = (centerX + r * Math.cos(angle)).toFixed(1);
		const y = (centerY + r * Math.sin(angle)).toFixed(1);
		return `${x},${y}`;
	}).join(' ');
}
