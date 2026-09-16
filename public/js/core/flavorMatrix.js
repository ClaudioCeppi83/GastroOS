/*
 * GastroSense AI - Flavor Science & Molecular Volatiles Engine
 *
 * Grounded in the Foodpairing Hypothesis: ingredients sharing key aromatic
 * volatile compounds interact synergistically on human olfactory receptors.
 */

export const COMPOUND_CLASSES = [
	'pyrazines', // Roasted, nutty, coffee, chocolate
	'terpenes',  // Pine, citrus, herbal, floral
	'esters',    // Fruity, sweet, ripe
	'lactones',  // Creamy, buttery, coconut
	'aldehydes', // Green, grassy, fresh, fatty
	'phenols',   // Smoky, spicy, clove, vanilla
	'sulfur',    // Savory, allium, meat, truffle
	'amines'     // Umami, fermented, marine
];

export const INGREDIENT_DATABASE = [
	{
		id: 'black_truffle',
		name: 'Black Truffle',
		category: 'Fungi',
		volatiles: {
			sulfur: 0.95,
			pyrazines: 0.65,
			phenols: 0.70,
			esters: 0.15,
			aldehydes: 0.40,
			amines: 0.80
		},
		sensory: {
			sweet: 0.1, salty: 0.3, sour: 0.1,
			bitter: 0.4, umami: 0.95, kokumi: 0.9
		}
	},
	{
		id: 'white_chocolate',
		name: 'White Chocolate',
		category: 'Confectionery',
		volatiles: {
			lactones: 0.90,
			esters: 0.50,
			phenols: 0.60,
			pyrazines: 0.30,
			amines: 0.45
		},
		sensory: {
			sweet: 0.85, salty: 0.2, sour: 0.05,
			bitter: 0.05, umami: 0.2, kokumi: 0.85
		}
	},
	{
		id: 'caviar',
		name: 'Oscietra Caviar',
		category: 'Seafood',
		volatiles: {
			amines: 0.95,
			lactones: 0.70,
			sulfur: 0.50,
			aldehydes: 0.60,
			esters: 0.20
		},
		sensory: {
			sweet: 0.05, salty: 0.9, sour: 0.1,
			bitter: 0.15, umami: 0.9, kokumi: 0.8
		}
	},
	{
		id: 'dark_chocolate',
		name: '70% Dark Chocolate',
		category: 'Confectionery',
		volatiles: {
			pyrazines: 0.95,
			phenols: 0.85,
			esters: 0.40,
			lactones: 0.35,
			aldehydes: 0.30
		},
		sensory: {
			sweet: 0.3, salty: 0.05, sour: 0.25,
			bitter: 0.8, umami: 0.3, kokumi: 0.7
		}
	},
	{
		id: 'parmesan',
		name: 'Parmigiano-Reggiano 36M',
		category: 'Dairy',
		volatiles: {
			amines: 0.90,
			pyrazines: 0.75,
			lactones: 0.65,
			sulfur: 0.40,
			aldehydes: 0.35
		},
		sensory: {
			sweet: 0.1, salty: 0.85, sour: 0.2,
			bitter: 0.2, umami: 0.95, kokumi: 0.85
		}
	},
	{
		id: 'coffee',
		name: 'Ethiopian Yirgacheffe',
		category: 'Beverage',
		volatiles: {
			pyrazines: 0.90,
			phenols: 0.75,
			terpenes: 0.60,
			esters: 0.45,
			sulfur: 0.35
		},
		sensory: {
			sweet: 0.15, salty: 0.0, sour: 0.6,
			bitter: 0.75, umami: 0.25, kokumi: 0.5
		}
	},
	{
		id: 'garlic',
		name: 'Black Fermented Garlic',
		category: 'Allium',
		volatiles: {
			sulfur: 0.85,
			pyrazines: 0.80,
			phenols: 0.65,
			esters: 0.40,
			amines: 0.70
		},
		sensory: {
			sweet: 0.6, salty: 0.2, sour: 0.3,
			bitter: 0.2, umami: 0.9, kokumi: 0.85
		}
	},
	{
		id: 'raspberry',
		name: 'Wild Alpine Raspberry',
		category: 'Fruit',
		volatiles: {
			esters: 0.95,
			terpenes: 0.70,
			phenols: 0.55,
			aldehydes: 0.40
		},
		sensory: {
			sweet: 0.6, salty: 0.0, sour: 0.8,
			bitter: 0.1, umami: 0.05, kokumi: 0.2
		}
	},
	{
		id: 'passion_fruit',
		name: 'Purple Passion Fruit',
		category: 'Fruit',
		volatiles: {
			esters: 0.90,
			sulfur: 0.75,
			terpenes: 0.65,
			aldehydes: 0.50
		},
		sensory: {
			sweet: 0.5, salty: 0.0, sour: 0.95,
			bitter: 0.15, umami: 0.05, kokumi: 0.15
		}
	},
	{
		id: 'kombu',
		name: 'Hokkaido Ma-Kombu',
		category: 'Seaweed',
		volatiles: {
			amines: 0.98,
			aldehydes: 0.60,
			phenols: 0.40,
			sulfur: 0.45
		},
		sensory: {
			sweet: 0.1, salty: 0.7, sour: 0.1,
			bitter: 0.1, umami: 1.0, kokumi: 0.9
		}
	},
	{
		id: 'wagyu',
		name: 'A5 Wagyu Ribeye',
		category: 'Meat',
		volatiles: {
			lactones: 0.85,
			aldehydes: 0.80,
			pyrazines: 0.70,
			sulfur: 0.65,
			amines: 0.85
		},
		sensory: {
			sweet: 0.1, salty: 0.3, sour: 0.05,
			bitter: 0.05, umami: 0.95, kokumi: 1.0
		}
	},
	{
		id: 'yuzu',
		name: 'Kochi Yuzu',
		category: 'Citrus',
		volatiles: {
			terpenes: 0.98,
			aldehydes: 0.75,
			esters: 0.55,
			phenols: 0.30
		},
		sensory: {
			sweet: 0.2, salty: 0.0, sour: 0.9,
			bitter: 0.5, umami: 0.05, kokumi: 0.25
		}
	}
];

/*
 * Calculates cosine similarity between volatile aroma vectors of two items.
 * Returns normalized score between 0.0 and 1.0.
 */
export function calculateCosineAffinity(itemA, itemB) {
	let dotProduct = 0;
	let normA = 0;
	let normB = 0;

	for (const comp of COMPOUND_CLASSES) {
		const valA = itemA.volatiles[comp] || 0;
		const valB = itemB.volatiles[comp] || 0;
		dotProduct += valA * valB;
		normA += valA * valA;
		normB += valB * valB;
	}

	if (normA === 0 || normB === 0) return 0;
	const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
	return Math.min(1.0, Math.max(0.0, dotProduct / magnitude));
}

/*
 * Extracts common volatile classes shared between two ingredients.
 */
export function getSharedVolatiles(itemA, itemB, threshold = 0.25) {
	return COMPOUND_CLASSES.filter(comp => {
		const valA = itemA.volatiles[comp] || 0;
		const valB = itemB.volatiles[comp] || 0;
		return valA >= threshold && valB >= threshold;
	});
}

/*
 * Ranks all available ingredients by aromatic affinity with target item.
 */
export function findTopPairings(targetId, limit = 5) {
	const target = INGREDIENT_DATABASE.find(i => i.id === targetId);
	if (!target) return [];

	return INGREDIENT_DATABASE
		.filter(item => item.id !== targetId)
		.map(item => ({
			item,
			score: Number(calculateCosineAffinity(target, item).toFixed(3)),
			sharedCompounds: getSharedVolatiles(target, item),
			category: getAffinityTier(calculateCosineAffinity(target, item))
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);
}

/*
 * Categorizes affinity score into organoleptic relationship tiers.
 */
export function getAffinityTier(score) {
	if (score >= 0.70) return 'Harmonic Resonance';
	if (score >= 0.45) return 'Aromatic Bridge';
	return 'Avant-Garde Contrast';
}
