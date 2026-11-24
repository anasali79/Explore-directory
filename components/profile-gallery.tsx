'use client'

import Image from 'next/image'
import { useState, useRef, TouchEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProfileGalleryProps {
  images: string[]
  profileName: string
  alt?: string
}

export function ProfileGallery({ images, profileName }: ProfileGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const minSwipeDistance = 40

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const onTouchStart = (e: TouchEvent) => {
    touchEndX.current = null
    touchStartX.current = e.targetTouches[0].clientX
  }

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  if (!images || images.length === 0) return null

  return (
    <div className="profile-gallery-container">
      {/* Main Image Slider with Touch Swipe & Next/Prev */}
      <div 
        className="profile-gallery-slider"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="gallery-slide-wrapper">
          <Image
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${profileName} - Photo ${currentIndex + 1}`}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 550px"
            className="gallery-slide-img"
          />
        </div>

        {/* Counter Badge */}
        {images.length > 1 && (
          <div className="gallery-counter-badge">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-arrow-btn gallery-arrow-prev"
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="gallery-arrow-btn gallery-arrow-next"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </>
        )}

        {/* Indicator Dots */}
        {images.length > 1 && (
          <div className="gallery-slider-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`gallery-slider-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                }}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Inline Thumbnail Selector (Switches image in place, no separate window) */}
      {images.length > 1 && (
        <div className="gallery-inline-thumbs">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`gallery-inline-thumb ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Switch to photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="100px"
                className="gallery-thumb-pic"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
