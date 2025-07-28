import { createContext, useContext, useEffect, useState } from "react";
import type { Board } from "../types/board";
import { v4 as uuid } from "uuid";
import type { Movie } from "../types/movie";

interface BoardContextType {
    boards: Board[];
    addBoard: (name: string) => void;
    saveMovieToBoard: (boardId: string, movie: Movie) => void;
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
            prevBoards.map((board) =>
                board.id === boardId
                    ? {
                        ...board,
                        movie: board.movies.some((m) => m.id === movie.id)
                            ? board.movies
                            : [...board.movies, movie],
                    }
                    : board
            )
        );
    };

    return (
        <BoardContext.Provider value={{ boards, addBoard, saveMovieToBoard }}>
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