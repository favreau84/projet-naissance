import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BirthPlanProvider } from './state/BirthPlanContext.jsx';
import Welcome from './routes/Welcome.jsx';
import Journey from './routes/Journey.jsx';
import Preview from './routes/Preview.jsx';
import Share from './routes/Share.jsx';

// HashRouter : compat GitHub Pages (pas de fallback SPA natif).
// Les URLs ressemblent à /#/p/19381801 — les liens email cliquent bien.
export default function App() {
  return (
    <BirthPlanProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/p/:code" element={<Welcome />} />
          <Route path="/journey/:step" element={<Journey />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/share" element={<Share />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </BirthPlanProvider>
  );
}
