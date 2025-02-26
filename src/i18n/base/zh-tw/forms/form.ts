import base from './_base.json'
import a from './a.json'
import productDeatail from './productDetail.json'

const formBase = {
  Form: {
    ...base,
    ...a,
    ...productDeatail
  }
}

export default formBase
