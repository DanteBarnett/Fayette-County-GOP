import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'
import StickyCTA from '../components/StickyCTA'

vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}))

describe('Hero', () => {
  it('renders headline words', () => {
    render(<Hero />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})

describe('StickyCTA', () => {
  it('is hidden before scroll', () => {
    render(<StickyCTA />)
    expect(screen.queryByText(/Contribute/i)).not.toBeInTheDocument()
  })
})