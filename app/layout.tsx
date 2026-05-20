import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"data-scroll-behavior="smooth">
      <body className="bg-[#070A12] text-white min-h-screen overflow-x-hidden">

        {/* GLOBAL BACKGROUND EFFECTS */}
        <div className="fixed inset-0 -z-10">

          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full" />

        </div>

        {children}

      </body>
    </html>
  )
}