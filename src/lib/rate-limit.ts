import { Redis } from "@upstash/redis";

import { Ratelimit } from "@upstash/ratelimit";

import { env } from "./env";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const ratelimit =
  new Ratelimit({
    redis,

    limiter:
      Ratelimit.slidingWindow(
        1, // just for testing
        "1 m"
      ),
  });