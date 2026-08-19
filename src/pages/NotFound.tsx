import React from 'react'

const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#0a2540' }}>404</h1>
      <p style={{ color: '#5b6b7a' }}>Página não encontrada</p>
      <a href="/" style={{ color: '#2a6a8e', textDecoration: 'none', fontWeight: 600 }}>← Voltar ao início</a>
    </div>
  )
}

export default NotFound
