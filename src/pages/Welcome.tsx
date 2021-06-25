import React from "react"
import { history } from 'umi'

export default () => {
  return (
  <div>index{history.location.pathname}</div>
  )
}