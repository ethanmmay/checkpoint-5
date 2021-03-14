/* eslint-disable no-undef */
import { AppState } from '../AppState'
import router from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { commentService } from './CommentsService'

class BlogsService {
  async getBlogs() {
    try {
      const res = await api.get('api/blogs')
      AppState.blogs = res.data
    } catch (error) {
      logger.log(error)
    }
  }

  showBlogDetails(blog) {
    try {
      // Set Blog Details to Clicked Blog
      AppState.blogDetails = blog
      // Save Blog Details in Case of Refresh
      window.localStorage.setItem('currentBlog', JSON.stringify(blog))
      // Push to About Page and Display Blog Details
      router.push({ name: 'BlogDetails' })
    } catch (error) {
      logger.log(error)
    }
  }

  checkBlogDetails() {
    try {
      // Get Blog Details from Storage
      AppState.blogDetails = JSON.parse(window.localStorage.getItem('currentBlog'))
      commentService.getComments(AppState.blogDetails.id)
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
    await api.post('api/blogs', rawBlog)
    this.getBlogs()
  }
}

export const blogService = new BlogsService()
