"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useParams } from "next/navigation";

export default function VideoStreamPage() {
    const params = useParams<{ videoId: string }>();
    const videoId = params.videoId;
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoId && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(`http://localhost:3000/outputs/${videoId}/master.m3u8`);
            hls.attachMedia(videoRef.current!);
        }
    }, [videoId]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-8">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Streaming Video ID: {videoId}</h2>
                    <video 
                        controls
                        className="rounded-lg border border-gray-300"
                        width={'100%'}
                        src={'http://localhost:3000/api/v1/videos/stream/' + videoId}
                        ref={videoRef}
                    />
                </div>
            </div>
        </div>
    )
}