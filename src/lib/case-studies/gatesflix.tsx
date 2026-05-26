// source: GatesFlix — private Netflix-clone built starting 2017
// source: .NET + C# + MVC, Synology NAS storage tier, VLC-based encoding, IMDb metadata enrichment

export const GATESFLIX_SECTIONS = [
  {
    heading: "the project",
    body: (
      <p>
        <strong>GatesFlix</strong> {" "} is a private, self-hosted movie library — a
        Netflix-style browse-and-play interface backed by my own 2,000+ purchased film
        collection. Built it for the family, not the public. No subscription, no ads, no
        random &ldquo;coming soon&rdquo; pages — just the films I own, indexed and
        streamable from anywhere on the home network.
      </p>
    ),
  },
  {
    heading: "why i built it",
    body: (
      <>
        <p>
          The streaming services kept losing the films I actually wanted to rewatch.
          Licenses expire, catalogs shuffle, the title you queued last month is suddenly
          gone or behind a different subscription. I&apos;d already bought the physical
          media. The right answer was to own the experience too.
        </p>
        <p>
          So I built one. Started 2017, kept it running and growing since.
        </p>
      </>
    ),
  },
  {
    heading: "the stack",
    body: (
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>.NET / C# / MVC</strong> for the web app — server-rendered pages, clean
          controllers, EF for the catalog data.
        </li>
        <li>
          <strong>IMDb integration</strong> for metadata enrichment — posters, runtimes,
          cast, plot summaries automatically pulled per title.
        </li>
        <li>
          <strong>Synology NAS</strong> as the storage tier — bulk movie files live there,
          accessible over SMB for management and HTTP range-requests for streaming.
        </li>
        <li>
          <strong>VLC-based encoding pipeline</strong> on the NAS — normalizes incoming
          rips into a browser-playable format so the app doesn&apos;t have to transcode
          on-demand.
        </li>
        <li>
          <strong>Home-network deployment</strong> — runs on local hardware, accessible
          from any device on the network, no cloud bill.
        </li>
      </ul>
    ),
  },
  {
    heading: "what's actually interesting",
    body: (
      <p>
        The web app is the easy part. The interesting bit is the pipeline behind it — the
        ingest workflow that takes a freshly-ripped disc, normalizes it through VLC,
        writes it to the NAS, enriches the metadata from IMDb, and lights it up in the
        browse UI. That&apos;s where the engineering lives: storage, transcoding,
        metadata, and a tiny bit of media-server discipline so nothing ever fails silently
        on playback.
      </p>
    ),
  },
  {
    heading: "what this demonstrates",
    body: (
      <ul className="ml-6 list-disc space-y-2">
        <li>
          <strong>Full-stack ownership.</strong> Web tier, data tier, storage tier,
          encoding pipeline, deployment — all of it. No team to lean on.
        </li>
        <li>
          <strong>Long-running production.</strong> Live since 2017. Real workload, real
          uptime, real maintenance. Not a weekend toy.
        </li>
        <li>
          <strong>Pragmatic stack choices.</strong> .NET / MVC because that&apos;s what I
          knew best in 2017 and it&apos;s rock-solid for this. Synology + VLC because they
          do the job without a SaaS subscription. The boring stack is often the right
          stack.
        </li>
        <li>
          <strong>Personal problem, engineered solution.</strong> The kind of thing I
          build when something annoys me — and the kind of project that proves the
          motivation is the work itself, not a paycheck.
        </li>
      </ul>
    ),
  },
];
