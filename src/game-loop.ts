interface Option {
  delta_log?: boolean;
  dif_log?: boolean;
  logs: boolean;
  time_fn?: () => number;
}

type UpdateCallback = (delta: number) => void;

function nano() {
  const hrtime = process.hrtime();
  return +hrtime[0] * 1e9 + +hrtime[1];
}

function nanoToSeconds(nano: number): number {
  return nano * (1 / 1e9);
}

function nanoToMs(nano: number): number {
  return nanoToSeconds(nano) * 1000;
}

function msToNano(ms: number): number {
  return ms * 1e6;
}

export class Loop {
  update: UpdateCallback;
  lastFrameTime: number;
  running: boolean;
  step: number;
  deltas: Array<number>;
  option: Option | undefined;

  constructor(update: UpdateCallback, fps: number = 30, option?: Option) {
    this.update = update;
    this.running = false;
    this.step = 1000 / fps;
    this.lastFrameTime = this.time();
    this.deltas = Array<number>();
    this.option = option;
  }

  time(): number {
    return this.option?.time_fn?.() ?? nano();
  }

  start(): Loop {
    this.running = true;
    this.lastFrameTime = this.time();
    this.deltas = Array<number>();
    const expectedLength = msToNano(this.step);
    const interval = Math.max(Math.floor(this.step - 1), 16);
    const jitterThreshold = 3; // ms
    const maxDeltaLength = Math.ceil(((1 / this.step) * 1000) / 2) + 1;

    let currentTime = this.time();

    const tick = (): any => {
      if (!this.running) return;

      const now = this.time();
      const delta = now - this.lastFrameTime;

      if (now <= currentTime) {
        // we dont need to simulate yet!!
        return setImmediate(tick);
      }

      // average out the delta!!
      if (this.deltas.length >= maxDeltaLength) {
        this.deltas.shift();
      }
      this.deltas.push(delta);

      const averageDelta =
        this.deltas.reduce((a, b) => a + b, 0) / (this.deltas.length || 1);

      // shift some values !!!
      this.lastFrameTime = now;
      currentTime = now + expectedLength;

      if (
        nanoToMs(Math.abs(expectedLength - averageDelta)) >= jitterThreshold
      ) {
        if (this.option?.logs || this.option?.dif_log) {
          console.log(nanoToMs(expectedLength - averageDelta));
        }

        currentTime += expectedLength - averageDelta;
      }

      this.update(nanoToMs(delta) / 1000); // (delta in seconds)

      if (this.option?.logs || this.option?.delta_log) {
        console.log(`${nanoToMs(delta)} ms`);
      }

      const remaining = currentTime - this.time();
      if (remaining > expectedLength) {
        return setTimeout(tick, interval);
      } else {
        return setImmediate(tick);
      }
    };

    setTimeout(tick, interval);

    return this;
  }

  stop(): Loop {
    this.running = false;
    return this;
  }
}
