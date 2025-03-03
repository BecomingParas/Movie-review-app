import create from 'zustand';

const useStore = create((set) => ({
movies: [],
reviews: [],
users: [],
setMovies: (movies) => set({ movies }),
setReviews: (reviews) => set({ reviews }),
setUsers: (users) => set({ users }),
}));

export default useStore;

