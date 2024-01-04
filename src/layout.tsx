export const metadata = {
  title: "Beer Ecommerce",
  description: "Beer Ecommerce site",
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
