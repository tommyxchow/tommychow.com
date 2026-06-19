import { defineCloudflareConfig } from '@opennextjs/cloudflare'
// import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'

export default defineCloudflareConfig({
  // To enable durable cache storage for 'use cache' components on Cloudflare Workers:
  // 1. Create an R2 bucket in the Cloudflare dashboard
  // 2. Uncomment the import above and the line below
  // 3. Set the bucket name in wrangler.jsonc under r2_buckets
  // Time-based and on-demand revalidation may also require OpenNext's
  // DO queue and tag-cache pieces; see the OpenNext Cloudflare caching docs.
  // incrementalCache: r2IncrementalCache,
})
