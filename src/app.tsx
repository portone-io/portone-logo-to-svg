import { useSignal } from "@preact/signals";

const one = Math.PI * 2;

export function App() {
  const divSignal = useSignal(50);
  const strokeModeSignal = useSignal(false);
  const div = divSignal.value;
  const strokeMode = strokeModeSignal.value;
  const t = one / div;
  const d = doughnutPiece(74, 370, t);
  return (
    <div class="flex flex-col gap-2">
      <label>
        stroke mode:
        <input
          type="checkbox"
          checked={strokeMode}
          onInput={(e) => (strokeModeSignal.value = e.currentTarget.checked)}
        />
      </label>
      <label>
        division count:
        <input
          type="range"
          value={div}
          min={3}
          max={150}
          step={1}
          onInput={(e) => (divSignal.value = +e.currentTarget.value)}
        />
        {div}
      </label>
      <table>
        <tr>
          <th>attempt</th>
          <th>original svg</th>
        </tr>
        <tr>
          <td>
            <svg
              width="300"
              height="300"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M145.07 768.145L442.03 998.399V388.742H145.07V768.145Z"
                fill={strokeMode ? undefined : "#FC6B2D"}
                stroke={strokeMode ? "red" : undefined}
                strokeWidth={strokeMode ? "5" : undefined}
              />
              <g transform="translate(515,396)rotate(-180)">
                {Array(div)
                  .fill(d)
                  .map((d, i) => (
                    <path
                      d={d}
                      fill={strokeMode ? undefined : "#FC6B2D"}
                      stroke={strokeMode ? "red" : undefined}
                      strokeWidth={strokeMode ? "5" : undefined}
                      opacity={lerp(1.2, 0, i / div)}
                      transform={`rotate(${t * i * (180 / Math.PI)})`}
                    />
                  ))}
              </g>
            </svg>
          </td>
          <td>
            <img
              class="block"
              src="/portone-logo-square.svg"
              alt="original"
              width="300"
            />
          </td>
        </tr>
      </table>
    </div>
  );
}

function lerp(s: number, e: number, t: number): number {
  return s + (e - s) * t;
}

interface Point {
  x: number;
  y: number;
}
function polar(r: number, t: number): Point {
  return { x: Math.cos(t) * r, y: Math.sin(t) * r };
}

function doughnutPiece(inner: number, outer: number, t: number): string {
  const i = polar(inner, t);
  const o = polar(outer, t);
  return `M${inner},0L${outer},0L${o.x},${o.y}L${i.x},${i.y}Z`;
}
