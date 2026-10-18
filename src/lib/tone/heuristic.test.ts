import assert from "node:assert/strict";
import { analyzeHeuristic, softenSuggestion } from "./heuristic";

const warm = analyzeHeuristic("Thank you — I’m glad we talked. I hear you.");
assert.equal(warm.label, "positive");
assert.ok(warm.score > 0);

const curt = analyzeHeuristic("Fine.");
assert.ok(curt.label === "negative" || curt.score < 0);

const harm = analyzeHeuristic("You’re an idiot and worthless.");
assert.equal(harm.label, "destructive");

const tip = softenSuggestion("You always ruin everything.", analyzeHeuristic("You always ruin everything."));
assert.ok(tip);

console.log("heuristic tests passed");
