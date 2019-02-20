const utils     = require('../../components/utils');
const Atividade = require('../../models/Atividade');
const User      = require('../../models/User');

function index(req, res) {

  let query = {};

  Atividade.find(query)
  .then(atividades => {
    return res.status(200).json(atividades);
  })
  .catch(utils.handleError(req, res));
}


function create(req, res) {

  let atividade                 = new Atividade();
  let learning_objectives       = req.body.learning_objectives  ||  [];

  atividade.professor           = req.user;
  atividade.learning_objectives = learning_objectives.map(l =>  {
    return  l;
  });

  atividade.save()
  .then(a => {
    return res.status(201).json(a);
  })
  .catch(utils.handleError(req, res));

}


module.exports = {
  index   : index,
  create  : create
};
