// Role card data for the "Trace the Request" activity
// Used by build-cards.js to generate printable A5 PDFs

const { C } = require("../branding");

module.exports = [
  {
    slug:     "card-protocol-engineer",
    icon:     "plug",
    color:    C.accent,       // #8CC26C
    name:     "Protocol Engineer",
    tagline:  "Owns the wire: formats, headers, message flow",
    owns: [
      "HTTP request / response schema",
      "JSON message structure & fields",
      "What enters and exits every component",
    ],
    primer: "You care about the format of every byte on the wire. When the facilitator asks 'what does the request look like?' — that's yours.",
    lensNote: "Thinking lens \u2014 SCHEMA: Structure \u00B7 Contract \u00B7 Handles \u00B7 Evolution \u00B7 Monitoring \u00B7 Accepts",
    hints: {
      round1: [
        "What fields are in the request JSON? Are any optional \u2014 and what are the defaults if omitted?",
        "Who owns the schema contract? If the API vendor renames a field, who is responsible for catching the break?",
        "What happens if the API returns a 429, a 503, or malformed JSON \u2014 does the client handle each case differently?",
        "If the vendor adds a \u2018reasoning_tokens\u2019 field next month, will the client break, silently ignore it, or log a warning?",
      ],
      round2: [
        "The LLM response is no longer a plain string \u2014 it\u2019s tool_use blocks. What does the schema look like, and who validates it?",
        "The tool schema (file path, replacement text) is a contract between the assistant and the LLM. What happens when it drifts across model versions?",
        "What if the LLM returns a partial rename \u2014 only 40 of 87 files? Is \u2018partial success\u2019 a valid state or an error in your schema?",
        "Can you observe, per file, whether the rename was applied \u2014 and correlate that back to the original request with a trace ID?",
        "If the LLM includes unexpected metadata in a tool_use block, does the client ignore it gracefully or reject the entire response?",
      ],
    },
  },

  {
    slug:     "card-security-engineer",
    icon:     "shield",
    color:    C.warnRed,      // #E85D4A
    name:     "Security Engineer",
    tagline:  "Owns trust: auth, permissions, risk",
    owns: [
      "API key management & auth headers",
      "File access boundaries & ACLs",
      "Prompt injection & command trust decisions",
    ],
    primer: "You own every trust decision. When the facilitator asks 'can the agent read this file?' — that's yours.",
    lensNote: "Thinking lens \u2014 STRIDE: Spoofing \u00B7 Tampering \u00B7 Repudiation \u00B7 Disclosure \u00B7 DoS \u00B7 Privilege",
    hints: {
      round1: [
        "Is the caller authenticated \u2014 and does their role permit even this trivial query?",
        "Could this input contain a hidden instruction designed to manipulate the response?",
        "Does the response reveal the model version or provider \u2014 useful intelligence for an attacker?",
        "Could this endpoint be flooded to exhaust rate limits and block legitimate users?",
      ],
      round2: [
        "Is the user authorised to modify the entire codebase \u2014 or only their own files?",
        "Could a malicious comment or filename inject an instruction that changes what the agent does?",
        "If this rename breaks production, is there an immutable record of who requested it and what the agent actually did?",
        "The agent reads all files. Are .env files and hardcoded secrets in scope \u2014 and flowing to the LLM API?",
        "Does \u201Crename foo()\u201D give the agent implicit permission to also modify tests, docs, and CI config?",
      ],
    },
  },

  {
    slug:     "card-finops-engineer",
    icon:     "chart",
    color:    C.warnAmber,    // #E8B84A
    name:     "FinOps Engineer",
    tagline:  "Owns cost: token budgets, rates, approval gates",
    owns: [
      "Token counting & cost per request",
      "Rate limit headroom",
      "Approval gates before expensive calls",
    ],
    primer: "You own every token and every dollar. When the facilitator asks 'how much did that cost?' — you answer.",
    lensNote: "Thinking lens: Scope \u00B7 Shape \u00B7 Selection \u00B7 Budget \u00B7 Safety net",
    hints: {
      round1: [
        "Does this trivial query need a frontier model \u2014 or could a smaller model or a cached response answer it?",
        "Is the system prompt cached, or are we paying full price for it on every single request?",
        "Do we have budget and rate-limit headroom \u2014 or are we already close to a daily cap?",
      ],
      round2: [
        { label: "Scope",       text: "Do we need all 87 files, or could semantic search find just the ~10 that contain foo()?" },
        { label: "Shape",       text: "Is this one smart batch call, or a chatty back-and-forth that multiplies token spend?" },
        { label: "Selection",   text: "Does a mechanical rename need the most capable \u2014 and expensive \u2014 model?" },
        { label: "Budget",      text: "Have we spent our per-user or per-team budget today? Who approves a ~130k-token call?" },
        { label: "Safety net",  text: "If the rename retries 3\u00D7 at 130k tokens each, that\u2019s ~400k tokens of waste. Is there a spend cap?" },
      ],
    },
  },

  {
    slug:     "card-ux-engineer",
    icon:     "eye",
    color:    C.accentDim,    // #6B9E4F
    name:     "UX Engineer",
    tagline:  "Owns experience: input modes, output, confirmations",
    owns: [
      "Input modalities (typed, voice, commands)",
      "Output presentation & diff views",
      "Confirmation dialogs & undo flows",
    ],
    primer: "You own every moment the human sees or touches the tool. When the facilitator asks 'how does the user confirm this?' — that's yours.",
    lensNote: "Thinking lens \u2014 CLARITY: Clarity \u00B7 Lever \u00B7 Attribution \u00B7 Risk \u00B7 Interrupt \u00B7 Transparency \u00B7 Yield",
    hints: {
      round1: [
        "Does the UI make clear which model answered \u2014 and what that means for speed, cost, or capability?",
        "Could the user have chosen a different model before submitting, or was that decided for them?",
        "Does the interface signal when the model might be uncertain or wrong?",
        "If the response is streaming in, can the user stop it \u2014 and is the partial result usable?",
      ],
      round2: [
        "Before a single file changes, does the user see a full preview \u2014 which files, how many instances, any ambiguous or skipped cases?",
        "Can the user narrow the scope mid-task (\u2018only this module\u2019) \u2014 or is it all-or-nothing once submitted?",
        "If the rename breaks a test, can the user trace exactly which edit caused it, back to the original assistant action?",
        "Does the UI surface ambiguous cases \u2014 like foo in a comment, or \u2018foo\u2019 as a config string \u2014 with a warning indicator?",
        "After applying the rename, is there an undo that reverses this assistant action \u2014 not just the last keystroke?",
        "Does the assistant explain what it didn\u2019t rename, and why?",
      ],
    },
  },
];
