'use client'

import { useState, useEffect } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
  description?: string
  tags?: string[]
}

export function ShareButtons({ title, url, description, tags }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [hasNativeShare, setHasNativeShare] = useState(false)

  useEffect(() => {
    setHasNativeShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const shareData = {
    title,
    text: description || title,
    url,
  }

  const handleCopyMarkdown = async () => {
    const markdown = `# ${title}\n\n${description || ''}\n\nRead more: ${url}`
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyText = async () => {
    const text = `${title}\n\n${description || ''}\n\nRead the full post: ${url}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    const text = `${title} ${url}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(twitterUrl, '_blank')
  }

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
      
      <button
        onClick={handleCopyMarkdown}
        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy Markdown'}
      </button>
      
      <button
        onClick={handleCopyText}
        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
      >
        Copy Text
      </button>
      
      <button
        onClick={handleTwitterShare}
        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
      >
        Twitter
      </button>
      
      <button
        onClick={handleLinkedInShare}
        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
      >
        LinkedIn
      </button>
      
      {hasNativeShare && (
        <button
          onClick={handleNativeShare}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          More
        </button>
      )}
    </div>
  )
} 