declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  interface CreateTypes {
    (options?: Options): Promise<null> | null;
    reset: () => void;
  }

  function confetti(options?: Options): Promise<null> | null;

  namespace confetti {
    type Options = import('canvas-confetti').Options;
    function reset(): void;
    function create(canvas: HTMLCanvasElement, options?: { resize?: boolean; useWorker?: boolean }): CreateTypes;
  }

  export = confetti;
}
