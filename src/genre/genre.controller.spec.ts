import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

describe('GenreController', () => {
  let genreController: GenreController;

  const genreServiceMock = {
    allGenre: jest.fn(),
    getGenre: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [{ provide: GenreService, useValue: genreServiceMock }],
    }).compile();

    genreController = module.get<GenreController>(GenreController);
  });

  describe('all genre', () => {
    it('should return all genre', async () => {
      // setup
      const GENRES = [
        {
          id: 'genre1',
          name: 'Genre 1',
        },
        {
          id: 'genre2',
          name: 'Genre 2',
        },
      ];

      genreServiceMock.allGenre.mockResolvedValue(GENRES);

      const successMessage = {
        message: 'Successfully get all genre',
      };

      // act
      const result = await genreController.allGenre();

      // assert
      expect(result).toEqual({ ...successMessage, data: GENRES });
    });
  });

  describe('get genre', () => {
    it('should return genre detail if genre exists', async () => {
      // setup
      const GENRE = {
        id: 'genreId',
        name: 'Genre',
        bookCount: 2,
      };

      genreServiceMock.getGenre.mockResolvedValue(GENRE);

      const successMessage = {
        message: 'Successfully get genre detail',
      };

      // act
      const result = await genreController.getGenre(GENRE.id);

      // assert
      expect(result).toEqual({ ...successMessage, data: GENRE });
    });
  });
});
