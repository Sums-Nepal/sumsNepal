"use client";

import { useRef, useState } from "react";
import { Play, Pause, X } from "lucide-react";
import { stats, videos } from "./AcademiaInActionDatas";

const AcademiaInAction = () => {
  const mainVideo = videos.find((video) => video.large) || videos[0];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoOnlyMode, setVideoOnlyMode] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleVideoOnlyMode = () => {
    setVideoOnlyMode((prev) => !prev);
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section className="relative flex items-center justify-center min-h-[700px] sm:min-h-[800px] px-4 sm:px-6 overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={mainVideo.src}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        autoPlay
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Video Only Mode Button */}
      {!videoOnlyMode && (
        <button
          onClick={toggleVideoOnlyMode}
          className="absolute top-6 right-6 z-20 px-4 py-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300"
        >
          Watch Video Only
        </button>
      )}

      {/* Close Video Only Mode */}
      {videoOnlyMode && (
        <button
          onClick={toggleVideoOnlyMode}
          className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-transform duration-300 shadow-lg"
        >
          <X className="w-5 h-5 text-black" />
        </button>
      )}

      {/* Content */}
      {!videoOnlyMode && (
        <div className="relative z-10 max-w-5xl text-center text-white">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-orange-400">{mainVideo.title}</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12">
            {mainVideo.description}
          </p>

          {/* Play/Pause Button */}
          <button
            onClick={toggleVideo}
            className="w-24 h-24 sm:w-28 sm:h-28 bg-white/90 text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
          >
            {isPlaying ? <Pause className="w-10 h-10 sm:w-12 sm:h-12" /> : <Play className="w-10 h-10 sm:w-12 sm:h-12" />}
          </button>

          {/* Stats Section */}
          <div className="mt-20 bg-white/90 rounded-3xl p-10 border border-white/30 shadow-2xl grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                  {stat.count}
                </div>
                <div className="text-gray-800 text-sm sm:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Play/Pause Button in Video Only Mode */}
      {videoOnlyMode && (
        <button
          onClick={toggleVideo}
          className="absolute bottom-12 z-20 w-24 h-24 sm:w-28 sm:h-28 bg-white/90 text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
        >
          {isPlaying ? <Pause className="w-10 h-10 sm:w-12 sm:h-12" /> : <Play className="w-10 h-10 sm:w-12 sm:h-12" />}
        </button>
      )}
    </section>
  );
};

export default AcademiaInAction;
