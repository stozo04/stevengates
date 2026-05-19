import { StubPage } from "@/components/stub-page";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <StubPage
      title="About"
      hint="Personal philosophy + what I obsess over — pulled from my own canon, not generic dev-blog tropes."
      phase="D"
    />
  );
}
