import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMusic,
  FiUsers,
  FiPlay,
  FiPause,
  FiClock,
  FiAward,
  FiYoutube,
  FiDisc,
  FiHeart,
} from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

const releaseDate = new Date("2025-12-01T00:00:00");
const MotionLink = motion(Link);

const taglines = [
  { text: "Master the rhythm, conquer the leaderboards", highlight: [3, 8] },
  { text: "Where classical meets digital virtuosity", highlight: [5, 7] },
  { text: "Your fingers, the ultimate instrument", highlight: [3, 7] },
  { text: "Redefining musical precision since 2024", highlight: [0, 10] },
];

const artists = [
  { name: "Ludwig van Beethoven", era: "Classical", piece: "Moonlight Sonata" },
  { name: "Hans Zimmer", era: "Modern", piece: "Time" },
  { name: "Frédéric Chopin", era: "Romantic", piece: "Nocturne Op.9 No.2" },
  { name: "Yuki Kajiura", era: "Modern", piece: "Liminality" },
  {
    name: "Wolfgang Amadeus Mozart",
    era: "Classical",
    piece: "Eine kleine Nachtmusik",
  },
  { name: "Nobuo Uematsu", era: "Modern", piece: "One-Winged Angel" },
  { name: "Hiroyuki Sawano", era: "Modern", piece: "YouSeeBigGirl" },
];

const developers = [
  { name: "NxT", role: "Lead Programmer" },
  { name: "Faizan", role: "2nd Lead Programmer" },
  { name: "Haru", role: "Music Director" },
  { name: "NxT", role: "Assistant Music Director" },
  { name: "Harry", role: "UI/UX Designer" },
  { name: "Haru", role: "Assistant UI/UX Designer" },
  { name: "Bankai", role: "QA & Community Manager" },
  { name: "Harry", role: "QA Tester" },
  { name: "ABCDE", role: "QA Tester" },
];

const midiTracks = [
  {
    title: "Prelude in C",
    artist: "Bach",
    duration: "2:31",
    src: "/J.S. Bach - Prelude in C Major - Rousseau.mp3",
  },
  {
    title: "Fur Elise",
    artist: "Beethoven",
    duration: "2:43",
    src: "/Beethoven - Für Elise - Rousseau.mp3",
  },
  {
    title: "River Flows In You",
    artist: "Yiruma",
    duration: "3:10",
    src: "/Yiruma - River Flows in You - Rousseau.mp3",
  },
  {
    title: "Nocturne Op.9 No.2",
    artist: "Chopin",
    duration: "3:47",
    src: "/Chopin - Nocturne in E Flat Major (Op. 9 No. 2) - Rousseau.mp3",
  },
  {
    title: "Clair de Lune",
    artist: "Debussy",
    duration: "4:01",
    src: "/Debussy - Clair de Lune - Rousseau.mp3",
  },
  {
    title: "Canon in D",
    artist: "Pachelbel",
    duration: "4:21",
    src: "/Canon in D - Pachelbel - Kassia.mp3",
  },
  {
    title: "YouSeeBigGirl",
    artist: "SawanoHiroyuki",
    duration: "6:34",
    src: "/YouSeeBIGGIRL _ Apple Seed - Attack on Titan OST [Piano] - Animenz Piano Sheets.mp3",
  },
];

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [typingIndex, setTypingIndex] = useState(0);
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState({}); // holds src→duration

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = releaseDate - now;
      if (diff <= 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    const typingInterval = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % taglines.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDurations((d) => ({ ...d, [audio.src]: audio.duration }));
    };
    const onTime = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnd = () => {
      setCurrentTrack(null);
      setProgress(0);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggleAudio = (src) => {
    if (currentTrack === src) {
      // Pause current
      audioRef.current.pause();
      setCurrentTrack(null);
    } else {
      // Switch to new src
      const audio = audioRef.current;
      audio.pause();
      audio.src = src;
      audio.load();
      audio.play().catch(console.error);
      setCurrentTrack(src);
    }
  };

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const pct = e.nativeEvent.offsetX / e.target.clientWidth;
    audio.currentTime = pct * audio.duration;
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
        src="/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-4 py-24 text-center space-y-8">
        {/* Animated Tagline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={taglines[typingIndex].text}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-6">
              {taglines[typingIndex].text.split(" ").map((word, index) => {
                const [start, end] = taglines[typingIndex].highlight;
                const highlighted = index >= start && index <= end;
                return (
                  <span
                    key={index}
                    className={`inline-block mr-4 ${
                      highlighted ? "text-teal-400" : "text-gray-300"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Countdown Timer */}
        <h2 className="text-2xl text-center md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4">
          Time left before game release:{" "}
        </h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-3xl w-full px-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="p-4 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-teal-400/20"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent mb-1">
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs sm:text-sm uppercase tracking-widest text-teal-300">
                {unit}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <MotionLink
          to="/beta-signup"
          className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-lg font-semibold text-white rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Join Exclusive Beta
          <FiAward className="ml-2 text-xl group-hover:rotate-12 transition-transform" />
        </MotionLink>
      </div>
      {/* Featured Artists Carousel */}
      <section className="w-full py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-teal-400 mb-12">
            Featuring Masterpieces From Legendary Composers
          </h2>
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1.2}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 2.3,
                spaceBetween: 25,
              },
              768: {
                slidesPerView: 3.2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            className="pb-12"
          >
            {artists.map((artist, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-[260px] flex flex-col justify-between bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-teal-400/20 hover:border-teal-400/40 transition-all"
                >
                  <div>
                    <FiMusic className="text-3xl text-teal-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white line-clamp-2">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-teal-300">{artist.era} Era</p>
                  </div>
                  <p className="text-sm text-gray-400 italic mt-4 line-clamp-2">
                    {artist.piece}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      import {useState} from "react";
      {/* Development Team */}
      <section className="py-20 px-4 bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-emerald-400 mb-12">
            Developers
          </h2>

          {/* Show More Feature */}
          {(() => {
            const isMobile =
              typeof window !== "undefined" && window.innerWidth < 1024;
            const [showAll, setShowAll] = useState(false);
            const visibleDevelopers =
              isMobile && !showAll ? developers.slice(0, 4) : developers;

            return (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {visibleDevelopers.map((dev, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800/70 backdrop-blur-md p-6 rounded-xl border border-teal-400/20 hover:border-teal-400/40 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-teal-400/10 rounded-full">
                          <FiUsers className="text-2xl text-teal-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {dev.name}
                          </h3>
                          <p className="text-sm text-teal-300">{dev.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Toggle Button */}
                {isMobile && developers.length > 4 && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="text-teal-400 hover:underline text-sm font-medium"
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </>
            );
          })()}

          <p className="text-center text-gray-400 mt-8">
            And supported by our incredible community{" "}
            <FiHeart className="inline-block" />
          </p>
        </div>
      </section>
      {/* Interactive MIDI Player Section */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {midiTracks.map((track, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 p-4 rounded-2xl border transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{track.title}</p>
                  <p className="text-sm text-teal-300">{track.artist}</p>
                </div>
                <button
                  onClick={() => toggleAudio(track.src)}
                  className="p-2 bg-teal-400/10 rounded-full"
                >
                  {currentTrack === track.src ? <FiPause /> : <FiPlay />}
                </button>
              </div>

              {/* Progress & Duration */}
              {currentTrack === track.src && (
                <div className="mt-4">
                  <div
                    className="h-2 bg-gray-700 rounded-full cursor-pointer"
                    onClick={(e) => {
                      const pct = e.nativeEvent.offsetX / e.target.clientWidth;
                      audioRef.current.currentTime =
                        pct * audioRef.current.duration;
                    }}
                  >
                    <div
                      className="h-full bg-teal-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>
                      {formatTime(
                        (durations[currentTrack] || 0) * (progress / 100)
                      )}
                    </span>
                    <span>{formatTime(durations[currentTrack] || 0)}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hidden audio element */}
        {/* Hidden audio element managed by React */}
        <audio ref={audioRef} className="hidden" />
      </section>
      {/* Screenshots Gallery */}
      <section className="w-full py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-teal-400 mb-12">
            Gameplay Preview
          </h3>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={30}
            className="pb-12"
          >
            {[...Array(6)].map((_, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative overflow-hidden rounded-2xl aspect-video bg-gray-800 border border-teal-400/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-semibold">
                      Gameplay Preview #{i + 1}
                    </h4>
                    <p className="text-sm text-teal-300">Early Beta Build</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* Community Section */}
      <section className="w-full py-20 bg-gray-950/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FiUsers className="text-4xl text-teal-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Join Our Growing Community
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Connect with 150,000+ passionate musicians and rhythm game
            enthusiasts
          </p>
          <div className="flex justify-center gap-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-discord-blue text-white rounded-full hover:bg-opacity-90 transition-all">
              <FiDisc className="text-xl" />
              Discord Server
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-opacity-90 transition-all">
              <FiYoutube className="text-xl" />
              YouTube Channel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
