interface SimpleContentProps {
  content: string
}

export function SimpleContent({ content }: SimpleContentProps) {
  // Enhanced markdown-like rendering
  const renderContent = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let inList = false
    let listItems: JSX.Element[] = []

    const processLine = (line: string, index: number) => {
      // Handle headers
      if (line.startsWith('# ')) {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${index}`} className="mb-4 pl-6 text-gray-700 dark:text-gray-300">{listItems}</ul>)
          listItems = []
          inList = false
        }
        return <h1 key={index} className="text-3xl font-faktum-medium mb-6 text-gray-900 dark:text-gray-100">{processInlineMarkdown(line.substring(2))}</h1>
      }
      if (line.startsWith('## ')) {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${index}`} className="mb-4 pl-6 text-gray-700 dark:text-gray-300">{listItems}</ul>)
          listItems = []
          inList = false
        }
        return <h2 key={index} className="text-2xl font-faktum-medium mb-4 text-gray-900 dark:text-gray-100">{processInlineMarkdown(line.substring(3))}</h2>
      }
      if (line.startsWith('### ')) {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${index}`} className="mb-4 pl-6 text-gray-700 dark:text-gray-300">{listItems}</ul>)
          listItems = []
          inList = false
        }
        return <h3 key={index} className="text-xl font-faktum-medium mb-3 text-gray-900 dark:text-gray-100">{processInlineMarkdown(line.substring(4))}</h3>
      }

      // Handle bullet lists
      if (line.startsWith('- ')) {
        inList = true
        const content = line.substring(2)
        listItems.push(<li key={`li-${index}`} className="mb-1 text-gray-700 dark:text-gray-300">{processInlineMarkdown(content)}</li>)
        return null
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(line)) {
        inList = true
        const content = line.replace(/^\d+\.\s/, '')
        listItems.push(<li key={`li-${index}`} className="mb-1 text-gray-700 dark:text-gray-300">{processInlineMarkdown(content)}</li>)
        return null
      }

      // Handle empty lines
      if (line.trim() === '') {
        if (inList && listItems.length > 0) {
          elements.push(<ul key={`list-${index}`} className="mb-4 pl-6 text-gray-700 dark:text-gray-300">{listItems}</ul>)
          listItems = []
          inList = false
        }
        return <br key={index} />
      }

      // Handle regular paragraphs
      if (inList && listItems.length > 0) {
        elements.push(<ul key={`list-${index}`} className="mb-4 pl-6 text-gray-700 dark:text-gray-300">{listItems}</ul>)
        listItems = []
        inList = false
      }

      return <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">{processInlineMarkdown(line)}</p>
    }

    // Process all lines
    lines.forEach((line, index) => {
      const element = processLine(line, index)
      if (element) {
        elements.push(element)
      }
    })

    // Handle any remaining list items
    if (inList && listItems.length > 0) {
      elements.push(<ul key="final-list" className="mb-4 pl-6 text-gray-700 dark:text-gray-300">{listItems}</ul>)
    }

    return elements
  }

  // Process inline markdown like **bold**, *italic*, and [links](url)
  const processInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let currentText = ''
    let i = 0

    while (i < text.length) {
      // Handle links [text](url)
      if (text[i] === '[') {
        if (currentText) {
          parts.push(currentText)
          currentText = ''
        }
        i++
        let linkText = ''
        while (i < text.length && text[i] !== ']') {
          linkText += text[i]
          i++
        }
        if (i < text.length && text[i] === ']') {
          i++
          if (i < text.length && text[i] === '(') {
            i++
            let linkUrl = ''
            while (i < text.length && text[i] !== ')') {
              linkUrl += text[i]
              i++
            }
            if (i < text.length && text[i] === ')') {
              parts.push(
                <a 
                  key={`link-${i}`} 
                  href={linkUrl} 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkText}
                </a>
              )
              i++
              continue
            }
          }
        }
        // If link parsing failed, add back the original text
        parts.push(`[${linkText}]`)
        continue
      }

      // Handle bold text **text**
      if (text.slice(i, i + 2) === '**') {
        if (currentText) {
          parts.push(currentText)
          currentText = ''
        }
        i += 2
        let boldText = ''
        while (i < text.length && text.slice(i, i + 2) !== '**') {
          boldText += text[i]
          i++
        }
        if (i < text.length) {
          parts.push(<strong key={`bold-${i}`} className="font-faktum-medium text-gray-900 dark:text-gray-100">{boldText}</strong>)
          i += 2
        } else {
          parts.push(`**${boldText}`)
        }
        continue
      }

      // Handle italic text *text*
      if (text[i] === '*' && (i === 0 || text[i - 1] !== '*')) {
        if (currentText) {
          parts.push(currentText)
          currentText = ''
        }
        i++
        let italicText = ''
        while (i < text.length && text[i] !== '*') {
          italicText += text[i]
          i++
        }
        if (i < text.length) {
          parts.push(<em key={`italic-${i}`} className="italic text-gray-700 dark:text-gray-300">{italicText}</em>)
          i++
        } else {
          parts.push(`*${italicText}`)
        }
        continue
      }

      currentText += text[i]
      i++
    }

    if (currentText) {
      parts.push(currentText)
    }

    return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts
  }

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  )
} 