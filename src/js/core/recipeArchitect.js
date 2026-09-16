/*
 * GastroSense AI - Autonomous Culinary Alchemist & Recipe Architect
 *
 * Synthesizes avant-garde recipes from chemical volatile pairings and
 * organoleptic balance, integrating molecular gastronomy techniques.
 */

import {
	calculateCosineAffinity,
	getSharedVolatiles
} from './flavorMatrix.js';
import {
	aggregateSensoryProfile,
	calculateHarmonicBalance
} from './sensoryRadar.js';
import { detectAllergens } from './allergenDetector.js';

const MOLECULAR_TECHNIQUES = [
	{
		name: 'Reverse Spherification',
		tool: 'Calcium Lactate Gluconate bath with 0.5% Sodium Alginate',
		temp: 'Ambient (20°C)'
	},
	{
		name: 'Precision Sous-Vide',
		tool: 'Immersion Circulator with vacuum chamber',
		temp: '62.5°C curve'
	},
	{
		name: 'Agar-Agar Fluid Gel',
		tool: 'Thermomix high-shear emulsification post-set',
		temp: 'Set at 35°C, sheared at 4°C'
	},
	{
		name: 'Cryogenic Shatter',
		tool: 'Liquid Nitrogen (-196°C) thermal shock immersion',
		temp: '-196°C shock'
	},
	{
		name: 'Lipid Snow (Maltodextrin)',
		tool: 'Tapioca Z-Maltodextrin fat encapsulation',
		temp: 'Ambient (22°C)'
	}
];

/*
 * Synthesizes an avant-garde dish formulation from selected ingredients.
 */
export function synthesizeDish(ingredients) {
	if (!ingredients || ingredients.length < 2) {
		throw new Error(
			'At least two ingredients required for molecular synthesis.'
		);
	}

	const [primary, secondary] = ingredients;
	const affinity = calculateCosineAffinity(primary, secondary);
	const shared = getSharedVolatiles(primary, secondary);
	const sensory = aggregateSensoryProfile(ingredients);
	const balance = calculateHarmonicBalance(sensory);
	const allergens = detectAllergens(ingredients.map(i => i.id));
	const technique = selectTechnique(primary, secondary);

	return {
		id: `dish_${Date.now()}`,
		title: generateTitle(primary, secondary, technique),
		concept: generateConcept(primary, secondary, shared),
		technique,
		sensoryProfile: sensory,
		harmonicScore: balance.score,
		affinityScore: Number(affinity.toFixed(2)),
		sharedVolatiles: shared,
		allergens,
		thermalProfile: technique.temp,
		sommelierPairing: generateWinePairing(primary, secondary)
	};
}

/*
 * Selects optimal molecular cooking technique based on ingredient properties.
 */
function selectTechnique(primary, secondary) {
	if (primary.category === 'Fruit' || secondary.category === 'Fruit') {
		return MOLECULAR_TECHNIQUES[0]; // Spherification
	}
	if (primary.category === 'Meat' || secondary.category === 'Meat') {
		return MOLECULAR_TECHNIQUES[1]; // Precision sous-vide
	}
	const isConfectionery = primary.category === 'Confectionery' ||
		secondary.category === 'Confectionery';
	if (isConfectionery) {
		return MOLECULAR_TECHNIQUES[4]; // Lipid snow
	}
	return MOLECULAR_TECHNIQUES[2]; // Fluid gel
}

/*
 * Generates avant-garde title reflecting modern high gastronomy style.
 */
function generateTitle(primary, secondary, technique) {
	const prefixes = [
		'Composition of',
		'Study of',
		'Resonance of',
		'Convergence:'
	];
	const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
	const pair = `${primary.name} & ${secondary.name}`;
	return `${randomPrefix} ${pair} (${technique.name})`;
}

/*
 * Formulates culinary storytelling grounded in aromatic chemistry.
 */
function generateConcept(primary, secondary, shared) {
	const sharedText = shared.length > 0
		? `anchored by shared ${shared.join(', ')} volatiles.`
		: 'creating structural tension across organoleptic axes.';
	const pair = `${primary.name} and ${secondary.name}`;
	return `A dialogue between ${pair}, ${sharedText}`;
}

/*
 * Generates neuro-sommelier pairing recommendations.
 */
function generateWinePairing(primary, secondary) {
	if (primary.id === 'caviar' || secondary.id === 'caviar') {
		return 'Blanc de Blancs Grand Cru Champagne 2012 (Chalky minerality)';
	}
	if (primary.id === 'black_truffle' || secondary.id === 'black_truffle') {
		return 'Barolo Monprivato 2015 (Forest floor, tar, dried rose petals)';
	}
	return 'Savennières Chenin Blanc (Dry, oxidized stone fruit, high acid)';
}
