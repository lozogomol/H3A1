import React, { useMemo, useState } from "react";

export type BusBinaResult = {
  paragraphs: string[];
  matches: number[];
};

type Hit = { key: string; paragraph: number };

const toLower = (s: string) => s.toLowerCase();
const tokenize = (t: string) => (t.match(/\w+/g) ?? []).map(toLower);

function lowerBound<T>(arr: T[], target: T, cmp: (a: T, b: T) => number) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cmp(arr[mid], target) < 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function upperBound<T>(arr: T[], target: T, cmp: (a: T, b: T) => number) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cmp(arr[mid], target) <= 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

interface Props {
  onResult: (res: BusBinaResult) => void;
}

const BusBina: React.FC<Props> = ({ onResult }) => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const { hits, paragraphs } = useMemo(() => {
    const paras = text
      .split(/\r?\n{1,}/g)
      .map(p => p.trim())
      .filter(Boolean);

    const tmp: Hit[] = [];
    paras.forEach((p, i) => {
      const words = tokenize(p);
      const seen = new Set<string>();
      for (const w of words) {
        if (seen.has(w)) continue;
        seen.add(w);
        tmp.push({ key: w, paragraph: i });
      }
    });

    tmp.sort((a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : a.paragraph - b.paragraph);
    return { hits: tmp, paragraphs: paras };
  }, [text]);

  const cmp = (a: Hit, b: Hit) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = toLower(query.trim());
    if (!q || hits.length === 0) { onResult({ paragraphs, matches: [] }); return; }

    const lb = lowerBound(hits, { key: q, paragraph: -1 }, cmp);
    const ub = upperBound(hits, { key: q, paragraph: 999999 }, cmp);

    if (lb >= ub) { onResult({ paragraphs, matches: [] }); return; }

    const matches = Array.from(new Set(hits.slice(lb, ub).map(h => h.paragraph))).sort((a, b) => a - b);
    onResult({ paragraphs, matches });
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Buscador</h2>

      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Texto:</label>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={10}
        style={{ width: "100%", padding: 8, boxSizing: "border-box", marginBottom: 10 }}
        placeholder="Escribe algo."
      />

      <form onSubmit={onSearch} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ingrese una palabra."
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default BusBina;