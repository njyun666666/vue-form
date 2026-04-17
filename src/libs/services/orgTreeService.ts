import formAPI from '../api/formAPI'
import type { OrgTreeNode } from '../models/OrgTree/OrgTreeNode'

class OrgTreeService {
  readonly treeUrl = '/OrgTree'

  getTree() {
    return formAPI.get<OrgTreeNode[]>(this.treeUrl)
  }
}

export const orgTreeService = new OrgTreeService()
