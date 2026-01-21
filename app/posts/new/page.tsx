"use client";

import Form from "next/form";
import { createPost } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPost() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={createPost} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="title">Title</Label>
                <Badge variant="secondary">Required</Badge>
              </div>
              <Input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Enter your post title..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Write your post content here..."
                rows={6}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Post
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
