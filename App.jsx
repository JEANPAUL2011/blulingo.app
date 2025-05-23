
import React, { useState } from 'react';

const songs = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    lyrics: [
      "I found a love for me",
      "Darling just dive right in and follow my lead"
    ]
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    lyrics: [
      "There's a fire starting in my heart",
      "Reaching a fever pitch and it's bringing me out the dark"
    ]
  },
  {
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    lyrics: [
      "I do the same thing I told you that I never would",
      "I told you I'd change, even when I knew I never could"
    ]
  }
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setTranscript('');
    setFeedback('');
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setTranscript(spoken);
      checkPronunciation(spoken);
    };
  };

  const checkPronunciation = (spoken) => {
    if (!selectedSong) return;
    const original = selectedSong.lyrics.join(" ").toLowerCase();
    const spokenLower = spoken.toLowerCase();
    if (spokenLower.includes(original)) {
      setFeedback('✅ ¡Buena pronunciación!');
    } else {
      setFeedback('❌ Intenta pronunciarlo mejor.');
    }
  };

  if (!started) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>🎵 Bienvenido a Blulingo</h1>
        <p>Aprende pronunciación en inglés con tus canciones favoritas</p>
        <button onClick={() => setStarted(true)} style={{ padding: '10px 20px', fontSize: '16px' }}>Comenzar</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🎤 Aprende pronunciación con canciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Canciones populares</h2>
          <ul className="space-y-2">
            {songs.map((song, i) => (
              <li key={i}>
                <button
                  onClick={() => handleSongSelect(song)}
                  className="w-full text-left p-2 bg-blue-100 hover:bg-blue-200 rounded"
                >
                  {song.title} - {song.artist}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow">
          {selectedSong ? (
            <>
              <h2 className="text-xl font-semibold mb-2">{selectedSong.title}</h2>
              {selectedSong.lyrics.map((line, i) => (
                <p key={i} className="mb-1">🎶 {line}</p>
              ))}
              <button
                onClick={startListening}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              >
                🎙️ Pronunciar
              </button>
              <p className="mt-4 text-sm text-gray-700">Tu voz: {transcript}</p>
              <p className="mt-2 text-lg">{feedback}</p>
            </>
          ) : (
            <p>Selecciona una canción para comenzar</p>
          )}
        </div>
      </div>
    </div>
  );
}
