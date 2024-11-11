// components/VUMeter.tsx
"use client";

import React, { useEffect, useRef } from "react";

const VUMeter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    let audioContext: AudioContext;
    let microphone: MediaStreamAudioSourceNode;

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        microphone.connect(analyser);
        analyserRef.current = analyser;
        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        draw();
      } catch (err) {
        console.error("Error accessing microphone for VU Meter:", err);
      }
    };

    const draw = () => {
      if (!analyserRef.current || !canvasRef.current || !dataArrayRef.current)
        return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const analyser = analyserRef.current;
      const dataArray = dataArrayRef.current;

      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      const renderFrame = () => {
        animationRef.current = requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          barHeight = dataArray[i] / 2;

          ctx.fillStyle = `rgba(0, 123, 255, ${dataArray[i] / 255})`;
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      };

      renderFrame();
    };

    initAudio();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (microphone) {
        microphone.disconnect();
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={"100%"}
      height={50}
      className="absolute bottom-0 right-0 mb-4 mr-4 bg-transparent pointer-events-none w-[100%] max-h-[100px] mx-auto"
      style={{ zIndex: 10 }}
    />
  );
};

export default VUMeter;
