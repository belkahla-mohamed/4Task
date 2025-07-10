"use client"

export class TaskDatabase {
  constructor() {
    this.dbName = "4TaskDB"
    this.version = 1
    this.db = null
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = event.target.result

        if (!db.objectStoreNames.contains("tasks")) {
          const store = db.createObjectStore("tasks", { keyPath: "id" })
          store.createIndex("status", "status", { unique: false })
          store.createIndex("priority", "priority", { unique: false })
          store.createIndex("category", "category", { unique: false })
          store.createIndex("dueDate", "dueDate", { unique: false })
        }
      }
    })
  }

  async ensureDB() {
    if (!this.db) {
      await this.init()
    }
    return this.db
  }

  async getAllTasks() {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tasks"], "readonly")
      const store = transaction.objectStore("tasks")
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || [])
    })
  }

  async addTask(data) {
    const db = await this.ensureDB()
    const task = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      synced: false,
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tasks"], "readwrite")
      const store = transaction.objectStore("tasks")
      const request = store.add(task)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(task)
    })
  }

  async updateTask(id, data) {
    const db = await this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tasks"], "readwrite")
      const store = transaction.objectStore("tasks")
      const getRequest = store.get(id)

      getRequest.onerror = () => reject(getRequest.error)
      getRequest.onsuccess = () => {
        const existingTask = getRequest.result
        if (!existingTask) {
          resolve(null)
          return
        }

        const updatedTask = {
          ...existingTask,
          ...data,
          updatedAt: new Date().toISOString(),
          synced: false,
        }

        const putRequest = store.put(updatedTask)
        putRequest.onerror = () => reject(putRequest.error)
        putRequest.onsuccess = () => resolve(updatedTask)
      }
    })
  }

  async deleteTask(id) {
    const db = await this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tasks"], "readwrite")
      const store = transaction.objectStore("tasks")
      const request = store.delete(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getTasksByStatus(status) {
    const db = await this.ensureDB()

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["tasks"], "readonly")
      const store = transaction.objectStore("tasks")
      const index = store.index("status")
      const request = index.getAll(status)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || [])
    })
  }
}
