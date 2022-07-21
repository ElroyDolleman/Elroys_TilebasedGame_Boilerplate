import { CollisionResult } from '../collision/CollisionManager';
import { PlayerConfig } from '../configs/PlayerConfig';
import { DebugUtil } from '../utils/DebugUtil';
import { Entity } from '../entities/Entity';
import { StateMachine } from '../state_machine/StateMachine';
import { IPoint } from '../utils/IPoint';
import { PlayerInputManager } from './PlayerInputManager';
import { PlayerView } from './PlayerView';
import { PlayerAnimationsMap, PlayerStates } from './states/PlayerStates';

export class PlayerController extends Entity
{
	public inputs: PlayerInputManager;
	public view: PlayerView;

	private _stateMachine: StateMachine<PlayerController>;

	public constructor(scene: Phaser.Scene, position: IPoint)
	{
		super({ x: position.x, y: position.y, width: 12, height: 12 });

		this._stateMachine = new StateMachine(this);
		this._stateMachine.onStateChanged.addListener(this._onStateChanged, this);

		this.view = new PlayerView(scene);
	}

	public update(): void
	{

	}

	public lateUpdate(): void
	{
		this.view.updateVisuals();

		if (DEV)
		{
			DebugUtil?.fillRect(this.hitbox, 0xFF, 0.5, 1);
		}
	}

	public onCollisionSolved(result: CollisionResult): void
	{

	}

	private _onStateChanged(state: PlayerStates): void
	{
		this.view.animator.changeAnimation(PlayerAnimationsMap[state]);
	}

	public destroy(): void
	{

	}
}