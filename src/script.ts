import * as Tone from "tone";

const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const freqRange = document.querySelector("#freq") as HTMLInputElement;
const volRange = document.querySelector("#vol") as HTMLInputElement;

setupGenerator(0.15, 10);

interface Generator {
  oscillator: Tone.Oscillator;
  volume: Tone.Gain;
}

function CreateGenerator(vol: number, freq: number): Generator {
  const generator = {
    oscillator: new Tone.Oscillator({ frequency: freq, type: "sine" }),
    volume: new Tone.Gain(vol).toDestination(),
  };

  generator.oscillator.connect(generator.volume);

  return generator;
}

export default function setupGenerator(vol: number, freq: number) {
  const generator = CreateGenerator(vol, freq);
  startEventListeners(generator);

  setTimeout(() => {
    start(generator);
  }, 200);
}

function startEventListeners(generator: Generator) {
  startBtn.addEventListener("click", () => start(generator));
  stopBtn.addEventListener("click", () => stop(generator));
  freqRange.addEventListener("change", () => {
    return freqChange(generator, parseFloat(freqRange.value));
  });
  volRange.addEventListener("change", () =>
    volChange(generator, parseFloat(volRange.value))
  );
}

function start(generator: Generator) {
  generator.oscillator.start();
}

function stop(generator: Generator) {
  generator.oscillator.stop();
}

function freqChange(generator: Generator, freq: number) {
  generator.oscillator.frequency.value = freq;
}

function volChange(generator: Generator, vol: number) {
  generator.volume.gain.value = vol;
}
