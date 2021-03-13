/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async getComments(blogId) {
    try {
      console.log(blogId)
      const res = await api.get('api/blogs/' + blogId + '/comments')
      AppState.comments = res.data
      console.log(AppState.comments)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const commentService = new CommentsService()
