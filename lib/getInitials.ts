type Options = {
  max?: number; // Maximum number of initials to return (default: 2)
  uppercase?: boolean; // Uppercase result (default: true)
};

// Ignore common particles (tweak as needed)
const ignore = new Set([
  "da",
  "de",
  "del",
  "della",
  "der",
  "di",
  "du",
  "la",
  "le",
  "van",
  "von",
  "the",
  "and",
  "of",
]);

export function getInitials(fullName: string, options?: Options): string {
  const {max = 2, uppercase = true} = options ?? {};

  if (!fullName || typeof fullName !== "string") {
    return "";
  }

  // Normalize whitespace and split
  const rawParts = fullName.trim().replace(/\s+/g, " ").split(" ");

  if (rawParts.length === 0) {
    return "";
  }

  const parts = rawParts.filter(
    (p) => !ignore.has(p.toLowerCase()) && p.length > 0,
  );

  if (parts.length === 0) {
    return "";
  }

  // Helper to get first letter (skip non-letters)
  const firstLetter = (word: string): string => {
    const m = word.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/);

    return m ? m[0] : "";
  };

  let initials: string[] = [];

  if (parts.length === 1) {
    // Single-word name: take up to `max` letters from the word (letters only)
    const letters = (parts[0].match(/[A-Za-zÀ-ÖØ-öø-ÿ]/g) ?? []).slice(0, max);

    initials = letters;
  } else {
    // Multi-word: first letter of first and last, plus middle ones if max > 2
    initials.push(firstLetter(parts[0]));

    if (max > 2 && parts.length > 2) {
      for (let i = 1; i < parts.length - 1 && initials.length < max - 1; i++) {
        initials.push(firstLetter(parts[i]));
      }
    }

    if (initials.length < max) {
      initials.push(firstLetter(parts[parts.length - 1]));
    }
  }

  const result = initials.join("");

  return uppercase ? result.toUpperCase() : result;
}

/*
Examples:
getInitials("Ada Lovelace")                // "AL"
getInitials("  jean   luc  Picard ")       // "JP" (or "JLP" with { max: 3 })
getInitials("madonna")                     // "MA"
getInitials("Ludwig van Beethoven")        // "LB" (ignores "van")
getInitials("Émilie du Châtelet", { max: 3 }) // "ÉC" or "ÉdC" if you remove "du" from ignore
*/
