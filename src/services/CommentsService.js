/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class CommentsService {
  async getComments(blogId) {
    try {
      const res = await api.get('api/blogs/' + blogId + '/comments')
      AppState.comments = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async editComment(comment) {
    // EDIT COMMENT
  }

  async deleteComment(commentId) {
    // DELETE COMMENT
  }
}

export const commentService = new CommentsService()
