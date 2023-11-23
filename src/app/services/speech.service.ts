import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = 'en-US';

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang === 'en-US');

    utterance.voice = englishVoice || null;

    utterance.rate = 1.0;

    this.synth.speak(utterance);
  }
}
