import { LibraryDto } from "@/dto/library.dto";
import { ApiError } from "@/helpers/apiError";
import validateNumber from "@/helpers/validateNumber";
import { LibraryService } from "@/service/library.service";

import { plainToInstance } from "class-transformer";
import { RequestHandler } from "express";




export class LibraryController {
  private service: LibraryService;

  constructor() {
    this.service = new LibraryService();
  }

  createComment: RequestHandler = async (req, res, next) => {
    try {
      if (req.body.name === '' || req.body.author === '' || req.body.publishYear === '' || req.body.description === '') throw ApiError.BadRequest('Заполните все формы');
      const libraryDto = plainToInstance(LibraryDto, req.body, { excludeExtraneousValues: true });

      const library = await this.service.createBook(libraryDto);

      res.send(library);
    } catch (e) {
      next(e);
    }
  };

  deleteBook: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      await this.service.deleteBook(id);


      res.send({ message: `Книга с идентификатором ${id} успешно удалёна.` });
    } catch (e) {
      next(e);
    }
  };
  changeBook: RequestHandler = async (req, res, next) => {
    try {
      const BookId = validateNumber(req.params.id);
      if (!BookId) throw ApiError.BadRequest('Не верно указан id');

      const libraryDto = plainToInstance(LibraryDto, req.body, { excludeExtraneousValues: true });

      const updatedBook = await this.service.changeBook(libraryDto, BookId);
      if (!updatedBook) throw ApiError.BadRequest('Не удалось изменить книгу!');

      res.send(updatedBook);
    } catch (e) {
      next(e);
    }
  };

  getAllBooks: RequestHandler = async (req, res, next) => {
    try {

      const books = await this.service.getAllBooks();

      res.send(books);
    } catch (e) {
      next(e);
    }
  };

  getOneBook: RequestHandler = async (req, res, next) => {
    try {
      const id = validateNumber(req.params.id);
      if (!id) throw ApiError.BadRequest('Не верно указан id');

      const book =await this.service.getOnePost(id);
      if (!book) throw ApiError.NotFound('Такой книги нет!');

      res.send(book);
    } catch (e) {
      next(e);
    }
  };

  findBook: RequestHandler = async (req, res, next) => {
    try {
      const book =await this.service.findBook(req.body.searchKeyword);
      if (!book) throw ApiError.NotFound('Такой книги нет!');

      res.send(book);
    } catch (e) {
      next(e);
    }
  };

}