import { portfolioData } from './portfolioData.js';

// "KUSA — Automatic Form Filler" -> "KUSA", "Barbeque ni Bebang | Official Website" -> "Barbeque ni Bebang"
export const projectShortName = (project) => project.title.split(/ — | \| /)[0].trim();

export const projectNames = () => portfolioData.projects.map(projectShortName);

// "A, B, and C"
export const joinNames = (names) =>
  names.length <= 2 ? names.join(' and ') : `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;

export const projectListMarkdown = () =>
  portfolioData.projects
    .map((p, i) => `${i + 1}. **${p.title}** (${p.technologies.slice(0, 4).join(', ')}) — ${p.description}`)
    .join('\n');

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Case-sensitive whole-word match, so Tagalog words like "kusa" or "tuklasin" don't count as KUSA or TUKLAS.
// Trailing punctuation is dropped so "STAT" also matches "STAT!".
const mentions = (text, name) =>
  new RegExp(`(^|[^\\w])${escapeRegExp(name.replace(/[^\w]+$/, ''))}(?!\\w)`).test(text);

// One "View ..." button when a reply mentions any project by name
export const projectNavLinks = (text) => {
  const mentioned = projectNames().filter((name) => mentions(text || '', name));
  if (mentioned.length === 0) return [];
  return [{ label: mentioned.length === 1 ? `View ${mentioned[0]}` : 'View Projects', target: '#projects' }];
};
