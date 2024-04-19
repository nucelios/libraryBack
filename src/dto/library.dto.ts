import { Expose } from 'class-transformer';
import { IsNumberString, IsString} from 'class-validator';

export class LibraryDto {

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    author!: string;
    
    @Expose()
    @IsNumberString()
    publishYear!: number;

    @Expose()
    @IsString()
    description!: string;

}