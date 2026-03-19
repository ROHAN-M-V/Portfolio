export default function Footer() {
    return (
        <footer id="contact" className="relative py-20 md:py-32 bg-[#050505] text-[#e0e0e0] overflow-hidden flex flex-col justify-between min-h-[80vh]">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <div className="px-6 md:px-10 z-10 flex-1 flex flex-col justify-center">
                <h2 className="font-display text-[15vw] leading-[0.8] tracking-[-0.04em] uppercase font-bold text-white hover-target cursor-pointer transition-colors duration-500 hover:text-zinc-500 group relative w-max overflow-hidden">
                    <span className="inline-block transition-transform duration-500 group-hover:-translate-y-[100%]">
                        LET'S TALK
                    </span>
                    <span className="absolute left-0 top-0 translate-y-[100%] inline-block transition-transform duration-500 group-hover:translate-y-0">
                        LET'S TALK
                    </span>
                </h2>

                <div className="flex flex-col md:flex-row gap-10 mt-20 md:mt-32 w-full justify-between items-start md:items-end font-sans">
                    <div className="flex flex-col gap-2">
                        <p className="text-zinc-500 font-alt tracking-widest uppercase text-xs mb-2">Socials</p>
                        {['Twitter', 'LinkedIn', 'Instagram', 'Github'].map((link) => (
                            <a key={link} href="#" className="text-lg hover-target hover:text-white transition-colors duration-300 w-max group relative overflow-hidden">
                                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[100%]">{link}</span>
                                <span className="absolute left-0 top-0 translate-y-[100%] inline-block transition-transform duration-300 group-hover:translate-y-0">{link}</span>
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 md:text-right">
                        <p className="text-zinc-500 font-alt tracking-widest uppercase text-xs mb-2">Location</p>
                        <p className="text-lg">NIT Goa ,cuncolim, Goa</p>
                        <p className="text-lg text-zinc-400">08:00 AM Local Time</p>
                    </div>

                    <div className="flex flex-col gap-2 md:text-right">
                        <p className="text-zinc-500 font-alt tracking-widest uppercase text-xs mb-2">Contact</p>
                        <a href="mailto:hello@studio.com" className="text-lg hover-target hover:text-white transition-colors duration-300">
                            25eee1039@nitgoa.ac.in
                        </a>
                        <p className="text-lg text-zinc-400"></p>
                    </div>
                </div>
            </div>

            <div className="px-6 md:px-10 mt-20 flex justify-between items-end z-10 font-alt text-xs uppercase tracking-widest text-zinc-600">
                <p>© {new Date().getFullYear()} STUDIO. ALL RIGHTS RESERVED.</p>
                <p>SCROLL TO TOP</p>
            </div>
        </footer>
    );
}
