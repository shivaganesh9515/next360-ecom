import { test, expect } from '@playwright/test'

test('home renders and hides blog/about nav links', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('link', { name: /Home/i }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /Shop/i }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /Contact/i }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /^Blog$/i })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /^About$/i })).toHaveCount(0)

  await page.screenshot({ path: 'test-results/home-smoke.png', full_page: true })
})

test('about and blog routes redirect to home when main site URL is empty', async ({ page }) => {
  await page.goto('/about')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/\/$/)

  await page.goto('/blog')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/\/$/)
})

test('core buyer pages load without crash', async ({ page }) => {
  await page.goto('/shop')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { name: /shop|results/i })).toBeVisible()
  await page.screenshot({ path: 'test-results/shop-smoke.png', full_page: true })

  await page.goto('/cart')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/\/cart/)

  await page.goto('/checkout')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/\/login\?from=%2Fcheckout|\/cart|\/checkout/)
})
