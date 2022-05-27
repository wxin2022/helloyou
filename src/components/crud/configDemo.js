export default {
  module: 'codeStandard',
  moduleName: '',
  listURL: '',
  saveURL: '',
  editURL: '',
  removeURL: '',

  pagination: true,
  fields: [{
    prop: 'name',
    label: '名称',

    isSearch: true,
    isColumn: true,
    isForm: true,

    type: '', // select , date, dateTime, input, radio, checkbox
    list: [{
      label: '',
      value: ''
    }],
    listApi: '',
    listApiData: {}
  }]
}
