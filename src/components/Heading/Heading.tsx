import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./Heading.css";
import type { HeadingProps } from "../../types";

gsap.registerPlugin(ScrambleTextPlugin);

const Heading: React.FC<HeadingProps> = ({ text, position }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      // Scramble text effect
      gsap.fromTo(
        headingRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          scrambleText: {
            text,
            chars: "upperAndLowerCase",
            speed: 0.4,
          },
        }
      );
    }

    if (cursorRef.current) {
      // Blinking cursor effect
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "power1.inOut",
      });
    }
  }, [text]);

  return (
    <div className={`heading heading-${position}`}>
      <h1>
        <span ref={headingRef}></span>
        <span ref={cursorRef} className="cursor">
          
        </span>
      </h1>
    </div>
  );
};

export default Heading;
