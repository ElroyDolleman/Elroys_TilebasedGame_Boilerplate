import { GameEvent } from '../utils/GameEvent';
import { IBaseState } from './IBaseState';

export class StateMachine<T>
{
	public get currentState(): IBaseState<T> { return this._states.get(this._currentStateKey) as IBaseState<T>; }
	public get currentStateKey(): number { return this._currentStateKey; }

	public readonly onStateChanged: GameEvent<number> = new GameEvent<number>;

	public owner: T;

	private _states: Map<number, IBaseState<T>>;
	private _currentStateKey: number = -1;

	public constructor(owner: T)
	{
		this.owner = owner;
		this._states = new Map();
	}

	public start(firstState: number): void
	{
		this._currentStateKey = firstState;
	}

	public update(): void
	{
		this.currentState.update();
	}

	public addState(key: number, state: IBaseState<T>): void
	{
		state.machine = this;
		this._states.set(key, state);
	}

	public changeState(key: number): void
	{
		this.currentState.leave();
		this._currentStateKey = key;
		this.currentState.enter();

		this.onStateChanged.emit(key);
	}

	public destroy(): void
	{
		this.onStateChanged.removeAllListeners();
		this._states.clear();
	}
}