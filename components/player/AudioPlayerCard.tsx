'use client';

import { useRef, useState, useEffect, type FC } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Repeat, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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
      audioRef.current.volume = volume[0] as number / 100;
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

      audio.src = src[index] as string
      await audio.play();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      
      <div className="mb-3 flex items-center justify-center">
        <div className="flex gap-2 items-center relative">
          <Button
            variant="player-ghost"
            size="icon"
            className={`w-10 h-10 cursor-pointer ${showVolumeBar ? 'text-music-primary' : 'text-muted-foreground'}`}
            onClick={() => setShowVolumeBar(!showVolumeBar)}
          >
            <Volume2 className="w-5 h-5" />
          </Button>
          <Button
            variant="player-ghost"
            size="icon"
            className={`w-10 h-10 cursor-pointer ${isLoop ? 'text-music-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsLoop(!isLoop)}
          >
            <Repeat className="w-5 h-5" />
          </Button>

          {showVolumeBar && (
            <div className="absolute top-8 z-10 right-0 bg-black/5 backdrop-blur-md border border-white/10 rounded-lg p-4 w-40">
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

      <Card className="bg-black/5 backdrop-blur-xl mt-8 border-white/10 overflow-hidden">
        <div className="p-2 space-y-1">
          {src.map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-[5px] rounded-lg hover:bg-white/5 transition-all duration-300 cursor-pointer"
              onClick={() => playTrack(idx)}
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="player-ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    playTrack(idx);
                  }}
                >
                  {currentTrack === idx && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>

                <h3
                  className={`font-medium transition-colors ${
                    (currentTrack === idx && isPlaying) ? 'text-fuchsia-700' : 'text-foreground'
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
