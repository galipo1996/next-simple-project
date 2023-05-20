import { authOptions } from '@/lib/authOptions'
import { db } from '@/lib/db'
import { methodFN } from '@/lib/methodFN'
import { revokeApiData } from '@/types/api'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const revoke = async (
  req: NextApiRequest,
  res: NextApiResponse<revokeApiData>
) => {
  try {
    const response = await getServerSession(req, res, authOptions)
    const user = response?.user
    if (!user) {
      return res.status(404).json({ error: 'unauthorize', success: false })
    }
    const validApiKey = await db.apiKey.findFirst({
      where: { userId: user.id, enabled: true },
    })
    if (!validApiKey) {
      return res.status(500).json({
        error: 'this api key can t be revoke',
        success: false,
      })
    }
    await db.apiKey.update({
      where: { id: validApiKey.id },
      data: {
        enabled: false,
      },
    })
    return res.status(200).json({
      error: null,
      success: true,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        success: false,
      })
    }
    return res
      .status(500)
      .json({ error: 'please try again later', success: false })
  }
}
export default methodFN(['POST'], revoke)
