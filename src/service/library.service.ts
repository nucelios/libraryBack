import { LibraryDto } from "@/dto/library.dto";
import { ILibrary } from "@/interfaces/ILibrary";
import { LibraryRepo } from "@/repositories/library.repo";






export class LibraryService {
    private repository: LibraryRepo;
    constructor() {
        this.repository = new LibraryRepo();
    }


    createBook = async (LibraryDto: LibraryDto): Promise<ILibrary> => {
        return await this.repository.createBook(LibraryDto);
    }

    deleteBook = async (id: number): Promise<void> => {
        return await this.repository.deleteBook(id);
    };

    async changeBook(LibraryDto: LibraryDto, id: number): Promise<ILibrary | null> {
        return await this.repository.changeBook(LibraryDto, id)
    }

    async getAllBooks(): Promise<ILibrary[]> {
        return await this.repository.getAllBooks();
    }
    getOnePost = async (id: number): Promise<ILibrary | null> => {
        return await this.repository.getOneBook(id);
    };

    async findBook(searchKeyword: string): Promise<ILibrary[] | null> {
        return this.repository.findBook(searchKeyword)
    }

}