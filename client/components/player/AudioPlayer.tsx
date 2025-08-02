"use client"

import { Button } from "@/client/components/ui/button"
import { Slider } from "@/client/components/ui/slider"
import { Card } from "@/client/components/ui/card"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface AudioPlayerProps {
  src: string
  title?: string
  artist?: string
  className?: string
}

export default function AudioPlayer({
  src,
  title = "Audio Track",
  artist = "Unknown Artist",
  className = "",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [src])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || isLoading) return

    setIsLoading(true)

    try {
      if (audio.paused) {
        await audio.play()
      } else {
        audio.pause()
      }
    } catch (error) {
      console.error("Audio playback error:", error)
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleLoop = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = !isLooping
    setIsLooping(!isLooping)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = value[0]
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0]
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card
      className={`w-full max-w-md mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg border-0 ${className}`}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Track Info */}
      <div className="text-center mb-6">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 truncate mb-1">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={handleSeek} className="w-full" />
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleLoop}
          className={`w-10 h-10 rounded-full transition-all border-2 ${
            isLooping
              ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
          }`}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          onClick={togglePlay}
          size="icon"
          disabled={isLoading}
          className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white shadow-lg transition-all hover:scale-105 disabled:hover:scale-100 border-0"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-7 h-7 fill-current" />
          ) : (
            <Play className="w-7 h-7 fill-current ml-1" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleMute}
          className="w-10 h-10 rounded-full transition-all border-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <VolumeX className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.1}
          onValueChange={handleVolumeChange}
          className="flex-1"
        />
        <Volume2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
      </div>
    </Card>
  )
}
