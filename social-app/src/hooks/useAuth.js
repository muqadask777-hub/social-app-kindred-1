// Thin re-export so components can `import { useAuth } from '../hooks/useAuth'`
// per the required project structure. The real implementation lives in AuthContext.
export { useAuth } from '../context/AuthContext';
