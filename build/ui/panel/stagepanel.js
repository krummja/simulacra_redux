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
        this.bounds = new rect_1.Rect(this.x, this.y, this.width, this.height);
    }
    renderPanel(terminal) {
        let display = terminal['terminal'];
        this._positionCamera(terminal.size);
        let game = this.screen.game;
        let character = game.subject;
        let map = mapService.getCurrent();
        let topLeftX = Math.max(0, 50 - (200 / 2));
        topLeftX = Math.min(topLeftX, map.width - terminal.size.x);
        let topLeftY = Math.max(0, 28 - (terminal.size.y / 2));
        topLeftY = Math.min(topLeftY, 100 - 48);
        for (let x = topLeftX; x < topLeftX + 200; x++) {
            for (let y = topLeftY; y < topLeftY + 48; y++) {
                let tile = map_1.Map.getTile(map, { x: x, y: y });
                display.draw(x - topLeftX, y - topLeftY, tile.glyph.character, tile.glyph.foreground, tile.glyph.background);
            }
        }
    }
    drawStageGlyph(terminal, x, y, glyph) {
        this._drawStageGlyph(terminal, x + this.bounds.x, y + this.bounds.y, glyph);
    }
    _drawStageGlyph(terminal, x, y, glyph) {
        let display = terminal['terminal'];
        display.draw(x - this._cameraBounds.x + this._renderOffset.x, y - this._cameraBounds.y + this._renderOffset.y, glyph.character, glyph.foreground, glyph.background);
    }
    _positionCamera(size) {
        let game = this.screen.game;
        let camera = { x: 50, y: 24 };
        this._cameraBounds = new rect_1.Rect(camera.x, camera.y, Math.min(size.x, game.stage.width), Math.min(size.y, game.stage.height));
        this._renderOffset = { x: mod_1.mod((Math.max(0, size.x - game.stage.width)), 2), y: mod_1.mod((Math.max(0, size.y - game.stage.height)), 2) };
    }
}
exports.StagePanel = StagePanel;
