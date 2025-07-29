import { createContext, useContext, useEffect, useState } from "react";
import type { Board } from "../types/board";
import { v4 as uuid } from "uuid";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";

interface BoardContextType {
    boards: Board[];
    addBoard: (name: string) => void;
    saveMovieToBoard: (boardId: string, movie: Movie) => void;
    removeMovieFromBoard: (boardId: string, movieId: number) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [boards, setBoards] = useState<Board[]>(() => {
        const stored = localStorage.getItem("board");
        return stored ? JSON.parse(stored) : [];
    });


    useEffect(() => {
        localStorage.setItem("boards", JSON.stringify(boards));
    }, [boards]);

    const addBoard = (name: string) => {
        const newBoard: Board = {
            id: uuid(),
            name,
            movies: [],
        };
        setBoards(prev => [...prev, newBoard]);
    };

    const saveMovieToBoard = (boardId: string, movie: Movie) => {
        setBoards((prevBoards) =>
            prevBoards.map((board) => {
                if (board.id === boardId) return board;

                const alreadyExists = board.movies.some(m => m.id === movie.id);
                if (alreadyExists) {
                    toast.error("Movie already added to board.");
                    return board;
                };

                toast.success("Movie added to board.");
                return {
                    ...board,
                    movie: [...board.movies, movie]
                }
            })
        );
    };

    const removeMovieFromBoard = (boardId: string, movieId: number) => {
        setBoards(prev =>
            prev.map(board => {
                if (board.id !== boardId) return board;

                return {
                    ...board,
                    movie: board.movies.filter(m => m.id !== movieId)
                }
            })
        );
    };

    return (
        <BoardContext.Provider value={{ boards, addBoard, saveMovieToBoard, removeMovieFromBoard }}>
            {children}
        </BoardContext.Provider>
    );
};

// Hook to use context
export const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (!context) {
        throw new Error("useBoardContext must be used inside BoardProvider");
    }
    return context;
};