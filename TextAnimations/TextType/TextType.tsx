import { useState, useEffect } from 'react';

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
}

function TextType({ 
  text, 
  typingSpeed = 75, 
  pauseDuration = 1500, 
  showCursor = true, 
  cursorCharacter = "|" 
}: TextTypeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (currentCharIndex < text[currentTextIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
          setCurrentCharIndex(0);
          setCurrentTextIndex((currentTextIndex + 1) % text.length);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setIsTyping(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentTextIndex, isTyping, text, typingSpeed, pauseDuration]);

  return (
    <div>
      {text[currentTextIndex].substring(0, currentCharIndex)}
      {showCursor && <span className="text-type-cursor">{cursorCharacter}</span>}
    </div>
  );
}

export default TextType;
