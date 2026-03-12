/**
 * Gravity — physics-based draggable tag component
 * Adapted from the Matter.js gravity demo (rectangle bodies only — no SVG decomp needed)
 */

import {
  createContext,
  forwardRef,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Matter, {
  Bodies,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  World,
} from "matter-js";

// ── tiny inline debounce (avoids lodash dep) ─────────────────────────────────
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
}

// ── tiny cn helper ────────────────────────────────────────────────────────────
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ── helpers ───────────────────────────────────────────────────────────────────
function calculatePosition(
  value: number | string | undefined,
  containerSize: number,
  elementSize: number
) {
  if (typeof value === "string" && value.endsWith("%")) {
    return containerSize * (parseFloat(value) / 100);
  }
  return typeof value === "number"
    ? value
    : elementSize - containerSize + elementSize / 2;
}

// ── types ─────────────────────────────────────────────────────────────────────
type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  gravity?: { x: number; y: number };
  resetOnResize?: boolean;
  grabCursor?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  bodyType?: "rectangle" | "circle";
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
  key?: string | number;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

// ── context ───────────────────────────────────────────────────────────────────
const GravityContext = createContext<{
  registerElement: (id: string, el: HTMLElement, props: MatterBodyProps) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

// ── MatterBody ────────────────────────────────────────────────────────────────
export const MatterBody = ({
  children,
  className,
  matterBodyOptions = { friction: 0.3, restitution: 0.3, density: 0.002 },
  bodyType = "rectangle",
  isDraggable = true,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useRef(Math.random().toString(36).slice(2));
  const ctx = useContext(GravityContext);

  useEffect(() => {
    if (!ref.current || !ctx) return;
    ctx.registerElement(id.current, ref.current, {
      children, matterBodyOptions, bodyType, isDraggable, x, y, angle, ...props,
    });
    return () => ctx.unregisterElement(id.current);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className={cn("absolute", className, isDraggable && "pointer-events-none")}
    >
      {children}
    </div>
  );
};

// ── Gravity ───────────────────────────────────────────────────────────────────
export const Gravity = forwardRef<GravityRef, GravityProps>(
  (
    {
      children,
      debug = false,
      gravity = { x: 0, y: 1 },
      grabCursor = true,
      resetOnResize = true,
      addTopWall = false,
      autoStart = true,
      className,
      ...props
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const engine = useRef(Engine.create());
    const render = useRef<Render>();
    const runner = useRef<Runner>();
    const bodiesMap = useRef(new Map<string, PhysicsBody>());
    const frameId = useRef<number>();
    const mouseConstraint = useRef<Matter.MouseConstraint>();
    const mouseDown = useRef(false);
    const isRunning = useRef(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const registerElement = useCallback(
      (id: string, element: HTMLElement, bodyProps: MatterBodyProps) => {
        if (!canvasRef.current) return;
        const w = element.offsetWidth;
        const h = element.offsetHeight;
        const rect = canvasRef.current.getBoundingClientRect();
        const angle = ((bodyProps.angle ?? 0) * Math.PI) / 180;
        const x = calculatePosition(bodyProps.x, rect.width, w);
        const y = calculatePosition(bodyProps.y, rect.height, h);

        const renderOpts = {
          fillStyle: debug ? "#88888844" : "#00000000",
          strokeStyle: debug ? "#333333" : "#00000000",
          lineWidth: debug ? 2 : 0,
        };

        const body =
          bodyProps.bodyType === "circle"
            ? Bodies.circle(x, y, Math.max(w, h) / 2, { ...bodyProps.matterBodyOptions, angle, render: renderOpts })
            : Bodies.rectangle(x, y, w, h, { ...bodyProps.matterBodyOptions, angle, render: renderOpts });

        World.add(engine.current.world, [body]);
        bodiesMap.current.set(id, { element, body, props: bodyProps });
      },
      [debug]
    );

    const unregisterElement = useCallback((id: string) => {
      const entry = bodiesMap.current.get(id);
      if (entry) {
        World.remove(engine.current.world, entry.body);
        bodiesMap.current.delete(id);
      }
    }, []);

    const updateElements = useCallback(() => {
      bodiesMap.current.forEach(({ element, body }) => {
        const { x, y } = body.position;
        const rot = body.angle * (180 / Math.PI);
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rot}deg)`;
      });
      frameId.current = requestAnimationFrame(updateElements);
    }, []);

    const startEngine = useCallback(() => {
      if (!runner.current) return;
      runner.current.enabled = true;
      Runner.run(runner.current, engine.current);
      if (render.current) Render.run(render.current);
      frameId.current = requestAnimationFrame(updateElements);
      isRunning.current = true;
    }, [updateElements]);

    const stopEngine = useCallback(() => {
      if (!isRunning.current) return;
      if (runner.current) Runner.stop(runner.current);
      if (render.current) Render.stop(render.current);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      isRunning.current = false;
    }, []);

    const clearRenderer = useCallback(() => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
      if (mouseConstraint.current) World.remove(engine.current.world, mouseConstraint.current);
      if (render.current) {
        Mouse.clearSourceEvents(render.current.mouse);
        Render.stop(render.current);
        render.current.canvas.remove();
      }
      if (runner.current) Runner.stop(runner.current);
      World.clear(engine.current.world, false);
      Engine.clear(engine.current);
      bodiesMap.current.clear();
    }, []);

    const initializeRenderer = useCallback(() => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.offsetWidth;
      const height = canvasRef.current.offsetHeight;

      // Do NOT replace engine.current here — MatterBody components have already
      // registered their physics bodies into it. Just update gravity settings.
      engine.current.gravity.x = gravity.x;
      engine.current.gravity.y = gravity.y;

      render.current = Render.create({
        element: canvasRef.current,
        engine: engine.current,
        options: { width, height, wireframes: false, background: "#00000000" },
      });

      // Make the Matter.js canvas transparent to pointer events so CSS :hover
      // and React onMouseEnter/Leave work on elements rendered behind it.
      render.current.canvas.style.pointerEvents = 'none';

      // Use the container div as the mouse source (canvas is pointer-events:none)
      const mouse = Mouse.create(canvasRef.current!);
      mouseConstraint.current = MouseConstraint.create(engine.current, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: debug } },
      });

      const wallOpts = { isStatic: true, friction: 1, render: { visible: debug } };
      const walls = [
        Bodies.rectangle(width / 2, height + 10, width, 20, wallOpts),   // floor
        Bodies.rectangle(width + 10, height / 2, 20, height, wallOpts),  // right
        Bodies.rectangle(-10, height / 2, 20, height, wallOpts),         // left
      ];
      if (addTopWall) walls.push(Bodies.rectangle(width / 2, -10, width, 20, wallOpts));

      if (grabCursor) {
        const touching = () =>
          Query.point(engine.current.world.bodies, mouseConstraint.current?.mouse.position ?? { x: 0, y: 0 }).length > 0;

        Events.on(engine.current, "beforeUpdate", () => {
          if (!canvasRef.current) return;
          canvasRef.current.style.cursor = mouseDown.current && touching() ? "grabbing" : touching() ? "grab" : "default";
        });
        canvasRef.current.addEventListener("mousedown", () => { mouseDown.current = true; });
        canvasRef.current.addEventListener("mouseup", () => { mouseDown.current = false; });
      }

      World.add(engine.current.world, [mouseConstraint.current, ...walls]);
      render.current.mouse = mouse;
      runner.current = Runner.create();
      runner.current.enabled = false;
      Render.run(render.current);
      updateElements();
      if (autoStart) { runner.current.enabled = true; startEngine(); }
    }, [gravity, debug, addTopWall, grabCursor, autoStart, updateElements, startEngine]);

    const reset = useCallback(() => {
      stopEngine();
      bodiesMap.current.forEach(({ element, body, props: p }) => {
        const x = calculatePosition(p.x, canvasSize.width, element.offsetWidth);
        const y = calculatePosition(p.y, canvasSize.height, element.offsetHeight);
        Matter.Body.setPosition(body, { x, y });
        Matter.Body.setAngle(body, ((p.angle ?? 0) * Math.PI) / 180);
      });
      updateElements();
      handleResize();
    }, [canvasSize, updateElements]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleResize = useCallback(() => {
      if (!canvasRef.current || !resetOnResize) return;
      setCanvasSize({ width: canvasRef.current.offsetWidth, height: canvasRef.current.offsetHeight });
      clearRenderer();
      initializeRenderer();
    }, [clearRenderer, initializeRenderer, resetOnResize]);

    useImperativeHandle(ref, () => ({ start: startEngine, stop: stopEngine, reset }), [startEngine, stopEngine, reset]);

    useEffect(() => {
      if (!resetOnResize) return;
      const debouncedResize = debounce(handleResize, 500);
      window.addEventListener("resize", debouncedResize);
      return () => { window.removeEventListener("resize", debouncedResize); debouncedResize.cancel(); };
    }, [handleResize, resetOnResize]);

    useEffect(() => {
      initializeRenderer();
      return clearRenderer;
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <GravityContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={canvasRef}
          className={cn("absolute top-0 left-0 w-full h-full", className)}
          {...props}
        >
          {children}
        </div>
      </GravityContext.Provider>
    );
  }
);

Gravity.displayName = "Gravity";
