/*
 * GastroSense AI - Master Application Controller
 *
 * Coordinates culinary state, sensory computations, interactive visualizers,
 * and command palette interactions for avant-garde food design.
 */

import {
	INGREDIENT_DATABASE,
	findTopPairings
} from './core/flavorMatrix.js';
import {
	aggregateSensoryProfile,
	calculateHarmonicBalance
} from './core/sensoryRadar.js';
import { synthesizeDish } from './core/recipeArchitect.js';
import { createBalancedComposition } from './core/platingStudio.js';
import { detectAllergens } from './core/allergenDetector.js';
import {
	calculatePortionCost,
	calculateFoodCostPct,
	suggestMenuPrice,
	evaluateMenuCategory
} from './core/unitEconomics.js';
import { FlavorGraphVisualizer } from './ui/graphVisualizer.js';
import { RadarRenderer } from './ui/radarRenderer.js';
import { PlatingRenderer } from './ui/platingRenderer.js';
import { CommandPalette } from './ui/commandPalette.js';

class GastroSenseApp {
	constructor() {
		this.selectedIngredients = [
			INGREDIENT_DATABASE.find(i => i.id === 'black_truffle'),
			INGREDIENT_DATABASE.find(i => i.id === 'caviar')
		].filter(Boolean);

		this.activeView = 'network';
		this.currentDish = null;
		this.graphVis = null;
		this.radarRen = null;
		this.platingRen = null;
		this.commandPalette = null;
	}

	init() {
		this.initDOM();
		this.initVisualizers();
		this.renderIngredientDrawer();
		this.updateSensoryAnalytics();
		this.synthesizeCurrentSelection();
		this.commandPalette = new CommandPalette(this);
	}

	initDOM() {
		// Navigation tabs
		document.querySelectorAll('.nav-tab').forEach(tab => {
			tab.addEventListener('click', e => {
				const view = e.currentTarget.dataset.view;
				this.switchView(view);
			});
		});

		// Synthesize button
		const synthBtn = document.getElementById('btnSynthesize');
		if (synthBtn) {
			synthBtn.addEventListener('click', () => {
				this.synthesizeCurrentSelection();
			});
		}

		// Toggle spiral button
		const spiralBtn = document.getElementById('btnToggleSpiral');
		if (spiralBtn) {
			spiralBtn.addEventListener('click', () => {
				this.togglePlatingSpiral();
			});
		}
	}

	initVisualizers() {
		const graphCanvas = document.getElementById('graphCanvas');
		if (graphCanvas) {
			this.graphVis = new FlavorGraphVisualizer(graphCanvas);
			this.graphVis.setIngredients(this.selectedIngredients);
		}

		const radarContainer = document.getElementById('radarContainer');
		if (radarContainer) {
			this.radarRen = new RadarRenderer(radarContainer, 260);
		}

		const platingCanvas = document.getElementById('platingCanvas');
		if (platingCanvas) {
			this.platingRen = new PlatingRenderer(platingCanvas);
			const comp = createBalancedComposition('Avant-Garde Tasting Course');
			this.platingRen.setComposition(comp);
		}
	}

	renderIngredientDrawer() {
		const container = document.getElementById('ingredientList');
		if (!container) return;

		container.innerHTML = INGREDIENT_DATABASE.map(item => {
			const isSel = this.selectedIngredients.some(i => i.id === item.id);
			return `
				<div class="ingredient-item ${isSel ? 'selected' : ''}"
					data-id="${item.id}" tabindex="0" role="checkbox"
					aria-checked="${isSel}">
					<span class="ing-name">${item.name}</span>
					<span class="ing-cat">${item.category}</span>
				</div>
			`;
		}).join('');

		container.querySelectorAll('.ingredient-item').forEach(el => {
			el.addEventListener('click', () => {
				const id = el.dataset.id;
				this.toggleIngredient(id);
			});
		});
	}

	toggleIngredient(id) {
		const exists = this.selectedIngredients.some(i => i.id === id);
		if (exists) {
			if (this.selectedIngredients.length <= 2) return;
			this.selectedIngredients = this.selectedIngredients.filter(
				i => i.id !== id
			);
		} else {
			const item = INGREDIENT_DATABASE.find(i => i.id === id);
			if (item) this.selectedIngredients.push(item);
		}

		this.renderIngredientDrawer();
		this.updateSensoryAnalytics();
		if (this.graphVis) {
			this.graphVis.setIngredients(this.selectedIngredients);
		}
	}

	updateSensoryAnalytics() {
		const sensory = aggregateSensoryProfile(this.selectedIngredients);
		const balance = calculateHarmonicBalance(sensory);

		if (this.radarRen) {
			this.radarRen.render(sensory);
		}

		// Update numerical telemetry
		const scoreEl = document.getElementById('metricHarmonicScore');
		if (scoreEl) scoreEl.textContent = `${balance.score} / 100`;

		const fatigueEl = document.getElementById('metricPalateFatigue');
		if (fatigueEl) {
			fatigueEl.textContent = balance.fatigueRisk
				? `Warning (${balance.dominantAxis})`
				: 'Equilibrated';
			fatigueEl.style.color = balance.fatigueRisk ? '#ff6b6b' : '#4ecdc4';
		}

		// Update allergen tags
		const ids = this.selectedIngredients.map(i => i.id);
		const allergens = detectAllergens(ids);
		const allergenEl = document.getElementById('allergenTags');
		if (allergenEl) {
			allergenEl.innerHTML = allergens.length > 0
				? allergens.map(a => `<span class="allergen-pill">${a}</span>`).join('')
				: '<span class="allergen-pill clean">14 EU Free</span>';
		}

		this.updateUnitEconomics();
	}

	updateUnitEconomics() {
		const ingredientsWithCosts = this.selectedIngredients.map(i => ({
			name: i.name,
			costPerPortion: i.category === 'Seafood' ? 14 : 4.5
		}));

		const cost = calculatePortionCost(ingredientsWithCosts, 8);
		const price = suggestMenuPrice(cost, 28);
		const costPct = calculateFoodCostPct(cost, price);
		const category = evaluateMenuCategory(costPct, price - cost);

		const costEl = document.getElementById('metricPortionCost');
		if (costEl) costEl.textContent = `€${cost.toFixed(2)}`;

		const priceEl = document.getElementById('metricMenuPrice');
		if (priceEl) priceEl.textContent = `€${price.toFixed(2)}`;

		const catEl = document.getElementById('metricMenuCategory');
		if (catEl) catEl.textContent = category;
	}

	synthesizeCurrentSelection() {
		if (this.selectedIngredients.length < 2) return;
		this.currentDish = synthesizeDish(this.selectedIngredients);

		const titleEl = document.getElementById('recipeTitle');
		if (titleEl) titleEl.textContent = this.currentDish.title;

		const conceptEl = document.getElementById('recipeConcept');
		if (conceptEl) conceptEl.textContent = this.currentDish.concept;

		const techNameEl = document.getElementById('techName');
		if (techNameEl) techNameEl.textContent = this.currentDish.technique.name;

		const techTempEl = document.getElementById('techTemp');
		if (techTempEl) techTempEl.textContent = this.currentDish.thermalProfile;

		const wineEl = document.getElementById('techWine');
		if (wineEl) wineEl.textContent = this.currentDish.sommelierPairing;
	}

	switchView(viewName) {
		this.activeView = viewName;
		document.querySelectorAll('.nav-tab').forEach(t => {
			t.classList.toggle('active', t.dataset.view === viewName);
		});

		const netContainer = document.getElementById('networkView');
		const plateContainer = document.getElementById('platingView');

		if (netContainer && plateContainer) {
			netContainer.style.display = viewName === 'network' ? 'flex' : 'none';
			plateContainer.style.display = viewName === 'plating' ? 'flex' : 'none';
		}
	}

	togglePlatingSpiral() {
		if (this.platingRen) {
			this.platingRen.toggleSpiral();
		}
	}

	setSubstrate(substrateId) {
		if (this.platingRen) {
			this.platingRen.setSubstrate(substrateId);
		}
	}
}

// Instantiate and start application on DOM readiness
window.addEventListener('DOMContentLoaded', () => {
	const app = new GastroSenseApp();
	app.init();
});
