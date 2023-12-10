# Coding Assistant

This repo is forked from [Smart Chatbot UI](https://github.com/abstracta/smart-chatbot-ui).

It's a work in progress.

Purposes are:
- tuning to coding needs;
- apikey usage monitoring for admins;
- use Redis.

#### Mongodb
For an easy, serverless mongo we used https://cloud.mongodb.com and integrated it directly via Vercel.
It will save some configuration later on.


## Setup
Create an `.env` with your setup keys.

NEXTAUTH_ENABLED=false|true

If enabled 
NEXTAUTH_SECRET and NEXTAUTH_URL are needed.

NEXTAUTH_SECRET=<generate an hash>
NEXTAUTH_URL=your deployment url
MONGODB_URI=
MONGODB_DB=

Copy .env.local.example to .env and adjust variables.


### Installation in Vercel
add the environment variables in your settings
