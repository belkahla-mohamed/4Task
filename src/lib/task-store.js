"use client"

import { create } from "zustand"
import { TaskDatabase } from "./db"

const db = new TaskDatabase()

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  loadTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const tasks = await db.getAllTasks()
      set({ tasks, isLoading: false })
    } catch (error) {
      set({ error: "Failed to load tasks", isLoading: false })
    }
  },

  addTask: async (data) => {
    try {
      const task = await db.addTask(data)
      set((state) => ({ tasks: [...state.tasks, task] }))
    } catch (error) {
      set({ error: "Failed to add task" })
      throw error
    }
  },

  updateTask: async (id, data) => {
    try {
      const updatedTask = await db.updateTask(id, data)
      if (updatedTask) {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        }))
      }
    } catch (error) {
      set({ error: "Failed to update task" })
      throw error
    }
  },

  deleteTask: async (id) => {
    try {
      await db.deleteTask(id)
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }))
    } catch (error) {
      set({ error: "Failed to delete task" })
      throw error
    }
  },

  syncTasks: async () => {
    // Enhanced sync functionality with better error handling
    try {
      const { tasks } = get()

      // Simulate API sync - replace with actual Strapi integration
      const unsyncedTasks = tasks.filter((task) => !task.synced)

      if (unsyncedTasks.length > 0) {
        // Mark tasks as synced after successful API call
        const updatedTasks = tasks.map((task) => ({ ...task, synced: true }))
        set({ tasks: updatedTasks })

        // Update in IndexedDB
        for (const task of unsyncedTasks) {
          await db.updateTask(task.id, { synced: true })
        }
      }

      return { success: true, syncedCount: unsyncedTasks.length }
    } catch (error) {
      set({ error: "Failed to sync tasks" })
      throw error
    }
  },
}))
