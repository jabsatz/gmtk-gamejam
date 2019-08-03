import React, { useEffect } from "react";
import initButton from "./initButton";
import "./button.css";

export default function Button({ onClick, children }) {
  useEffect(initButton, []);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="svg-filters"
      >
        <defs>
          <filter id="filter-goo-1">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <button id="component-1" className="button button--1" onClick={onClick}>
        {children}
        <span className="button__container">
          <span className="circle top-left" />
          <span className="circle top-left" />
          <span className="circle top-left" />
          <span className="button__bg" />
          <span className="circle bottom-right" />
          <span className="circle bottom-right" />
          <span className="circle bottom-right" />
        </span>
      </button>
    </>
  );
}
