import { CodeBlock } from "./code-block";

export default function SetupSteps() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Getting Started</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Follow these steps to set up your Next.js & Prisma Postgres Auth
          Starter:
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold">1. Install Dependencies</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          After cloning the repo and navigating into it, install dependencies:
        </p>
        <div className="mt-3">
          <CodeBlock code="npm install" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold">2. Create a Prisma Postgres Instance</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a Prisma Postgres instance by running the following command:
        </p>
        <div className="mt-3">
          <CodeBlock code="npx prisma init --db" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          This command is interactive and will prompt you to:
        </p>
        <ol className="mt-2 list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Log in to the Prisma Console</li>
          <li>
            Select a <strong>region</strong> for your Prisma Postgres instance
          </li>
          <li>
            Give a <strong>name</strong> to your Prisma project
          </li>
        </ol>
        <p className="mt-3 text-sm text-muted-foreground">
          Once the command has terminated, copy the{" "}
          <strong>Database URL</strong> from the terminal output. You&apos;ll
          need it in the next step.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold">3. Set Up Your .env File</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You need to configure your database connection via an environment
          variable.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          First, create an <code>.env</code> file:
        </p>
        <div className="mt-3">
          <CodeBlock code="touch .env" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Then update the <code>.env</code> file by replacing the existing{" "}
          <code>DATABASE_URL</code> value with the one you previously copied:
        </p>
        <div className="mt-3">
          <CodeBlock
            code={`DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=PRISMA_POSTGRES_API_KEY"`}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          To ensure your authentication works properly, you&apos;ll also need to
          set env vars for NextAuth.js:
        </p>
        <div className="mt-3">
          <CodeBlock code={`AUTH_SECRET="RANDOM_32_CHARACTER_STRING"`} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          You can generate a random 32 character string for the{" "}
          <code>AUTH_SECRET</code> with this command:
        </p>
        <div className="mt-3">
          <CodeBlock code="npx auth secret" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold">4. Migrate the Database</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Run the following command to set up your database and Prisma schema:
        </p>
        <div className="mt-3">
          <CodeBlock code="npx prisma migrate dev --name init" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold">5. Seed the Database</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add initial data to your database:
        </p>
        <div className="mt-3">
          <CodeBlock code="npx prisma db seed" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold">6. Run the App</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Start the development server:
        </p>
        <div className="mt-3">
          <CodeBlock code="npm run dev" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Once the server is running, visit <code>http://localhost:3000</code>{" "}
          to start using the app.
        </p>
      </section>
    </div>
  );
}
