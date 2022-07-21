export enum PlayerStates {
	Idle,
	Walk,
	Jump,
	Fall,
}

export const PlayerAnimationsMap: { [key in PlayerStates]: string } =
{
	[PlayerStates.Idle]: 'character_idle',
	[PlayerStates.Walk]: 'character_walk',
	[PlayerStates.Jump]: 'character_jump',
	[PlayerStates.Fall]: 'character_fall',
};