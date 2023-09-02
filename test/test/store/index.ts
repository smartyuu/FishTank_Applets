import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    count: 0,
    collapse: false,
    token: '',
    username: '',
    password: '',
    aquarium: '',
    avater: ''
  }),
  actions: {
    setCount(count: number) {
      this.count = count
    },
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    setToken(token: string) {
      this.token = token
	  // wx.setStorageSync('token', token);
    },
    setUsername(username: string) {
      this.username = username
    },
    setPassword(password: string) {
      this.password = password
    },
    setAquarium(aquarium: string) {
      this.aquarium = aquarium
    },
    setAvater(avater: string) {
      this.avater = avater
    },
	
	saveAllData() {
	    // 存储 token 和 username
	//     wx.setStorageSync('token', this.token)
	//     wx.setStorageSync('username', this.username)
	
	//     // 存储其他数据
	//     wx.setStorageSync('count', this.count)
	//     wx.setStorageSync('collapse', this.collapse)
	//     wx.setStorageSync('aquarium', this.aquarium)
	//     wx.setStorageSync('avater', this.avater)
	
	    console.log('所有数据已存储到本地存储中')
	},
  },
  getters: {
    getCount(): number {
      return this.count
    },
    getCollapse(): boolean {
      return this.collapse
    },
    getToken(): string {
      return this.token
    },
    getUsername(): string {
      return this.username
    },
    getPassword(): string {
      return this.password
    },
    getAquarium(): string {
      return this.aquarium
    },
    getAvater(): string {
      return this.avater
    },
  },
})