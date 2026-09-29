'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, Play, Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const projects = [
  { title: 'Quietly, Forever', category: 'Wedding Stories', meta: 'Islamabad · 2026', image: '/Best/IMG_4196_Original.jpeg' },
  { title: 'A Study in Light', category: 'Portraits', meta: 'Lahore · 2025', image: '/Best/IMG_5486.jpeg' },
  { title: 'After the Rain', category: 'Lifestyle', meta: 'Murree · 2025', image: '/Best/IMG_4972_Original.jpeg' },
  { title: 'The Gathering', category: 'Events', meta: 'Karachi · 2024', image: '/Best/IMG_7996.jpeg' },
]

const gallery = [
  { title: 'Golden hour', category: 'Lifestyle', image: '/Best/IMG_2153.jpeg', aspect: 'aspect-[4/5]' },
  { title: 'Soft focus', category: 'Portraits', image: '/Best/IMG_2709.jpeg', aspect: 'aspect-[3/4]' },
  { title: 'The in-between', category: 'Wedding Stories', image: '/Best/IMG_4196_Original.jpeg', aspect: 'aspect-[16/10]' },
  { title: 'A quiet room', category: 'Commercial', image: '/Best/IMG_5375_Original.jpeg', aspect: 'aspect-[4/5]' },
  { title: 'Wild bloom', category: 'Lifestyle', image: '/Best/IMG_7272.jpeg', aspect: 'aspect-[4/5]' },
  { title: 'No. 07', category: 'Portraits', image: '/Best/IMG_7996.jpeg', aspect: 'aspect-[16/10]' },
]

const films = [
  { title: 'The Vows We Keep', category: 'Wedding Film', duration: '03:42', year: '2026', image: '/Best/IMG_2153.jpeg', video: '/Best/fkdjsakjfk-2.mp4' },
  { title: 'Made by Hand', category: 'Brand Film', duration: '01:58', year: '2025', image: '/Best/IMG_2709.jpeg', video: '/Best/no face_1_prob3.mp4' },
]

const mediaItems = [
  { title: 'Quietly, Forever', category: 'Still image', label: '01', image: projects[0].image, type: 'image' },
  { title: 'The Vows We Keep', category: 'Wedding film · 03:42', label: '02', image: films[0].image, type: 'film' },
  { title: 'After the Rain', category: 'Still image', label: '03', image: projects[2].image, type: 'image' },
  { title: 'Made by Hand', category: 'Brand film · 01:58', label: '04', image: films[1].image, type: 'film' },
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={reduce ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export default function Portfolio() {
  const [projectIndex, setProjectIndex] = useState(0)
  const [mediaIndex, setMediaIndex] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [filmOpen, setFilmOpen] = useState<number | null>(null)
  const [cursorLabel, setCursorLabel] = useState('')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => setCursorPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  useEffect(() => {
    const projectTimer = setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % projects.length)
    }, 4500)
    return () => clearInterval(projectTimer)
  }, [])

  useEffect(() => {
    const mediaTimer = setInterval(() => {
      setMediaIndex((prev) => (prev + 1) % mediaItems.length)
    }, 5500)
    return () => clearInterval(mediaTimer)
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (lightbox !== null) {
        if (event.key === 'Escape') setLightbox(null)
        if (event.key === 'ArrowRight') setLightbox((lightbox + 1) % gallery.length)
        if (event.key === 'ArrowLeft') setLightbox((lightbox - 1 + gallery.length) % gallery.length)
      }
      if (event.key === 'Escape') setFilmOpen(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  const moveProject = (direction: number) => setProjectIndex((projectIndex + direction + projects.length) % projects.length)

  return (
    <main onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} style={{ userSelect: 'none', WebkitUserSelect: 'none' }} className="min-h-screen overflow-hidden bg-[#121211] text-[#e9e5dd] selection:bg-[#c6a875] selection:text-[#121211]">
      <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f3eee7] mix-blend-difference md:flex" animate={{ x: cursorPosition.x, y: cursorPosition.y, width: cursorLabel ? 72 : 8, height: cursorLabel ? 72 : 8 }} transition={{ type: 'spring', stiffness: 500, damping: 35 }}>
        {cursorLabel && <span className="font-sans text-[9px] uppercase tracking-[.14em] text-[#121211]">{cursorLabel}</span>}
      </motion.div>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference md:px-10">
        <a href="#top" className="font-sans text-[11px] font-semibold tracking-[0.28em] text-white">HANZALAH STUDIO</a>
        <button className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.24em] text-white" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? 'Close' : 'Menu'} {menuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </header>

      <AnimatePresence>{menuOpen && <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-30 flex flex-col justify-end bg-[#121211] px-6 pb-12 md:px-10">
        <div className="mb-12 font-serif text-6xl leading-[.9] md:text-8xl"><a href="#work" onClick={() => setMenuOpen(false)} className="block hover:text-[#c6a875]">Work</a><a href="#films" onClick={() => setMenuOpen(false)} className="block hover:text-[#c6a875]">Films</a><a href="#about" onClick={() => setMenuOpen(false)} className="block hover:text-[#c6a875]">About</a><a href="#contact" onClick={() => setMenuOpen(false)} className="block hover:text-[#c6a875]">Contact</a></div><p className="font-sans text-xs tracking-[.16em] text-white/40">ISLAMABAD · PAKISTAN</p>
      </motion.nav>}</AnimatePresence>

      <section id="top" className="relative flex min-h-[92vh] items-end overflow-hidden px-6 pb-14 md:min-h-screen md:px-10 md:pb-16">
        <motion.div className="absolute inset-0" initial={{ scale: reduce ? 1 : 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease: 'easeOut' }}><Image src="/Best/IMG_7272.jpeg" alt="Bride and groom walking through a sunlit field" fill priority className="object-cover object-center" sizes="100vw" /></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121211] via-[#121211]/15 to-[#121211]/10" />
        <div className="relative z-10 flex w-full items-end justify-between gap-8"><div><p className="mb-4 font-sans text-[10px] uppercase tracking-[.28em] text-white/70">Photographer · Videographer</p><h1 className="max-w-3xl font-serif text-[clamp(4.5rem,13vw,12rem)] leading-[.78] tracking-[-.05em] text-[#f3eee7]">Muhammad<br /><em className="pl-[.7em]">Hanzalah</em></h1></div><a href="#work" className="hidden items-center gap-3 pb-1 font-sans text-[10px] uppercase tracking-[.22em] text-white/70 transition-colors hover:text-white md:flex">Scroll to explore <ArrowDown size={14} /></a></div>
      </section>

      <section id="work" className="px-6 py-24 md:px-10 md:py-36"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">01 — Selected work</p><h2 className="section-title">Stories, <em>honestly</em> told.</h2></div><div className="hidden items-center gap-3 md:flex"><button onClick={() => moveProject(-1)} className="icon-button" aria-label="Previous project"><ArrowLeft size={17} /></button><button onClick={() => moveProject(1)} className="icon-button" aria-label="Next project"><ArrowRight size={17} /></button></div></div>
        <div className="relative overflow-hidden"><AnimatePresence mode="wait" initial={false}><motion.div key={projectIndex} initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -35 }} transition={{ duration: .55 }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18} onDragEnd={(_, info) => { if (info.offset.x < -60) moveProject(1); if (info.offset.x > 60) moveProject(-1) }} className="grid cursor-grab gap-8 active:cursor-grabbing md:grid-cols-[1fr_2.8fr] md:items-end" onMouseEnter={() => setCursorLabel('Drag')} onMouseLeave={() => setCursorLabel('')}><div className="order-2 md:order-1"><p className="eyebrow">Project 0{projectIndex + 1}</p><h3 className="mt-5 max-w-sm font-serif text-5xl leading-[.94] md:text-7xl">{projects[projectIndex].title}</h3><p className="mt-7 font-sans text-xs uppercase tracking-[.16em] text-white/45">{projects[projectIndex].category}<br />{projects[projectIndex].meta}</p><div className="mt-12 flex items-center justify-between border-t border-white/15 pt-4 font-sans text-[10px] uppercase tracking-[.2em] text-white/45"><span>Drag to explore</span><span>0{projectIndex + 1} / 0{projects.length}</span></div></div><div className="relative aspect-[1.45] overflow-hidden bg-[#242421]"><Image src={projects[projectIndex].image} alt={projects[projectIndex].title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 70vw" /></div></motion.div></AnimatePresence></div>
        <div className="mt-8 flex gap-3 md:hidden"><button onClick={() => moveProject(-1)} className="icon-button" aria-label="Previous project"><ArrowLeft size={17} /></button><button onClick={() => moveProject(1)} className="icon-button" aria-label="Next project"><ArrowRight size={17} /></button></div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#0b0b0b] px-6 py-24 text-[var(--paper)] md:px-10 md:py-36"><Reveal><div className="mb-12 flex items-end justify-between gap-6"><div><p className="eyebrow text-[var(--ink)]/60">02 — The big picture</p><h2 className="section-title">A moving <em className="text-[var(--cobalt)]">archive.</em></h2></div><div className="flex gap-3"><button onClick={() => setMediaIndex((mediaIndex - 1 + mediaItems.length) % mediaItems.length)} className="icon-button border-[var(--ink)]/30" aria-label="Previous media"><ArrowLeft /></button><button onClick={() => setMediaIndex((mediaIndex + 1) % mediaItems.length)} className="icon-button border-[var(--ink)]/30" aria-label="Next media"><ArrowRight /></button></div></div></Reveal><div className="relative"><AnimatePresence mode="wait" initial={false}><motion.div key={mediaIndex} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.16} onDragEnd={(_, info) => { if (info.offset.x < -60) setMediaIndex((mediaIndex + 1) % mediaItems.length); if (info.offset.x > 60) setMediaIndex((mediaIndex - 1 + mediaItems.length) % mediaItems.length) }} className="media-slide relative aspect-[1.35] cursor-grab overflow-hidden bg-[var(--cobalt)] active:cursor-grabbing md:aspect-[2.05]"><Image src={mediaItems[mediaIndex].image} alt={mediaItems[mediaIndex].title} fill className="object-cover" sizes="92vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5" />{mediaItems[mediaIndex].type === 'film' && <button onClick={() => setFilmOpen(mediaIndex === 1 ? 0 : 1)} className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--lime)] text-[var(--ink)] transition hover:scale-110" aria-label={`Play ${mediaItems[mediaIndex].title}`}><Play fill="currentColor" /></button>}<div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white md:inset-x-8 md:bottom-8"><div><p className="font-sans text-[10px] uppercase tracking-[.2em] text-white/70">{mediaItems[mediaIndex].category}</p><h3 className="mt-2 font-serif text-4xl md:text-6xl">{mediaItems[mediaIndex].title}</h3></div><span className="font-sans text-[10px] uppercase tracking-[.2em] text-white/70">{mediaItems[mediaIndex].label} / 04</span></div></motion.div></AnimatePresence></div><div className="mt-8 grid grid-cols-4 gap-2 md:gap-4">{mediaItems.map((item, i) => <button key={item.title} onClick={() => setMediaIndex(i)} className={`relative aspect-[1.35] overflow-hidden text-left transition ${i === mediaIndex ? 'ring-2 ring-[var(--ink)] ring-offset-2 ring-offset-[var(--coral)]' : 'opacity-55 hover:opacity-100'}`} aria-label={`Show ${item.title}`}><Image src={item.image} alt="" fill className="object-cover" sizes="25vw" /><span className="absolute inset-x-2 bottom-2 font-sans text-[8px] uppercase tracking-[.15em] text-white md:inset-x-3 md:bottom-3">{item.label}</span></button>)}</div></section>

      <section className="border-y border-white/10 bg-[#080808] px-6 py-24 text-[#f1eee7] md:px-10 md:py-36"><Reveal><div className="mb-14 flex items-end justify-between"><div><p className="eyebrow text-[#121211]/50">02 — Photography</p><h2 className="section-title">The <em>archive</em></h2></div><p className="hidden max-w-xs font-sans text-xs leading-6 text-[#121211]/55 md:block">A collection of fleeting moments, considered compositions and the people in between.</p></div></Reveal><div className="grid grid-cols-2 gap-x-3 gap-y-14 md:grid-cols-12 md:gap-x-5 md:gap-y-24">{gallery.map((item, i) => <Reveal key={item.title} className={`group ${i === 2 || i === 5 ? 'col-span-2 md:col-span-7 md:col-start-4' : 'col-span-1 md:col-span-4'} ${i === 1 ? 'md:col-start-8' : ''}`}><button onClick={() => setLightbox(i)} className="block w-full text-left" aria-label={`View ${item.title}`}><div className={`relative overflow-hidden bg-[#d3cfc6] ${item.aspect}`}><Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 50vw, 45vw" /><span className="absolute inset-0 flex items-center justify-center bg-black/0 font-sans text-[10px] uppercase tracking-[.25em] text-white opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">View</span></div><div className="mt-3 flex justify-between gap-3 font-sans text-[10px] uppercase tracking-[.12em] text-[#121211]/55"><span>{item.title}</span><span>{item.category}</span></div></button></Reveal>)}</div></section>

      <section id="films" className="px-6 py-24 md:px-10 md:py-36"><Reveal><div className="mb-14 flex items-end justify-between"><div><p className="eyebrow">03 — Moving image</p><h2 className="section-title">Films for the <em>feeling</em>.</h2></div><p className="hidden font-sans text-xs uppercase tracking-[.16em] text-white/40 md:block">Sound on · Stories in motion</p></div></Reveal><div className="grid gap-8 md:grid-cols-2">{films.map((film, i) => <Reveal key={film.title} className="group"><button onClick={() => setFilmOpen(i)} className="block w-full text-left"><div className="relative aspect-video overflow-hidden bg-[#242421] pointer-events-none"><video src={film.video} autoPlay loop muted playsInline className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:opacity-70" /><span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 text-white transition group-hover:scale-110"><Play size={17} fill="currentColor" /></span></div><div className="mt-4 flex items-center justify-between border-b border-white/15 pb-4"><div><h3 className="font-serif text-3xl">{film.title}</h3><p className="mt-2 font-sans text-[10px] uppercase tracking-[.16em] text-white/45">{film.category} · {film.year}</p></div><span className="font-sans text-[10px] uppercase tracking-[.15em] text-white/45">{film.duration}</span></div></button></Reveal>)}</div></section>

      <section className="overflow-hidden border-y border-white/10 bg-[#0b0b0b] py-24 md:py-36"><div className="flex w-max gap-4 pl-6 md:pl-10" style={{ transform: 'translateX(-2%)' }}><div className="flex w-[72vw] max-w-[800px] flex-col justify-between pb-4 md:w-[42vw]"><p className="eyebrow">04 — A visual diary</p><h2 className="font-serif text-6xl leading-[.86] md:text-8xl">A little<br /><em>off-center.</em></h2><p className="max-w-xs font-sans text-xs leading-6 text-white/45">The work lives in the edges — the in-between glances, the hands, the light that changes everything.</p></div>{['/Best/IMG_2153.jpeg', '/Best/IMG_2709.jpeg', '/Best/IMG_5486.jpeg'].map((src, i) => <div key={src} className={`relative w-[72vw] max-w-[800px] shrink-0 ${i === 1 ? 'mt-16' : ''} aspect-[1.1]`}><Image src={src} alt="Editorial photography detail" fill className="object-cover" sizes="70vw" /></div>)}</div></section>

      <section id="about" className="grid gap-12 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-10 md:py-36"><Reveal><div className="relative aspect-[4/5] max-w-md"><Image src="/Best/IMG_7996.jpeg" alt="Photographer portrait in a studio" fill className="object-cover grayscale" sizes="(max-width: 768px) 100vw, 40vw" /></div></Reveal><Reveal className="flex flex-col justify-between"><div><p className="eyebrow">05 — The person behind</p><h2 className="section-title mt-6">Noticing<br /><em>the quiet.</em></h2><p className="mt-10 max-w-md font-sans text-sm leading-7 text-white/55">I&apos;m Muhammad Hanzalah, a photographer and filmmaker based in Islamabad. I make images for people who care about the way a moment felt — not just the way it looked.</p></div><div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/15 pt-5 font-sans text-[10px] uppercase tracking-[.16em] text-white/45"><span>Based in<br /><strong className="mt-2 block font-normal text-white">Islamabad, Pakistan</strong></span><span>Specialising in<br /><strong className="mt-2 block font-normal text-white">Weddings · Portraits</strong></span></div></Reveal></section>

      <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-36"><Reveal><div className="mb-16 flex items-end justify-between"><div><p className="eyebrow">06 — What I do</p><h2 className="section-title">Made to <em>matter.</em></h2></div></div><div className="divide-y divide-white/15 border-y border-white/15">{['Wedding Photography', 'Wedding Films', 'Portrait Photography', 'Commercial & Brand', 'Events & Social'].map((service, i) => <div key={service} className="group flex items-center justify-between py-6 md:py-8"><div className="flex items-center gap-6"><span className="font-sans text-[10px] text-white/30">0{i + 1}</span><h3 className="font-serif text-3xl transition group-hover:pl-2 group-hover:text-[#c6a875] md:text-5xl">{service}</h3></div><Plus size={18} className="text-white/40 transition group-hover:rotate-45 group-hover:text-[#c6a875]" /></div>)}</div></Reveal></section>

      <section id="contact" className="relative overflow-hidden px-6 py-28 md:px-10 md:py-44"><div className="absolute right-[-5%] top-1/4 size-72 rounded-full border border-[#c6a875]/20 md:size-[30rem]" /><Reveal><p className="eyebrow">07 — Start a conversation</p><h2 className="mt-8 max-w-4xl font-serif text-[clamp(4.5rem,12vw,11rem)] leading-[.78] tracking-[-.05em]">Let&apos;s create<br /><em>something<br />memorable.</em></h2><div className="mt-16 flex flex-col gap-5 font-sans text-xs uppercase tracking-[.18em] text-white/60 md:flex-row md:items-center md:gap-12"><a href="mailto:hello@hanzalahstudio.com" className="link-line">hello@hanzalahstudio.com <ArrowUpRight size={14} /></a><a href="https://instagram.com" className="link-line"><ArrowUpRight size={14} /> Instagram</a><a href="https://wa.me/920000000000" className="link-line">WhatsApp <ArrowUpRight size={14} /></a></div></Reveal></section>

      <footer className="flex flex-col gap-5 border-t border-white/10 px-6 py-8 font-sans text-[10px] uppercase tracking-[.16em] text-white/40 md:flex-row md:items-center md:justify-between md:px-10"><span>Muhammad Hanzalah Studio · Islamabad, Pakistan</span><span>© 2026 Muhammad Hanzalah</span><a href="#top" className="flex items-center gap-2 hover:text-white">Back to top <ArrowUpRight size={12} /></a></footer>

      <AnimatePresence>{lightbox !== null && <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0c0b]/95 p-5 md:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Image viewer"><button onClick={() => setLightbox(null)} className="absolute right-6 top-6 text-white" aria-label="Close image viewer"><X /></button><button onClick={() => setLightbox((lightbox - 1 + gallery.length) % gallery.length)} className="absolute left-5 top-1/2 text-white/70 hover:text-white" aria-label="Previous image"><ArrowLeft /></button><div className="relative h-[75vh] w-full max-w-5xl"><Image src={gallery[lightbox].image} alt={gallery[lightbox].title} fill className="object-contain" sizes="90vw" /></div><button onClick={() => setLightbox((lightbox + 1) % gallery.length)} className="absolute right-5 top-1/2 text-white/70 hover:text-white" aria-label="Next image"><ArrowRight /></button><p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[.2em] text-white/60">0{lightbox + 1} / 0{gallery.length} · {gallery[lightbox].title}</p></motion.div>}</AnimatePresence>
      <AnimatePresence>{filmOpen !== null && <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0c0b]/95 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Film viewer"><button onClick={() => setFilmOpen(null)} className="absolute right-6 top-6 text-white" aria-label="Close film viewer"><X /></button><div className="relative aspect-video w-full max-w-5xl overflow-hidden pointer-events-none"><video src={films[filmOpen].video} autoPlay loop muted playsInline className="h-full w-full object-cover" /></div><p className="absolute bottom-7 font-serif text-2xl text-white">{films[filmOpen].title}</p></motion.div>}</AnimatePresence>
    </main>
  )
}
