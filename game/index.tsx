import app from "./app";
import React from "react"

export default () => {
  return (<div ref={(nodeElement) => {nodeElement && nodeElement.appendChild(app.view)}}></div>)
}