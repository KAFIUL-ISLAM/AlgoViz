// FaceLogin.js
import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function FaceLogin() {
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

    const verifyFace = async () => {
        const storedDescriptor = localStorage.getItem('face_descriptor');
        if (!storedDescriptor) {
            setMessage('No face registered yet.');
            return;
        }

        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

        if (!detections) {
            setMessage('No face detected. Try again.');
            return;
        }

        const descriptorFromCamera = detections.descriptor;
        const storedDescriptorArray = new Float32Array(JSON.parse(storedDescriptor));

        const distance = faceapi.euclideanDistance(descriptorFromCamera, storedDescriptorArray);

        if (distance < 0.6) {
            setMessage('Face match! Login successful.');
        } else {
            setMessage('Face mismatch. Access denied.');
        }
    };

    return (
        <div>
            <h3>Face Login</h3>
            <video ref={videoRef} autoPlay width="320" height="240" />
            <button onClick={verifyFace}>Login with Face</button>
            <p>{message}</p>
        </div>
    );
}

export default FaceLogin;
