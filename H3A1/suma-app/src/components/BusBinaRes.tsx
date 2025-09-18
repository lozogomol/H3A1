import React from "react";

interface Props {
  paragraphs: string[];
  matches: number[] | null;
}

const BusBinaRes: React.FC<Props> = ({ paragraphs, matches }) => {
  if (matches === null) {
    return (
      <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Resultado</h3>
        <p>Escribe un párrafo y busca una palabra.</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Resultado</h3>
      {matches.length === 0 ? (
        <p><strong>No existe</strong> la palabra en el texto.</p>
      ) : (
        <>
          <p>
            <strong>Existe</strong> 
          </p>
          <ol>
            {matches.map(i => (
             <li key={i} style={{ marginBottom: 6 }}>
              <em style={{ fontStyle: "normal" }}>Párrafo {i + 1}:</em> {paragraphs[i]}
             </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default BusBinaRes;