This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

> [!NOTE]
> It features an Ideas Tracker app that follows the [Next.js AppWrite tutorials](https://appwrite.io/docs/tutorials/nextjs/step-1) for getting familiar with AppWrite.

## Requirements

1. AppWrite account [[link]](https://cloud.appwrite.io/console/login)
2. AppWrite App configured with:
   - **Auth**<br>
      Use the default settings (do not edit anything)

   - **Database - Settings**
      | Option | Value |
      | --- | --- |
      | Permissions | **Any** - `"Read"` only <br> **All users** - `"Create"` only |
      | Row security | _(Toggled on)_ |

   - **Database Columns**
      | Column name | Type | Size | Required |
      | --- | --- | --- | --- |
      | userId | string | 200 | yes |
      | title | string | 200 | yes |
      | description | string | 500 | no |


## Getting Started

First, create a `.env.local` file from the `.env.example` file. Supply the correct values from an AppWrite app.

| Key | Description |
| --- | --- |
| NEXT_PUBLIC_APPWRITE_ENDPOINT | An AppWrite apps's API endpoint, available in the project settings |
| NEXT_PUBLIC_APPWRITE_PROJECT | AppWrite project ID, also available in the project settings |
| NEXT_PUBLIC_DATABASE_ID | AppWrite database ID |
| NEXT_PUBLIC_TABLE_ID | AppWrite database - table ID |

Then, run the development server:

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
