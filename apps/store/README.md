# E-Store Monorepo

Hey developer! Before you start making changes to this code, please take a moment to review this document. It outlines all the decisions and choices that were made while developing this project.

## About this repository

This repository is a [monorepo](https://turbo.build/repo/docs/handbook/what-is-a-monorepo).

-   We use pnpm and workspaces for development.
-   We use Turborepo as our build system.

### Built with

-   [Next.js](https://nextjs.org) frame work.
-   [TypeScript](https://www.typescriptlang.org/) for static typechecking.
-   [Redux toolkit](https://redux.js.org) for state management.
-   [MongoDB](https://www.mongodb.com) for noSQL databases.
-   [Clerk](https://clerk.com) for user authentication.
-   [papaparse](https://www.npmjs.com/package/papaparse) for parsing csv files.
-   [Resend](https://resend.com) for emails.
-   [Yup](https://www.npmjs.com/package/yup) for forms validation.
-   [Razorpay](https://razorpay.com) for handling payments.
-   [TailwindCSS](https://tailwindcss.com) for styles.
-   [shadcn/ui](https://ui.shadcn.com/docs) for pre-built ui components.
-   [Headless UI](https://headlessui.com) for unstyled, fully accessible UI components
-   [Formik](https://formik.org) for building forms in React.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

-   `apps/store`: a [Next.js](https://nextjs.org/) client side facing app available by visiting [www.circuitparts.in](https://www.circuitparts.in)
-   `apps/admin`: another [Next.js](https://nextjs.org/) app for managing orders and website. Accessable by the admin only!
-   `packages/shared/components/ui`: [Shadcn](https://ui.shadcn.com/docs) components library shared by both `store` and `admin` applications for building UI.
-   `packages/shared/lib/utils`: Utility functions used by both `store` and `admin` apps.
-   `packages/shared/styles`: Global CSS files used by all the applications.
-   `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo.
-   `packages/tailwind-config`: `tailwind.config.ts` file used throughout the monorepo.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd starlink
turbo build
```

### Develop

To develop all apps and packages, run the following command from the root dir of the monorepo:

```
turbo dev
```

To develop specific app run the following command from the root dir of the monorepo:

```
cd e-store
turbo dev --filter <app_name>
```

### Developer Notes

1. If you do not add suppressHydrationWarning to <html> you will get warnings because next-themes updates that element.
   This property only applies one level deep, so it won't block hydration warnings on other elements. <br />
   Reference - https://github.com/pacocoursey/next-themes#with-app
