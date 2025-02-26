import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Howl } from "howler";

// Load Bollywood song (Malang Sajna)
const song = new Howl({
  src: ["https://pagalfree.com/musics/128-Malang Sajna - Sachet Tandon 128 Kbps.mp3"],
  volume: 0.7,
  loop: false, // Ensure it stops after completion
});

const surprises = [
  "🎭 Reality is shifting...",
  "🐱 Schrödinger’s cat appears!",
  "🌌 A glitch in the matrix detected...",
  "🎊 You just won...nothing!",
  "🔮 A magical force is watching you...",
  "🛸 An alien just waved at you!",
];

const getRandomSurprise = () => surprises[Math.floor(Math.random() * surprises.length)];

export default function SurpriseMePage() {
  const [surprise, setSurprise] = useState("Click to reveal a surprise! 🤯");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCat, setShowCat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songDuration, setSongDuration] = useState(3000); // Default fallback duration

  useEffect(() => {
    song.on("load", () => {
      setSongDuration(song.duration() * 1000); // Convert seconds to milliseconds
    });

    song.on("end", () => {
      setShowConfetti(false); // Stop confetti when song ends
      setIsPlaying(false);
    });

    return () => song.stop(); // Stop music when component unmounts
  }, []);

  const handleClick = () => {
    setSurprise(getRandomSurprise());
    setShowConfetti(true);
    setShowCat(Math.random() > 0.5); // Show cat 50% of the time

    if (!isPlaying) {
      song.play();
      setIsPlaying(true);
    }

    setTimeout(() => setShowConfetti(false), songDuration);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-screen text-center"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Gradient text effect */}
      <motion.h1
        className="text-5xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: "radial-gradient(circle, #ffdf6b, #ff6b6b, #6b5b95)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        🎉 Surprise Me! 🎉
      </motion.h1>

      <motion.p
        className="text-2xl font-semibold mt-4 p-4 rounded-lg shadow-lg bg-opacity-50 max-w-2xl"
        key={surprise}
        animate={{ opacity: [0, 1], y: [-10, 0], scale: [0.9, 1] }}
        transition={{ duration: 0.7 }}
      >
        {surprise}
      </motion.p>

      {showCat && (
        <motion.img
          src="https://c.tenor.com/bdzv_rYZw7kAAAAC/space-cat.gif"
          alt="Floating Cat"
          className="mt-4 w-40 h-40"
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}

      <motion.button
        onClick={handleClick}
        className="absolute bottom-0 left-0 w-full py-6 text-white text-2xl font-bold bg-gradient-to-r from-pink-500 to-indigo-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Surprise Me 🎆
      </motion.button>
    </motion.div>
  );
}
