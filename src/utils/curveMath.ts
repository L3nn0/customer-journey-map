import type { CurvePoint } from '../types/journey';

export interface Point2D {
  x: number;
  y: number;
}

/**
 * Generates an SVG path string from an array of normalized CurvePoints.
 * Uses Catmull-Rom to Cubic Bézier conversion for smooth organic curvature.
 */
export function generateSplinePath(
  points: CurvePoint[],
  canvasWidth: number,
  canvasHeight: number
): string {
  if (!points || points.length === 0) return '';

  // Sort points horizontally
  const sorted = [...points].sort((a, b) => a.xPercent - b.xPercent);

  // Convert to absolute coordinates
  const pixelPoints: Point2D[] = sorted.map((p) => ({
    x: (p.xPercent / 100) * canvasWidth,
    y: (p.yPercent / 100) * canvasHeight,
  }));

  // Ensure curve spans from x=0 to x=canvasWidth
  const first = pixelPoints[0];
  const last = pixelPoints[pixelPoints.length - 1];

  const extended: Point2D[] = [];

  // If first point isn't at 0, extend horizontally or smoothly to 0
  if (first.x > 0) {
    extended.push({ x: 0, y: first.y });
  }

  extended.push(...pixelPoints);

  // If last point isn't at canvasWidth, extend horizontally or smoothly to canvasWidth
  if (last.x < canvasWidth) {
    extended.push({ x: canvasWidth, y: last.y });
  }

  if (extended.length === 1) {
    return `M 0,${extended[0].y} L ${canvasWidth},${extended[0].y}`;
  }

  if (extended.length === 2) {
    return `M ${extended[0].x},${extended[0].y} L ${extended[1].x},${extended[1].y}`;
  }

  let path = `M ${extended[0].x.toFixed(1)},${extended[0].y.toFixed(1)}`;

  for (let i = 0; i < extended.length - 1; i++) {
    const p0 = extended[i === 0 ? 0 : i - 1];
    const p1 = extended[i];
    const p2 = extended[i + 1];
    const p3 = extended[i + 2 < extended.length ? i + 2 : i + 1];

    // Catmull-Rom tangent calculation (tension factor 6)
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }

  return path;
}
