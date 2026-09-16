/*
 * GastroSense AI - Command Palette Controller (Ctrl+K / Cmd+K)
 *
 * Provides rapid keyboard shortcuts for Michelin chefs and mixologists
 * navigating the sensory canvas.
 */

export class CommandPalette {
	constructor(app) {
		this.app = app;
		this.modal = null;
		this.input = null;
		this.list = null;
		this.isOpen = false;
		this.selectedIndex = 0;
		this.commands = this.registerCommands();
		this.buildDOM();
		this.initGlobalShortcuts();
	}

	registerCommands() {
		return [
			{
				id: 'synthesize',
				title: 'Synthesize Avant-Garde Dish',
				action: () => this.app.synthesizeCurrentSelection()
			},
			{
				id: 'spiral',
				title: 'Toggle Golden Ratio Plating Spiral',
				action: () => this.app.togglePlatingSpiral()
			},
			{
				id: 'view_network',
				title: 'Switch View: Molecular Aroma Network',
				action: () => this.app.switchView('network')
			},
			{
				id: 'view_plating',
				title: 'Switch View: Slate Plating Studio',
				action: () => this.app.switchView('plating')
			},
			{
				id: 'slate_substrate',
				title: 'Set Substrate: Volcanic Basalt Slate',
				action: () => this.app.setSubstrate('slate')
			},
			{
				id: 'porcelain_substrate',
				title: 'Set Substrate: Limoges Porcelain',
				action: () => this.app.setSubstrate('porcelain')
			},
			{
				id: 'pricing',
				title: 'Recalculate Menu Margin & Economics',
				action: () => this.app.updateUnitEconomics()
			}
		];
	}

	buildDOM() {
		const modal = document.createElement('dialog');
		modal.id = 'commandPaletteModal';
		modal.className = 'command-palette-dialog';
		modal.innerHTML = `
			<div class="palette-container">
				<input type="text" id="paletteInput" class="palette-search"
					placeholder="Type a command or shortcut..."
					aria-label="Command search" autocomplete="off" />
				<ul id="paletteList" class="palette-list" role="listbox"></ul>
			</div>
		`;
		document.body.appendChild(modal);

		this.modal = modal;
		this.input = modal.querySelector('#paletteInput');
		this.list = modal.querySelector('#paletteList');

		this.input.addEventListener('input', () => this.filterCommands());
		this.input.addEventListener('keydown', e => this.handleKeydown(e));
		this.modal.addEventListener('click', e => {
			if (e.target === this.modal) this.close();
		});
	}

	initGlobalShortcuts() {
		window.addEventListener('keydown', e => {
			const isK = e.key === 'k' || e.key === 'K';
			if ((e.ctrlKey || e.metaKey) && isK) {
				e.preventDefault();
				this.toggle();
			} else if (e.key === 'Escape' && this.isOpen) {
				this.close();
			}
		});
	}

	toggle() {
		if (this.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	open() {
		this.isOpen = true;
		this.selectedIndex = 0;
		this.modal.showModal();
		this.input.value = '';
		this.filterCommands();
		this.input.focus();
	}

	close() {
		this.isOpen = false;
		this.modal.close();
	}

	filterCommands() {
		const query = this.input.value.toLowerCase();
		const matched = this.commands.filter(c =>
			c.title.toLowerCase().includes(query)
		);
		this.renderList(matched);
	}

	renderList(items) {
		this.list.innerHTML = items.map((cmd, idx) => `
			<li class="palette-item ${idx === this.selectedIndex ? 'selected' : ''}"
				role="option" data-index="${idx}"
				aria-selected="${idx === this.selectedIndex}">
				<span>${cmd.title}</span>
				<span class="palette-badge">Action</span>
			</li>
		`).join('');

		this.list.querySelectorAll('.palette-item').forEach((li, idx) => {
			li.addEventListener('click', () => {
				items[idx].action();
				this.close();
			});
		});
	}

	handleKeydown(e) {
		const query = this.input.value.toLowerCase();
		const items = this.commands.filter(c =>
			c.title.toLowerCase().includes(query)
		);

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			this.selectedIndex = (this.selectedIndex + 1) % items.length;
			this.renderList(items);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
			this.renderList(items);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (items[this.selectedIndex]) {
				items[this.selectedIndex].action();
				this.close();
			}
		}
	}
}
