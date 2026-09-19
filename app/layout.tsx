import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dneskoučuju.cz — High Value Women Energy | Prémiový koučink pro ženy",
  description:
    "Elitní individuální koučink, uzavřená dámská setkání a exkluzivní Coaching & Prosecco večery pro ambiciózní ženy. Praha / online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
