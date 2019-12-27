import { types } from 'mobx-state-tree'
import { PostService } from '../_services'

const PostStore = types
  .model('Post', {
    id: types.string,
    title: types.string,
    description: types.string,
    createdAt: types.maybeNull(types.string),
    updatedAt: types.maybeNull(types.string)
  })
  .actions(seft => ({
    async deletePost () {
      const resp = await PostService.deletePost(seft.id)
      return resp
    },
    async updatePost (title, description) {
      const resp = await PostService.updatePost(seft.id, title, description)
      return resp
    }
  }))

export default PostStore
