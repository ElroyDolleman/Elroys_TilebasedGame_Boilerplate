import 'phaser';
import { StartScene } from './scenes/StartScene';
import { GameScene } from './scenes/GameScene';
import { DebugUtil } from './utils/DebugUtil';

declare global {
	interface Window { game: Phaser.Game; }
}

window.game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 320,
	height: 240,
	zoom: 3,
	pixelArt: true,
	backgroundColor: '#3CBCFC',
	parent: GAME_TITLE,
	title: GAME_TITLE,
	version: '0.0.1',
	disableContextMenu: true,
	scene: [ StartScene, GameScene ],
	// physics: {
	// 	default: 'arcade',
	// },
});

DebugUtil?.initialize();