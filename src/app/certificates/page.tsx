"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Download, FileQuestion } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { CERTIFICATES, type Certificate } from "@/lib/certificates";

export default function CertificatesPage() {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> back to home
      </Link>

      <header className="mt-6 border-b border-border/60 pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          stevengates.io / certificates
        </p>
        <h1 className="mt-3 font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          Certificates
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          Four credentials, all real, all clickable. JPG downloads — the badges as Microsoft and edX issued them.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {CERTIFICATES.map((cert) => (
          <button
            key={cert.slug}
            type="button"
            onClick={() => cert.image && setActive(cert)}
            className="group flex flex-col gap-4 rounded-lg border border-border/60 bg-card/40 p-5 text-left transition-colors hover:border-[color:var(--color-accent-cyan)]/60 disabled:cursor-not-allowed"
            disabled={!cert.image}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-border/40 bg-[#070707]">
              {cert.image ? (
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate badge`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center font-mono text-xs text-muted-foreground">
                  <FileQuestion className="size-8 text-[color:var(--color-accent-cyan)]/60" />
                  <span>asset pending — JPG to be added by Steven</span>
                </div>
              )}
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-mono text-base font-medium text-foreground">{cert.title}</h2>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {cert.issuer} &middot; {cert.year}
                </p>
              </div>
              <Award className="size-5 shrink-0 text-[color:var(--color-accent-cyan)]" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px]">
                {cert.image ? "click to view" : "pending"}
              </Badge>
              {cert.image ? (
                <Link
                  href={cert.image}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground"
                >
                  <Download className="size-3" /> download JPG
                </Link>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {active?.image ? (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          aria-label="close"
        >
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg border border-border/60 bg-card">
            <Image
              src={active.image}
              alt={active.title}
              width={1200}
              height={900}
              className="h-auto w-full object-contain"
            />
            <div className="flex items-center justify-between border-t border-border/60 bg-card px-5 py-3 font-mono text-xs">
              <span>
                <span className="text-foreground">{active.title}</span>
                <span className="text-muted-foreground"> &middot; {active.issuer} &middot; {active.year}</span>
              </span>
              <Link
                href={active.image}
                download
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-md bg-[color:var(--color-accent-cyan)] px-2 py-1 text-[color:var(--accent-foreground)]"
              >
                <Download className="size-3" /> download
              </Link>
            </div>
          </div>
        </button>
      ) : null}
    </div>
  );
}
