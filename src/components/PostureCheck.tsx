import React, { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
const PostureCheck = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [issues, setIssues] = useState<string[]>([]);
  useEffect(() => {
    let detector: poseDetection.PoseDetector;
    let animationId: number;
    const worker = new Worker("/posture.js");
    worker.onmessage = (e) => {
      setIssues(e.data);
    };
    const runPose = async () => {
      await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, {
        modelType: "singlepose",
      }).then((det) => (detector = det));
      if (!videoRef.current) return;
      const video = videoRef.current;
      video.width = 640;
      video.height = 480;
      const detect = async () => {
        if (video.readyState === 4 && detector) {
          const poses = await detector.estimatePoses(video);
          const ctx = canvasRef.current?.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, video.width, video.height);
            poses[0]?.keypoints.forEach((k) => {
              if (k.score > 0.5) {
                ctx.beginPath();
                ctx.arc(k.x, k.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "aqua";
                ctx.fill();
              }
            });
          }
          if (poses[0]) worker.postMessage(poses[0].keypoints);
        }
        animationId = requestAnimationFrame(detect);
      };
      detect();
    };

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    };
    startCamera();
    runPose();
    return () => {
      cancelAnimationFrame(animationId);
      worker.terminate();
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-green-700 my-4">Posture Checker</h1>
      <div className="relative">
        <video ref={videoRef} autoPlay playsInline muted />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          width="640"
          height="480"
        />
      </div>
      <div className="mt-6 p-4 rounded shadow-md bg-white w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Detected Issues:</h2>
        {issues.map((msg, i) => (
          <p key={i} className={msg.includes("Good") ? "text-green-600" : "text-red-600"}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default PostureCheck;
