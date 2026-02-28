import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X, MapPin, Clock, Instagram, Twitter, ArrowRight, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-stone-900 flex flex-col items-center justify-center text-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <div className="text-4xl md:text-6xl font-serif font-bold tracking-widest mb-4">KOMOREBI</div>
        <div className="w-16 h-px bg-red-600 mx-auto mb-4" />
        <div className="text-xs tracking-[0.5em] uppercase text-stone-400">Tokyo Specialty Coffee</div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm text-stone-900" : "bg-transparent py-8 text-white"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 group">
          <span className={`text-2xl font-serif font-bold tracking-widest transition-colors ${scrolled ? "text-stone-900" : "text-white"}`}>
            KOMOREBI
          </span>
          <span className="w-2 h-2 rounded-full bg-red-600 group-hover:scale-150 transition-transform duration-300" />
        </a>

        {/* Desktop Menu */}
        <div className={`hidden md:flex items-center space-x-12 font-sans text-xs tracking-[0.2em] font-medium`}>
          <a href="#about" className="hover:text-red-600 transition-colors relative group">
            ABOUT
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#signature" className="hover:text-red-600 transition-colors relative group">
            SIGNATURE
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#menu" className="hover:text-red-600 transition-colors relative group">
            MENU
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#locations" className="hover:text-red-600 transition-colors relative group">
            LOCATIONS
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-red-600 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="text-stone-900" /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div 
        initial={false}
        animate={isOpen ? { x: 0 } : { x: "100%" }}
        transition={{ type: "tween", duration: 0.5, ease: "circOut" }}
        className="fixed inset-0 bg-stone-50 z-40 md:hidden flex flex-col justify-center items-center space-y-8"
      >
        <a href="#about" className="text-3xl font-serif text-stone-900 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>About</a>
        <a href="#signature" className="text-3xl font-serif text-stone-900 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>Signature</a>
        <a href="#menu" className="text-3xl font-serif text-stone-900 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>Menu</a>
        <a href="#locations" className="text-3xl font-serif text-stone-900 hover:text-red-600 transition-colors" onClick={() => setIsOpen(false)}>Locations</a>
        <div className="absolute bottom-12 text-xs tracking-widest text-stone-400">TOKYO ・ EST 2024</div>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src="https://picsum.photos/seed/pour/1920/1080" 
          alt="Coffee Pour" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 2.5 }} // Delay for loading screen
          className="flex flex-col items-center"
        >
          <div className="writing-vertical-rl text-xs tracking-[0.5em] h-24 border-l border-white/30 mb-8 flex items-center gap-4">
            <span className="rotate-180">EST. 2024</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tight mb-6 leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">KOMOREBI</span>
          </h1>
          
          <p className="max-w-md mx-auto text-stone-200 mb-12 font-light tracking-wide text-sm md:text-base leading-relaxed">
            Sunlight filtering through the trees. <br/>
            A moment of calm in the heart of Tokyo.
          </p>
          
          <motion.a 
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-red-600 text-white text-xs font-bold tracking-[0.2em] overflow-hidden"
          >
            <span className="relative z-10">DISCOVER MENU</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
            <span className="absolute inset-0 flex items-center justify-center text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 font-bold tracking-[0.2em]">DISCOVER MENU</span>
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 p-8 z-20 hidden md:block">
        <div className="text-white/60 text-xs tracking-widest flex items-center gap-4">
          <span>SCROLL</span>
          <div className="w-12 h-px bg-white/40" />
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-stone-900 text-white py-4 overflow-hidden whitespace-nowrap border-b border-stone-800">
      <motion.div 
        className="inline-flex items-center"
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-12 font-serif text-2xl italic text-stone-500">Seasonal Special</span>
            <span className="mx-12 font-bold tracking-widest text-red-500 text-sm">SAKURA BLEND</span>
            <span className="mx-12 font-serif text-2xl italic text-stone-500">Tokyo Roastery</span>
            <span className="mx-12 font-bold tracking-widest text-white text-sm">SINGLE ORIGIN</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Philosophy = () => {
  return (
    <section id="about" className="py-32 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        {/* Background Japanese Character */}
        <div className="absolute top-0 right-0 text-[20rem] font-serif text-stone-100 leading-none select-none -z-10 opacity-60 pointer-events-none">
          和
        </div>

        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <img 
                src="https://picsum.photos/seed/japanesecafe/900/1200" 
                alt="Interior" 
                className="w-full h-[700px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600 z-0 hidden md:block" />
          </div>
          
          <div className="w-full md:w-1/2 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-4 block">Our Philosophy</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 mb-8 leading-tight">
                Harmony in <br/> Every Cup
              </h2>
              <div className="space-y-6 text-stone-600 leading-loose font-light text-lg">
                <p>
                  We believe that coffee is a bridge between the busy world and inner peace. Inspired by the Japanese concept of <span className="font-serif italic text-stone-900">Omotenashi</span> (wholehearted hospitality), we serve not just a beverage, but an experience.
                </p>
                <p>
                  Our beans are roasted in small batches in our Tokyo roastery, ensuring that the unique character of each origin shines through.
                </p>
              </div>
              
              <div className="pt-8">
                <a href="#locations" className="group inline-flex items-center gap-4 text-stone-900 font-bold tracking-widest text-xs border-b border-stone-900 pb-2 hover:text-red-600 hover:border-red-600 transition-colors">
                  VISIT OUR ROASTERY <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SignatureProduct = () => {
  return (
    <section id="signature" className="py-32 bg-red-600 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 order-2 md:order-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-white/80 mb-4">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold tracking-widest uppercase">Signature Sweet</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-none">
                The Tokyo <br/> Candy Apple
              </h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-md">
                A nostalgic festival treat reimagined. Crisp, premium Fuji apples coated in a whisper-thin layer of artisanal candy. The perfect balance of tart and sweet.
              </p>
              <div className="pt-8">
                 <button className="bg-white text-red-600 px-8 py-4 font-bold tracking-widest text-xs hover:bg-stone-900 hover:text-white transition-colors duration-300">
                   ORDER NOW
                 </button>
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full transform scale-150" />
              <img 
                src="https://picsum.photos/seed/candyapple/800/800" 
                alt="Candy Apple" 
                className="relative z-10 w-[400px] h-[400px] object-cover rounded-full border-4 border-white/20 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 bg-white text-red-600 w-24 h-24 rounded-full flex items-center justify-center font-bold text-xl shadow-lg z-20 rotate-12"
              >
                ¥800
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuCard = ({ title, price, description, image, index }: { title: string, price: string, description: string, image: string, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-stone-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-white text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{description}</p>
          <span className="w-12 h-px bg-white/50 mb-4" />
          <span className="text-white font-serif italic text-xl">{price}</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-serif font-medium text-stone-900 mb-1 group-hover:text-red-600 transition-colors">{title}</h3>
        <p className="text-xs text-stone-400 tracking-widest uppercase">Signature</p>
      </div>
    </motion.div>
  );
};

const MenuSection = () => {
  const items = [
    { title: "Hand Drip Blend", price: "¥650", description: "Notes of dark chocolate and cherry.", image: "https://picsum.photos/seed/drip/600/800" },
    { title: "Matcha Latte", price: "¥700", description: "Ceremonial grade matcha from Uji.", image: "https://picsum.photos/seed/matchalatte/600/800" },
    { title: "Cold Brew", price: "¥600", description: "Slow steeped for 24 hours.", image: "https://picsum.photos/seed/cold/600/800" },
    { title: "Espresso Tonic", price: "¥750", description: "Refreshing citrus notes.", image: "https://picsum.photos/seed/espressotonic/600/800" },
    { title: "Basque Cake", price: "¥650", description: "Rich, creamy, and caramelized.", image: "https://picsum.photos/seed/basque/600/800" },
    { title: "Seasonal Tart", price: "¥750", description: "Fresh seasonal fruits with custard.", image: "https://picsum.photos/seed/tart/600/800" },
  ];

  return (
    <section id="menu" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-4">Seasonal Menu</span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Curated Selection</h2>
          <div className="w-px h-16 bg-stone-200 mt-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {items.map((item, index) => (
            <MenuCard key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const InfoSection = () => {
  return (
    <section id="locations" className="bg-stone-900 text-white py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif mb-8">Visit Us</h2>
              <div className="space-y-8 border-l border-white/20 pl-8">
                <div>
                  <h3 className="text-lg font-bold tracking-widest mb-2">DAIKANYAMA</h3>
                  <p className="text-stone-400 font-light leading-relaxed">
                    1-23-4 Sarugakucho, Shibuya-ku<br />
                    Tokyo, Japan 150-0033
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-widest mb-2">HOURS</h3>
                  <p className="text-stone-400 font-light leading-relaxed">
                    Mon - Fri: 8:00 - 20:00<br />
                    Sat - Sun: 9:00 - 21:00
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="flex gap-4">
              <button className="px-8 py-4 border border-white/30 hover:bg-white hover:text-stone-900 transition-all duration-300 text-xs tracking-widest">
                GOOGLE MAPS
              </button>
              <button className="px-8 py-4 bg-red-600 border border-red-600 hover:bg-red-700 transition-all duration-300 text-xs tracking-widest">
                CONTACT US
              </button>
            </div>
          </div>
          
          <div className="relative h-[500px] w-full group overflow-hidden">
             <img 
                src="https://picsum.photos/seed/tokyostreetnight/800/800" 
                alt="Store Exterior" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-500 py-20 border-t border-stone-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif text-white mb-6">KOMOREBI</h2>
            <p className="max-w-xs font-light text-sm leading-relaxed">
              A specialty coffee stand inspired by the fleeting beauty of nature and the art of Japanese hospitality.
            </p>
          </div>
          
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest mb-6">SITEMAP</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-red-500 transition-colors">About</a></li>
              <li><a href="#menu" className="hover:text-red-500 transition-colors">Menu</a></li>
              <li><a href="#locations" className="hover:text-red-500 transition-colors">Locations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-xs font-bold tracking-widest mb-6">SOCIAL</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider">
          <p>&copy; 2024 KOMOREBI COFFEE. TOKYO.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF USE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="font-sans bg-stone-50 text-stone-900 selection:bg-red-200 selection:text-red-900">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <Hero />
          <Marquee />
          <Philosophy />
          <SignatureProduct />
          <MenuSection />
          <InfoSection />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
