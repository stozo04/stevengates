// source: Mila Gates — family scrapbook with agentic AI search over photos and memories
// source: stozo04/mila-nextjs README + AGENTS.md — Next.js 15, React 19, Supabase, OpenAI ChatKit, File Search (vector store), TTS

export const MILAGATES_SECTIONS = [
  {
    heading: "the project",
    body: (
      <>
        <p>
          <strong>Mila Gates</strong> {" "} is a private family site for my daughter — a
          growing-up timeline of photos, milestones, and written memories, captured month
          by month. The front door is a calm, mobile-friendly blog. The interesting part
          is what&apos;s behind it.
        </p>
        <p>
          The whole site is wrapped in an agentic AI surface. I can ask &mdash; or speak
          &mdash; in plain English: <em>&ldquo;Find the photos from her first
          birthday,&rdquo; &ldquo;Pull up the post about her first steps,&rdquo;
          &ldquo;What did I write about the trip to Galveston?&rdquo;</em> The model
          searches the memory corpus, returns the right entry, and cites the source post.
        </p>
      </>
    ),
  },
  {
    heading: "what makes it agentic",
    body: (
      <>
        <p>
          The chatbot isn&apos;t a sidekick — it&apos;s the navigation layer. Under the
          hood, every blog post is ingested into an <strong>OpenAI Vector Store</strong>,
          and the chat surface uses <strong>OpenAI ChatKit</strong> with{" "}
          <strong>File Search (RAG)</strong> turned on. Ask a natural-language question,
          the model retrieves the matching posts, and the response stream includes
          citations back to the original entries.
        </p>
        <p>
          Every blog post also has a <strong>TTS endpoint</strong> (
          <code>/api/blog/[slug]/audio</code>) that streams a voiced version of the entry.
          Family members who don&apos;t want to read can listen.
        </p>
      </>
    ),
  },
  {
    heading: "the stack",
    body: (
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>Next.js 15 App Router</strong> + <strong>React 19</strong> — server
          components for the blog tier, route handlers under <code>src/app/api/**</code>{" "}
          for the AI + TTS endpoints.
        </li>
        <li>
          <strong>Supabase</strong> for auth and content — Postgres + Row Level Security,
          a whitelisted-email auth flow so only family can see the protected segment.
        </li>
        <li>
          <strong>OpenAI ChatKit</strong> embedded widget — exchanges a workflow ID for a
          per-session client secret via <code>/api/chatkit/session</code>, then renders
          the chat bottom-right. The workflow itself lives in OpenAI Agent Builder.
        </li>
        <li>
          <strong>OpenAI Vector Store + File Search</strong> — the RAG tier. The chat
          stream attaches{" "}
          <code>tools: [{`{ type: "file_search", vector_store_ids: [...] }`}]</code> when
          a store ID is configured. Citations come back in the{" "}
          <code>event: done</code> SSE payload.
        </li>
        <li>
          <strong>Edge-runtime streaming</strong> — the legacy <code>/api/chat-stream</code>{" "}
          route runs on the edge with SSE for low-latency token streaming and proper
          cancellation handling.
        </li>
        <li>
          <strong>Bootstrap 5 + SCSS</strong> for the front-end shell. Deployed on{" "}
          <strong>Vercel</strong> with Analytics.
        </li>
      </ul>
    ),
  },
  {
    heading: "architecture in one paragraph",
    body: (
      <p>
        Posts live in Supabase. Posts are ingested into an OpenAI Vector Store. ChatKit
        renders a widget that talks to a session route, which mints a per-session client
        secret from the OpenAI workflow. When a family member asks a question, the
        workflow agent uses File Search to retrieve the relevant posts from the vector
        store, generates an answer streamed back token-by-token, and returns citations on
        completion. Voice playback of any post is a separate route that streams audio from
        the TTS endpoint. Auth is whitelist-based via Supabase RLS, so the protected
        segment is invisible to anyone outside the family allowlist.
      </p>
    ),
  },
  {
    heading: "why i built it",
    body: (
      <p>
        I have a daughter. I take a lot of photos. The phone&apos;s camera roll is a
        terrible memory system — chronological, unsearchable, and useless if you ever
        want to find <em>the one</em> moment. Mila Gates is the &ldquo;I build for the
        people I love&rdquo; piece. It&apos;s also the project where I get to feel
        good about agentic AI: a tool whose job is to help me remember.
      </p>
    ),
  },
  {
    heading: "what this demonstrates",
    body: (
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>Modern AI primitives in production.</strong> ChatKit, Vector Store, File
          Search, edge streaming, SSE with citations — wired end-to-end, deployed, in use.
        </li>
        <li>
          <strong>Full-stack ownership.</strong> Auth, RLS, server components, edge
          handlers, RAG ingestion, TTS, embedded widget — all of it.
        </li>
        <li>
          <strong>Pragmatic auth.</strong> Supabase + email allowlist instead of building
          a full identity stack. Right tool, right scope.
        </li>
        <li>
          <strong>Agentic UX done quietly.</strong> The chat surface isn&apos;t a
          gimmick — it&apos;s the navigation. No forms to fill, no filters to click. Just
          ask.
        </li>
      </ul>
    ),
  },
];
