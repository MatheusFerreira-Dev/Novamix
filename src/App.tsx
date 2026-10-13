import { MotionConfig } from 'framer-motion'
import About from './components/About'
import BookingSection from './components/BookingSection'
import DirectionsProvider from './components/DirectionsProvider'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import LocalArea from './components/LocalArea'
import OilFinder from './components/OilFinder'
import ProductsCarousel from './components/ProductsCarousel'
import Services from './components/Services'
import Splash from './components/Splash'
import WhatsAppButton from './components/WhatsAppButton'

// Ordem das seções: Hero → Produtos → Serviços → Quando trocar o óleo → Agendamento → Sobre → Como funciona / cidades → Dúvidas
// (TrustSection e Location continuam em src/components, fora da página, para reativar se quiser)
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed left-3 top-3 z-[110] -translate-y-24 rounded-full bg-accent px-5 py-3 text-sm font-bold text-ink transition focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Splash />
      <DirectionsProvider>
        <Header />
        <main id="conteudo">
          <Hero />
          <ProductsCarousel />
          <Services />
          <OilFinder />
          <BookingSection />
          <About />
          <LocalArea />
          <Faq />
        </main>
        <Footer />
        <WhatsAppButton />
      </DirectionsProvider>
    </MotionConfig>
  )
}
