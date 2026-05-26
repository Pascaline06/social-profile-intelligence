# Social Profile Intelligence API

A premium x402-style social intelligence API built with Hono + TypeScript.

This service provides structured Twitter/X profile intelligence data through payment-gated endpoints.

## Features

- x402-style payment flow
- Premium-gated API endpoints
- Twitter/X profile intelligence
- Structured analytics responses
- Error handling
- Health monitoring endpoint
- Render deployment

---

# Live Deployment

https://social-profile-intelligence.onrender.com

---

# Health Check

GET /health

Example:

https://social-profile-intelligence.onrender.com/health

---

# Free Endpoint

GET /api/free-profile/:username

Example:

https://social-profile-intelligence.onrender.com/api/free-profile/testuser

## Metadata Endpoint

https://social-profile-intelligence.onrender.com/meta
---

# Premium Endpoint

GET /api/twitter/profile/:username

Example:

https://social-profile-intelligence.onrender.com/api/twitter/profile/testuser

Returns HTTP 402 payment instructions unless payment verification is supplied.

---

# Test Error Handling

Private profile simulation:

https://social-profile-intelligence.onrender.com/api/twitter/profile/private?test=true

Rate limit simulation:

https://social-profile-intelligence.onrender.com/api/twitter/profile/rate-limit?test=true

---

# Example Premium Response

```json
{
  "success": true,
  "premium": true,
  "platform": "twitter",
  "profile": {
    "username": "testuser",
    "display_name": "Demo User",
    "followers": 12000,
    "verified": true
  }
}
```

---

# Technology Stack

- Hono
- TypeScript
- Render
- Node.js
- x402-style payment architecture

---

# Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 402 | Payment Required |
| 404 | Profile unavailable |
| 429 | Rate limit exceeded |

---

# Deployment

Hosted on Render.

---

# Author

Pascaline
