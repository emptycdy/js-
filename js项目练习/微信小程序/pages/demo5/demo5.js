// pages/demo5/demo5.js
Page({

  data: {
    gender:"",
    chechedlist:[],
    list:[{
      id:0,
      name:"🍎",
      value:"apple"
    },
    {
      id:1,
      name:"🍇",
      value:"grape"
    },
    {
      id:2,
      name:"🍌",
      value:"bananer"
    }
  ]
  },
  getUserInfo(e){
    console.log(e)
  },
  handleContact(e){
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  handlechange(e){
    let gender=e.detail.value;
    this.setData({
      gender:gender
    })
  },
  handleItemchange(e){
    console.log(e)
    this.setData({
      chechedlist:[e.detail.value]
    })
  }
})