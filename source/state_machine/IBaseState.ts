import { StateMachine } from './StateMachine';

export interface IBaseState<T>
{
	machine: StateMachine<T>;

	enter(): void;
	update(): void;
	leave(): void;
}