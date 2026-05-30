import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getDetail, type Comment } from "@/data/startups";

// Frozen contract for Track B (Comments). SPINE STUB: returns static seed
// comments. Track B replaces the bodies with Drizzle (nested tree from flat
// rows, displayUpvotes = seed + count, votedByMe) and persists new
// comments/replies/votes, pointing discussion-section.tsx at these.

export const listComments = createServerFn({ method: "GET" })
  .inputValidator(z.object({ startupId: z.number().int() }))
  .handler(async ({ data }): Promise<Comment[]> => {
    return getDetail(data.startupId).comments ?? [];
  });

export const addComment = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      startupId: z.number().int(),
      parentId: z.string().nullish(),
      body: z.string().min(1).max(2000),
    }),
  )
  .handler(async ({ data }): Promise<Comment> => {
    return {
      id: `you-${data.startupId}-${Date.now()}`,
      author: "You",
      username: "you",
      role: "Guest",
      initials: "YO",
      avatarGradient: "from-primary to-rose-600",
      time: "just now",
      upvotes: 0,
      body: data.body,
    };
  });

export const toggleCommentVote = createServerFn({ method: "POST" })
  .inputValidator(z.object({ commentId: z.string() }))
  .handler(async ({ data }) => {
    return { commentId: data.commentId, voted: true, displayUpvotes: 1 };
  });
