import Link from "next/link";
import { Download, ExternalLink, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";

// source: original stevengates/src/app/(WithLayout)/resume/page.tsx (preserved bullets)
// source: Kayley_Cowork/steven_company_name canon (Associa = parent, HOAM = day-to-day after 4/16/2026 reorg)

export const metadata = { title: "Resume" };

const PDF_PATH = "/resume/steven-gates-resume.pdf";

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24">
      <header className="flex flex-col gap-4 border-b border-border/60 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            stevengates.io / resume
          </p>
          <h1 className="mt-3 font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Steven Gates
          </h1>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            Senior Software Engineer · Dallas, TX
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 font-mono text-xs text-foreground hover:border-[color:var(--color-accent-cyan)]"
          >
            <FileText className="size-3.5" /> view PDF
          </Link>
          <Link
            href={PDF_PATH}
            download
            className="inline-flex items-center gap-2 rounded-md bg-[color:var(--color-accent-cyan)] px-3 py-2 font-mono text-xs text-[color:var(--accent-foreground)] hover:opacity-90"
          >
            <Download className="size-3.5" /> download PDF
          </Link>
        </div>
      </header>

      <section className="grid gap-12 pt-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <Block heading="summary">
            <p>
              Senior Software Engineer with a decade of work shipping production cloud
              platforms — AWS, Azure, .NET, C#, SQL, JavaScript. Lead the team that built
              <Em>communityarchives.com</Em> at Associa: a microservices platform doing{" "}
              <Em>$100M+ ARR</Em> with <Em>50,000+ users</Em>, from a blank repo to live in
              production. Previously delivered an award-winning hydro-monitoring system
              for Tarrant County (~2.1M people) at Halff Associates. Now obsessed with
              what happens when an LLM gets MCP tools, persistent memory, and a heartbeat
              — building autonomous AI systems on Claude Code in my off-hours.
            </p>
          </Block>

          <Block heading="experience">
            <Job
              title="Senior Software Engineer"
              employer="Associa / HOAM Technology"
              years="2019 — present"
              bullets={[
                <>Lead a team of <Em>10</Em> architecting and shipping <Em>communityarchives.com</Em> — an end-to-end real-estate management platform. Launched 2019, now <Em>50,000+ users</Em> and <Em>$100M+ ARR</Em>.</>,
                <>Designed and built the management portal on <Em>Angular + .NET + GraphQL + AWS</Em> (DynamoDB, RDS, Aurora, Lambda, S3, EventBridge, API Gateway). Stripe integration. 15+ report types with throttling + aggregation.</>,
                <>Architected the internal + marketplace portals to handle jurisdiction-specific licensing + showcase products across <Em>100,000+ US locations</Em>. Elasticsearch behind the scenes.</>,
                <>Mentor a team of 5 on design patterns, debugging, performance, and the boring discipline that separates an MVP from a platform.</>,
                <>Partner with senior leadership on product direction and technical strategy.</>,
              ]}
            />
            <Job
              title="Lead Software Developer"
              employer="Halff Associates"
              years="2015 — 2019"
              bullets={[
                <>Architected an <Em>award-winning</Em> hydro-monitoring and billing platform for <Em>~2.1M people in Tarrant County, TX</Em>. Stack: C#, .NET, Azure, JavaScript, jQuery, SQL Server, ESRI GIS, QuickBooks. Won multiple Texas county awards + the company's first-ever award.</>,
                <>Built core server-side components for a groundwater management system spanning <Em>10 Texas counties</Em> (~10M people).</>,
                <>Built a field-tech tracking site (C#, .NET Core, Vue.js, SQL Server) used by <Em>10,000+ field technicians</Em> to drop markers on hard-to-locate oil wells.</>,
                <>Internal employee-services platform for the company&apos;s 25k+ staff: trainings, seminars, certifications.</>,
              ]}
            />
          </Block>

          <Block heading="personal projects">
            <Job
              title="Kayley Cowork"
              employer="solo · since 2026"
              years=""
              bullets={[
                <>Autonomous companion agent on Claude Code. 4-step cognitive loop + multi-channel ingress (Telegram, Ring cameras, Gmail, calendar). 1.5M+ row long-term memory. <Link className="underline underline-offset-4 hover:text-foreground" href="/projects/kayley-cowork">case study →</Link></>,
              ]}
            />
            <Job
              title="Loan Tracker MCP"
              employer="solo · since 2026"
              years=""
              bullets={[
                <>An agentic website — no input fields, voice-driven. The MCP server is the protocol; the page visualizes. <Link className="underline underline-offset-4 hover:text-foreground" href="/projects/loan-tracker-mcp">case study →</Link></>,
              ]}
            />
            <Job
              title="Mila Gates"
              employer="solo · since 2025"
              years=""
              bullets={[
                <>Family-facing scrapbook + milestone log for my daughter. Live at <Link className="underline underline-offset-4 hover:text-foreground" href="https://milagates.com" target="_blank" rel="noopener noreferrer">milagates.com</Link>.</>,
              ]}
            />
            <Job
              title="GatesFlix"
              employer="solo · since 2017"
              years=""
              bullets={[
                <>Private Netflix-clone hosting 2,000+ purchased films. C# + .NET + MVC + Synology NAS + VLC + IMDb integration.</>,
              ]}
            />
          </Block>
        </div>

        <aside className="space-y-10 md:border-l md:border-border/60 md:pl-8">
          <Block heading="contact">
            <ul className="space-y-2 font-mono text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-3" />
                <Link href="mailto:gates.steven@gmail.com" className="hover:text-foreground">gates.steven@gmail.com</Link>
              </li>
              <li className="flex items-center gap-2">
                <Github className="size-3" />
                <Link href="https://github.com/stozo04" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">github.com/stozo04</Link>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="size-3" />
                <Link href="https://www.linkedin.com/in/gates-steven/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">linkedin.com/in/gates-steven</Link>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-3" /> Dallas, TX
              </li>
            </ul>
          </Block>

          <Block heading="education">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-foreground">BBA, Management Information Systems</span>
              <br />Texas Tech University &middot; 2008 — 2011
            </p>
          </Block>

          <Block heading="certifications">
            <ul className="space-y-2 font-mono text-xs">
              <li className="text-foreground">CS50 · Intro to AI with Python<br /><span className="text-muted-foreground">Harvard / edX &middot; 2024</span></li>
              <li className="text-foreground">MCSA: Web Applications<br /><span className="text-muted-foreground">Microsoft &middot; 2018</span></li>
              <li className="text-foreground">MCSD: App Builder<br /><span className="text-muted-foreground">Microsoft &middot; 2018</span></li>
              <li className="text-foreground">Microsoft Certified Professional<br /><span className="text-muted-foreground">Microsoft &middot; 2018</span></li>
              <li>
                <Link href="/certificates" className="inline-flex items-center gap-1 text-[color:var(--color-accent-cyan)] hover:underline underline-offset-4">
                  view + download <ExternalLink className="size-3" />
                </Link>
              </li>
            </ul>
          </Block>

          <Block heading="languages">
            <p className="font-mono text-xs text-muted-foreground">English (native)<br />Russian (intermediate)</p>
          </Block>

          <Block heading="interests">
            <p className="font-mono text-xs text-muted-foreground">AI &middot; Brazilian Jiu-Jitsu &middot; Tesla &middot; Travel</p>
          </Block>

          <Block heading="technical">
            <ul className="space-y-1 font-mono text-xs text-muted-foreground">
              <li>AWS · Azure</li>
              <li>TypeScript / React / Next.js / Vue</li>
              <li>Node.js · .NET / C#</li>
              <li>PostgreSQL · SQL Server · MySQL</li>
              <li>Claude Code · MCP · Supabase</li>
              <li>Object-oriented design</li>
              <li>Database design + delivery</li>
            </ul>
          </Block>
        </aside>
      </section>
    </div>
  );
}

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-accent-cyan)]">
        &gt; {heading}
      </h2>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <strong className="text-foreground">{children}</strong>;
}

type JobProps = { title: string; employer: string; years: string; bullets: React.ReactNode[] };

function Job({ title, employer, years, bullets }: JobProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <div>
          <h3 className="font-mono text-base font-medium text-foreground">{title}</h3>
          <p className="font-mono text-xs text-muted-foreground">{employer}</p>
        </div>
        {years ? <p className="font-mono text-xs text-muted-foreground">{years}</p> : null}
      </div>
      <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed text-muted-foreground marker:text-[color:var(--color-accent-cyan)]">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}
