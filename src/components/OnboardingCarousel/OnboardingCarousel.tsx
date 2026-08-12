import { useState } from 'react'
import { MaterialIcon } from '@/components/Loader/MaterialIcon/MaterialIcon'
import { ONBOARDING_SLIDES } from '@/core/constants/onboardingSlides'

interface OnboardingCarouselProps {
  onFinish: () => void
}

export function OnboardingCarousel({ onFinish }: OnboardingCarouselProps) {
  const [index, setIndex] = useState(0)
  const isLastSlide = index === ONBOARDING_SLIDES.length - 1
  const slide = ONBOARDING_SLIDES[index]

  return (
    <div className="flex min-h-screen flex-col bg-surface px-6 pb-10 pt-6 text-on-surface">
      <div className="flex justify-end">
        {!isLastSlide && (
          <button className="text-sm font-semibold text-on-surface-variant" onClick={onFinish} type="button">
            Passer
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary-container/10">
          <MaterialIcon className="text-6xl text-primary" name={slide.icon} />
        </div>

        <div className="space-y-3 px-4">
          <h2 className="font-headline text-2xl font-bold text-on-surface">{slide.title}</h2>
          <p className="text-sm text-on-surface-variant">{slide.description}</p>
        </div>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {ONBOARDING_SLIDES.map((_, dotIndex) => (
          <button
            key={dotIndex}
            aria-label={`Étape ${dotIndex + 1}`}
            className={`h-2 rounded-full transition-all ${
              dotIndex === index ? 'w-6 bg-primary' : 'w-2 bg-surface-container-high'
            }`}
            onClick={() => setIndex(dotIndex)}
            type="button"
          />
        ))}
      </div>

      {!isLastSlide ? (
        <button
          className="action-gradient w-full rounded-full py-4 font-headline text-lg font-bold text-white transition-transform active:scale-[0.98]"
          onClick={() => setIndex((prev) => prev + 1)}
          type="button"
        >
          Suivant
        </button>
      ) : (
        <button
          className="action-gradient w-full rounded-full py-4 font-headline text-lg font-bold text-white transition-transform active:scale-[0.98]"
          onClick={onFinish}
          type="button"
        >
          Commencer
        </button>
      )}
    </div>
  )
}