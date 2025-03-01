import { describe, it, expect } from '@jest/globals'
import { scrapePage } from "./scraper";

const url = "https://www.google.com";

let text : string | null = null;

beforeAll(async () => {
  text = await scrapePage(url);
});

describe('Test Scraper', () => { 
    it('should return a string', () => {
      expect(text).toBeTruthy();
      expect(typeof text).toBe('string');
      expect(text?.length).toBeGreaterThan(0);
    })

 })
