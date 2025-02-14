import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_API_KEY // Your Claude API key
}); 