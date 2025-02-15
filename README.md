This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
# or
yarn
# or
pnpm install
```

This project uses several additional packages that are required for authentication and alerts:

- **bcrypt**: for hashing passwords.
- **jsonwebtoken**: for generating and verifying JSON Web Tokens.
- **sweetalert2**: for displaying elegant alert and confirmation dialogs.
- **prisma**: for database interactions (with Prisma Client).
- **next/font**: to automatically optimize and load fonts.

If any of these packages are missing or you need to update them, you can install them using:

```bash
npm install bcrypt jsonwebtoken sweetalert2
# prisma and next/font are already included in the project's package.json
```

## Running the Development Server

After installing the dependencies, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```

---

### Explanation

- **Cloning and Installing Dependencies**:  
  The updated README now instructs users to clone the repository and run the install command. It also highlights the additional packages required for authentication (bcrypt, jsonwebtoken), alerts (sweetalert2), and database management (prisma).

- **Additional Packages**:  
  A short list of additional packages is provided so users know what to expect and can install/update them if needed.

- **Running the Development Server**:  
  Instructions remain the same, allowing users to start the development server quickly.
