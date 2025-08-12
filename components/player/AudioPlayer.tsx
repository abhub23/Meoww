'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title = 'Audio Track' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;

    setIsLoading(true);

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = value[0];
    /** @ts-ignore */
    audio.currentTime = newTime;
    /** @ts-ignore */
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = value[0];
    /** @ts-ignore */

    audio.volume = newVolume;
    /** @ts-ignore */
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card
      className={`mx-auto w-full border-0 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg lg:max-w-[360px] dark:from-slate-900 dark:to-slate-800`}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="mb-5 text-center">
        <h4 className="mb-1 truncate text-[14px] font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h4>
      </div>

      <Slider
        value={[currentTime]}
        max={duration || 100}
        step={1}
        onValueChange={handleSeek}
        className="w-full"
      />
      <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="mb-4 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleLoop}
          className={`h-10 w-10 rounded-full border-2 transition-all ${
            isLooping
              ? 'border-red-200 bg-red-200 text-white hover:border-red-300 hover:bg-red-200'
              : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700'
          }`}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          onClick={togglePlay}
          size="icon"
          disabled={isLoading}
          className="h-10 w-10 rounded-full border-0 bg-red-200 text-white shadow-lg transition-all hover:scale-105 hover:bg-red-300 disabled:bg-red-200 disabled:hover:scale-100"
        >
          {isLoading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="fill-current lg:h-5 lg:w-5" />
          ) : (
            <Play className="ml-[2px] fill-current lg:h-5 lg:w-5" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="h-10 w-10 rounded-full border-2 border-slate-200 bg-white transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <VolumeX className="h-4 w-4 flex-shrink-0 text-slate-400" />
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.1}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
        <Volume2 className="h-4 w-4 flex-shrink-0 text-slate-400" />
      </div>
    </Card>
  );
}
