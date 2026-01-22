export const dynamic = "force-dynamic"; // This disables SSG and ISR

import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { checkPostTableExists } from "@/lib/db-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  // Check if the post table exists
  const tableExists = await checkPostTableExists();

  // If the post table doesn't exist, redirect to setup page
  if (!tableExists) {
    redirect("/setup");
  }

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Recent Posts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Latest posts from the community.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="group">
            <Card className="transition-shadow group-hover:shadow-md">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg">
                  {post.title}
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  by {post.author ? post.author.name : "Anonymous"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {post.content || "No content available."}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
