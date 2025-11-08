import { z } from 'zod';

export const MetricSchema = z.object({
  date: z.string(),
  platform: z.enum(['instagram', 'tiktok']),
  reach: z.number(),
  impressions: z.number(),
  views: z.number(),
  followers: z.number(),
  new_followers: z.number(),
  posts: z.number(),
  likes: z.number(),
  comments: z.number(),
  shares: z.number(),
  saves: z.number().optional(),
});

export const PostSchema = z.object({
  id: z.string(),
  platform: z.enum(['instagram', 'tiktok']),
  date: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  url: z.string().optional(),
  views: z.number(),
  reach: z.number().optional(),
  likes: z.number(),
  comments: z.number(),
  saves: z.number().optional(),
  shares: z.number().optional(),
  type: z.enum(['reels', 'video', 'photo', 'carousel']),
  topic: z.string().optional(),
});

export type Metric = z.infer<typeof MetricSchema>;
export type Post = z.infer<typeof PostSchema>;

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatPercentage = (num: number): string => {
  return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
};

export const calculateEngagementRate = (metric: Metric): number => {
  const engagements = metric.likes + metric.comments + (metric.shares || 0) + (metric.saves || 0);
  return (engagements / metric.reach) * 100;
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
