import { describe, it, expect } from 'vitest'
import request from 'supertest'
import express from 'express'

const app = express()
app.get('/test', (req, res) => res.json({ ok: true }))

describe('Supertest check', () => {
  it('should work with express', async () => {
    const res = await request(app).get('/test')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })
})
