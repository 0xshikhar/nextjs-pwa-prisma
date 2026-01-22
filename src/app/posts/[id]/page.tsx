export const dynamic = "force-dynamic"; // This disables SSG and ISR

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  // Server action to delete the post
  async function deletePost() {
    "use server";

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    redirect("/posts");
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            by {post.author?.name || "Anonymous"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {post.content ? (
            <p className="text-sm leading-relaxed text-foreground">{post.content}</p>
          ) : (
            <p className="text-sm italic text-muted-foreground">
              No content available for this post.
            </p>
          )}
        </CardContent>
        <CardFooter className="justify-end">
          <form action={deletePost}>
            <Button type="submit" variant="destructive">
              Delete Post
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
