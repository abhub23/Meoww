'use client';

import { useRef, useState, useEffect, type FC } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Repeat, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  src: string[];
  title: string[];
}

export const AudioPlayerCard: FC<AudioPlayerProps> = ({ src, title }) => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isLoop, setIsLoop] = useState(false);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = (volume[0] as number) / 100;
    }
  }, [volume]);

  // Sync loop state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLoop;
    }
  }, [isLoop]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const playTrack = async (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    // If the same track is clicked, toggle pause/play
    if (currentTrack === index) {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } else {
      setCurrentTrack(index);

      audio.src = src[index] as string;
      await audio.play();
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="mb-3 flex items-center justify-center">
        <div className="relative flex items-center gap-2">
          <Button
            variant="player-ghost"
            size="icon"
            className={`h-10 w-10 cursor-pointer ${showVolumeBar ? 'text-music-primary' : 'text-muted-foreground'}`}
            onClick={() => setShowVolumeBar(!showVolumeBar)}
          >
            <Volume2 className="h-5 w-5" />
          </Button>
          <Button
            variant="player-ghost"
            size="icon"
            className={`h-10 w-10 cursor-pointer ${isLoop ? 'text-music-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsLoop(!isLoop)}
          >
            <Repeat className="h-5 w-5" />
          </Button>

          {showVolumeBar && (
            <div className="absolute top-8 right-0 z-10 w-40 rounded-lg border border-white/10 bg-black/5 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Card className="mt-8 overflow-hidden border-white/10 bg-black/5 backdrop-blur-xl">
        <div className="space-y-1 p-2">
          {src.map((_, idx) => (
            <div
              key={idx}
              className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-[5px] transition-all duration-300 hover:bg-white/5"
              onClick={() => playTrack(idx)}
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="player-ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    playTrack(idx);
                  }}
                >
                  {currentTrack === idx && isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="ml-0.5 h-4 w-4" />
                  )}
                </Button>

                <h3
                  className={`font-medium transition-colors ${
                    currentTrack === idx && isPlaying ? 'text-fuchsia-700' : 'text-foreground'
                  }`}
                >
                  {title[idx]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Single audio element */}
      <audio ref={audioRef} />
    </div>
  );
};
