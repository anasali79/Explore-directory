'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GalleryLightboxProps {
  images: string[]
  profileName: string
}

export function GalleryLightbox({ images, profileName }: GalleryLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleSelect = (e: CustomEvent) => {
      setCurrentIndex(e.detail)
      setIsOpen(true)
    }
    document.addEventListener('gallery-select', handleSelect as EventListener)
    return () => document.removeEventListener('gallery-select', handleSelect as EventListener)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') setIsOpen(false)
      if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev + 1) % images.length)
    }
    document.addEventListener('keydown', handleKeyDown)
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, currentIndex, images.length, mounted])

  if (!mounted || images.length <= 1) return null

  const currentImage = images[currentIndex]

  return (
    <div className={`lightbox-overlay ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label={`Photo gallery for ${profileName}`}>
      {isOpen && (
        <>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => setCurrentIndex(prev => (prev - 1 + images.length) % images.length)}
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="lightbox-image-wrapper">
              <Image
                src={currentImage}
                alt={`${profileName} - Photo ${currentIndex + 1} of ${images.length}`}
                fill
                priority
                sizes="90vw"
                className="lightbox-image"
              />
            </div>

            <button
              className="lightbox-nav lightbox-next"
              onClick={() => setCurrentIndex(prev => (prev + 1) % images.length)}
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            <div className="lightbox-counter" aria-live="polite">
              {currentIndex + 1} / {images.length}
            </div>

            <div className="lightbox-thumbnails" role="tablist" aria-label="Thumbnail navigation">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`lightbox-thumb ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="56px"
                    className="lightbox-thumb-image"
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}