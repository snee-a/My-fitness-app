// posture.js (Web Worker)

onmessage = function (e) {
  const keypoints = e.data;
  if (!keypoints || keypoints.length < 1) return;

  const getAngle = (a, b, c) => {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const cb = { x: b.x - c.x, y: b.y - c.y };
    const dot = ab.x * cb.x + ab.y * cb.y;
    const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);
    return Math.acos(dot / (magAB * magCB)) * (180 / Math.PI);
  };

  const getKeypoint = (name) =>
    keypoints.find((k) => k.name === name || k.part === name);

  const leftShoulder = getKeypoint("left_shoulder");
  const rightShoulder = getKeypoint("right_shoulder");
  const leftHip = getKeypoint("left_hip");
  const rightHip = getKeypoint("right_hip");
  const leftEar = getKeypoint("left_ear");
  const leftEye = getKeypoint("left_eye");
  const leftKnee = getKeypoint("left_knee");

  const messages = [];

  if (leftShoulder && leftHip && leftKnee) {
    const torsoAngle = getAngle(leftShoulder, leftHip, leftKnee);
    if (torsoAngle < 160) messages.push("Swayback detected");
    else if (torsoAngle > 175) messages.push("Flat back posture suspected");
  }

  if (leftShoulder && leftHip && leftEar) {
    const backAngle = getAngle(leftEar, leftShoulder, leftHip);
    if (backAngle < 150) messages.push("Kyphosis detected");
  }

  if (leftEar && leftShoulder) {
    if (leftEar.x > leftShoulder.x + 40)
      messages.push("Forward head posture detected");
  }

  if (leftShoulder && rightShoulder) {
    const shoulderSlope = Math.abs(leftShoulder.y - rightShoulder.y);
    if (shoulderSlope > 30) messages.push("Uneven shoulders");
  }

  if (messages.length === 0) messages.push("Good posture detected!");

  postMessage(messages);
};
