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

  addComment(blogId) {
    try {
      Swal.fire({
        title: 'New Comment',
        html: '<input type="text" id="body" class="swal2-input" placeholder="Comment Here...">',
        confirmButtonText: 'Post',
        focusConfirm: false,
        preConfirm: () => {
          const body = Swal.getPopup().querySelector('#body').value
          if (!body) {
            Swal.showValidationMessage('Please enter a comment')
          }
          return { body: body }
        }
      }).then(async(result) => {
        AppState.comments.push({ body: result.value.body, creator: { name: AppState.user.name } })
        this.postComment(result.value.body, blogId)
      })
    } catch (error) {
      logger.log(error)
    }
  }

  async postComment(body, blogId) {
    if (AppState.user.isAuthenticated) {
      await api.post('api/comments', { body: body, blog: blogId })
      this.getComments(blogId)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'DENIED',
        text: 'Must be logged in to comment!'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      }
      )
    }
  }

  async editComment(comment) {
    try {
      Swal.fire({
        title: 'Edit Comment',
        html: `<input type="text" id="body" class="swal2-input" placeholder="Comment Here..." value="${comment.body}">`,
        confirmButtonText: 'Save',
        focusConfirm: false,
        preConfirm: () => {
          const body = Swal.getPopup().querySelector('#body').value
          if (!body) {
            Swal.showValidationMessage('Please enter a comment')
          }
          return { body: body }
        }
      }).then(async(result) => {
        await api.put('api/comments/' + comment.id, { body: result.value.body })
        this.getComments(comment.blog)
      })
    } catch (error) {
      logger.log(error)
    }
  }

  async deleteComment(commentId) {
    try {
      AppState.comments = AppState.comments.filter(c => c.id !== commentId)
      await api.delete('api/comments/' + commentId)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const commentService = new CommentsService()
