// Synthesized sound effects using the Web Audio API — no audio files needed.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
}

/** Low rumbling drone that builds in intensity. Returns a stop function. */
export function playAmbientHum(): () => void {
    const ac = getCtx();
    const now = ac.currentTime;

    // base drone — low frequency
    const osc1 = ac.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(40, now);
    osc1.frequency.linearRampToValueAtTime(55, now + 8);

    // sub bass layer
    const osc2 = ac.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(30, now);

    // filter to keep it dark
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.linearRampToValueAtTime(300, now + 8);
    filter.Q.value = 2;

    // gain ramp
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 1);
    gain.gain.linearRampToValueAtTime(0.12, now + 8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);

    osc1.start(now);
    osc2.start(now);

    return () => {
        const t = ac.currentTime;
        gain.gain.linearRampToValueAtTime(0, t + 0.3);
        osc1.stop(t + 0.4);
        osc2.stop(t + 0.4);
    };
}

/** Single smooth explosion whoosh. */
export function playBurst(): void {
    const ac = getCtx();
    const now = ac.currentTime;

    // master gain — single envelope for the whole explosion
    const master = ac.createGain();
    master.gain.setValueAtTime(0.001, now);
    master.gain.linearRampToValueAtTime(0.45, now + 0.05);
    master.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
    master.connect(ac.destination);

    // shaped noise — the "whoosh" texture
    const bufferSize = ac.sampleRate * 1.5;
    const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
    }
    const noise = ac.createBufferSource();
    noise.buffer = buffer;

    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(40, now + 1.2);
    filter.Q.value = 1;

    noise.connect(filter);
    filter.connect(master);
    noise.start(now);

    // sub-bass sweep merged into the same envelope
    const boom = ac.createOscillator();
    boom.type = 'sine';
    boom.frequency.setValueAtTime(60, now);
    boom.frequency.exponentialRampToValueAtTime(15, now + 1.2);
    boom.connect(master);
    boom.start(now);
    boom.stop(now + 1.5);
}

/** Soft click / tick for phrase transitions. */
export function playTick(): void {
    const ac = getCtx();
    const now = ac.currentTime;

    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);

    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.1);
}
