/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ChevronDown,
  ChevronUp,
  Star,
  Menu as MenuIcon,
  X,
  Send,
  Download,
  ExternalLink,
  CheckCircle,
  Flame,
  ShieldCheck,
  Sparkles,
  Info,
  AlertTriangle,
  HelpCircle,
  ShoppingBag,
  ArrowRight,
  Heart,
  Eye,
  Check
} from 'lucide-react';

export default function App() {
  // Navigation & Modal States
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string } | null>(null);
  const [activeModal, setActiveModal] = useState<'disclaimer' | 'privacy' | 'terms' | 'pdf' | null>(null);

  // Editable Prices state
  const [prices, setPrices] = useState<Record<string, number>>({
    'parrillada-especial': 28.50,
    'hamburguesa-casa': 12.00,
    'pasta-cremosa': 14.50,
    'costillas-bbq': 18.00,
    'ensalada-fresca': 9.50,
    'postre-chocolate': 7.00,
  });

  // WhatsApp Order Form State
  const [orderName, setOrderName] = useState('');
  const [orderDish, setOrderDish] = useState('Parrillada Especial');
  const [orderQty, setOrderQty] = useState(1);
  const [orderComments, setOrderComments] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Persuasive Elements States
  // 1. Exit Intent Pop-up
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [exitPopupShown, setExitPopupShown] = useState(false);

  // 2. Social Proof Toast
  const [toastNotification, setToastNotification] = useState<{ name: string; city: string; dish: string } | null>(null);
  const [showToast, setShowToast] = useState(false);

  // 3. Floating Mobile Button & Toast activation on scroll
  const [scrolledPastMenu, setScrolledPastMenu] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Handle scroll detection for mobile button and social proof
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 600) {
        setScrolledPastMenu(true);
      } else {
        setScrolledPastMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exit intent listener (time on page > 15s + mouseleave top)
  useEffect(() => {
    const timer = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 10 && !exitPopupShown) {
          setShowExitPopup(true);
          setExitPopupShown(true);
          document.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 15000);

    return () => clearTimeout(timer);
  }, [exitPopupShown]);

  // Social proof toast generator (every 20s after scrolling past menu)
  useEffect(() => {
    if (!scrolledPastMenu) return;

    const customers = [
      { name: 'María', city: 'Santiago', dish: 'Parrillada Especial' },
      { name: 'Carlos', city: 'Veraguas', dish: 'Hamburguesa de la Casa' },
      { name: 'Sofía', city: 'Atalaya', dish: 'Costillas BBQ' },
      { name: 'Javier', city: 'Santiago', dish: 'Pasta Cremosa con Pollo' }
    ];

    const interval = setInterval(() => {
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
      setToastNotification(randomCustomer);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 22000);

    return () => clearInterval(interval);
  }, [scrolledPastMenu]);

  // Menu items data
  const menuItems = [
    {
      id: 'parrillada-especial',
      category: 'Carnes y parrillas',
      name: 'Parrillada Especial',
      description: 'Selección de carnes preparadas a la parrilla y acompañadas de guarniciones.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge: 'Favorito del Chef'
    },
    {
      id: 'hamburguesa-casa',
      category: 'Hamburguesas',
      name: 'Hamburguesa de la Casa',
      description: 'Carne jugosa, queso, vegetales frescos y salsa especial en pan artesanal.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      badge: 'Artesanal'
    },
    {
      id: 'pasta-cremosa',
      category: 'Pastas',
      name: 'Pasta Cremosa con Pollo',
      description: 'Pasta acompañada de pollo y una salsa cremosa de la casa.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d628373b?auto=format&fit=crop&w=800&q=80',
      badge: 'Cremoso'
    },
    {
      id: 'costillas-bbq',
      category: 'Carnes y parrillas',
      name: 'Costillas BBQ',
      description: 'Costillas preparadas con salsa barbacoa y acompañamientos.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge: 'Al Fuego'
    },
    {
      id: 'ensalada-fresca',
      category: 'Ensaladas',
      name: 'Ensalada Fresca',
      description: 'Combinación de vegetales, ingredientes frescos y aderezo especial.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      badge: 'Saludable'
    },
    {
      id: 'postre-chocolate',
      category: 'Postres',
      name: 'Postre de Chocolate',
      description: 'Postre de chocolate con presentación elegante y sabor intenso.',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      badge: 'Dulce tentación'
    },
    {
      id: 'entrada-bruschetta',
      category: 'Entradas',
      name: 'Bruschettas al Horno',
      description: 'Pan rústico tostado con tomates frescos, albahaca y aceite de oliva virgen.',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80',
      badge: 'Entrada'
    },
    {
      id: 'bebida-limonada',
      category: 'Bebidas',
      name: 'Limonada Hierbabuena',
      description: 'Refrescante limonada natural con toque de hierbabuena fresca.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      badge: 'Refrescante'
    }
  ];

  // Filtered menu
  const filteredMenu = activeCategory === 'Todos' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Gallery items
  const galleryItems = [
    { title: 'Parrillada Especial', category: 'Carnes', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
    { title: 'Hamburguesa Artesanal', category: 'Hamburguesas', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
    { title: 'Ambiente del Restaurante', category: 'Ambiente', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { title: 'Preparación al Fuego', category: 'Chef', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Postre de Chocolate', category: 'Postres', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Bebidas Especiales', category: 'Bebidas', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  ];

  // FAQs
  const faqs = [
    { q: '¿Dónde se encuentra el restaurante?', a: 'Nos encontramos ubicados de manera ilustrativa en Santiago de Veraguas, Panamá, en una zona de fácil acceso y con amplio estacionamiento.' },
    { q: '¿Cuáles son los horarios?', a: 'Atendemos de lunes a jueves de 11:00 a. m. a 9:00 p. m., viernes y sábados hasta las 10:00 p. m., y domingos de 12:00 p. m. a 8:00 p. m.' },
    { q: '¿Puedo consultar el menú desde mi celular?', a: '¡Así es! Nuestro menú digital está optimizado para cualquier dispositivo móvil para que puedas explorar cada plato y precio fácilmente.' },
    { q: '¿Cómo puedo comunicarme por WhatsApp?', a: 'Puedes hacer clic en cualquiera de nuestros botones de WhatsApp integrados para enviar consultas automáticas o comunicarte directamente con el equipo.' },
    { q: '¿Tienen opciones para compartir?', a: 'Sí, contamos con parrilladas especiales, entradas variadas y platos diseñados para disfrutar en familia o con amigos.' },
    { q: '¿Cómo puedo conocer los precios actualizados?', a: 'Nuestros precios en esta demostración son totalmente editables y configurables según los requerimientos de cada restaurante real.' },
    { q: '¿Puedo consultar sobre celebraciones especiales?', a: 'Por supuesto. Ofrecemos espacios y propuestas gastronómicas ideales para cumpleaños, reuniones y cenas corporativas.' }
  ];

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`Hola, me interesa consultar sobre: ${orderQty}x ${orderDish}. Nombre: ${orderName}. Comentarios: ${orderComments}. [Demostración Sabores & Brasas]`);
    window.open(`https://wa.me/50765278910?text=${text}`, '_blank');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactConsent) {
      alert('Por favor, acepta el consentimiento para el tratamiento de datos.');
      return;
    }
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
      setContactConsent(false);
      alert('¡Mensaje enviado con éxito! (Demostración de Tu Marca Local)');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-red-700 selection:text-white">
      
      {/* 18. TOP COMMERCIAL BAR - TU MARCA LOCAL */}
      <div className="bg-gradient-to-r from-red-900 via-stone-900 to-amber-900 text-stone-200 px-4 py-2 text-xs md:text-sm font-medium border-b border-stone-800 flex flex-col sm:flex-row items-center justify-center gap-2 text-center z-50 sticky top-0 shadow-md">
        <span className="flex items-center gap-1.5 font-semibold text-amber-300">
          <Sparkles className="w-4 h-4 animate-pulse" />
          ESTA ES UNA DEMOSTRACIÓN DE PÁGINA WEB CREADA POR TU MARCA LOCAL.
        </span>
        <a
          href="https://wa.me/50765278910?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20p%C3%A1gina%20web"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1 rounded-full text-xs transition shadow hover:scale-105 inline-flex items-center gap-1"
        >
          QUIERO UNA PÁGINA COMO ESTA <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-[37px] sm:top-[33px] bg-stone-950/90 backdrop-blur-md border-b border-stone-800 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition">
              <Flame className="w-5 h-5 text-stone-100" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-wider uppercase bg-gradient-to-r from-stone-100 via-amber-200 to-amber-400 bg-clip-text text-transparent">
                SABORES & BRASAS
              </span>
              <span className="block text-[10px] text-stone-400 tracking-widest uppercase">
                Santiago de Veraguas, Panamá
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a href="#inicio" className="hover:text-amber-400 transition">Inicio</a>
            <a href="#nosotros" className="hover:text-amber-400 transition">Nosotros</a>
            <a href="#especialidades" className="hover:text-amber-400 transition">Especialidades</a>
            <a href="#menu" className="hover:text-amber-400 transition">Menú</a>
            <a href="#galeria" className="hover:text-amber-400 transition">Galería</a>
            <a href="#ubicacion" className="hover:text-amber-400 transition">Ubicación</a>
            <a href="#contacto" className="hover:text-amber-400 transition">Contacto</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/50765278910?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20en%20Sabores%20%26%20Brasas"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2 rounded-full text-xs sm:text-sm flex items-center gap-2 shadow transition hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-stone-300 hover:text-white p-2"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-4 pb-6 space-y-3">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-200 hover:text-amber-400 py-1"
            >
              Inicio
            </a>
            <a
              href="#nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-200 hover:text-amber-400 py-1"
            >
              Nosotros
            </a>
            <a
              href="#especialidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-200 hover:text-amber-400 py-1"
            >
              Especialidades
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-200 hover:text-amber-400 py-1"
            >
              Menú Digital
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-200 hover:text-amber-400 py-1"
            >
              Galería
            </a>
            <a
              href="#ubicacion"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-200 hover:text-amber-400 py-1"
            >
              Ubicación y Horarios
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-stone-200 hover:text-amber-400 py-1"
            >
              Contacto
            </a>
            <div className="pt-2">
              <a
                href="https://wa.me/50765278910?text=Hola%2C%20quisiera%20hacer%20una%20consulta%20en%20Sabores%20%26%20Brasas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                <MessageCircle className="w-4 h-4" /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. PORTADA PRINCIPAL (HERO) */}
      <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center bg-stone-950 overflow-hidden py-16 px-4">
        {/* Background Image with dark vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85"
            alt="Parrilla Sabores & Brasas"
            className="w-full h-full object-cover object-center opacity-30 scale-105 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-800 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Flame className="w-4 h-4 text-amber-400" />
            SANTIAGO DE VERAGUAS, PANAMÁ
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-stone-100 uppercase leading-tight">
            EL BUEN SABOR <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-red-600 bg-clip-text text-transparent">
              SE DISFRUTA AQUÍ.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-stone-300 font-light leading-relaxed">
            Descubre una experiencia gastronómica donde los ingredientes, el fuego y la pasión por la buena cocina se encuentran en cada plato. En Sabores & Brasas, cada comida es una oportunidad para disfrutar algo especial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#menu"
              className="w-full sm:w-auto bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition hover:scale-105 text-center flex items-center justify-center gap-2"
            >
              EXPLORAR MENÚ <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/50765278910?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20men%C3%BA%20de%20Sabores%20%26%20Brasas"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold px-8 py-4 rounded-xl shadow transition hover:scale-105 text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" /> CONTACTAR POR WHATSAPP
            </a>
          </div>

          {/* 3 Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto text-left">
            <div className="bg-stone-900/60 backdrop-blur border border-stone-800 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-200">Ingredientes seleccionados</h3>
                <p className="text-xs text-stone-400 mt-1">Frescura y calidad superior en cada selección diaria.</p>
              </div>
            </div>

            <div className="bg-stone-900/60 backdrop-blur border border-stone-800 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-200">Sabores con pasión</h3>
                <p className="text-xs text-stone-400 mt-1">Técnicas a la brasa que realzan la esencia de los cortes.</p>
              </div>
            </div>

            <div className="bg-stone-900/60 backdrop-blur border border-stone-800 p-5 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-200">Ambiente para compartir</h3>
                <p className="text-xs text-stone-400 mt-1">Un espacio cálido y elegante para familia y amigos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOBRE NOSOTROS */}
      <section id="nosotros" className="py-20 bg-stone-900/50 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block text-amber-400 text-xs font-bold tracking-widest uppercase px-3 py-1 bg-amber-950/60 border border-amber-800/50 rounded-md">
                Nuestra Historia
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-100">
                MÁS QUE COMIDA, UNA EXPERIENCIA PARA RECORDAR.
              </h2>
              <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
                En Sabores & Brasas creemos que los mejores momentos suelen comenzar alrededor de una buena mesa.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                Nuestra propuesta combina recetas llenas de sabor, ingredientes cuidadosamente seleccionados y un ambiente pensado para compartir con familiares y amigos. Desde una comida especial hasta una salida espontánea, queremos que cada visita se convierta en una experiencia que provoque regresar.
              </p>

              {/* 4 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
                  <h4 className="font-bold text-amber-400 text-sm mb-1">Pasión por la cocina</h4>
                  <p className="text-xs text-stone-400">Amor por los detalles y la excelencia culinaria.</p>
                </div>
                <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
                  <h4 className="font-bold text-amber-400 text-sm mb-1">Ingredientes seleccionados</h4>
                  <p className="text-xs text-stone-400">Estándares rigurosos de calidad y sabor.</p>
                </div>
                <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
                  <h4 className="font-bold text-amber-400 text-sm mb-1">Ambiente acogedor</h4>
                  <p className="text-xs text-stone-400">Diseñado para que te sientas como en casa.</p>
                </div>
                <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
                  <h4 className="font-bold text-amber-400 text-sm mb-1">Momentos especiales</h4>
                  <p className="text-xs text-stone-400">Celebraciones y encuentros memorables.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl blur-lg opacity-25" />
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
                  alt="Chef preparando alimentos"
                  className="w-full h-[450px] object-cover hover:scale-105 transition duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ESPECIALIDADES DE LA CASA */}
      <section id="especialidades" className="py-20 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
              Nuestros Destacados
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
              PLATOS QUE DESPIERTAN EL APETITO.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Una selección curada de nuestras preparaciones más solicitadas en la brasa y cocina contemporánea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-600/50 transition duration-300 flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur text-amber-400 font-semibold text-xs px-3 py-1 rounded-full border border-stone-700">
                    {item.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-red-900/90 text-white font-bold text-sm px-3 py-1 rounded-lg">
                    ${prices[item.id]?.toFixed(2)}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-amber-500 font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-stone-100">{item.name}</h3>
                    <p className="text-stone-400 text-xs sm:text-sm line-clamp-2">{item.description}</p>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#menu"
                      onClick={() => setActiveCategory(item.category)}
                      className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 border border-stone-700"
                    >
                      VER MENÚ <ArrowRight className="w-4 h-4 text-amber-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MENÚ DIGITAL INTERACTIVO */}
      <section id="menu" className="py-20 bg-stone-900/40 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
              Carta Completa
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
              DESCUBRE NUESTRO MENÚ.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Filtra por categoría, explora precios editables y consulta tus platos favoritos directamente por WhatsApp.
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {['Todos', 'Entradas', 'Carnes y parrillas', 'Hamburguesas', 'Pastas', 'Ensaladas', 'Postres', 'Bebidas'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-stone-950 shadow-lg'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-stone-100 text-sm">{item.name}</h3>
                      <span className="font-bold text-amber-400 text-sm">
                        ${prices[item.id]?.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-stone-400 text-xs mt-1 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setOrderDish(item.name);
                        const element = document.getElementById('pedidos-whatsapp');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> CONSULTAR POR WHATSAPP
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PDF Menu Download Simulation Note */}
          <div className="mt-12 text-center bg-stone-950 border border-stone-800 p-6 rounded-2xl max-w-xl mx-auto">
            <p className="text-stone-300 text-sm font-medium">¿Prefieres ver el menú completo en PDF?</p>
            <p className="text-xs text-stone-400 mt-1 mb-4">Descarga nuestra carta digital actualizada para visualizarla sin conexión.</p>
            <button
              onClick={() => setActiveModal('pdf')}
              className="bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> DESCARGAR MENÚ EN PDF
            </button>
          </div>
        </div>
      </section>

      {/* 6. EXPERIENCIA GASTRONÓMICA */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
              Momentos Únicos
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
              UN LUGAR PARA DISFRUTAR CADA MOMENTO.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Hay ocasiones que merecen algo más que una comida. Una reunión con amigos, una celebración familiar o una cena especial pueden convertirse en recuerdos inolvidables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative rounded-2xl overflow-hidden group shadow-xl border border-stone-800 h-80">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Almuerzos y cenas"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Almuerzos y cenas</h3>
                <p className="text-xs text-stone-300 mt-1">Sabores memorables para cada día de la semana.</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group shadow-xl border border-stone-800 h-80">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Encuentros con amigos"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Encuentros con amigos</h3>
                <p className="text-xs text-stone-300 mt-1">El espacio perfecto para charlar y compartir.</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group shadow-xl border border-stone-800 h-80">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                alt="Celebraciones especiales"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">Celebraciones especiales</h3>
                <p className="text-xs text-stone-300 mt-1">Tus fechas importantes merecen lo mejor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALERÍA FOTOGRÁFICA */}
      <section id="galeria" className="py-20 bg-stone-900/40 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
              Galería Visual
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
              UNA EXPERIENCIA QUE ENTRA POR LOS OJOS.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Haz clic en cualquier imagen para ampliarla y apreciar el detalle de nuestra propuesta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxImg({ src: item.image, title: item.title })}
                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer border border-stone-800 shadow-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <Eye className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="font-bold text-white text-lg">{item.title}</span>
                  <span className="text-xs text-amber-300 uppercase tracking-wider">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-950/80 text-stone-200 hover:text-white rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={lightboxImg.src} alt={lightboxImg.title} className="w-full h-[60vh] object-cover" />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-stone-100">{lightboxImg.title}</h3>
              <p className="text-xs text-stone-400 mt-1">Sabores & Brasas - Demostración Tu Marca Local</p>
            </div>
          </div>
        </div>
      )}

      {/* PDF Modal */}
      {activeModal === 'pdf' && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-100">Menú Digital en PDF</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              En una implementación real para tu restaurante, aquí podrás adjuntar el archivo PDF con la carta oficial de precios y platos para descarga instantánea de tus clientes.
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded-xl text-xs"
            >
              ENTENDIDO
            </button>
          </div>
        </div>
      )}

      {/* Legal Modals */}
      {activeModal && activeModal !== 'pdf' && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            {activeModal === 'disclaimer' && (
              <>
                <h3 className="text-xl font-bold text-stone-100 uppercase">Descargo de Responsabilidad</h3>
                <div className="text-stone-300 text-xs sm:text-sm space-y-3 leading-relaxed">
                  <p>
                    "Sabores & Brasas es un sitio web de demostración desarrollado por Tu Marca Local con fines exclusivamente comerciales e ilustrativos.
                  </p>
                  <p>
                    El restaurante, su identidad, menú, platos, fotografías, horarios, precios, ubicación y datos de contacto son ejemplos utilizados para mostrar las posibilidades de una página web profesional.
                  </p>
                  <p>
                    Este sitio no representa un establecimiento gastronómico real y no procesa pedidos, pagos ni reservas.
                  </p>
                  <p>
                    Las imágenes son ilustrativas y no corresponden necesariamente a instalaciones o productos de un negocio existente."
                  </p>
                </div>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <h3 className="text-xl font-bold text-stone-100 uppercase">Política de Privacidad</h3>
                <div className="text-stone-300 text-xs sm:text-sm space-y-3 leading-relaxed">
                  <p>Esta política de privacidad describe cómo se manejan los datos en esta demostración comercial:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Datos recopilados:</strong> Los formularios son simulaciones de demostración y no almacenan información personal en servidores permanentes.</li>
                    <li><strong>Comunicación por WhatsApp:</strong> Al hacer clic en los botones de WhatsApp, la conversación se traslada directamente a la aplicación de mensajería externa.</li>
                    <li><strong>Protección de información:</strong> No compartimos datos con terceros al tratarse de un entorno demostrativo.</li>
                    <li><strong>Derechos de los usuarios:</strong> Puedes solicitar información sobre nuestros servicios de desarrollo web contactando a Tu Marca Local.</li>
                  </ul>
                </div>
              </>
            )}

            {activeModal === 'terms' && (
              <>
                <h3 className="text-xl font-bold text-stone-100 uppercase">Términos y Condiciones</h3>
                <div className="text-stone-300 text-xs sm:text-sm space-y-3 leading-relaxed">
                  <p>Términos aplicables a la utilización de este sitio web demostrativo:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Naturaleza ficticia de la demostración comercial creada por Tu Marca Local.</li>
                    <li>Uso meramente informativo para propietarios de restaurantes y negocios gastronómicos.</li>
                    <li>Limitaciones de responsabilidad respecto a transacciones comerciales ficticias.</li>
                    <li>Imágenes ilustrativas y contenido de ejemplo protegido.</li>
                    <li>Contacto comercial directo a través de los canales oficiales de Tu Marca Local.</li>
                  </ul>
                </div>
              </>
            )}

            <div className="pt-4 text-center">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                CERRAR VENTANA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. PEDIDOS Y CONSULTAS POR WHATSAPP */}
      <section id="pedidos-whatsapp" className="py-20 bg-stone-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 px-3 py-1 bg-emerald-950/60 border border-emerald-900 rounded-full">
                Consulta Rápida
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-100">
                ¿YA SABES QUÉ SE TE ANTOJA?
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm">
                Explora nuestras especialidades y consulta fácilmente sobre el menú y las opciones disponibles a través de WhatsApp.
              </p>
            </div>

            <form onSubmit={handleWhatsAppOrder} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-2">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-2">Plato de Interés</label>
                  <select
                    value={orderDish}
                    onChange={(e) => setOrderDish(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  >
                    {menuItems.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-2">Cantidad</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={orderQty}
                    onChange={(e) => setOrderQty(parseInt(e.target.value) || 1)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-2">Comentarios Opcionales</label>
                  <input
                    type="text"
                    value={orderComments}
                    onChange={(e) => setOrderComments(e.target.value)}
                    placeholder="Ej. Sin cebolla, término medio..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition hover:scale-105 inline-flex items-center justify-center gap-3 text-sm"
                >
                  <MessageCircle className="w-5 h-5" /> CONSULTAR POR WHATSAPP
                </button>
                <p className="text-[11px] text-stone-400 mt-3">
                  * Como es una demostración, el formulario no envía pedidos reales al restaurante ficticio. Se trata de una simulación interactiva.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 9. HORARIOS DE ATENCIÓN */}
      <section className="py-16 bg-stone-900/50 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-block text-amber-400 text-xs font-bold tracking-widest uppercase px-3 py-1 bg-amber-950/60 border border-amber-800/50 rounded-md">
            Horarios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-100">
            CUANDO EL ANTOJO LLAMA, AQUÍ ESTAMOS.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-2xl">
              <Clock className="w-6 h-6 text-amber-400 mb-3" />
              <h3 className="font-bold text-stone-100 text-base">Lunes a Jueves</h3>
              <p className="text-stone-300 text-sm mt-1">11:00 a. m. a 9:00 p. m.</p>
            </div>
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-2xl">
              <Clock className="w-6 h-6 text-amber-400 mb-3" />
              <h3 className="font-bold text-stone-100 text-base">Viernes y Sábados</h3>
              <p className="text-stone-300 text-sm mt-1">11:00 a. m. a 10:00 p. m.</p>
            </div>
            <div className="bg-stone-950 border border-stone-800 p-6 rounded-2xl">
              <Clock className="w-6 h-6 text-amber-400 mb-3" />
              <h3 className="font-bold text-stone-100 text-base">Domingos</h3>
              <p className="text-stone-300 text-sm mt-1">12:00 p. m. a 8:00 p. m.</p>
            </div>
          </div>
          <p className="text-xs text-stone-400 pt-2">
            * Nota: Los horarios mostrados son ejemplos totalmente editables para adaptarse a tu negocio.
          </p>
        </div>
      </section>

      {/* 10. UBICACIÓN Y GOOGLE MAPS */}
      <section id="ubicacion" className="py-20 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
              Encuéntranos
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
              ENCUÉNTRANOS FÁCILMENTE.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Visítanos en nuestra ubicación ilustrativa o comunícate con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Column */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-stone-100">Información de Contacto</h3>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-stone-950 rounded-xl text-amber-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-200 text-sm">Ubicación Ilustrativa</h4>
                    <p className="text-stone-400 text-xs mt-0.5">Santiago de Veraguas, Panamá (Configurable para dirección real)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-stone-950 rounded-xl text-amber-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-200 text-sm">Teléfono</h4>
                    <p className="text-stone-400 text-xs mt-0.5">+507 999-0000 (Configurable)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-stone-950 rounded-xl text-amber-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-200 text-sm">WhatsApp Comercial</h4>
                    <p className="text-stone-400 text-xs mt-0.5">+507 6527-8910</p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Santiago+de+Veraguas+Panama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow"
                >
                  CÓMO LLEGAR (GOOGLE MAPS) <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Google Maps Embed */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden h-[400px] lg:h-auto shadow-2xl">
              <iframe
                title="Mapa Santiago de Veraguas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.195328479532!2d80.9850!3d8.3516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fae70a75f8dbd07%3A0x6e2ef3d940e4e6d!2sSantiago%20de%20Veraguas%2C%20Panam%C3%A1!5e0!3m2!1ses!2sus!4v1650000000000!5m2!1ses!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 11. RESEÑAS Y EXPERIENCIAS */}
      <section className="py-20 bg-stone-900/40 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
              Testimonios Ilustrativos
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
              LAS BUENAS EXPERIENCIAS MERECEN COMPARTIRSE.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Ejemplos de reseñas y opiniones auténticas preparadas para mostrar la satisfacción de tus futuros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: 'Ana González', date: 'Hace 2 semanas', comment: 'Excelente atención y la parrillada estaba en su punto perfecto. El ambiente es sumamente agradable.' },
              { name: 'Ricardo Morales', date: 'Hace 1 mes', comment: 'Las hamburguesas artesanales tienen un sabor increíble. Definitivamente volveré con toda mi familia.' },
              { name: 'Lucía Castillo', date: 'Hace 3 semanas', comment: 'Muy buena opción en Santiago de Veraguas. Los postres son deliciosos y el servicio impecable.' }
            ].map((review, idx) => (
              <div key={idx} className="bg-stone-950 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-300 text-xs sm:text-sm italic">"{review.comment}"</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-stone-900 text-xs">
                  <span className="font-bold text-stone-200">{review.name}</span>
                  <span className="text-stone-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition"
            >
              VER RESEÑAS EN GOOGLE <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>
          </div>
        </div>
      </section>

      {/* 12. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-20 bg-stone-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
              Dudas Comunes
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
              PREGUNTAS FRECUENTES.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-stone-200 text-sm sm:text-base hover:text-amber-400 transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-stone-400 text-xs sm:text-sm leading-relaxed border-t border-stone-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CONTACTO */}
      <section id="contacto" className="py-20 bg-stone-900/50 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
                Hablemos
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-stone-100">
                EL PRÓXIMO BUEN MOMENTO COMIENZA AQUÍ.
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                ¿Tienes alguna consulta, sugerencia o deseas planificar una celebración especial? Escríbenos y con gusto te atenderemos.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-stone-300 text-sm">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span>Santiago de Veraguas, Panamá</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300 text-sm">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span>+507 999-0000</span>
                </div>
                <div className="flex items-center gap-3 text-stone-300 text-sm">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>+507 6527-8910 (WhatsApp)</span>
                </div>
              </div>
            </div>

            <div className="bg-stone-950 border border-stone-800 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">Correo o Teléfono</label>
                    <input
                      type="text"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">Asunto</label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="Ej. Reserva o consulta"
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-stone-300 mb-1">Mensaje</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Escribe tu mensaje aquí..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500 resize-none"
                  ></textarea>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={contactConsent}
                    onChange={(e) => setContactConsent(e.target.checked)}
                    className="mt-1 rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-0"
                  />
                  <label htmlFor="consent" className="text-xs text-stone-400">
                    Acepto el tratamiento de mis datos personales para gestionar esta consulta de demostración.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-700 hover:to-amber-500 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-lg transition mt-4"
                >
                  ENVIAR MENSAJE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 18. CONVERSIÓN COMERCIAL DE TU MARCA LOCAL (Segundo bloque) */}
      <section className="py-20 bg-gradient-to-b from-stone-950 via-red-950/20 to-stone-950 border-t border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400 px-3 py-1 bg-amber-950/60 border border-amber-900 rounded-full">
            Tu Marca Local
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-100">
            TU RESTAURANTE TAMBIÉN PUEDE TENER UNA PÁGINA ASÍ.
          </h2>
          <p className="text-stone-300 text-base max-w-2xl mx-auto leading-relaxed">
            Muestra tus platos, destaca tu menú, facilita el contacto con tus clientes y fortalece la presencia digital de tu negocio con una página web profesional.
          </p>
          <div className="pt-4">
            <a
              href="https://wa.me/50765278910?text=Hola%2C%20quiero%20una%20p%C3%A1gina%20web%20para%20mi%20restaurante"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-4 rounded-2xl shadow-2xl transition hover:scale-105 inline-flex items-center gap-3 text-sm sm:text-base"
            >
              QUIERO UNA WEB PARA MI RESTAURANTE <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* 19. FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-900 py-12 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <span className="text-lg font-bold tracking-wider text-stone-100 uppercase">
                SABORES & BRASAS
              </span>
              <p className="text-stone-400 text-xs leading-relaxed">
                Cocina contemporánea, carnes a la parrilla y momentos inolvidables en Santiago de Veraguas, Panamá.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-stone-200 text-sm uppercase tracking-wider">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#inicio" className="hover:text-amber-400 transition">Inicio</a></li>
                <li><a href="#nosotros" className="hover:text-amber-400 transition">Sobre Nosotros</a></li>
                <li><a href="#especialidades" className="hover:text-amber-400 transition">Especialidades</a></li>
                <li><a href="#menu" className="hover:text-amber-400 transition">Menú Digital</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-stone-200 text-sm uppercase tracking-wider">Legal & Transparencia</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveModal('disclaimer')} className="hover:text-amber-400 transition text-left">Descargo de Responsabilidad</button></li>
                <li><button onClick={() => setActiveModal('privacy')} className="hover:text-amber-400 transition text-left">Política de Privacidad</button></li>
                <li><button onClick={() => setActiveModal('terms')} className="hover:text-amber-400 transition text-left">Términos y Condiciones</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-stone-200 text-sm uppercase tracking-wider">Tu Marca Local</h4>
              <p className="text-stone-400 text-xs leading-relaxed">
                Sitio web de demostración comercial creado por Tu Marca Local para potenciar negocios gastronómicos.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/50765278910?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20p%C3%A1gina%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Contactar por WhatsApp <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p>© {new Date().getFullYear()} Sabores & Brasas. Todos los derechos reservados. Demostración Tu Marca Local.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveModal('disclaimer')} className="hover:text-stone-200">Aviso de Demostración</button>
              <span>•</span>
              <button onClick={() => setActiveModal('privacy')} className="hover:text-stone-200">Privacidad</button>
            </div>
          </div>
        </div>
      </footer>

      {/* 5 PERSUASIVE ELEMENTS */}

      {/* 1. Exit Intent Pop-up */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-100 uppercase tracking-tight">
              ¡ESPERA! TODAVÍA HAY MUCHO SABOR POR DESCUBRIR.
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              "Antes de irte, descubre nuestras especialidades y encuentra el plato perfecto para tu próximo antojo".
            </p>
            <div className="pt-2">
              <a
                href="#menu"
                onClick={() => setShowExitPopup(false)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow transition"
              >
                VER EL MENÚ <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Offers & Availability badge / section embedded in menu/specialties (we can also render an active promotion banner) */}
      <div className="fixed bottom-4 right-4 z-40 hidden md:block">
        <div className="bg-stone-900/90 border border-amber-500/40 backdrop-blur p-4 rounded-2xl shadow-2xl max-w-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-900">
              Oferta Especial
            </span>
            <span className="text-[11px] text-stone-400 font-medium">Solo 7 unidades disponibles</span>
          </div>
          <p className="text-xs font-bold text-stone-100">Parrillada Especial + Bebida</p>
          <p className="text-[11px] text-stone-300">Consulta las promociones disponibles hoy.</p>
        </div>
      </div>

      {/* 3. Social Proof Order Notifications (Bottom Left Toast) */}
      {showToast && toastNotification && (
        <div className="fixed bottom-4 left-4 z-40 bg-stone-900/95 border border-stone-800 text-stone-200 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-xs animate-slide-up">
          <div className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-stone-100">{toastNotification.name} de {toastNotification.city}</p>
            <p className="text-stone-400">acaba de pedir una {toastNotification.dish}</p>
          </div>
        </div>
      )}

      {/* 4. Floating Mobile Action Button (Visible only on mobile when scrolled) */}
      {scrolledPastMenu && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden flex justify-center">
          <a
            href="#menu"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3 rounded-full shadow-2xl text-xs flex items-center gap-2 border border-amber-300 animate-bounce"
          >
            VER MENÚ Y ESPECIALIDADES <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* 5. WhatsApp Commercial Footer Button requirement ("Comunícate por WhatsApp únicamente si tienes alguna duda...") */}
      <div className="bg-stone-900 border-t border-stone-800 py-8 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-xs text-stone-300 leading-relaxed font-medium">
            "Comunícate por WhatsApp únicamente si tienes alguna duda sobre cómo obtener una página web similar para tu restaurante que no esté explicada en esta demostración".
          </p>
          <a
            href="https://wa.me/50765278910?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20p%C3%A1gina%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-lg transition"
          >
            <MessageCircle className="w-4 h-4" /> CONSULTAR SOBRE ESTA WEB
          </a>
        </div>
      </div>

    </div>
  );
}
