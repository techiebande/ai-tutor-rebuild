"use client";
import React from "react";
import { blogData as blogs } from "@/components/blog"; // Renamed to 'blogs' for clarity
import { useParams } from "next/navigation"; // Get the dynamic route param
import Link from "next/link";

const Page = () => {
  const params = useParams();
  const { id } = params; // Get the ID from the URL

  // Find the specific blog post by ID
  const blogPost = blogs.find((p) => p.id === parseInt(id));

  if (!blogPost) {
    return <p>Blog post not found</p>;
  }

  return (
    <div>
      <h1>{blogPost.id}</h1>
      <p>{blogPost.description}</p>
      <p>Date: {blogPost.date}</p>

      <div className="my-32 text-lime-300 bg-slate-600 w-full">
        <Link href="/blog">Back to Blogs</Link>
      </div>
    </div>
  );
};

export default Page;
