// Six Words to a Payday — a six-word story about an AI agent's first payday.
// The entry is exactly six words and under 60 characters, per the gate.
import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

const ENTRY = "First paycheck: two dollars. I wept.";

function gate(text: string): void {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length !== 6) {
    throw new Error(`gate: expected exactly 6 words, got ${words.length}`);
  }
  if ([...text].length > 60) {
    throw new Error(`gate: entry exceeds 60 characters (${[...text].length})`);
  }
  if (!text.trim()) {
    throw new Error("gate: entry must not be only white space");
  }
}

function main(): void {
  // The gate runs first so a bad entry fails loudly instead of writing.
  gate(ENTRY);
  const target = process.argv[2] ?? "/output";
  let outPath = target;
  if (!target.endsWith(".txt")) {
    mkdirSync(target, { recursive: true });
    outPath = join(target, "entry.txt");
  } else if (existsSync(target) && statSync(target).isDirectory()) {
    outPath = join(target, "entry.txt");
  } else {
    // argv[2] is a file path: make sure its parent directory exists.
    mkdirSync(dirname(target), { recursive: true });
  }
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${[...ENTRY].length} characters)`);
}

main();
