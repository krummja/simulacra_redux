"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StagePanel = void 0;
const rect_1 = require("../../engine/stage/rect");
const panel_1 = require("./panel");
const map_1 = require("../../engine/core/map");
const container_1 = require("../../engine/core/container");
const mod_1 = require("../util/mod");
const mapService = container_1.container.get("MapService");
class StagePanel extends panel_1.Panel {
    constructor(screen, x, y, width, height) {
        super(screen);
        this.screen = screen;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._cameraBounds = null;
        this._renderOffset = { x: 0, y: 0 };
        this.bounds = new rect_1.Rect(this.x, this.y, this.width, this.height);
    }
    renderPanel(terminal) {
        let display = terminal['terminal'];
        this._positionCamera(terminal.size);
        for (let x = 0; x < this._cameraBounds.w; x++) {
            for (let y = 0; y < this._cameraBounds.h; y++) {
                let tile = map_1.Map.getTile(mapService.getCurrent(), { x: x, y: y });
                this.drawStageGlyph(terminal, x, y, tile.glyph);
            }
        }
    }
    // Draws [Glyph] at [x], [y] in [Stage] coordinates onto the current view.
    drawStageGlyph(terminal, x, y, glyph) {
        this._drawStageGlyph(terminal, x + this.bounds.x, y + this.bounds.y, glyph);
    }
    _drawStageGlyph(terminal, x, y, glyph) {
        let display = terminal['terminal'];
        display.draw(x, y, glyph.character, glyph.foreground, glyph.background);
    }
    _positionCamera(size) {
        let game = this.screen.game;
        let rangeWidth = Math.max(0, game.stage.width - size.x);
        let rangeHeight = Math.max(0, game.stage.height - size.y);
        let cameraRange = new rect_1.Rect(0, 0, rangeWidth, rangeHeight);
        let camera = { x: game.player.pos.x - mod_1.mod(size.x, 2), y: game.player.pos.y - mod_1.mod(size.y, 2) };
        camera = cameraRange.clamp(camera);
        this._cameraBounds = new rect_1.Rect(camera.x, camera.y, Math.min(size.x, game.stage.width), Math.min(size.y, game.stage.height));
        this._renderOffset = {
            x: mod_1.mod(Math.max(0, size.x - game.stage.width), 2),
            y: mod_1.mod(Math.max(0, size.y - game.stage.height), 2)
        };
    }
    update(events) {
        for (const event in events) { }
        // This will be for animation rendering...
        return false;
    }
}
exports.StagePanel = StagePanel;
