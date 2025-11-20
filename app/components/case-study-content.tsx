'use client'

import { useEffect, useRef, useState } from 'react'

interface CaseStudyContentProps {
  content: string
}

export function CaseStudyContent({ content }: CaseStudyContentProps) {
  const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map())
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-image-index') || '0', 10)
            setVisibleImages((prev) => new Set(Array.from(prev).concat([index])))
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px 0px 0px',
      }
    )

    // Use a small delay to ensure refs are populated
    const timer = setTimeout(() => {
      imageRefs.current.forEach((img) => {
        if (img) {
          observer.observe(img)
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      imageRefs.current.forEach((img) => {
        if (img) {
          observer.unobserve(img)
        }
      })
    }
  }, [content])

  const lines = content.split('\n')
  const sections: { type: 'images'; content: string[] }[] = []
  let currentSection: { type: 'images'; content: string[] } | null = null

  lines.forEach((line) => {
    if (line.startsWith('## Project Images')) {
      if (currentSection) sections.push(currentSection)
      currentSection = { type: 'images', content: [] }
    } else if (currentSection && line.trim() && !line.startsWith('#')) {
      currentSection.content.push(line)
    }
  })
  if (currentSection) sections.push(currentSection)

  const imagesSection = sections.find(s => s.type === 'images')

  // Extract images and videos from images section with layout options
  // Format: ![alt](src) or ![alt](src){full} or ![alt](src){2col} or ![alt](src){3col}
  // Video format: [video:youtube:VIDEO_ID] or [video:vimeo:VIDEO_ID] or [video:mp4:/path/to/video.mp4]
  const media: { type: 'image' | 'video'; alt?: string; src?: string; videoId?: string; videoType?: 'youtube' | 'vimeo' | 'mp4'; layout?: 'full' | '2col' | '3col' }[] = []
  if (imagesSection) {
    imagesSection.content.forEach(line => {
      // Check for video format
      const videoMatch = line.match(/^\[video:(youtube|vimeo|mp4):([^\]]+)\](?:\{(\w+)\})?/)
      if (videoMatch) {
        const [, videoType, videoId, layout] = videoMatch
        const layoutType = layout === 'full' ? 'full' : layout === '2col' ? '2col' : layout === '3col' ? '3col' : 'full'
        media.push({ 
          type: 'video', 
          videoType: videoType as 'youtube' | 'vimeo' | 'mp4',
          videoId: videoId.trim(),
          layout: layoutType 
        })
        return
      }
      
      // Check for image format
      const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)(?:\{(\w+)\})?/)
      if (imageMatch) {
        const [, alt, src, layout] = imageMatch
        const layoutType = layout === 'full' ? 'full' : layout === '2col' ? '2col' : layout === '3col' ? '3col' : undefined
        media.push({ type: 'image', alt, src, layout: layoutType })
      }
    })
  }

  return (
    <div className="flex flex-col gap-[60px] md:gap-[80px]">
      {/* Project Images and Videos */}
      {media.length > 0 && (
        <div className="flex flex-col gap-4 md:gap-6">
          {media.map((item, idx) => {
            // Skip first image on mobile (it's shown in hero)
            if (idx === 0 && item.type === 'image') {
              return (
                <div key={idx} className="hidden md:block">
                  {item.layout === 'full' ? (
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-auto object-contain"
                        loading="eager"
                      />
                    </div>
                  ) : item.layout === '2col' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden md:col-span-2">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto object-contain"
                          loading="eager"
                        />
                      </div>
                    </div>
                  ) : item.layout === '3col' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden md:col-span-3">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto object-contain"
                          loading="eager"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-auto object-contain"
                        loading="eager"
                      />
                    </div>
                  )}
                </div>
              )
            }
            
            // Continue with existing rendering logic for other items
            // Handle videos
            if (item.type === 'video') {
              const videoLayout = item.layout || 'full'
              if (videoLayout === 'full') {
                return (
                  <div key={idx} className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    {item.videoType === 'youtube' && (
                      <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        title={item.alt || 'Video'}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    {item.videoType === 'vimeo' && (
                      <iframe
                        src={`https://player.vimeo.com/video/${item.videoId}`}
                        title={item.alt || 'Video'}
                        className="w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                    {item.videoType === 'mp4' && (
                      <video
                        src={item.videoId}
                        controls
                        className="w-full h-full"
                        style={{ objectFit: 'contain' }}
                      />
                    )}
                  </div>
                )
              } else if (videoLayout === '2col') {
                const nextItem = media[idx + 1]
                if (nextItem && nextItem.layout === '2col' && idx % 2 === 0) {
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        {item.videoType === 'youtube' && (
                          <iframe
                            src={`https://www.youtube.com/embed/${item.videoId}`}
                            title={item.alt || 'Video'}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        {item.videoType === 'vimeo' && (
                          <iframe
                            src={`https://player.vimeo.com/video/${item.videoId}`}
                            title={item.alt || 'Video'}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        {item.videoType === 'mp4' && (
                          <video
                            src={item.videoId}
                            controls
                            className="w-full h-full"
                            style={{ objectFit: 'contain' }}
                          />
                        )}
                      </div>
                      {nextItem.type === 'video' && (
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                          {nextItem.videoType === 'youtube' && (
                            <iframe
                              src={`https://www.youtube.com/embed/${nextItem.videoId}`}
                              title={nextItem.alt || 'Video'}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                          {nextItem.videoType === 'vimeo' && (
                            <iframe
                              src={`https://player.vimeo.com/video/${nextItem.videoId}`}
                              title={nextItem.alt || 'Video'}
                              className="w-full h-full"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                          {nextItem.videoType === 'mp4' && (
                            <video
                              src={nextItem.videoId}
                              controls
                              className="w-full h-full"
                              style={{ objectFit: 'contain' }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )
                } else if (idx > 0 && media[idx - 1]?.layout === '2col') {
                  return null
                } else {
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden md:col-span-2" style={{ aspectRatio: '16/9' }}>
                        {item.videoType === 'youtube' && (
                          <iframe
                            src={`https://www.youtube.com/embed/${item.videoId}`}
                            title={item.alt || 'Video'}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        {item.videoType === 'vimeo' && (
                          <iframe
                            src={`https://player.vimeo.com/video/${item.videoId}`}
                            title={item.alt || 'Video'}
                            className="w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        {item.videoType === 'mp4' && (
                          <video
                            src={item.videoId}
                            controls
                            className="w-full h-full"
                            style={{ objectFit: 'contain' }}
                          />
                        )}
                      </div>
                    </div>
                  )
                }
              }
            }
            
            // Handle images
            if (item.type === 'image') {
              const image = item
              const isVisible = visibleImages.has(idx)
              
              // Track if this image was already rendered as part of a previous group
              const wasRenderedInGroup = 
                (image.layout === '2col' && idx > 0 && media[idx - 1]?.layout === '2col' && media[idx - 1]?.type === 'image') ||
                (image.layout === '3col' && idx > 0 && media[idx - 1]?.layout === '3col' && media[idx - 1]?.type === 'image') ||
                (image.layout === '3col' && idx > 1 && media[idx - 2]?.layout === '3col' && media[idx - 2]?.type === 'image')
              
              if (wasRenderedInGroup) {
                return null
              }
              
              if (image.layout === 'full') {
                return (
                  <div key={idx} className="relative w-full overflow-hidden">
                    <img
                      ref={(el) => {
                        if (el) imageRefs.current.set(idx, el)
                      }}
                      data-image-index={idx}
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain"
                      loading={idx < 6 ? "eager" : "lazy"}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        filter: isVisible ? 'blur(0px)' : 'blur(20px)',
                        transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                      }}
                    />
                  </div>
                )
              } else if (image.layout === '2col') {
                // Check if next image is also 2col to group them
                const nextItem = media[idx + 1]
                const shouldGroup = nextItem && nextItem.type === 'image' && nextItem.layout === '2col'
                
                if (shouldGroup) {
                  const isVisible2 = visibleImages.has(idx + 1)
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden">
                        <img
                          ref={(el) => {
                            if (el) imageRefs.current.set(idx, el)
                          }}
                          data-image-index={idx}
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-auto object-contain"
                          loading={idx < 6 ? "eager" : "lazy"}
                          style={{
                            opacity: isVisible ? 1 : 0,
                            filter: isVisible ? 'blur(0px)' : 'blur(20px)',
                            transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                          }}
                        />
                      </div>
                      <div className="relative w-full overflow-hidden">
                        <img
                          ref={(el) => {
                            if (el) imageRefs.current.set(idx + 1, el)
                          }}
                          data-image-index={idx + 1}
                          src={nextItem.src}
                          alt={nextItem.alt}
                          className="w-full h-auto object-contain"
                          loading={idx + 1 < 6 ? "eager" : "lazy"}
                          style={{
                            opacity: isVisible2 ? 1 : 0,
                            filter: isVisible2 ? 'blur(0px)' : 'blur(20px)',
                            transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                          }}
                        />
                      </div>
                    </div>
                  )
                } else {
                  // Single 2col image (spans 2 columns)
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden md:col-span-2">
                        <img
                          ref={(el) => {
                            if (el) imageRefs.current.set(idx, el)
                          }}
                          data-image-index={idx}
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-auto object-contain"
                          loading={idx < 6 ? "eager" : "lazy"}
                          style={{
                            opacity: isVisible ? 1 : 0,
                            filter: isVisible ? 'blur(0px)' : 'blur(20px)',
                            transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              } else if (image.layout === '3col') {
                // Check if next 2 images are also 3col to group them
                const nextItem1 = media[idx + 1]
                const nextItem2 = media[idx + 2]
                const shouldGroup = nextItem1 && nextItem1.type === 'image' && nextItem1.layout === '3col' &&
                                  nextItem2 && nextItem2.type === 'image' && nextItem2.layout === '3col'
                
                if (shouldGroup) {
                  const isVisible2 = visibleImages.has(idx + 1)
                  const isVisible3 = visibleImages.has(idx + 2)
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden">
                        <img
                          ref={(el) => {
                            if (el) imageRefs.current.set(idx, el)
                          }}
                          data-image-index={idx}
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-auto object-contain"
                          loading={idx < 6 ? "eager" : "lazy"}
                          style={{
                            opacity: isVisible ? 1 : 0,
                            filter: isVisible ? 'blur(0px)' : 'blur(20px)',
                            transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                          }}
                        />
                      </div>
                      <div className="relative w-full overflow-hidden">
                        <img
                          ref={(el) => {
                            if (el) imageRefs.current.set(idx + 1, el)
                          }}
                          data-image-index={idx + 1}
                          src={nextItem1.src}
                          alt={nextItem1.alt}
                          className="w-full h-auto object-contain"
                          loading={idx + 1 < 6 ? "eager" : "lazy"}
                          style={{
                            opacity: isVisible2 ? 1 : 0,
                            filter: isVisible2 ? 'blur(0px)' : 'blur(20px)',
                            transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                          }}
                        />
                      </div>
                      <div className="relative w-full overflow-hidden">
                        <img
                          ref={(el) => {
                            if (el) imageRefs.current.set(idx + 2, el)
                          }}
                          data-image-index={idx + 2}
                          src={nextItem2.src}
                          alt={nextItem2.alt}
                          className="w-full h-auto object-contain"
                          loading={idx + 2 < 6 ? "eager" : "lazy"}
                          style={{
                            opacity: isVisible3 ? 1 : 0,
                            filter: isVisible3 ? 'blur(0px)' : 'blur(20px)',
                            transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                          }}
                        />
                      </div>
                    </div>
                  )
                } else {
                  // Single 3col image (spans 3 columns)
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="relative w-full overflow-hidden md:col-span-3">
                        <img
                          ref={(el) => {
                            if (el) imageRefs.current.set(idx, el)
                          }}
                          data-image-index={idx}
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-auto object-contain"
                          loading={idx < 6 ? "eager" : "lazy"}
                          style={{
                            opacity: isVisible ? 1 : 0,
                            filter: isVisible ? 'blur(0px)' : 'blur(20px)',
                            transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                          }}
                        />
                      </div>
                    </div>
                  )
                }
              } else {
                // Default: single column (no layout specified)
                return (
                  <div key={idx} className="relative w-full overflow-hidden">
                    <img
                      ref={(el) => {
                        if (el) imageRefs.current.set(idx, el)
                      }}
                      data-image-index={idx}
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain"
                      loading={idx < 6 ? "eager" : "lazy"}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        filter: isVisible ? 'blur(0px)' : 'blur(20px)',
                        transition: 'opacity 0.7s ease-out, filter 0.7s ease-out',
                      }}
                    />
                  </div>
                )
              }
            }
            
            return null
          })}
        </div>
      )}
    </div>
  )
}

