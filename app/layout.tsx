import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://dneskoucuju.cz"),
  title: "Dneskoučuju.cz — Sebevědomí, které vydrží | Osobní koučink pro ženy",
  description:
    "Osobní koučink, uzavřená dámská setkání a večery Koučink a prosecco pro ženy. Praha / online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
