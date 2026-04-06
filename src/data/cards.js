// Role card data for the "Trace the Request" activity
// Used by build-cards.js to generate printable A5 PDFs

const { C } = require("../branding");

module.exports = [
  {
    slug:     "card-protocol-engineer",
    icon:     "plug",
    color:    C.steel,        // #6B8FA2
    name:     "Protocol Engineer",
    tagline:  "Owns the wire: formats, headers, message flow",
    owns: [
      "HTTP request / response schema",
      "JSON message structure & fields",
      "What enters and exits every component",
    ],
    primer: "You care about the format of every byte on the wire. When the facilitator asks \u2018what does the request look like?\u2019 \u2014 that\u2019s yours.",
    howToParticipate: "Watch the sequence diagram. Whenever an arrow moves, ask what the message looks like \u2014 its fields, its format, and what happens if the structure is unexpected.",
    keyTerms: [
      { term: "tool_use block",   def: "An LLM response that says \u2018call this function\u2019 instead of returning text" },
      { term: "trace ID",         def: "A unique ID threaded through logs to link one request\u2019s events together" },
      { term: "schema contract",  def: "The agreed shape of a message \u2014 break it and the receiver fails" },
    ],
    lensNote: "Focus areas: field names & types \u00B7 intent fidelity \u00B7 round-trip count \u00B7 error shapes \u00B7 versioning",
    hints: {
      round1: [
        "What fields are in the request JSON? Are any optional \u2014 and what are the defaults if omitted?",
        "Who owns the schema contract? If the API vendor renames a field, who is responsible for catching the break?",
        "A plain text prompt like \u2018What model are you?\u2019 has no typed field for intent. Could the model misread it \u2014 and if so, would the format surface that mismatch, or silently return a wrong answer?",
        "This is one request and one response. But if this is turn 10 of a session, what fraction of the payload is the actual question \u2014 and what fraction is protocol overhead re-sent on every turn?",
      ],
      round2: [
        "The LLM response is no longer a plain string \u2014 it\u2019s tool_use blocks (structured actions). What does the schema look like, and who validates it?",
        "\u2018Rename foo() \u2192 bar()\u2019 is natural language, not a typed command. Can the format express scope precisely enough? What happens if \u2018foo\u2019 also appears in comments, string literals, and config files \u2014 and the format has no field to distinguish them?",
        "What if the LLM returns a partial rename \u2014 only 40 of 87 files? Is \u2018partial success\u2019 a valid state or an error in your schema?",
        "Does renaming 87 files require one tool call per file \u2014 87 round trips \u2014 or can all edits arrive in a single response? How does that choice affect latency, cost, and what happens when file 23 fails?",
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
      "File access boundaries & permissions (ACLs)",
      "Prompt injection & command trust decisions",
    ],
    primer: "You own every trust decision. When the facilitator asks \u2018can the agent read this file?\u2019 \u2014 that\u2019s yours.",
    howToParticipate: "Watch the sequence diagram. Raise a question at any arrow where trust is being granted, a credential is used, or the system could be manipulated by a bad actor.",
    keyTerms: [
      { term: "Prompt injection", def: "Hiding an instruction inside user input to hijack what the AI does" },
      { term: "ACL",              def: "Access Control List \u2014 the rules defining who can read or write a resource" },
      { term: "Repudiation",      def: "Denying you took an action \u2014 prevented by audit logs" },
    ],
    lensNote: "STRIDE: Spoofing (fake identity) \u00B7 Tampering (modify data) \u00B7 Repudiation (deny action) \u00B7 Info Disclosure \u00B7 DoS \u00B7 Elevation of Privilege",
    hints: {
      round1: [
        "Is the caller authenticated \u2014 and does their role permit even this trivial query?",
        "Could this input contain a hidden instruction (prompt injection) designed to manipulate the response?",
        "Does the response reveal the model version or provider \u2014 useful intelligence for an attacker?",
        "Could this endpoint be flooded to exhaust rate limits and block legitimate users?",
      ],
      round2: [
        "Is the user authorised to modify the entire codebase \u2014 or only their own files?",
        "Could a malicious comment or filename inject an instruction that changes what the agent does?",
        "If this rename breaks production, is there an immutable audit record of who requested it and what the agent actually did?",
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
    subtitle: "FinOps = cloud & AI cost management",
    tagline:  "Owns cost: token budgets, rates, approval gates",
    owns: [
      "Token counting & cost per request",
      "Rate limit headroom",
      "Approval gates before expensive calls",
    ],
    primer: "You own every token and every dollar. When the facilitator asks \u2018how much did that cost?\u2019 \u2014 you answer.",
    howToParticipate: "Watch the sequence diagram. Raise a question before any expensive LLM call goes out \u2014 about what it will cost, whether it needs approval, and whether a cheaper alternative exists.",
    keyTerms: [
      { term: "Token",          def: "Unit LLMs charge for \u2014 roughly \u00BE of a word; 1k tokens \u2248 $0.001\u2013$0.015" },
      { term: "Frontier model", def: "The latest, most capable \u2014 and most expensive \u2014 LLM (GPT-4o, Claude 3.5)" },
      { term: "Prompt caching", def: "Paying once to store a long prompt, then reusing it cheaply on repeat calls" },
    ],
    lensNote: "Focus areas: Scope (how much input?) \u00B7 Shape (batch or chatty?) \u00B7 Selection (right model?) \u00B7 Budget (who approves?) \u00B7 Safety net (spend caps?)",
    hints: {
      round1: [
        "Does this trivial query need a frontier model \u2014 or could a smaller model or a cached response answer it?",
        "Is the system prompt cached, or are we paying full price for it on every single request?",
        "Do we have budget and rate-limit headroom \u2014 or are we already close to a daily cap?",
        "If this query fails and retries automatically, how many times could that happen \u2014 and what does each retry cost?",
      ],
      round2: [
        { label: "Scope",       text: "Do we need all 87 files, or could a targeted search find just the ~10 that contain foo()?" },
        { label: "Shape",       text: "Is this one smart batch call, or a chatty back-and-forth that multiplies token spend?" },
        { label: "Selection",   text: "Does a mechanical rename need the most capable \u2014 and expensive \u2014 model?" },
        { label: "Budget",      text: "Have we spent our per-user or per-team budget today? Who approves a ~130k-token call?" },
        { label: "Safety net",  text: "If the rename retries 3\u00D7 at 130k tokens each, that\u2019s ~400k tokens of waste (~$1\u20138). Is there a spend cap?" },
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
      "How users give instructions (typed, voice, commands)",
      "Output presentation & diff views (what changed)",
      "Confirmation dialogs & undo flows",
    ],
    primer: "You own every moment the human sees or touches the tool. When the facilitator asks \u2018how does the user confirm this?\u2019 \u2014 that\u2019s yours.",
    howToParticipate: "Watch the sequence diagram. Speak up at Arrow 1 (what did the user give?) and Arrow 6 (what does the user see, confirm, and can undo?). You are the human\u2019s advocate.",
    keyTerms: [
      { term: "Diff view",         def: "Side-by-side display of what changed \u2014 like a git diff, line by line" },
      { term: "Streaming response",def: "Text arriving word-by-word in real time, before the full answer is ready" },
      { term: "Action-level undo", def: "Reversing what the AI did \u2014 not just the last keystroke, but the whole operation" },
    ],
    lensNote: "Focus areas: Can the user see what\u2019s about to happen? \u00B7 Can they stop it? \u00B7 Can they trace what changed? \u00B7 Can they undo it?",
    hints: {
      round1: [
        "Does the UI make clear which model answered \u2014 and what that means for speed, cost, or capability?",
        "Could the user have chosen a different model before submitting, or was that decided for them?",
        "Does the interface signal when the model might be uncertain or wrong?",
        "If the response is streaming in (arriving word-by-word), can the user stop it \u2014 and is the partial result usable?",
      ],
      round2: [
        "Before a single file changes, does the user see a full preview \u2014 which files, how many instances, any ambiguous or skipped cases?",
        "Can the user narrow the scope mid-task (\u2018only this module\u2019) \u2014 or is it all-or-nothing once submitted?",
        "If the rename breaks a test, can the user trace exactly which edit caused it, back to the original assistant action?",
        "Does the UI surface ambiguous cases \u2014 like foo in a comment, or \u2018foo\u2019 as a config string \u2014 with a warning indicator?",
        "After applying the rename, is there an undo that reverses the whole assistant action \u2014 not just the last keystroke?",
        "Does the assistant explain what it didn\u2019t rename, and why?",
      ],
    },
  },
];
