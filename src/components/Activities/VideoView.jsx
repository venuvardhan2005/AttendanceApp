import React from 'react';

export function VideoView({ videoUrl }) {
  return (
    <div>
      <div className="aspect-w-16 aspect-h-9">
        <iframe 
          src={videoUrl} 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}
