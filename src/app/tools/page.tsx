import { StubPage } from "@/components/stub-page";

export const metadata = { title: "Tools" };

export default function ToolsPage() {
  return (
    <StubPage
      title="Tools"
      hint="The real package.json. Every dep, every version, auto-read at build."
      phase="D"
    />
  );
}
