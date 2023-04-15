import { Spin } from 'antd'
import React from 'react'
import './index.css'
export default function LoadingPage({loading}) {
  return (
    <div style={{display : loading ? 'flex' : 'none'}} className="example">
    <Spin />
  </div>
  )
}
