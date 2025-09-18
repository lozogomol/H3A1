import React, { useState } from 'react';
import './App.css';
import SumForm from './components/SumForm';
import Result from './components/Result';

import BusBina from './components/BusBina';
import BusBinaRes from './components/BusBinaRes';

import type { BusBinaResult as WSRes } from './components/BusBina';

const App: React.FC = () => {
  const [result, setResult] = useState<number>(0);
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [matches, setMatches] = useState<number[] | null>(null);

  const handleSearchResult = (res: WSRes) => {
    setParagraphs(res.paragraphs);
    setMatches(res.matches);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Calculadora y Búsqueda</h1>
      </header>

      <main className="grid">
        <section className="card">
          <h2 className="card-title">Calculadora</h2>
          <div className="card-body">
            <SumForm onSum={setResult} />
            <div className="result-box">
              <Result value={result} />
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="card-title">Buscador</h2>
          <div className="card-body">
            <BusBina onResult={handleSearchResult} />
            <div className="spacer" />
            <BusBinaRes paragraphs={paragraphs} matches={matches} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
