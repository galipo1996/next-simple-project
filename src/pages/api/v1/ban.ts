import { cosineSimilarity } from '@/helpers/cosine-sim'
import { db } from '@/lib/db'
import { methodFN } from '@/lib/methodFN'
import { openai } from '@/lib/openai'
import { NextApiRequest, NextApiResponse } from 'next'

import { z } from 'zod'
const reqSchema = z.object({
  text1: z.string().max(300),
  text2: z.string().max(300),
})
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ApiKey = req.headers.authorization
  const body = (await req.body) as unknown

  if (!ApiKey) {
    return res.status(401).json({
      message: 'not Authorize',
      title: 'Auth',
    })
  }
  const validApi = await db.apiKey.findFirst({
    where: { key: ApiKey, enabled: true },
  })

  if (!validApi) {
    return res.status(400).json({ message: 'not Auth' })
  }
  try {
    const date = new Date()
    const { text1, text2 } = reqSchema.parse(body)

    const embedding = await Promise.all(
      [text1, text2].map(async (text) => {
        const res = await openai.createEmbedding({
          input: text,
          model: 'text-embedding-ada-002',
        })
        return res.data.data[0].embedding
      })
    )
    const similarityVal = cosineSimilarity(embedding[0], embedding[1])
    const duration = new Date().getTime() - date.getTime()

    await db.apiRequest.create({
      data: {
        method: req.method as string,
        path: req.url as string,
        status: 200,
        duration,
        usedApiKey: validApi.key,
        apiKeyId: validApi.id,
      },
    })

    return res.status(200).json({
      text1,
      text2,
      duration,
      success: true,
      similarityVal,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: error.issues,
        title: 'bad Request',
      })
    }
  }
}

export default methodFN(['POST'], handler)
