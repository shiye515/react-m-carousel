import React from 'react'

export default function indicator (length, active, animateTo) {
  const children = []
  for (let i = 0; i < length; i++) {
    children.push(i)
  }
  return (
    <div className='indicators'>
      {children.map((v) => {
        return (
          <div
            onClick={animateTo.bind(this, v)}
            className={'dot ' + (active === v ? 'active' : '')}
            key={v}>
            {v + 1}
          </div>
        )
      })}
    </div>
  )
}
