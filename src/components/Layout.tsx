import { Header } from "./Header";
import { Footer } from "./Footer";
import { MessageCircle } from "lucide-react";

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      <Footer />
      <a
        href="https://wa.me/5491145678900"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition z-50"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
