import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();

const WALLET_ADDRESS = process.env.WALLET_ADDRESS || '';

app.get('/', (c) => {
  return c.json({
    service: 'Social Profile Intelligence API',
    status: 'online',
  });
});
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});
// FREE TEST ENDPOINT
app.get('/api/free-profile/:username', async (c) => {
  const username = c.req.param('username');

  return c.json({
    success: true,
    platform: 'twitter',
    username,
    followers: '12000',
    engagement_rate: '4.2%',
    verified: true,
  });
});

// PREMIUM x402 STYLE ENDPOINT
app.get('/api/twitter/profile/:username', async (c) => {
  const username = c.req.param('username');

  const paymentSignature = c.req.header('Payment-Signature');

  // STEP 1: Return HTTP 402 if no payment
  if (!paymentSignature) {
    return c.json(
      {
        status: 402,
        message: 'Payment required',
        price: {
          amount: '0.01',
          currency: 'USDC',
        },
        network: 'base',
        recipient: WALLET_ADDRESS,
        headers: {
          required: ['Payment-Signature'],
        },
      },
      402
    );
  }

  // STEP 2: Return premium data after payment header exists
  return c.json({
  success: true,
  premium: true,
  platform: 'twitter',
  profile: {
    username,
    display_name: 'Demo User',
    bio: 'AI, tech, and startup content creator',
    verified: true,
    followers: 12000,
    following: 350,
    posts: 540,
    engagement_rate: '4.2%',
    fake_follower_score: '8%',
    profile_url: `https://x.com/${username}`,
    created_at: '2024-01-01',
  },
  analytics: {
    average_likes: 2400,
    average_reposts: 320,
    average_comments: 120,
    audience_quality: 'High',
    growth_trend: 'Positive',
  },
  top_post: {
    content: 'Building in public changes everything.',
    likes: 2400,
    reposts: 320,
    comments: 120,
  },
  generated_at: new Date().toISOString(),
});

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});

console.log('Server running...');
