"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Post {
  id: number;
  title: string;
  content?: string;
  createdAt: string;
  author?: {
    name: string;
  };
}

// Disable static generation
export const dynamic = "force-dynamic";

function PostsList() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/posts?page=${page}`);
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

  return (
    <>
      {error && (
        <div className="mx-auto mb-6 w-full max-w-4xl">
          <Alert variant="destructive">
            <AlertTitle>Couldn’t load posts</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      {isLoading ? (
        <div className="mx-auto w-full max-w-4xl space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts available.</p>
          ) : (
            <ul className="mx-auto w-full max-w-4xl space-y-4">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/posts/${post.id}`} className="block">
                    <Card className="transition-shadow hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>
                          by {post.author?.name || "Anonymous"} ·{" "}
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center gap-3">
            {page > 1 && (
              <Button asChild variant="secondary">
                <Link href={`/posts?page=${page - 1}`}>Previous</Link>
              </Button>
            )}
            {page < totalPages && (
              <Button asChild variant="secondary">
                <Link href={`/posts?page=${page + 1}`}>Next</Link>
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default function PostsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <Suspense
        fallback={
          <div className="mx-auto w-full max-w-4xl space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        }
      >
        <PostsList />
      </Suspense>
    </div>
  );
}
