import React, { useRef, useState, useEffect } from 'react';
import type { CurvePoint, QuoteBubble } from '../types/journey';
import { generateSplinePath } from '../utils/curveMath';
import { ArrowUp, ArrowDown, Trash2, GripHorizontal } from 'lucide-react';

interface MotivationCanvasProps {
  curvePoints: CurvePoint[];
  quotes: QuoteBubble[];
  stagesCount: number;
  isEditMode: boolean;
  onCurveChange: (newPoints: CurvePoint[]) => void;
  onQuotesChange: (newQuotes: QuoteBubble[]) => void;
}

export const MotivationCanvas: React.FC<MotivationCanvasProps> = ({
  curvePoints,
  quotes,
  stagesCount,
  isEditMode,
  onCurveChange,
  onQuotesChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeDragPointId, setActiveDragPointId] = useState<string | null>(null);
  const [activeDragQuoteId, setActiveDragQuoteId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1000, height: 340 });

  // ResizeObserver to keep SVG coordinate math accurate
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setDimensions({
        width: el.clientWidth || 1000,
        height: el.clientHeight || 340,
      });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Global mousemove/mouseup listener for smooth dragging
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Handle Curve Point Dragging
      if (activeDragPointId) {
        let xPercent = ((clientX - rect.left) / rect.width) * 100;
        let yPercent = ((clientY - rect.top) / rect.height) * 100;

        // Clamp values
        xPercent = Math.max(0, Math.min(100, xPercent));
        yPercent = Math.max(5, Math.min(95, yPercent));

        onCurveChange(
          curvePoints.map((pt) =>
            pt.id === activeDragPointId
              ? {
                  ...pt,
                  xPercent: pt.xPercent === 0 ? 0 : pt.xPercent === 100 ? 100 : Math.round(xPercent * 10) / 10,
                  yPercent: Math.round(yPercent * 10) / 10,
                }
              : pt
          )
        );
      }

      // Handle Quote Bubble Dragging
      if (activeDragQuoteId) {
        let xPercent = ((clientX - rect.left - dragOffset.x) / rect.width) * 100;
        let yPercent = ((clientY - rect.top - dragOffset.y) / rect.height) * 100;

        xPercent = Math.max(2, Math.min(90, xPercent));
        yPercent = Math.max(5, Math.min(90, yPercent));

        onQuotesChange(
          quotes.map((q) =>
            q.id === activeDragQuoteId
              ? {
                  ...q,
                  xPercent: Math.round(xPercent * 10) / 10,
                  yPercent: Math.round(yPercent * 10) / 10,
                }
              : q
          )
        );
      }
    };

    const handlePointerUp = () => {
      setActiveDragPointId(null);
      setActiveDragQuoteId(null);
    };

    if (activeDragPointId || activeDragQuoteId) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [activeDragPointId, activeDragQuoteId, curvePoints, quotes, dragOffset, onCurveChange, onQuotesChange]);

  // Add a new point on double click in edit mode
  const handleDoubleClickCanvas = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPercent = Math.round((((e.clientX - rect.left) / rect.width) * 100) * 10) / 10;
    const yPercent = Math.round((((e.clientY - rect.top) / rect.height) * 100) * 10) / 10;

    const newPoint: CurvePoint = {
      id: `cp-${Date.now()}`,
      xPercent,
      yPercent,
    };

    const updated = [...curvePoints, newPoint].sort((a, b) => a.xPercent - b.xPercent);
    onCurveChange(updated);
  };

  const handleDeletePoint = (pointId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (curvePoints.length <= 2) return; // Keep at least 2 points
    onCurveChange(curvePoints.filter((p) => p.id !== pointId));
  };

  const handleToggleQuoteTail = (quoteId: string) => {
    onQuotesChange(
      quotes.map((q) =>
        q.id === quoteId
          ? { ...q, tailDirection: q.tailDirection === 'down' ? 'up' : 'down' }
          : q
      )
    );
  };

  const handleDeleteQuote = (quoteId: string) => {
    onQuotesChange(quotes.filter((q) => q.id !== quoteId));
  };

  const handleUpdateQuoteText = (quoteId: string, text: string) => {
    onQuotesChange(
      quotes.map((q) => (q.id === quoteId ? { ...q, text } : q))
    );
  };

  const splinePath = generateSplinePath(curvePoints, dimensions.width, dimensions.height);

  return (
    <div
      ref={containerRef}
      onDoubleClick={handleDoubleClickCanvas}
      className={`relative w-full h-[360px] select-none bg-white overflow-visible transition-colors ${
        isEditMode ? 'cursor-crosshair' : ''
      }`}
      title={isEditMode ? 'Doppelklick zum Hinzufügen eines Kurvenpunkts' : undefined}
    >
      {/* Background Column Dividers */}
      <div
        className="absolute inset-0 pointer-events-none grid"
        style={{ gridTemplateColumns: `repeat(${stagesCount}, 1fr)` }}
      >
        {Array.from({ length: stagesCount }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-stone-900 ${
              i < stagesCount - 1 ? 'border-r-2' : ''
            }`}
          />
        ))}
      </div>

      {/* Subtle baseline / emotion guides in edit mode */}
      {isEditMode && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-6 px-4 opacity-30 text-[10px] text-stone-500 font-semibold tracking-wider uppercase">
          <div className="flex items-center gap-2 border-b border-stone-300 pb-1">
            <span>Hoch / Hohe Motivation & Begeisterung</span>
          </div>
          <div className="flex items-center gap-2 border-b border-dashed border-stone-300 pb-1">
            <span>Neutral / Erwartungsgemäß</span>
          </div>
          <div className="flex items-center gap-2 border-b border-stone-300 pb-1">
            <span>Tief / Frustration & Hürden</span>
          </div>
        </div>
      )}

      {/* SVG Path Rendering */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        {/* Shadow glow for path */}
        <path
          d={splinePath}
          fill="none"
          stroke="#000000"
          strokeWidth={2.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Interactive Control Points (Visible in Edit Mode) */}
      {isEditMode &&
        curvePoints.map((point) => {
          const px = (point.xPercent / 100) * dimensions.width;
          const py = (point.yPercent / 100) * dimensions.height;
          const isDragging = activeDragPointId === point.id;

          return (
            <div
              key={point.id}
              style={{
                left: `${px}px`,
                top: `${py}px`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                setActiveDragPointId(point.id);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                setActiveDragPointId(point.id);
              }}
              className={`absolute group z-20 cursor-grab active:cursor-grabbing p-1 transition-transform ${
                isDragging ? 'scale-125' : 'hover:scale-125'
              }`}
              title="Ziehen, um Motivation anzupassen"
            >
              {/* Point circle */}
              <div
                className={`w-4 h-4 rounded-full border-2 border-stone-900 bg-white shadow-md flex items-center justify-center transition ${
                  isDragging
                    ? 'bg-stone-900 ring-4 ring-stone-400'
                    : 'group-hover:bg-stone-200'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
              </div>

              {/* Point Action Tooltip (Delete Point) */}
              {curvePoints.length > 2 && point.xPercent > 0 && point.xPercent < 100 && (
                <button
                  type="button"
                  onClick={(e) => handleDeletePoint(point.id, e)}
                  className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition"
                  title="Punkt löschen"
                >
                  <Trash2 size={10} />
                </button>
              )}
            </div>
          );
        })}

      {/* Interactive Speech Bubbles (Quotes) */}
      {quotes.map((quote) => {
        const isDragging = activeDragQuoteId === quote.id;

        return (
          <div
            key={quote.id}
            style={{
              left: `${quote.xPercent}%`,
              top: `${quote.yPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute z-30 transition-shadow ${
              isDragging ? 'shadow-xl scale-105 z-40' : ''
            }`}
          >
            <div
              className={`speech-bubble ${
                quote.tailDirection === 'down'
                  ? 'speech-bubble-tail-down'
                  : 'speech-bubble-tail-up'
              } max-w-[200px] text-xs font-normal text-stone-800 italic`}
            >
              {isEditMode ? (
                <div className="flex flex-col gap-1">
                  {/* Bubble Toolbar in Edit Mode */}
                  <div className="flex items-center justify-between gap-1 pb-1 border-b border-stone-100 text-[10px] text-stone-400 no-print">
                    <div
                      className="cursor-move p-0.5 hover:text-stone-700"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setActiveDragQuoteId(quote.id);
                        setDragOffset({ x: 0, y: 0 });
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        setActiveDragQuoteId(quote.id);
                        setDragOffset({ x: 0, y: 0 });
                      }}
                      title="Zitat verschieben"
                    >
                      <GripHorizontal size={12} />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => handleToggleQuoteTail(quote.id)}
                        className="p-0.5 hover:text-stone-900 rounded"
                        title={
                          quote.tailDirection === 'down'
                            ? 'Pfeil nach oben ausrichten'
                            : 'Pfeil nach unten ausrichten'
                        }
                      >
                        {quote.tailDirection === 'down' ? (
                          <ArrowUp size={11} />
                        ) : (
                          <ArrowDown size={11} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="p-0.5 hover:text-red-600 rounded"
                        title="Zitat löschen"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>

                  {/* Text Edit */}
                  <textarea
                    value={quote.text}
                    onChange={(e) => handleUpdateQuoteText(quote.id, e.target.value)}
                    rows={2}
                    className="w-full text-xs font-normal text-stone-800 italic bg-transparent border-0 focus:outline-hidden p-0 resize-none leading-snug"
                    placeholder="Zitat eingeben..."
                  />
                </div>
              ) : (
                <div className="leading-snug py-0.5 px-1">{quote.text}</div>
              )}
            </div>
          </div>
        );
      })}

      {/* Edit Mode Quick Hint */}
      {isEditMode && (
        <div className="absolute bottom-2 right-2 bg-stone-900/80 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-xs pointer-events-none no-print">
          💡 Punkte ziehen für Motivation • Doppelklick für neuen Punkt • Sprechblasen frei verschiebbar
        </div>
      )}
    </div>
  );
};
