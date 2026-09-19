import test from 'node:test';
import assert from 'node:assert/strict';
import { matchWineToDish, WINE_PROFILES } from '../src/js/core/sommelierEngine.js';

test('Sommelier Engine: WINE_PROFILES contains well-formed wine definitions', () => {
	assert.ok(WINE_PROFILES.length >= 5);
	for (const wine of WINE_PROFILES) {
		assert.ok(wine.id);
		assert.ok(wine.name);
		assert.ok(wine.grape);
		assert.ok(wine.servingTemp);
		assert.ok(wine.glassware.type);
		assert.ok(typeof wine.volatiles === 'object');
	}
});

test('Sommelier Engine: matchWineToDish pairs earthy/truffle profile with structured red', () => {
	const truffleVolatiles = {
		sulfur: 0.95,
		pyrazines: 0.70,
		phenols: 0.80,
		esters: 0.20
	};

	const pairings = matchWineToDish(truffleVolatiles, 2);
	assert.equal(pairings.length, 2);
	assert.ok(pairings[0].affinityScore > 0);
	// High phenols and pyrazines should resonate with Barolo (Nebbiolo)
	assert.equal(pairings[0].wine.id, 'barolo_nebbiolo');
});

test('Sommelier Engine: matchWineToDish pairs citrus/herbal profile with crisp white', () => {
	const citrusHerbalVolatiles = {
		terpenes: 0.90,
		aldehydes: 0.80,
		esters: 0.60
	};

	const pairings = matchWineToDish(citrusHerbalVolatiles, 2);
	assert.equal(pairings.length, 2);
	assert.equal(pairings[0].wine.id, 'sauvignon_blanc_sancerre');
});

test('Sommelier Engine: throws if invalid volatile profile provided', () => {
	assert.throws(() => matchWineToDish(null), /Invalid dish volatile profile/);
	assert.throws(() => matchWineToDish('invalid'), /Invalid dish volatile profile/);
});