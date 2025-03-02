import axios from 'axios';

type SpeakText = string;

export const useSpeechSynthesis = () => {
  const speakText = async (text: SpeakText) => {
    if (!text.trim()) return;

    try {
      const response = await axios.post('http://localhost:5000/synthesize', {
        text,
      });

      const { audioContent } = response.data;
      if (!audioContent) {
        console.error('No audio content in response.');
        return;
      }

      const audioUrl = `data:audio/mp3;base64,${audioContent}`;
      const audio = new Audio(audioUrl);
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
    }
  };

  return { speakText };
};
