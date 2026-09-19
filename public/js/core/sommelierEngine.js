/*
 * GastroOS - Sommelier & Wine Pairing Intelligence Engine
 *
 * Combines molecular flavor affinity (Foodpairing Hypothesis) with classical
 * oenology and Bring-Your-Own-Key (BYOK) AI reasoning using Gemini 3.8 Flash.
 */

import { COMPOUND_CLASSES, calculateCosineAffinity } from './flavorMatrix.js';

export const WINE_PROFILES = [
	{
		id: 'pinot_noir_bourgogne',
		name: 'Pinot Noir (Bourgogne)',
		grape: 'Pinot Noir',
		region: 'Burgundy, France',
		style: 'Red',
		body: 'Medium-Light',
		tannins: 'Silky / Low-Medium',
		acidity: 'Bright / High',
		volatiles: {
			esters: 0.90,
			terpenes: 0.65,
			phenols: 0.50,
			lactones: 0.30
		},
		tastingNotes: 'Red cherry, wild strawberry, forest floor, subtle truffle undertones.',
		glassware: { type: 'Burgundy Glass', reason: 'Wide bowl directs delicate red fruit aromas to the olfactory bulb.' },
		servingTemp: '14-16°C'
	},
	{
		id: 'barolo_nebbiolo',
		name: 'Barolo DOCG (Nebbiolo)',
		grape: 'Nebbiolo',
		region: 'Piedmont, Italy',
		style: 'Red',
		body: 'Full / Structured',
		tannins: 'Grippy / High',
		acidity: 'High',
		volatiles: {
			phenols: 0.90,
			pyrazines: 0.70,
			esters: 0.40,
			terpenes: 0.60
		},
		tastingNotes: 'Tar, dried rose petals, leather, dark cherry, white truffle affinity.',
		glassware: { type: 'Nebbiolo / Large Burgundy Glass', reason: 'Allows complex tertiary tertiary aromas and tight tannins to breathe.' },
		servingTemp: '16-18°C'
	},
	{
		id: 'sauvignon_blanc_sancerre',
		name: 'Sancerre (Sauvignon Blanc)',
		grape: 'Sauvignon Blanc',
		region: 'Loire Valley, France',
		style: 'White',
		body: 'Crisp / Light',
		tannins: 'None',
		acidity: 'High / Flinty',
		volatiles: {
			terpenes: 0.95,
			aldehydes: 0.85,
			esters: 0.70,
			pyrazines: 0.40
		},
		tastingNotes: 'Gooseberry, flint, citrus zest, cut grass, chalky minerality.',
		glassware: { type: 'Bordeaux White / Tulip Glass', reason: 'Concentrates volatile terpenes and delivers crisp acidity to the mid-palate.' },
		servingTemp: '8-10°C'
	},
	{
		id: 'chardonnay_meursault',
		name: 'Meursault (Chardonnay)',
		grape: 'Chardonnay',
		region: 'Burgundy, France',
		style: 'White',
		body: 'Full / Creamy',
		tannins: 'Low / Oak-derived',
		acidity: 'Medium-High',
		volatiles: {
			lactones: 0.95,
			pyrazines: 0.65,
			phenols: 0.60,
			esters: 0.50
		},
		tastingNotes: 'Brioche, toasted hazelnut, browned butter, ripe yellow apple.',
		glassware: { type: 'Oaked Chardonnay Glass', reason: 'Wide rim highlights buttery texture and secondary oak lactones.' },
		servingTemp: '10-12°C'
	},
	{
		id: 'champagne_blanc_de_blancs',
		name: 'Champagne Grand Cru (Blanc de Blancs)',
		grape: 'Chardonnay',
		region: 'Champagne, France',
		style: 'Sparkling',
		body: 'Effervescent / Medium',
		tannins: 'None',
		acidity: 'Vibrant / High',
		volatiles: {
			esters: 0.85,
			lactones: 0.70,
			aldehydes: 0.60,
			amines: 0.55
		},
		tastingNotes: 'Autolytic brioche, green apple, lemon curd, chalky salinidad.',
		glassware: { type: 'Tulip Sparkling Glass', reason: 'Preserves delicate perlage while allowing autolytic bouquet expansion.' },
		servingTemp: '7-9°C'
	}
];

export function matchWineToDish(dishVolatiles, limit = 3) {
	if (!dishVolatiles || typeof dishVolatiles !== 'object') {
		throw new Error('Invalid dish volatile profile');
	}

	const dishDummy = { volatiles: dishVolatiles };

	return WINE_PROFILES
		.map(wine => ({
			wine,
			affinityScore: Number(calculateCosineAffinity(dishDummy, wine).toFixed(3)),
			servingTemp: wine.servingTemp,
			glassware: wine.glassware
		}))
		.sort((a, b) => b.affinityScore - a.affinityScore)
		.slice(0, limit);
}

export async function generateSommelierRecommendation({
	dishName,
	dishCategory = 'Main',
	ingredients = [],
	availableWines = [],
	apiKey,
	model = (typeof process !== 'undefined' && (process.env.GEMINI_MODEL || process.env.VITE_GEMINI_MODEL)) || 'gemini-3.8-flash',
	previousThoughtSignature = null
}) {
	if (!apiKey) {
		throw new Error('BYOK API key is required for Gemini AI sommelier recommendations.');
	}

	const promptLines = [
		'Actúa como Master Sommelier de GastroOS de clase mundial.',
		'Proporciona una recomendación de maridaje técnico y molecular para el siguiente plato:',
		'',
		'PLATO:',
		'- Nombre: ' + dishName,
		'- Categoría: ' + dishCategory,
		'- Ingredientes clave: ' + (ingredients.join(', ') || 'Tradicionales'),
		availableWines.length > 0 ? '- Vinos disponibles en bodega: ' + availableWines.join(', ') : '',
		'',
		'INSTRUCCIONES CRÍTICAS:',
		'1. Responde ÚNICAMENTE con un JSON válido sin bloques markdown.',
		'2. Estructura requerida:',
		'{',
		'  "recommendedGrapeVarietals": "Cepa - Perfil aromático descriptivo",',
		'  "wineOptions": [',
		'    { "name": "Nombre productor y etiqueta", "priceRange": "medio", "priceHint": "25-40€", "description": "Justificación" }',
		'  ],',
		'  "wineCharacteristics": { "body": "...", "tannins": "...", "acidity": "...", "tonality": "..." },',
		'  "tastingNotes": "Notas sensoriales",',
		'  "pairingReason": "Explicación de afinidad molecular",',
		'  "servingTemperature": "14-16°C",',
		'  "suitableGlassware": { "type": "...", "description": "..." }',
		'}'
	].filter(Boolean).join('\n');

	const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;

	const requestBody = {
		contents: [
			{
				role: 'user',
				parts: [{ text: promptLines }]
			}
		],
		generationConfig: {
			responseMimeType: 'application/json',
			temperature: 0.3
		}
	};

	if (previousThoughtSignature) {
		requestBody.contents[0].parts.unshift({
			thought: previousThoughtSignature
		});
	}

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody)
	});

	if (!response.ok) {
		const errText = await response.text();
		throw new Error('Gemini API error (' + response.status + '): ' + errText);
	}

	const data = await response.json();
	const candidate = data.candidates?.[0];
	const rawText = candidate?.content?.parts?.[0]?.text;
	const capturedThought = candidate?.content?.parts?.[0]?.thought || candidate?.thought_signature || null;

	if (!rawText) {
		throw new Error('Empty response from Gemini Sommelier Engine');
	}

	const parsed = JSON.parse(rawText);
	return {
		recommendation: parsed,
		thoughtSignature: capturedThought,
		modelUsed: model
	};
}