// source: project Loan Tracker MCP (https://loan-tracker-mcp.vercel.app)
// source: spec § Phase C special handling — "voice-UI screenshot + agentic website explainer"

export const LOAN_TRACKER_SECTIONS = [
  {
    heading: "what it is",
    body: (
      <>
        <p>
          A loan-tracker built with <strong>no input fields</strong>. There&apos;s a
          microphone button and a modal. You ask in plain English. The page asks the
          MCP server, the MCP server hits the database, the answer comes back as text and
          (optionally) speech.
        </p>
        <p>
          I built it because &ldquo;agentic website&rdquo; was the phrase everyone was
          throwing around and nobody could tell me what it concretely meant. So I built
          one.
        </p>
      </>
    ),
  },
  {
    heading: "what 'agentic web' actually means",
    body: (
      <>
        <p>
          A web app surface is normally a typed contract: every action is a form field, a
          button, a route. The user has to learn the contract before they can use the app.
        </p>
        <p>
          An <strong>agentic</strong> {" "} surface inverts that. The contract lives behind the
          screen — exposed as an MCP server with structured tool definitions. The user
          speaks in their own words; an LLM-mediated router picks the right tool, fills
          the parameters, and the page reacts to the result. The screen is still useful
          (it visualizes state) but it&apos;s no longer the protocol.
        </p>
        <p>
          The practical consequence: every UI affordance — search, filter, add, edit,
          summarize — becomes a tool definition the agent can pick from. Adding a new
          capability is adding a new tool, not adding a new screen.
        </p>
      </>
    ),
  },
  {
    heading: "the stack",
    body: (
      <ul className="ml-6 list-disc space-y-2">
        <li><strong>Next.js</strong> + <strong>Vercel</strong> for the page itself.</li>
        <li><strong>MCP server</strong> exposing the loan-data CRUD operations as structured tools.</li>
        <li><strong>Web Speech API</strong> for live transcription on the client.</li>
        <li><strong>OpenAI / Claude</strong> for the natural-language → tool-call mapping.</li>
        <li>The whole thing is &lt; 1000 lines.</li>
      </ul>
    ),
  },
  {
    heading: "why this matters",
    body: (
      <p>
        Most &ldquo;AI features&rdquo; bolted onto existing apps are a sidebar with a chat
        widget. That&apos;s a sidekick, not an agent. An <em>agentic</em> app makes the
        agent the primary interface — and the screen becomes a state visualizer instead of
        a control panel. This is a small demo proving the shape is real.
      </p>
    ),
  },
];
