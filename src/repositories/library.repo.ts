import { appDataSource } from "@/config/dataSource";
import { LibraryDto } from "@/dto/library.dto";
import { Library } from "@/enteties/library.entity";
import { ILibrary } from "@/interfaces/ILibrary";
import { Repository } from "typeorm";

export class LibraryRepo extends Repository<Library> {
    constructor() {
        super(Library, appDataSource.createEntityManager());
    }

    async createBook(LibraryDto: LibraryDto): Promise<ILibrary> {
        return await this.save(LibraryDto);
    }
    async deleteBook(id: number): Promise<void> {
        await this.delete(id);
    }
    async changeBook(LibraryDto: LibraryDto, id: number): Promise<ILibrary | null> {
        const existingLibrary = await this.findOne({ where: { id } });

        if (!existingLibrary) {
            return null;
        }
        existingLibrary.name = LibraryDto.name;
        existingLibrary.author = LibraryDto.author;
        existingLibrary.publishYear = LibraryDto.publishYear;
        existingLibrary.description = LibraryDto.description;

        const updatedLibrary = await this.save(existingLibrary);

        return updatedLibrary;
    }

    async getAllBooks(): Promise<ILibrary[]> {
        return await this.find();
    }

    async getOneBook(id: number): Promise<ILibrary | null> {
        return await this.findOne({ where: { id } });
    }

    async findBook(searchKeyword: string): Promise<ILibrary[] | null> {
        const result = await this
            .createQueryBuilder("library")
            .where("library.name LIKE :searchKeyword", { searchKeyword: `%${searchKeyword}%` })
            .getMany();
        return result
    }
}