"use client"

import React, { useState } from 'react'
import MoodSelector from './MoodSelector'
import CategoryStrip from './CategoryStrip'
import FeaturedProducts from './FeaturedProducts'

export default function HomeInteractive() {
  const [activeMoodTags, setActiveMoodTags] = useState<string[]>([])

  return (
    <>
      <MoodSelector onMoodSelect={setActiveMoodTags} />
      <CategoryStrip />
      <FeaturedProducts activeMoodTags={activeMoodTags} />
    </>
  )
}
