import React, { useImperativeHandle } from "react";
import { useSpring, animated } from 'react-spring'
import "./Background.css";

const stripDominantColor = (gradientStr) => `#${gradientStr.split('#')[2].substr(0, 6)}`

export default React.forwardRef(function Background(props, ref) {

  const [{background}, setPulse] = useSpring(() => ({ background: "#1b2735"}))

  const {opacity} = useSpring({ opacity: 1, from: { opacity: 0 }})

  useImperativeHandle(ref, () => ({
    triggerPulse: gradientString => {
      console.log(stripDominantColor(gradientString))
      setPulse({background: stripDominantColor(gradientString)})
      setTimeout(() => setPulse({background: "#1b2735"}), 100)
    }
  }))

  return (
    <animated.div className="bg-wrapper" style={{background: background.interpolate(x => `radial-gradient(ellipse at bottom, ${x} 20%, #090a0f 100%)`), opacity}}>
      <div className="beat-pulse"></div>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
    </animated.div>
  );
})