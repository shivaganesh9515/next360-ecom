import { Request, Response, NextFunction } from 'express'
import { algoliaClient, productsIndex } from '../../config/algolia'
import { env } from '../../config/env'
import { successResponse } from '../../shared/utils/response'
import { AppError } from '../../shared/errors/AppError'

export async function search(req: Request, res: Response, next: NextFunction) {
  try {
    const { q = '', page = '0' } = req.query

    // Depending on Algolia client version, signature might vary. Using general v5 syntax approach or v4 compat
    // For older JS clients: algoliaClient.initIndex('name').search(q)
    let results
    try {
      if (algoliaClient.initIndex) {
        const index = algoliaClient.initIndex(env.ALGOLIA_INDEX_NAME)
        results = await index.search(q as string, { page: Number(page) })
      } else {
        // v5 syntax workaround
        results = await (algoliaClient as any).search([
          { indexName: env.ALGOLIA_INDEX_NAME, query: q as string, params: { page: Number(page) } }
        ])
      }
    } catch (e) {
      throw AppError.internal('Search service unavailable')
    }

    successResponse(res, results)
  } catch (error) {
    next(error)
  }
}
