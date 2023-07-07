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