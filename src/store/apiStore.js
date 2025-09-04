import { create } from 'zustand';
import { apiV2 } from '../utils/axios';

export const useApiStore = create((set) => ({
    loading: false,
    about: null,
    blog: [],
    members: [],
    projects: [],
    blogSingle: null,
    events: [],
    eventSingle: null,
    fetchAbout: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/about/view');
            set({ about: res.data });
            set({ loading: false })
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })
        }
    },
    fetchMembers: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/member/list');

            set({ members: res.data });
            set({ loading: false })
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })
        }
    },
    fetchProjects: async (year) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/project/list?year=${year}`);
            set({ projects: res.data, loading: false })
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })
        }
    },
    fetchBlog: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/blog/list');
            set({ blog: res.data });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
    fetchBlogSingle: async (newsId) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/blog/details/${newsId}`);
            set({ blogSingle: res.data, loading: false });
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
            set({ loading: false })
        }
    },
    fetchEvents: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/event/list');
            set({ events: res.data });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
    fetchEventSingle: async (eventId) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/event/details/${eventId}`);
            set({ eventSingle: res.data, loading: false });
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
            set({ loading: false })
        }
    }
}));