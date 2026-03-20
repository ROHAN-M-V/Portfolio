// Cinematic black hole audio — Web Audio API synthesis, no external files.
// Designed for clarity on mobile speakers with DynamicsCompressor to prevent clipping.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
}

/**
 * Creates a simple impulse-response buffer for convolver reverb.
 * Generates a decaying noise tail to add spatial depth.
 */
function createReverbImpulse(ac: AudioContext, duration: number, decay: number): AudioBuffer {
    const length = ac.sampleRate * duration;
    const impulse = ac.createBuffer(2, length, ac.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
        const data = impulse.getChannelData(ch);
        for (let i = 0; i < length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
        }
    }
    return impulse;
}

/**
 * Deep cinematic drone — the gravitational hum of a black hole.
 * Layers a sine sub-bass, triangle warmth, LFO-modulated gain, and reverb.
 * Returns a stop function.
 */
export function playAmbientHum(): () => void {
    const ac = getCtx();
    const now = ac.currentTime;

    // ── Compressor to prevent clipping on mobile speakers ──
    const compressor = ac.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, now);
    compressor.knee.setValueAtTime(12, now);
    compressor.ratio.setValueAtTime(8, now);
    compressor.attack.setValueAtTime(0.005, now);
    compressor.release.setValueAtTime(0.15, now);
    compressor.connect(ac.destination);

    // ── Master gain ──
    const master = ac.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.12, now + 2);
    master.gain.linearRampToValueAtTime(0.2, now + 10);
    master.connect(compressor);

    // ── Convolver reverb for spatial depth ──
    const convolver = ac.createConvolver();
    convolver.buffer = createReverbImpulse(ac, 3, 2.5);
    const reverbGain = ac.createGain();
    reverbGain.gain.setValueAtTime(0.3, now);
    convolver.connect(reverbGain);
    reverbGain.connect(master);

    // Dry bus
    const dryGain = ac.createGain();
    dryGain.gain.setValueAtTime(0.7, now);
    dryGain.connect(master);

    // ── Lowpass filter — starts dark, opens slowly ──
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);
    filter.frequency.linearRampToValueAtTime(400, now + 10);
    filter.Q.setValueAtTime(1.5, now);
    filter.connect(dryGain);
    filter.connect(convolver);

    // ── Layer 1: Deep sine sub-bass at 35Hz (the gravity feel) ──
    const osc1 = ac.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(35, now);
    osc1.frequency.linearRampToValueAtTime(45, now + 10);
    const gain1 = ac.createGain();
    gain1.gain.setValueAtTime(0.6, now);
    osc1.connect(gain1);
    gain1.connect(filter);
    osc1.start(now);

    // ── Layer 2: Triangle wave at 70Hz for warmth ──
    const osc2 = ac.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(70, now);
    osc2.frequency.linearRampToValueAtTime(80, now + 10);
    const gain2 = ac.createGain();
    gain2.gain.setValueAtTime(0.25, now);
    osc2.connect(gain2);
    gain2.connect(filter);
    osc2.start(now);

    // ── Layer 3: Very quiet sine at 110Hz for harmonic richness ──
    const osc3 = ac.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(110, now);
    const gain3 = ac.createGain();
    gain3.gain.setValueAtTime(0.08, now);
    osc3.connect(gain3);
    gain3.connect(filter);
    osc3.start(now);

    // ── LFO: Slow gain modulation for eerie pulsing ──
    const lfo = ac.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.3, now);
    const lfoGain = ac.createGain();
    lfoGain.gain.setValueAtTime(0.03, now);
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start(now);

    return () => {
        const t = ac.currentTime;
        master.gain.cancelScheduledValues(t);
        master.gain.setValueAtTime(master.gain.value, t);
        master.gain.linearRampToValueAtTime(0, t + 0.5);
        setTimeout(() => {
            osc1.stop();
            osc2.stop();
            osc3.stop();
            lfo.stop();
        }, 600);
    };
}

/**
 * Cinematic black hole explosion / expansion burst.
 *
 * Phase 1 (0–0.15s):  Sharp transient attack — noise burst through bandpass
 * Phase 2 (0.15–1.2s): Deep sub-bass sweep 80Hz→18Hz with waveshaper distortion
 * Phase 3 (0.3–2.5s):  Reverb tail — shaped noise through sweeping lowpass
 * Phase 4 (0.5–3.5s):  Resonant ring — triangle wave with gentle vibrato decay
 *
 * Master compression ensures clarity on mobile speakers.
 */
export function playBurst(): void {
    const ac = getCtx();
    const now = ac.currentTime;

    // ── Master compressor for mobile clarity ──
    const compressor = ac.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-20, now);
    compressor.knee.setValueAtTime(10, now);
    compressor.ratio.setValueAtTime(12, now);
    compressor.attack.setValueAtTime(0.003, now);
    compressor.release.setValueAtTime(0.25, now);
    compressor.connect(ac.destination);

    // ── Master gain ──
    const masterGain = ac.createGain();
    masterGain.gain.setValueAtTime(0.5, now);
    masterGain.gain.setValueAtTime(0.5, now + 0.5);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
    masterGain.connect(compressor);

    // ── Convolver reverb for spatial explosion tail ──
    const convolver = ac.createConvolver();
    convolver.buffer = createReverbImpulse(ac, 4, 2);
    const reverbSend = ac.createGain();
    reverbSend.gain.setValueAtTime(0.4, now);
    convolver.connect(reverbSend);
    reverbSend.connect(masterGain);

    // ════════════════════════════════════════════
    // PHASE 1: Sharp transient attack (0–0.15s)
    // ════════════════════════════════════════════
    const attackLen = ac.sampleRate * 0.15;
    const attackBuf = ac.createBuffer(1, attackLen, ac.sampleRate);
    const attackData = attackBuf.getChannelData(0);
    for (let i = 0; i < attackLen; i++) {
        attackData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / attackLen, 4);
    }
    const attackSrc = ac.createBufferSource();
    attackSrc.buffer = attackBuf;

    const attackBP = ac.createBiquadFilter();
    attackBP.type = 'bandpass';
    attackBP.frequency.setValueAtTime(800, now);
    attackBP.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    attackBP.Q.setValueAtTime(2, now);

    const attackGain = ac.createGain();
    attackGain.gain.setValueAtTime(0.7, now);
    attackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    attackSrc.connect(attackBP);
    attackBP.connect(attackGain);
    attackGain.connect(masterGain);
    attackGain.connect(convolver);
    attackSrc.start(now);

    // ════════════════════════════════════════════
    // PHASE 2: Deep sub-bass sweep (0.05–1.2s)
    // ════════════════════════════════════════════
    const subBass = ac.createOscillator();
    subBass.type = 'sine';
    subBass.frequency.setValueAtTime(80, now + 0.05);
    subBass.frequency.exponentialRampToValueAtTime(18, now + 1.2);

    // Waveshaper for crunch / distortion
    const waveshaper = ac.createWaveShaper();
    const curveLen = 44100;
    const curve = new Float32Array(curveLen);
    for (let i = 0; i < curveLen; i++) {
        const x = (i * 2) / curveLen - 1;
        curve[i] = (Math.PI + 3) * x / (Math.PI + 3 * Math.abs(x));
    }
    waveshaper.curve = curve;
    waveshaper.oversample = '2x';

    const subGain = ac.createGain();
    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.6, now + 0.1);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    // Sub lowpass to keep it clean below
    const subLP = ac.createBiquadFilter();
    subLP.type = 'lowpass';
    subLP.frequency.setValueAtTime(200, now);
    subLP.frequency.exponentialRampToValueAtTime(60, now + 1.2);

    subBass.connect(waveshaper);
    waveshaper.connect(subLP);
    subLP.connect(subGain);
    subGain.connect(masterGain);
    subGain.connect(convolver);
    subBass.start(now + 0.05);
    subBass.stop(now + 1.5);

    // ════════════════════════════════════════════
    // PHASE 3: Shaped noise tail (0.1–2.5s)
    // ════════════════════════════════════════════
    const noiseLen = ac.sampleRate * 2.5;
    const noiseBuf = ac.createBuffer(1, noiseLen, ac.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
        // Envelope: quick rise, long exponential decay
        const env = i < noiseLen * 0.05
            ? i / (noiseLen * 0.05)
            : Math.pow(1 - (i - noiseLen * 0.05) / (noiseLen * 0.95), 2.5);
        noiseData[i] = (Math.random() * 2 - 1) * env;
    }
    const noiseSrc = ac.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    const noiseLP = ac.createBiquadFilter();
    noiseLP.type = 'lowpass';
    noiseLP.frequency.setValueAtTime(400, now + 0.1);
    noiseLP.frequency.exponentialRampToValueAtTime(40, now + 2.5);
    noiseLP.Q.setValueAtTime(1.5, now);

    const noiseGain = ac.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    noiseSrc.connect(noiseLP);
    noiseLP.connect(noiseGain);
    noiseGain.connect(masterGain);
    noiseGain.connect(convolver);
    noiseSrc.start(now + 0.1);

    // ════════════════════════════════════════════
    // PHASE 4: Resonant ring tone (0.3–3.5s)
    // ════════════════════════════════════════════
    const ring = ac.createOscillator();
    ring.type = 'triangle';
    ring.frequency.setValueAtTime(55, now + 0.3);
    ring.frequency.linearRampToValueAtTime(48, now + 3.5);

    // Gentle vibrato
    const vibrato = ac.createOscillator();
    vibrato.type = 'sine';
    vibrato.frequency.setValueAtTime(4, now);
    const vibratoGain = ac.createGain();
    vibratoGain.gain.setValueAtTime(2, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(ring.frequency);
    vibrato.start(now + 0.3);

    const ringGain = ac.createGain();
    ringGain.gain.setValueAtTime(0.001, now + 0.3);
    ringGain.gain.linearRampToValueAtTime(0.2, now + 0.6);
    ringGain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

    const ringLP = ac.createBiquadFilter();
    ringLP.type = 'lowpass';
    ringLP.frequency.setValueAtTime(150, now);

    ring.connect(ringLP);
    ringLP.connect(ringGain);
    ringGain.connect(masterGain);
    ringGain.connect(convolver);
    ring.start(now + 0.3);
    ring.stop(now + 3.5);
    vibrato.stop(now + 3.5);
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
