import "./globals.scss";

export const metadata = {
  title: "سوتیزما | کهکشان",
  description: "سامانه آنلاین و سراسری سوتی های کهکشان",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
