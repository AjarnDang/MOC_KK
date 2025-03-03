/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

// Mock Data
const mockPosts: Post[] = [
  {
    id: 1,
    title: "Introduction to TypeScript",
    body: "TypeScript is a superset of JavaScript that adds static typing.",
    tags: ["typescript", "javascript", "programming"],
    reactions: { likes: 120, dislikes: 3 },
    views: 540,
    userId: 101,
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    body: "React Hooks allow functional components to use state and lifecycle features.",
    tags: ["react", "hooks", "frontend"],
    reactions: { likes: 98, dislikes: 5 },
    views: 620,
    userId: 102,
  },
  {
    id: 3,
    title: "Node.js Performance Optimization",
    body: "Improving performance in Node.js applications through best practices.",
    tags: ["nodejs", "backend", "performance"],
    reactions: { likes: 85, dislikes: 2 },
    views: 410,
    userId: 103,
  },
];

// Replace API Base URL
const API_BASE_URL = "https://mockapi.example.com";

// GET all posts (Mocked)
export const fetchPosts = async (): Promise<Post[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts), 500); // Simulating API delay
  });
};

// GET post by ID (Mocked)
export const fetchPostById = async (id: string): Promise<Post> => {
  return new Promise((resolve, reject) => {
    const post = mockPosts.find((p) => p.id === Number(id));
    post ? resolve(post) : reject(new Error(`Post with ID ${id} not found`));
  });
};

// ADD post (Mocked)
export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  return new Promise((resolve) => {
    const newPost = { ...post, id: mockPosts.length + 1 };
    mockPosts.push(newPost);
    resolve(newPost);
  });
};

// UPDATE post (Mocked)
export const updatePost = async (id: string, post: Partial<Post>): Promise<Post> => {
  return new Promise((resolve, reject) => {
    const index = mockPosts.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      mockPosts[index] = { ...mockPosts[index], ...post };
      resolve(mockPosts[index]);
    } else {
      reject(new Error(`Failed to update post with ID ${id}`));
    }
  });
};

// DELETE post (Mocked)
export const deletePost = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = mockPosts.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      mockPosts.splice(index, 1);
      resolve();
    } else {
      reject(new Error(`Post with ID ${id} not found`));
    }
  });
};

// COUNT posts (Mocked)
export const countPost = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPosts.length), 300);
  });
};
