import { IBaseState } from '../../state_machine/IBaseState';
import { StateMachine } from '../../state_machine/StateMachine';
import { PlayerController } from '../PlayerController';

export class PlayerAirborneState implements IBaseState<PlayerController>
{
	public machine: StateMachine<PlayerController>;

	public enter(): void
	{

	}

	public update(): void
	{

	}

	public leave(): void
	{

	}
}