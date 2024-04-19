import { LibraryController } from "@/controllers/library.controller";
import { IRoute } from "@/interfaces/IRoute.interface";
import { authValidate } from "@/middlewares/auth.middleware";
import { Router } from "express";


export class LibraryRouter implements IRoute {
    public path = '/library';
    public router = Router();
    private controller: LibraryController;

    constructor() {
        this.controller = new LibraryController();
        this.init();
    }

    private init() {
        this.router.post('/',authValidate, this.controller.createComment);

        this.router.delete('/:id',authValidate, this.controller.deleteBook);

        this.router.put('/:id',authValidate, this.controller.changeBook);

        this.router.get('/', this.controller.getAllBooks);

        this.router.get('/:id', this.controller.getOneBook);

        this.router.post('/find', this.controller.findBook);

    }
}