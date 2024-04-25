This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- Install Node (min. v18.17) from [official web](https://nodejs.org/en) or use [NVM](https://github.com/nvm-sh/nvm). To check the installed node version, run:
  ```
  node -v
  ```
- Install npm

  ```
  npm install -g npm
  ```

- Install dependencies

  ```
  npm install
  ```

- Generate styles
  ```
  npm run panda:codegen
  ```

## First, run the development server on local

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Second, run Jest Unit test on local

```
npm run test
```

### Components styles does not reflect the running apps

When apps dev server is running, styles changes does not reflect immediately. Generate new version of component styles:

1. Stop the running app
2. Run extract styles script on root dir
   ```
   npm run panda:extract
   ```
3. Re-run the app
   ```
   npm run dev
   ```

The app will get the new version of component styles.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
