// Role card data for the "Trace the Request" activity
// Used by build-cards.js to generate printable A5 PDFs

const { C } = require("../branding");

// Unified framework applied by every role to every arrow:
//   Right thing? · Right way? · Useful? · Risk?

const LENS = "For each arrow, ask: Right thing? \u00B7 Right way? \u00B7 Useful? \u00B7 Risk?";

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
    howToParticipate: "Watch the sequence diagram. For each arrow, apply your four questions. You focus on the message format: can it express the intent, and will the response enable the outcome?",
    keyTerms: [
      { term: "tool_use block",  def: "An LLM response that says \u2018call this function\u2019 instead of returning text" },
      { term: "trace ID",        def: "A unique ID threaded through logs to link one request\u2019s events together" },
      { term: "schema contract", def: "The agreed shape of a message \u2014 break it and the receiver fails" },
    ],
    lensNote: LENS,
    hints: {
      round1: [
        { label: "Right thing?", text: "Does the request direct this prompt to the right model, on the right account? What fields express that \u2014 and what if they\u2019re absent?" },
        { label: "Right way?",   text: "This is a single exchange. Is the message minimal \u2014 only what the model needs \u2014 or does it carry overhead even for this trivial query?" },
        { label: "Useful?",      text: "Can the caller confirm from the response structure alone that this is a valid answer \u2014 not a refusal or a format error?" },
        { label: "Risk?",        text: "What\u2019s the smallest schema break that causes a silent failure? A renamed field? A missing default? Who catches it?" },
      ],
      round2: [
        { label: "Right thing?", text: "Does the format let the model request the file contents it needs before acting? Are files structured fields \u2014 or embedded in the prompt text?" },
        { label: "Right way?",   text: "Does the response express edits as structured tool calls, or is the rename buried in free text the caller must parse?" },
        { label: "Useful?",      text: "How many request-response turns does this realistically need? Is a multi-turn exchange built into the protocol \u2014 or assumed one-shot?" },
        { label: "Risk?",        text: "If the model needs a file it hasn\u2019t seen, can the format express \u2018I need more context\u2019 \u2014 or does the protocol force a guess?" },
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
    howToParticipate: "Watch the sequence diagram. For each arrow, apply your four questions. You focus on trust: who is allowed to do this, and what could a bad actor do with it?",
    keyTerms: [
      { term: "Prompt injection", def: "Hiding an instruction inside user input to hijack what the AI does" },
      { term: "ACL",              def: "Access Control List \u2014 the rules defining who can read or write a resource" },
      { term: "Repudiation",      def: "Denying you took an action \u2014 prevented by audit logs" },
    ],
    lensNote: LENS,
    hints: {
      round1: [
        { label: "Right thing?", text: "Is the caller authenticated, and does their role permit even this trivial query?" },
        { label: "Right way?",   text: "Is the credential a typed auth header \u2014 not embedded in the prompt text where the model could read and leak it?" },
        { label: "Useful?",      text: "Does this security check add appropriate friction \u2014 or enough overhead to encourage workarounds?" },
        { label: "Risk?",        text: "Could this input contain a hidden instruction (prompt injection) designed to manipulate the response?" },
      ],
      round2: [
        { label: "Right thing?", text: "Is the user authorised to modify the entire codebase \u2014 or only their own files? Where is that boundary enforced?" },
        { label: "Right way?",   text: "Is the permission model checked once upfront, or re-verified before each file is modified? Which gives better security \u2014 and better UX?" },
        { label: "Useful?",      text: "Does authorisation give the agent the right scope \u2014 enough to finish the task, no more? Does \u2018rename foo()\u2019 implicitly include tests, docs, and CI config?" },
        { label: "Risk?",        text: "The agent reads all files. Are .env files and secrets flowing to the LLM API? Could a malicious comment inject a new instruction?" },
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
    howToParticipate: "Watch the sequence diagram. For each arrow, apply your four questions. You focus on cost: is the spend proportionate, approved, and capped?",
    keyTerms: [
      { term: "Token",          def: "Unit LLMs charge for \u2014 roughly \u00BE of a word; 1k tokens \u2248 $0.001\u2013$0.015" },
      { term: "Frontier model", def: "The latest, most capable \u2014 and most expensive \u2014 LLM (GPT-4o, Claude 3.5)" },
      { term: "Prompt caching", def: "Paying once to store a long prompt, then reusing it cheaply on repeat calls" },
    ],
    lensNote: LENS,
    hints: {
      round1: [
        { label: "Right thing?", text: "Does this trivial query need a frontier model \u2014 or could a smaller, cheaper model answer it just as well?" },
        { label: "Right way?",   text: "Is the system prompt cached, or is the full cost being paid on every single request?" },
        { label: "Useful?",      text: "Is the token spend proportionate to the value? What\u2019s the cost ceiling for a response the user might not act on?" },
        { label: "Risk?",        text: "If this query fails and retries automatically, how many times \u2014 and what does each retry cost?" },
      ],
      round2: [
        { label: "Right thing?", text: "Do we need all 87 files in context, or could a targeted search find the ~10 that actually contain foo()?" },
        { label: "Right way?",   text: "Is this one batch call, or a chatty back-and-forth? The protocol\u2019s chattiness directly drives token spend." },
        { label: "Useful?",      text: "Who approves a ~130k-token call before it goes out? Is the gate before the cost \u2014 or after?" },
        { label: "Risk?",        text: "If the rename retries 3\u00D7 at 130k tokens each, that\u2019s ~400k tokens (~$1\u20138) of waste. Is there a spend cap?" },
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
    howToParticipate: "Watch the sequence diagram. For each arrow, apply your four questions. You focus on the human: does the user stay in control, and can they undo what they didn\u2019t intend?",
    keyTerms: [
      { term: "Diff view",         def: "Side-by-side display of what changed \u2014 like a git diff, line by line" },
      { term: "Streaming response",def: "Text arriving word-by-word in real time, before the full answer is ready" },
      { term: "Action-level undo", def: "Reversing what the AI did \u2014 not just the last keystroke, but the whole operation" },
    ],
    lensNote: LENS,
    hints: {
      round1: [
        { label: "Right thing?", text: "Does the UI make clear which model answered \u2014 and what that means for the reliability of this response?" },
        { label: "Right way?",   text: "Was the model chosen for the user, or could they select it? Is that choice visible \u2014 or a hidden system decision?" },
        { label: "Useful?",      text: "Can the user act on the response, or do they need a follow-up to get something usable?" },
        { label: "Risk?",        text: "If the response is streaming in (arriving word-by-word), can the user stop it \u2014 and is the partial result usable or misleading?" },
      ],
      round2: [
        { label: "Right thing?", text: "Before a single file changes, does the user see a full preview \u2014 which files, how many instances, any ambiguous or skipped cases?" },
        { label: "Right way?",   text: "The protocol may take multiple turns. Does the user see progress \u2014 or a spinner while 87 files are processed silently?" },
        { label: "Useful?",      text: "Can the user narrow the scope mid-task (\u2018only this module\u2019) \u2014 or is it all-or-nothing once submitted?" },
        { label: "Risk?",        text: "After applying the rename, is there an undo for the whole assistant action \u2014 not just the last keystroke?" },
      ],
    },
  },
];
