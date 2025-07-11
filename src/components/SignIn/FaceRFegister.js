// FaceRegister.js
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function FaceRegister() {
    const videoRef = useRef(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadModels();
        startVideo();
    }, []);

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then((stream) => videoRef.current.srcObject = stream)
            .catch(console.error);
    };

    const captureFace = async () => {
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

        if (!detections) {
            setMessage('No face detected. Try again.');
            return;
        }

        const descriptor = Array.from(detections.descriptor);
        localStorage.setItem('face_descriptor', JSON.stringify(descriptor));
        setMessage('Face registered successfully!');
    };

    return (
        <div>
            <h3>Face Register</h3>
            <video ref={videoRef} autoPlay width="320" height="240" />
            <button onClick={captureFace}>Register Face</button>
            <p>{message}</p>
        </div>
    );
}

export default FaceRegister;
