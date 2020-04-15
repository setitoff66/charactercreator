import Characters from '../controllers/characters';

export default (app) => {
  app.get('localhost:8000/api/characters', Characters.getAll);
  app.post('localhost:8000/api/characters', Characters.create);
};
