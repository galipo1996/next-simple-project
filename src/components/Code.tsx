'use client'
import { useTheme } from 'next-themes'
import Highlight, { defaultProps, type Language } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'
import { useEffect, useState } from 'react'

interface CodeProps {
  code: string
  show: boolean
  language: Language
  animationDelay?: number
  animated?: boolean
}

const Code = ({
  code,
  language,
  show,
  animated,
  animationDelay,
  ...props
}: CodeProps) => {
  const { theme: applicationTheme } = useTheme()
  const [text, setText] = useState<string>(animated ? '' : code)
  useEffect(() => {
    let i = 0
    if (show && animated) {
      setTimeout(() => {
        const intervalID = setInterval(() => {
          setText(code.slice(0, i))
          i++
          if (i > code.length) {
            clearInterval(intervalID)
          }
        }, 15)
        return () => clearInterval(intervalID)
      }, animationDelay || 150)
    }
  }, [code, show, animated, animationDelay])
  const lines: number = text.split(/\n\r|\n|\r/).length
  const theme = applicationTheme === 'light' ? lightTheme : darkTheme
  return (
    <Highlight {...defaultProps} language={language} theme={theme} code={text}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            'transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar'
          }
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, i) => {
            // eslint-disable-next-line no-unused-vars
            const { key, ...rest } = getLineProps({ line, key: i })
            return (
              <div key={`line-${i}`} style={{ position: 'relative' }} {...rest}>
                {line.map((token, index) => {
                  // eslint-disable-next-line no-unused-vars
                  const { key, ...props } = getTokenProps({ token, i })
                  return <span key={index} {...props} />
                })}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}

export default Code
