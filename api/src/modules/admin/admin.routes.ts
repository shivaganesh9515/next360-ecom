import { Router } from 'express'
const router = Router()

router.get('/dashboard', (req, res) => res.json({ success: true, module: 'admin dashboard' }))
router.get('/users', (req, res) => res.json({ success: true }))
router.get('/vendors', (req, res) => res.json({ success: true }))
router.put('/vendors/:id/approve', (req, res) => res.json({ success: true }))
router.get('/orders', (req, res) => res.json({ success: true }))
router.get('/payouts', (req, res) => res.json({ success: true }))
router.post('/settings', (req, res) => res.json({ success: true }))

export default router
