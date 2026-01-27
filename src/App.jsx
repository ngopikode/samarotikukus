import React, { useState, useEffect, useMemo } from 'react';
import {
    QrCode,
    MapPin,
    ArrowRight,
    Instagram,
    AlignJustify,
    LayoutGrid,
    Plus,
    Minus,
    X,
    Utensils,
    ShoppingBag,
    User,
    MessageCircle,
    ChevronRight,
    PartyPopper,
    Coffee
} from 'lucide-react';

// --- KOMPONEN SEO OTOMATIS ---
const SEO = () => {
    useEffect(() => {
        // 1. Set Judul Dokumen
        document.title = "Sama Roti Kukus - Seruput & Gigit | Kuliner Hits Kampar";

        // 2. Fungsi Helper untuk Meta Tags
        const setMetaTag = (name, content, attribute = 'name') => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // 3. Set Meta Description & Keywords
        setMetaTag('description', 'Nikmati sensasi roti kukus lumer dan minuman kekinian paling hits di Kampar sejak 2019. Lokasi: Kompleks @allnewtsjcafe. Pesan online sekarang!');
        setMetaTag('keywords', 'Sama Roti Kukus, Rokus Kampar, Kuliner Kampar, Roti Kukus Lumer, Jajanan Kampar');
        setMetaTag('theme-color', '#d4b982');

        // 4. Set Open Graph (Untuk Preview WhatsApp/IG)
        setMetaTag('og:title', 'Sama Roti Kukus - Seruput & Gigit', 'property');
        setMetaTag('og:description', 'Camilan lumer paling hits di Kampar. Harga mulai 7k! Beli 4 Gratis 1.', 'property');
        setMetaTag('og:image', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', 'property');
        setMetaTag('og:type', 'website', 'property');

    }, []); // Run sekali saat app dimuat

    return null; // Komponen ini tidak merender visual apa-apa
};

// --- DATA MENU ---
const MENU_DATA = [
    { id: 1, cat: 'roti', name: 'Rokus Original', price: 7000, desc: 'Pilih 1 varian rasa klasik favoritmu.', type: 'single', options: ['Cokelat Original', 'Tiramisu', 'Keju', 'Sarikaya', 'Choco Cruncy'], img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&auto=format&fit=crop' },
    { id: 2, cat: 'roti', name: 'Rokus Mix', price: 9000, desc: 'Perpaduan 2 rasa lumer dalam satu gigitan.', type: 'single', options: ['Cokelat + Keju', 'Cokelat + Oreo', 'Cokelat + Kacang', 'Cokelat + Tiramisu', 'Sarikaya + Keju', 'Tiramisu + Keju', 'Tiramisu + Oreo', 'Choco Cruncy + Oreo'], img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=200&auto=format&fit=crop' },
    { id: 3, cat: 'roti', name: 'Rokus Combo', price: 12000, desc: 'Eksplorasi rasa dengan maksimal 3 topping.', type: 'multi', options: ['Cokelat', 'Tiramisu', 'Keju', 'Sarikaya', 'Oreo', 'Kacang', 'Choco Cruncy'], img: 'https://images.unsplash.com/photo-1559811814-e2c57b5e69df?q=80&w=200&auto=format&fit=crop' },
    { id: 4, cat: 'minuman', name: 'Kopi Susu Aren', price: 12000, desc: 'Signature coffee dengan gula aren asli.', type: 'drink', img: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=200&auto=format&fit=crop' },
    { id: 5, cat: 'minuman', name: 'Blue Ocean', price: 10000, desc: 'Kesegaran soda biru lemon yang unik.', type: 'drink', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=200&auto=format&fit=crop' },
    { id: 6, cat: 'minuman', name: 'Milky Mango', price: 13000, desc: 'Creamy milk dengan rasa mangga manis.', type: 'drink', img: 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=200&auto=format&fit=crop' },
    { id: 7, cat: 'minuman', name: 'Passion Soda', price: 10000, desc: 'Soda markisa yang menyegarkan dahaga.', type: 'drink', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=200&auto=format&fit=crop' },
    { id: 8, cat: 'minuman', name: 'Choco Milky', price: 12000, desc: 'Susu cokelat creamy yang nyoklat banget.', type: 'drink', img: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?q=80&w=200&auto=format&fit=crop' },
    { id: 9, cat: 'minuman', name: 'Yakult Mango', price: 12000, desc: 'Perpaduan Yakult dan mangga yang segar.', type: 'drink', img: 'https://images.unsplash.com/photo-1626082902cf1-787123668709?q=80&w=200&auto=format&fit=crop' },
    { id: 10, cat: 'minuman', name: 'Yakult Peach', price: 12000, desc: 'Kesegaran Yakult dengan aroma peach.', type: 'drink', img: 'https://images.unsplash.com/photo-1626082902cf1-787123668709?q=80&w=200&auto=format&fit=crop' },
    { id: 11, cat: 'minuman', name: 'Cendol Aren', price: 10000, desc: 'Cita rasa tradisional cendol gula aren.', type: 'drink', img: 'https://images.unsplash.com/photo-1572490122747-3968b75ec699?q=80&w=200&auto=format&fit=crop' }
];

// --- UTILS ---
const formatPrice = (price) => `Rp ${price.toLocaleString('id-ID')}`;
const formatKPrice = (price) => `Rp ${(price / 1000).toFixed(0)}k`;

// --- MAIN COMPONENT ---
export default function App() {
    // --- STATE ---
    const [cart, setCart] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [category, setCategory] = useState('all');
    const [orderType, setOrderType] = useState('dinein');

    // Modal States
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isQROpen, setIsQROpen] = useState(false);

    // Form States
    const [customerName, setCustomerName] = useState('');
    const [customerInfo, setCustomerInfo] = useState('');

    // --- LOGIC ---
    const addToCart = (item, selectedVariants = '', quantity = 1) => {
        const cartName = selectedVariants ? `${item.name} (${selectedVariants})` : item.name;

        setCart(prev => {
            const existing = prev.find(i => i.cartName === cartName);
            if (existing) {
                return prev.map(i => i.cartName === cartName ? { ...i, qty: i.qty + quantity } : i);
            }
            return [...prev, { ...item, cartName, qty: quantity }];
        });
    };

    const updateQty = (cartName, delta) => {
        setCart(prev => {
            const existing = prev.find(i => i.cartName === cartName);
            if (!existing) return prev;

            const newQty = existing.qty + delta;

            if (newQty <= 0) {
                return prev.filter(i => i.cartName !== cartName);
            }

            return prev.map(i => i.cartName === cartName ? { ...i, qty: newQty } : i);
        });
    };

    const getSimpleItemQty = (itemName) => {
        const item = cart.find(i => i.name === itemName && !i.cartName.includes('('));
        return item ? item.qty : 0;
    };

    const totalCart = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.qty), 0), [cart]);
    const totalQty = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);

    const filteredItems = useMemo(() => {
        return category === 'all' ? MENU_DATA : MENU_DATA.filter(i => i.cat === category);
    }, [category]);

    // --- HANDLERS ---
    const handleItemClick = (item) => {
        if (item.cat === 'roti') {
            setActiveItem(item);
            setIsOptionOpen(true);
        } else {
            addToCart(item, '', 1);
        }
    };

    const handleWhatsApp = () => {
        if (!customerName || !customerInfo) {
            alert("Lengkapi nama dan info meja/alamat dulu ya!");
            return;
        }

        let msg = `*HALO SAMA ROTI KUKUS*\n----------------------------\n*TIPE:* ${orderType === 'dinein' ? 'MAKAN DI TEMPAT 🍽' : 'BAWA PULANG 🛍'}\n*NAMA:* ${customerName}\n*INFO:* ${customerInfo}\n\n*PESANAN:*\n`;
        cart.forEach(item => { msg += `▪ ${item.cartName} (x${item.qty}) - ${formatPrice(item.price * item.qty)}\n`; });
        msg += `\n*TOTAL: ${formatPrice(totalCart)}*\n----------------------------`;

        window.location.href = `https://wa.me/6282283668001?text=${encodeURIComponent(msg)}`;
    };

    // --- SUB-COMPONENT: OPTION MODAL ---
    const OptionModal = () => {
        if (!isOptionOpen || !activeItem) return null;

        // Modal internal state for Quantity
        const [modalQty, setModalQty] = useState(1);

        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const selected = formData.getAll('rasa');

            if (selected.length === 0) return alert('Pilih varian rasa dulu ya kak!');
            if (activeItem.type === 'multi' && selected.length > 3) return alert('Maksimal pilih 3 rasa saja!');

            addToCart(activeItem, selected.join(', '), modalQty);
            setIsOptionOpen(false);
        };

        return (
            <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[120] flex items-end justify-center animate-in fade-in duration-200">
                <div className="bg-white w-full max-w-xl rounded-t-[2.5rem] p-6 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
                    <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mb-6"></div>

                    <div className="flex justify-between items-start mb-6 border-b border-zinc-50 pb-4">
                        <div>
                            <h2 className="text-xl font-black text-zinc-900 tracking-tight">{activeItem.name}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-zinc-900 bg-[#d4b982]/20 px-2 py-1 rounded-md">{formatPrice(activeItem.price)}</span>
                                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
                  {activeItem.type === 'multi' ? 'Pilih Maks 3 Rasa' : 'Pilih 1 Varian'}
                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsOptionOpen(false)} className="p-2 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-zinc-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-2 mb-8 max-h-[30vh] overflow-y-auto pr-1">
                            {activeItem.options.map((opt, idx) => (
                                <label key={idx} className="flex items-center justify-between p-3.5 bg-zinc-50 rounded-xl border border-zinc-100 cursor-pointer hover:bg-zinc-100 transition-all has-[:checked]:bg-[#d4b982]/10 has-[:checked]:border-[#d4b982]/50 group">
                                    <span className="text-xs font-bold text-zinc-700 group-has-[:checked]:text-zinc-900">{opt}</span>
                                    <input
                                        type={activeItem.type === 'multi' ? 'checkbox' : 'radio'}
                                        name="rasa"
                                        value={opt}
                                        className="w-4 h-4 accent-zinc-900"
                                    />
                                </label>
                            ))}
                        </div>

                        {/* QTY SELECTOR DI DALAM MODAL */}
                        <div className="flex items-center justify-between mb-6 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-2">Jumlah</span>
                            <div className="flex items-center gap-4">
                                <button type="button" onClick={() => setModalQty(Math.max(1, modalQty - 1))} className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-100">
                                    <Minus className="w-4 h-4 text-zinc-600" />
                                </button>
                                <span className="font-black text-lg w-6 text-center">{modalQty}</span>
                                <button type="button" onClick={() => setModalQty(modalQty + 1)} className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-zinc-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-zinc-900/10 active:scale-95 transition-all hover:bg-zinc-800 flex items-center justify-center gap-2">
                            <span>Tambahkan Pesanan - {formatPrice(activeItem.price * modalQty)}</span>
                            <Plus className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    // --- RENDER APP ---
    return (
        <div className="bg-zinc-50 min-h-screen text-zinc-900 pb-24 font-sans antialiased selection:bg-[#d4b982] selection:text-black">
            {/* Component SEO dipanggil di sini */}
            <SEO />

            {/* Font & Styles loaded dynamically for this preview, in real app put in index.css */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Dancing+Script:wght@700&display=swap');
        .font-brand { font-family: 'Dancing Script', cursive; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200/50 px-6 py-3">
                <div className="max-w-xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-[#d4b982] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-zinc-900/10">
                            <span className="font-brand text-zinc-900 text-lg leading-none pt-1">Sama</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-sm leading-none tracking-tight uppercase text-zinc-900">Roti Kukus</h1>
                            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Kampar • Est. 10'19th</p>
                        </div>
                    </div>
                    <button onClick={() => setIsQROpen(true)} className="p-2.5 bg-zinc-100/80 hover:bg-[#d4b982] transition-colors rounded-full active:scale-95">
                        <QrCode className="w-4 h-4 text-zinc-900" />
                    </button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="max-w-xl mx-auto px-5 pt-6 pb-2">
                <div className="relative bg-[#18181b] rounded-[2rem] p-7 overflow-hidden text-white shadow-2xl shadow-zinc-900/20 border-b-4 border-[#d4b982]">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#d4b982]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-2 mb-5">
                            <span className="bg-[#d4b982] text-black px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm">Promo</span>
                            <div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">Open until 11.00PM</span>
                            </div>
                        </div>

                        <h2 className="text-[2.5rem] font-black leading-[0.9] mb-4 text-white uppercase tracking-tighter">
                            Seruput <br/><span className="text-[#d4b982] italic font-serif">&</span> Gigit
                        </h2>

                        <div className="mb-6 border-l-2 border-[#d4b982]/30 pl-3 space-y-1">
                            <p className="text-zinc-300 text-xs leading-relaxed font-medium">
                                Loc : Kompleks @allnewtsjcafe , Bangkot Kab Kampar
                            </p>
                            <p className="text-[#d4b982] text-[10px] italic font-medium opacity-90">
                                "StayTune the Healthy People"
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => document.getElementById('menu-start').scrollIntoView({ behavior: 'smooth' })} className="bg-[#d4b982] text-zinc-900 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#d4b982]/20 active:scale-95 transition-all hover:brightness-110">
                                Pesan Sekarang <ArrowRight className="w-3 h-3" />
                            </button>
                            <a href="https://www.instagram.com/sama.co.id" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all active:scale-95">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div className="absolute -right-4 bottom-2 opacity-10 rotate-12 animate-[float_4s_ease-in-out_infinite]">
                        <Coffee className="w-32 h-32" />
                    </div>
                </div>
            </section>

            {/* CONTROLS */}
            <div id="menu-start" className="sticky top-[65px] z-40 bg-zinc-50/95 backdrop-blur-sm py-2 border-b border-zinc-100">
                <div className="max-w-xl mx-auto px-5 flex items-center justify-between gap-3">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1 py-1">
                        {['all', 'roti', 'minuman'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap shadow-md transition-all ${category === cat ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-400 border border-zinc-200'}`}
                            >
                                {cat === 'all' ? 'Semua' : cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-zinc-200 shadow-sm shrink-0">
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-300'}`}>
                            <AlignJustify className="w-4 h-4" />
                        </button>
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-300'}`}>
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* PRODUCT GRID/LIST */}
            <main className={`max-w-xl mx-auto px-5 mt-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-4'}`}>
                {filteredItems.map(item => {
                    const qtyInCart = getSimpleItemQty(item.name);
                    // Show stepper if item is NOT roti (no variants) AND already in cart
                    const showStepper = item.cat !== 'roti' && qtyInCart > 0;

                    return (
                        <div
                            key={item.id}
                            onClick={(e) => {
                                if (!e.target.closest('button')) handleItemClick(item);
                            }}
                            className={`
                bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm transition-all hover:shadow-md group cursor-pointer
                ${viewMode === 'list' ? 'flex items-center gap-4' : 'flex flex-col gap-3'}
                ${showStepper ? 'border-[#d4b982]/50 ring-1 ring-[#d4b982]/20' : ''}
              `}
                        >
                            <div className={`
                bg-zinc-50 overflow-hidden shrink-0 rounded-xl
                ${viewMode === 'list' ? 'w-20 h-20' : 'w-full aspect-square'}
              `}>
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="flex-1 flex flex-col justify-between w-full">
                                <div>
                                    <div className={`flex justify-between ${viewMode === 'list' ? 'items-start mb-1' : 'flex-col gap-1 mb-2'}`}>
                                        <h3 className="font-bold text-zinc-900 text-sm leading-tight">{item.name}</h3>
                                        <span className={`font-black text-xs text-zinc-900 bg-[#d4b982]/30 px-2 py-0.5 rounded-md whitespace-nowrap w-fit`}>
                      {formatKPrice(item.price)}
                    </span>
                                    </div>
                                    <p className={`text-[10px] text-zinc-400 leading-tight ${viewMode === 'grid' ? 'line-clamp-1 mb-2' : 'line-clamp-2 mb-2'}`}>
                                        {item.desc}
                                    </p>
                                </div>

                                {/* DYNAMIC BUTTON / STEPPER */}
                                {showStepper ? (
                                    <div className="flex items-center justify-between bg-zinc-900 rounded-lg p-1" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => updateQty(item.name, -1)}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-zinc-700 rounded-md transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="font-black text-white text-xs">{qtyInCart}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-zinc-700 rounded-md transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleItemClick(item);
                                        }}
                                        className={`
                      w-full bg-zinc-50 text-zinc-900 border border-zinc-100 hover:bg-[#d4b982] hover:border-[#d4b982] py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1
                    `}
                                    >
                                        <span>Tambah</span> <Plus className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </main>

            {/* EVENT BANNER */}
            <section className="max-w-xl mx-auto px-5 mt-4 pb-12">
                <div className="bg-white border border-dashed border-zinc-300 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group hover:border-[#d4b982] transition-colors shadow-sm">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-[#d4b982]/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>

                    <div className="bg-zinc-50 p-3 rounded-full shrink-0 border border-zinc-100 group-hover:bg-[#d4b982]/10 group-hover:border-[#d4b982]/20 transition-colors z-10">
                        <PartyPopper className="w-5 h-5 text-zinc-900 group-hover:text-[#d4b982] transition-colors" />
                    </div>

                    <div className="flex-1 relative z-10">
                        <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wide">Terima Pesanan Acara</h3>
                        <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">Siap meriahkan Arisan, Ultah, Rapat & Event spesialmu.</p>
                    </div>

                    <a href="https://wa.me/6282283668001?text=Halo%20Sama%20Roti%20Kukus,%20mau%20tanya%20untuk%20pesanan%20acara..." className="relative z-10 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg hover:bg-[#d4b982] hover:text-zinc-900 transition-all active:scale-95 flex items-center gap-2">
                        Chat Admin
                    </a>
                </div>
            </section>

            {/* FLOATING CART */}
            <div className={`fixed bottom-6 left-0 right-0 px-5 z-50 transition-transform duration-500 ease-in-out ${totalQty > 0 ? 'translate-y-0' : 'translate-y-40'}`}>
                <button onClick={() => setIsCheckoutOpen(true)} className="max-w-xl mx-auto w-full bg-[#18181b] text-white p-4 rounded-2xl shadow-2xl shadow-[#d4b982]/10 flex justify-between items-center border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#d4b982]/5 group-hover:bg-[#d4b982]/10 transition-colors"></div>
                    <div className="relative flex items-center gap-3.5">
                        <div className="bg-[#d4b982] text-zinc-900 w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shadow-lg">{totalQty}</div>
                        <div className="text-left">
                            <span className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">Total Estimasi</span>
                            <span className="font-bold text-lg text-white font-mono leading-none">{formatPrice(totalCart)}</span>
                        </div>
                    </div>
                    <div className="relative flex items-center gap-2 pr-2">
                        <span className="text-[10px] font-black uppercase tracking-widest">Checkout</span>
                        <div className="bg-white/10 p-1.5 rounded-full">
                            <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                    </div>
                </button>
            </div>

            {/* CHECKOUT MODAL */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 bg-white z-[110] flex flex-col animate-in fade-in duration-200">
                    <div className="p-5 flex justify-between items-center border-b border-zinc-100 bg-white sticky top-0 z-10">
                        <div>
                            <h2 className="text-lg font-black tracking-tight text-zinc-900 uppercase">Pesanan Kamu</h2>
                            <p className="text-[10px] text-zinc-400 font-medium">Pastikan pesanan sudah sesuai ya</p>
                        </div>
                        <button onClick={() => setIsCheckoutOpen(false)} className="p-2 bg-zinc-50 rounded-full hover:bg-zinc-100">
                            <X className="w-5 h-5 text-zinc-900" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 pb-32">
                        {cart.length === 0 ? (
                            <div className="text-center py-10 text-zinc-400 text-sm">Keranjang masih kosong nih</div>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-start mb-6 pb-6 border-b border-zinc-50 last:border-0 animate-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex-1 pr-4">
                                        <h4 className="font-bold text-sm text-zinc-900 leading-tight">{item.cartName}</h4>
                                        <p className="text-xs font-medium text-[#d4b982] mt-1">{formatPrice(item.price * item.qty)}</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-zinc-50 p-1 rounded-lg border border-zinc-100">
                                        <button onClick={() => updateQty(item.cartName, -1)} className="w-7 h-7 rounded-md bg-white text-zinc-900 flex items-center justify-center shadow-sm hover:bg-zinc-100 font-bold">-</button>
                                        <span className="font-black text-xs w-4 text-center tabular-nums">{item.qty}</span>
                                        <button onClick={() => updateQty(item.cartName, 1)} className="w-7 h-7 rounded-md bg-zinc-900 text-white flex items-center justify-center shadow-sm hover:bg-zinc-800 font-bold">+</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-zinc-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <button
                                onClick={() => setOrderType('dinein')}
                                className={`py-3 rounded-xl border-2 text-xs font-extrabold transition-all flex flex-col items-center gap-1 ${orderType === 'dinein' ? 'bg-[#d4b982] text-black border-[#d4b982]' : 'bg-zinc-50 text-zinc-400 border-transparent'}`}
                            >
                                <Utensils className="w-4 h-4" /> Makan di Sini
                            </button>
                            <button
                                onClick={() => setOrderType('takeaway')}
                                className={`py-3 rounded-xl border-2 text-xs font-extrabold transition-all flex flex-col items-center gap-1 ${orderType === 'takeaway' ? 'bg-[#d4b982] text-black border-[#d4b982]' : 'bg-zinc-50 text-zinc-400 border-transparent'}`}
                            >
                                <ShoppingBag className="w-4 h-4" /> Bawa Pulang
                            </button>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Nama Pemesan"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-100 text-sm font-bold outline-none focus:border-[#d4b982] focus:ring-1 focus:ring-[#d4b982] transition-all"
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder={orderType === 'dinein' ? "Nomor Meja" : "Alamat / Catatan"}
                                    value={customerInfo}
                                    onChange={(e) => setCustomerInfo(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-100 text-sm font-bold outline-none focus:border-[#d4b982] focus:ring-1 focus:ring-[#d4b982] transition-all"
                                />
                            </div>
                        </div>

                        <button onClick={handleWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all active:scale-95">
                            <MessageCircle className="w-5 h-5 fill-current" />
                            Kirim ke WhatsApp
                        </button>
                    </div>
                </div>
            )}

            {/* QR MODAL */}
            {isQROpen && (
                <div className="fixed inset-0 bg-zinc-900/95 backdrop-blur-md z-[200] flex items-center justify-center p-6 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-xs rounded-[2rem] p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-[#d4b982]/10 rounded-b-[50%] -translate-y-1/2"></div>
                        <div className="relative z-10">
                            <div className="bg-[#d4b982] w-14 h-14 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                                <QrCode className="w-7 h-7 text-zinc-900" />
                            </div>
                            <h2 className="text-xl font-black text-zinc-900 mb-1">SCAN MENU</h2>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-6">Sama Roti Kukus</p>
                            <div className="bg-white p-2 rounded-xl border-2 border-dashed border-zinc-200 mb-6">
                                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}&bgcolor=ffffff&color=000000&margin=10`} alt="QR Code" className="w-full aspect-square rounded-lg opacity-90" />
                            </div>
                            <button onClick={() => setIsQROpen(false)} className="w-full bg-zinc-900 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-zinc-800 transition-colors">Tutup</button>
                        </div>
                    </div>
                </div>
            )}

            {/* OPTION MODAL */}
            <OptionModal />

        </div>
    );
}