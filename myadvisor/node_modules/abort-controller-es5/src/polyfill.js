import { AbortController, AbortSignal } from './index';

const scope = typeof window === 'undefined' ? 0 : window;

if (scope) {
  !scope.AbortController && (scope.AbortController = AbortController);
  !scope.AbortSignal && (scope.AbortSignal = AbortSignal);
}
