import { StubPage } from "@/components/stub-page";

export const metadata = { title: "Dev", robots: { index: false } };

export default function DevPage() {
  return (
    <StubPage
      title="/dev"
      hint="Konami-unlocked telemetry dashboard. Phase D wires the unlock + the faked Kayley telemetry snapshot."
      phase="D"
    />
  );
}
