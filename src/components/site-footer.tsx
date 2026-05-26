import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 py-8 mt-24">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {year}{" "}Steven Gates &middot; Dallas, TX
        </p>
        <div className="flex items-center gap-5 font-mono text-xs text-muted-foreground">
          <Link
            href="https://github.com/stozo04"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </Link>
          <Link
            href="https://www.linkedin.com/in/gates-steven/"
            className="transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </Link>
          <Link
            href="mailto:gates.steven@gmail.com"
            className="transition-colors hover:text-foreground"
          >
            email
          </Link>
          <Link
            href="/tools"
            className="transition-colors hover:text-foreground"
          >
            /tools
          </Link>
        </div>
      </div>
    </footer>
  );
}
