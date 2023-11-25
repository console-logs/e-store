// mdx-components.tsx is required to use MDX with App Router and will not work without it.
// It should be present at the root of your application (the parent folder of app/ or src/)

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Customize built-in components, e.g. add styling.
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {children}
      </h1>
    ),
    p: ({ children }) => <p className="text-gray-800">{children}</p>,
    ...components,
  };
}
