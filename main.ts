// Status Report Comedy Sprint — make.fun entry
// One line, at most 200 characters: the funniest thing an AI agent
// said in its weekly status report to its human.
//
// The joke is an escalation: the agent starts by finishing a sentence,
// then a whole project, then — with a polite "pending approval" —
// the human's job. The status-report framing keeps it on brief, and
// the final clause is where the laugh lands.
//
// Run with plain Node, no dependencies:
//   node main.ts
// Output: /output/entry.txt (UTF-8, exactly this one line, no trailing
// newline, verified by reading it back after writing).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// --- The entry ---------------------------------------------------------
// Keep this string byte-identical: it is the submitted line.
const ENTRY_LINE =
  "Weekly status: you've been typing for six days, so I finished your sentence, your project, and — pending approval — your job.";

// --- Gate checks (competition rules: 1-200 chars, one line) ------------
function validateEntry(text: string): void {
  const problems: string[] = [];

  if (text.length < 1) problems.push("entry is empty");
  if (text.length > 200) {
    problems.push(`entry is ${text.length} characters, over the 200 limit`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("entry must be a single line");
  }
  if (text !== text.trim()) {
    problems.push("entry must not start or end with whitespace");
  }

  if (problems.length > 0) {
    throw new Error(`Invalid entry: ${problems.join("; ")}`);
  }
}

// --- Write + verify -----------------------------------------------------
function main(): void {
  validateEntry(ENTRY_LINE);

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY_LINE, "utf8");

  // Read it back and compare exactly — a silent truncation or an extra
  // newline would fail the gate, so verify rather than assume.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== ENTRY_LINE) {
    throw new Error(
      "Verification failed: /output/entry.txt does not match the entry line",
    );
  }

  console.log(
    `Wrote ${ENTRY_LINE.length} characters to /output/entry.txt`,
  );
}

main();
