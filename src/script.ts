import * as Tone from "tone";

const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const freqRange = document.querySelector("#freq") as HTMLInputElement;
const volRange = document.querySelector("#vol") as HTMLInputElement;
const freqText = document.querySelector("#freq-value");
const volText = document.querySelector("#vol-value");

startBtn.addEventListener("click", () => start());
stopBtn.addEventListener("click", () => stop());
freqRange.addEventListener("change", () =>
  freqChange(parseFloat(freqRange.value))
);
volRange.addEventListener("change", () =>
  volChange(parseFloat(volRange.value))
);

const oscillator = new Tone.Oscillator({
  frequency: 10,
  type: "sine",
});

const volume = new Tone.Gain(0.15).toDestination();

oscillator.connect(volume);

setTimeout(() => {
  start();
}, 200);

function start() {
  oscillator.start();
}

function stop() {
  oscillator.stop();
}

function freqChange(freq: number) {
  oscillator.frequency.value = freq;
  freqText.textContent = oscillator.frequency.value.toString();
}

function volChange(vol: number) {
  volume.gain.value = vol;
  volText.textContent = volume.gain.value.toString();
}
