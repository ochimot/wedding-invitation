'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/music/wedding-song.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

  const tryAutoplay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay blocked by browser - user needs to click play
        console.log('Autoplay blocked. Click play button to start music.');
      }
    }
  };

    // Add event listeners
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
      // Try to autoplay when loaded
      tryAutoplay();
    });

    audioRef.current.addEventListener('error', (e) => {
      console.error('Error loading audio:', e);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);


  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <button
        onClick={togglePlay}
        disabled={!isLoaded}
        className="bg-white/80 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={!isLoaded ? 'Loading music...' : (isPlaying ? 'Pause music' : 'Play music')}
      >
        {isPlaying ? <FaPause className="text-pink-600" /> : <FaPlay className="text-pink-600" />}
      </button>
      <button
        onClick={toggleMute}
        disabled={!isLoaded}
        className="bg-white/80 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <FaVolumeMute className="text-pink-600" /> : <FaVolumeUp className="text-pink-600" />}
      </button>
    </div>
  );
}
