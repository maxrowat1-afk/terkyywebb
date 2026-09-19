import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dneskoučuju.cz — High Value Woman Energy | Prémiový koučink pro ženy",
  description:
    "Osobní koučink, uzavřená dámská setkání a večery Koučink a prosecco pro ambiciózní ženy. Praha / online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
