import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import WhatsAppButton from '@/components/public/WhatsAppButton'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-cream selection:bg-brand-gold selection:text-brand-black">
      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Content Area:
        - pt-24: Offsets the fixed navbar height so content starts below it.
        - flex-grow: Pushes the footer to the bottom on short pages.
      */}
      <main className="flex-grow pt-24 animate-in fade-in duration-500">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Growth Tools */}
      <WhatsAppButton />
    </div>
  )
}