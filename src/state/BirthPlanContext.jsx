import { createContext, useCallback, useContext, useMemo } from 'react';
import { STORAGE_KEY } from '../content/config.js';
import { usePersistedState } from './usePersistedState.js';

const initialState = {
  patientCode: null,
  startedAt: null,
  answers: {} // { [questionId]: value }
};

const BirthPlanContext = createContext(null);

export function BirthPlanProvider({ children }) {
  const [state, setState] = usePersistedState(STORAGE_KEY, initialState);

  const setPatientCode = useCallback(
    (code) => {
      setState((prev) => ({
        ...prev,
        patientCode: code,
        startedAt: prev.startedAt ?? new Date().toISOString()
      }));
    },
    [setState]
  );

  const setAnswer = useCallback(
    (questionId, value) => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [questionId]: value }
      }));
    },
    [setState]
  );

  const reset = useCallback(() => setState(initialState), [setState]);

  const value = useMemo(
    () => ({ ...state, setPatientCode, setAnswer, reset }),
    [state, setPatientCode, setAnswer, reset]
  );

  return <BirthPlanContext.Provider value={value}>{children}</BirthPlanContext.Provider>;
}

export function useBirthPlan() {
  const ctx = useContext(BirthPlanContext);
  if (!ctx) throw new Error('useBirthPlan doit être utilisé dans un BirthPlanProvider');
  return ctx;
}
