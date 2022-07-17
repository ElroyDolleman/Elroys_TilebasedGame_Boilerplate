import { TimeUtil } from './TimeUtil';

type TimeDelayInfo = {
	timer: number;
	callback: () => void;
}

export class TimeDelay
{
	private static _delays: TimeDelayInfo[] = [];

	private static _instance: TimeDelay;
	private constructor()
	{
		window.game.events.addListener('step', TimeDelay._update, TimeDelay);
	}

	private static _checkInstance(): void
	{
		if (this._instance === undefined)
		{
			this._instance = new TimeDelay();
		}
	}

	private static _update(): void
	{
		for (let i = 0; i < this._delays.length; i++)
		{
			const element = this._delays[i];
			element.timer--;

			if (element.timer <= 0)
			{
				element.callback();
				this._delays.splice(i, 1);
				i--;
			}
		}
	}

	public static afterMS(milliseconds: number): Promise<void>
	{
		return this.afterFrames(TimeUtil.millisecondsToFrames(milliseconds));
	}

	public static afterSeconds(seconds: number): Promise<void>
	{
		return this.afterFrames(TimeUtil.secondsToFrames(seconds));
	}

	public static afterFrames(frames: number): Promise<void>
	{
		this._checkInstance();

		return new Promise<void>(resolve =>
		{
			this._delays.push({ timer: frames, callback: resolve });
		});
	}
}