import { ReactNode } from 'react';

const jsxIf = (condition: any, children: ReactNode | (() => ReactNode)) => {
  if (!condition) {
    return null;
  }

  if (typeof children === "function") {
    return children();
  }

  return children;
}

export const jsx = {
  if: jsxIf,
}