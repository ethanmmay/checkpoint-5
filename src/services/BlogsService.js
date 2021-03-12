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

  async getBlogById(id) {
    try {
      const res = await blogApi.get('' + id)
      AppState.blogDetails = res.data
    } catch (error) {
      logger.log(error)
    }
  }
}

export const blogService = new BlogsService()
