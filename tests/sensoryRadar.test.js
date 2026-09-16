import test from 'node:test';
import assert from 'node:assert';
import {
	aggregateSensoryProfile,
	calculateHarmonicBalance,
	generateRadarPolygonPoints
} from '../src/js/core/sensoryRadar.js';

test('Sensory Radar: handles empty ingredient list gracefully', () => {
	const profile = aggregateSensoryProfile([]);
	assert.strictEqual(profile.sweet, 0);
	assert.strictEqual(profile.umami, 0);
});

test('Sensory Radar: aggregates mean sensory profiles correctly', () => {
	const ingredients = [
		{
			sensory: {
				sweet: 0.8, salty: 0.2, sour: 0.1,
				bitter: 0.0, umami: 0.2, kokumi: 0.8
			}
		},
		{
			sensory: {
				sweet: 0.2, salty: 0.8, sour: 0.1,
				bitter: 0.0, umami: 0.8, kokumi: 0.2
			}
		}
	];

	const profile = aggregateSensoryProfile(ingredients);
	assert.strictEqual(profile.sweet, 0.5);
	assert.strictEqual(profile.salty, 0.5);
	assert.strictEqual(profile.umami, 0.5);
});

test('Sensory Radar: calculates balance and flags palate fatigue', () => {
	const balanced = {
		sweet: 0.4, salty: 0.4, sour: 0.3,
		bitter: 0.3, umami: 0.4, kokumi: 0.4
	};
	const resBalanced = calculateHarmonicBalance(balanced);
	assert.ok(resBalanced.score > 80, 'Even profile has high score');
	assert.strictEqual(resBalanced.fatigueRisk, false);

	const fatigued = {
		sweet: 0.95, salty: 0.1, sour: 0.0,
		bitter: 0.0, umami: 0.1, kokumi: 0.1
	};
	const resFatigued = calculateHarmonicBalance(fatigued);
	assert.strictEqual(resFatigued.fatigueRisk, true);
	assert.strictEqual(resFatigued.dominantAxis, 'sweet');
});

test('Sensory Radar: produces valid SVG polygon coordinate points', () => {
	const sensory = {
		sweet: 0.5, salty: 0.5, sour: 0.5,
		bitter: 0.5, umami: 0.5, kokumi: 0.5
	};
	const points = generateRadarPolygonPoints(sensory, 100, 100, 80);
	const coords = points.split(' ');
	assert.strictEqual(coords.length, 6, 'Must generate 6 polygon vertices');
});
