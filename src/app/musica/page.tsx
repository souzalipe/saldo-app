"use client";

import { useState, useRef, useEffect } from "react";

export default function MusicaPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Configurações da música — edite aqui
  const musicConfig = {
    title: "Nossa Música",
    artist: "Para Você",
    album: "Com Amor",
    // Coloque o caminho da sua música em /public/musica.mp3
    audioSrc: "/musica.mp3",
    // Coloque sua foto em /public/capa.jpg
    coverImage: "/capa.jpg",
    message: "Cada nota dessa música me faz pensar em você ♥",
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };
    const updateDuration = () => {
      setDuration(audio.duration);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const v = parseFloat(e.target.value);
    setVolume(v);
    audio.volume = v;
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setProgress(0);
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <audio ref={audioRef} src={musicConfig.audioSrc} preload="metadata" />

      <div className="w-full max-w-sm">
        {/* Header Spotify */}
        <div className="flex items-center justify-between mb-8 px-1">
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.957 2.793a1 1 0 0 1 0 1.414L8.164 12l7.793 7.793a1 1 0 1 1-1.414 1.414L5.336 12l9.207-9.207a1 1 0 0 1 1.414 0z" />
            </svg>
          </button>
          <span className="text-white text-sm font-semibold tracking-widest uppercase">
            Tocando agora
          </span>
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>

        {/* Capa do álbum */}
        <div className="relative mb-8">
          <div
            className={`w-full aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
              isPlaying ? "shadow-[#1db954]/20 scale-[1.02]" : ""
            }`}
            style={{ boxShadow: isPlaying ? "0 20px 60px rgba(29,185,84,0.3)" : "0 20px 40px rgba(0,0,0,0.6)" }}
          >
            <img
              src={musicConfig.coverImage}
              alt="Capa"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.style.background =
                  "linear-gradient(135deg, #1db954 0%, #191414 100%)";
              }}
            />
            {/* Overlay gradiente quando não carrega a imagem */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1db954]/30 to-[#191414]/80 opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-2xl">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="white" opacity="0.8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            </div>
          </div>

          {/* Vinyl spin animation quando tocando */}
          {isPlaying && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8">
              <div className="w-full h-full rounded-full bg-[#1db954] animate-ping opacity-20" />
            </div>
          )}
        </div>

        {/* Info da música */}
        <div className="flex items-start justify-between mb-6 px-1">
          <div className="flex-1 min-w-0">
            <h1 className="text-white text-2xl font-bold truncate">
              {musicConfig.title}
            </h1>
            <p className="text-[#b3b3b3] text-base mt-0.5 truncate">
              {musicConfig.artist}
            </p>
            {musicConfig.message && (
              <p className="text-[#1db954] text-xs mt-2 italic leading-relaxed">
                {musicConfig.message}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`ml-4 mt-1 transition-all duration-200 ${
              isLiked ? "text-[#1db954] scale-110" : "text-[#b3b3b3] hover:text-white"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Barra de progresso */}
        <div className="mb-4 px-1">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={seek}
              className="w-full h-1 appearance-none cursor-pointer rounded-full"
              style={{
                background: `linear-gradient(to right, #1db954 ${progressPercent}%, #535353 ${progressPercent}%)`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[#b3b3b3] text-xs">{formatTime(progress)}</span>
            <span className="text-[#b3b3b3] text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between px-2 mb-6">
          {/* Shuffle */}
          <button className="text-[#b3b3b3] hover:text-white transition-colors p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
            </svg>
          </button>

          {/* Voltar */}
          <button
            onClick={restart}
            className="text-[#b3b3b3] hover:text-white transition-colors p-2"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="bg-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
          >
            {isPlaying ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#121212">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#121212">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Avançar */}
          <button className="text-[#b3b3b3] hover:text-white transition-colors p-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
            </svg>
          </button>

          {/* Repeat */}
          <button className="text-[#b3b3b3] hover:text-white transition-colors p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
            </svg>
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 px-1">
          <button onClick={toggleMute} className="text-[#b3b3b3] hover:text-white transition-colors flex-shrink-0">
            {isMuted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : volume < 0.5 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.5 12A4.5 4.5 0 0 0 16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={changeVolume}
            className="flex-1 h-1 appearance-none cursor-pointer rounded-full"
            style={{
              background: `linear-gradient(to right, #b3b3b3 ${(isMuted ? 0 : volume) * 100}%, #535353 ${(isMuted ? 0 : volume) * 100}%)`,
            }}
          />
        </div>

        {/* Album info footer */}
        <div className="mt-8 text-center">
          <p className="text-[#535353] text-xs">{musicConfig.album}</p>
        </div>
      </div>

      {/* Estilos do range input */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
