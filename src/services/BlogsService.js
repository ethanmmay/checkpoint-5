/* eslint-disable no-undef */
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { blogApi } from './AxiosService'

class BlogsService {
  async getBlogs() {
    try {
      const res = await blogApi.get('')
      AppState.blogs = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  async showBlog(id) {
    try {
      const res = await blogApi.get('' + id)
      AppState.blogDetails = res.data
      const blog = AppState.blogDetails
      Swal.fire({
        title: blog.title,
        text: blog.body,
        imageUrl: blog.creator.picture,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Custom image'
      })
    } catch (error) {
      logger.log(error)
    }
  }

  showBlogForm() {
    try {
      Swal.fire({
        title: 'New Blog',
        html: '<input type="text" id="title" class="swal2-input" placeholder="Blog Title"><input type="text" id="body" class="swal2-input" placeholder="Your Blog">',
        confirmButtonText: 'Post',
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector('#title').value
          const body = Swal.getPopup().querySelector('#body').value
          if (!title || !body) {
            Swal.showValidationMessage('Please enter title and body')
          }
          return { title: title, body: body }
        }
      }).then((result) => {
        const newBlog = {
          title: result.value.title,
          body: result.value.body,
          creatorId: AppState.user.id
        }
        this.postBlog(newBlog)
      })
    } catch (error) {
      logger.log(error)
    }
  }

  async postBlog(rawBlog) {
    await blogApi.post('', rawBlog)
    this.getBlogs()
  }
}

export const blogService = new BlogsService()
